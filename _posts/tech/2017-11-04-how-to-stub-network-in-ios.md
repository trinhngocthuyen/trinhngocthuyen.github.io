---
layout: post
comments:	true
title:  "How to stub network in iOS"
date:   2017-11-04 00:00:00
summary:    "There are times we wish to fake a network event, for example, a network error. However, integrating a 3rd party stub library just for this purpose is not really worthy. This post aims at demonstrating how to stub network."
tags:   ios swift testing stub network
categories:	[Tech]
---

<!-- MarkdownTOC -->

- [Fundamental](#fundamental)
	- [A typical workflow of network requests](#a-typical-workflow-of-network-requests)
	- [Variations of this workflow](#variations-of-this-workflow)
- [How to stub](#how-to-stub)
	- [Case study](#case-study)
	- [URLProtocol](#urlprotocol)
	- [Let's stub](#lets-stub)
	- [Shared session](#shared-session)
	- [Session initialized with a configuration](#session-initialized-with-a-configuration)
	- [Another approach](#another-approach)
- [Further discussion](#further-discussion)
	- [Questions remained](#questions-remained)
	- [Bizarre stuffs](#bizarre-stuffs)
- [Reference](#reference)

<!-- /MarkdownTOC -->



There are times we wish to fake a network event, for example, a network error. However, integrating a 3rd party stub library just for this purpose is not really worthy. This post aims at demonstrating how to stub network. It is not a tutorial on "how to create a stubbing framework", therefore, some boundary cases will not be covered so that readers could stay focused.


### Fundamental
#### A typical workflow of network requests
A typical workflow to make a network request is:

1. Create a session `URLSession`
2. Create a task associated with the request: `let task = session.dataTask(...) { ... }`
3. Start/resume the task by calling `task.resume()`


#### Variations of this workflow
Network requests in iOS may behave differently depending on the configuration of the session. By configuration, I mean `URLSessionConfiguration`.

### How to stub
#### Case study
> For debug purpose, we want to create a fake network response for a specific url. For simplicity, we return the response with status code 500.

#### URLProtocol
This is an abstract class that handles network requests. Note: It is a class although its name sounds like a protocol. By default, there are several subclasses of it each of which takes responsibility for a specific URL scheme (http, ftp, file...): `_NSURLHTTPProtocol, _NSURLDataProtocol, _NSURLFTPProtocol, _NSURLFileProtocol, NSAboutURLProtocol`.

When a request is made, the app consults these classes. The first one providing true to [`canInit(with:)`](https://developer.apple.com/documentation/foundation/urlprotocol/1411389-caninit) will be given to handle that request.

#### Let's stub
The core idea of stubbing network lies at:
- *$H_1$. How we register our custom class (subclass of `URLProtocol`) to the protocol classes*
- *$H_2$. How we appoint our class to handle the request*
- *$H_3$. How we return the appropriate stubbing response*

We will talk about $H_1$ later because it involves a few cases that should be taken into account. Let's assume that $H_1$ is already done. Then, $H_2$ is quite simple. We just check whether the request was registered to be stubbed or not.

```swift
class CustomURLProtocol: URLProtocol {
	private static var stubs: [String: CustomResponse] = [:]
	override open class func canInit(with request: URLRequest) -> Bool {
    	return url != nil && stubs[request.url!.absoluteString] != nil
	}	

	class func addStub(url: URL, response: CustomResponse) {
		stubs[url.absoluteString] = response
	}
	...
}

func stub(url: URL, statusCode: Int) {
	...
	CustomURLProtocol.addStub(url: url, response: CustomResponse(statusCode: statusCode))
}
```

$H_3$ is achieved by overriding `startLoading()`. I will not dive into much detail because it is like building a framework. A simple implementation could be like this:

```swift
class CustomURLProtocol: URLProtocol {
	...
    override func startLoading() {
        guard let stubResponse = CustomURLProtocol.stubs[request] else { fatalError() } // Should not happen
        
        switch stubResponse {
        case .error(let error):
            client?.urlProtocol(self, didFailWithError: error)
        case .response(let response):
            client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .allowed)
            client?.urlProtocolDidFinishLoading(self)
        ...
        }
    }
}
```

Now comes the crucial part - $H_1$. There are 2 cases to consider: using the shared session, and creating a session with a configuration.

#### Shared session

The shared session with basic setups is retrieved via `URLSession.shared`. In that case, we could make out custom `URLProtocol` subclass visible to the loading system by calling [`URLProtocol.registerClass(_:)`](https://developer.apple.com/documentation/foundation/urlprotocol/1407208-registerclass).

Note that, the process of consulting these protocol classes take place in the reversed order. The latest one to register will be consulted first.

#### Session initialized with a configuration

The workflow in this case is a bit different. The app does not lookup the protocol classes we register. Rather, it chooses from the classes stored in `URLSessionConfiguration.protocolClasses`. `URLProtocol.registerClass(_:)` does not help now... A solution could be adopted by adding our custom class to `configuration.protocolClasses`. Make sure to insert it to the top so that it is consulted first.

```swift
configuration.protocolClasses = [CustomURLProtocol.self] + configuration.protocolClasses!
```

Everything is nearly done! The only thing left is to make sure the configuration a session is using has the setup above. Fortunately, fow now, we can only create a configuration by either one of the three following.

```swift
let configuration1 = URLSessionConfiguration.default
let configuration2 = URLSessionConfiguration.ephemeral
let configuration3 = URLSessionConfiguration.background(withIdentififer: identifier)
```

Using a configuration created by `URLSessionConfiguration()` will throw a [crash](https://bugs.swift.org/browse/SR-2226). I am not quite sure if it's a bug or by intention, but I am glad it crashes. Thanks to that, we only have to deal with 3 corner cases. To manipulate the configuration, we can swizzle the getter of `.default`, `.emphemeral` and the function `.background(withIdentififer:)`. The swizzle code should be run once, when we perform the first stub.

```swift
// For demo, I only cover the case of `.default`
let swizzleDefaultSessionConfiguration: Void = {
	let m1 = class_getClassMethod(URLSessionConfiguration.self, #selector(getter: URLSessionConfiguration.default))
	let m2 = class_getClassMethod(URLSessionConfiguration.self, #selector(URLSessionConfiguration.swizzled_defaultSessionConfiguration))
	if let m1 = m1, let m2 = m2 { method_exchangeImplementations(m1, m2) }
}()

extension URLSessionConfiguration {
	@objc dyamic class function swizzled_defaultSessionConfiguration() -> URLSessionConfiguration {
		let configuration = swizzled_defaultSessionConfiguration()
		configuration.protocolClasses = [CustomURLProtocol.self] + configuration.protocolClasses!
		return configuration
	}
}
```

Now, all pieces are ready. Glue them together and enjoy!

#### Another approach

Instead of taking care of the 2 cases above, we could simply swizzle the init funtions of `URLSession`. We should swizzle the 2 initializers that take a `URLSessionConguration` as a param. The beauty of this approach is that we no longer need to register our custom class via `URLProtocol.registerClass(_:)`.

```swift
// For demo, only `URLSession.init(configuration:)` is swizzled :D
let swizzleURLSession: Void = {
    let m1 = class_getClassMethod(URLSession.self, #selector(URLSession.init(configuration:)))
    let m2 = class_getClassMethod(URLSession.self, #selector(URLSession.swizzled_init(configuration:)))
    if let m1 = m1, let m2 = m2 { method_exchangeImplementations(m1, m2) }
}()

extension URLSession {
    @objc dynamic class func swizzled_init(configuration: URLSessionConfiguration) -> URLSession {
        configuration.protocolClasses = [CustomURLProtocol.self] + configuration.protocolClasses!
        return swizzled_init(configuration: configuration)
    }
}
```

### Further discussion

P/s: TLDR (You can skip this part because details may get you distracted)

#### Questions remained

There are a couple of things I have not had reasonable explanations for.

- $P_1$. First of all, why should there be differerences between the 2 cases mentioned above? Is `URLSessionConfiguration` not enough?

- $P_2$. The documentation says [*"Classes are consulted in the reverse order of their registration"*](https://developer.apple.com/documentation/foundation/urlprotocol/1407208-registerclass), but the implementation does not seem to work that way. You could take a look at it [here](https://github.com/apple/swift-corelibs-foundation/blob/a5a248a/Foundation/URLProtocol.swift#L372) and [here](https://github.com/apple/swift-corelibs-foundation/blob/swift-4.0-branch/Foundation/URLSession/URLSessionTask.swift#L74). The consulted classes are chosen from 2 sources: `session.configuration.protocolClasses` and `URLProtocol._registeredProtocolClasses`. But there is no sign of reversion???

- $P_3$. Another thing stopping me from the deep understanding is [`NSUnimplemented()`](https://github.com/apple/swift-corelibs-foundation/blob/swift-4.0-branch/Foundation/URLSession/URLSession.swift#L204). I see it quite often, and have no idea what is actually going on behind it.

- $P_4$. How the program behaves does not exactly match the code in the [swift-corelibs-foundation repo](https://github.com/apple/swift-corelibs-foundation). For example, when first glancing at the code in `URLSessionConfiguration`, I thought the default configutaion has one item in `protocolClasses` according to the [init setup](https://github.com/apple/swift-corelibs-foundation/blob/swift-4.0-branch/Foundation/URLSession/URLSessionConfiguration.swift#L50). But the logs show 5 items (`_NSURLHTTPProtocol, _NSURLDataProtocol, _NSURLFTPProtocol, _NSURLFileProtocol, NSAboutURLProtocol`). A private class method `_defaultProtocolClasses()` was called and returned these 5 classes. Hmmm, let's not care about them.

#### Bizarre stuffs
- $P_5$. A strange thing is that `URLSession.init(configuration:)` and `URLSession.init(configuration:delegate:delegateQueue:)` turn out to be class methods, not instance methods. P/s: we could get the instance methods and class methods using this api: [`class_copyMethodList(_:_:)`](https://developer.apple.com/documentation/objectivec/1418490-class_copymethodlist).<br>
<br>After a while investigating, I notice that initializers that have `/*not inherited*/` in their function signatures (in Apple github) all have the same phenomenon. Also, when subclassing it, these functions are not applicable to be overriden (like what the comment implies), but it is still visible to the invocations. My doubt is that when the framework is built, they are transformed to:<br><br>
```swift
	class func `init`(configuration: URLSessionConfiguration) -> URLSession { ... }
```
I tried to simulate this situation with a custom class. The logs show a similar result. However, when subclassing that class, Xcode keeps failing to compile due to not being able to check the subclass type. So I think my suspicion is not quite correct, but it's still reasonable to me :). Anyway, that's not a big deal!


Finally, if a stubbing framework is what you are looking for, [Mockingjay](https://github.com/kylef/Mockingjay) is my recommendation :D.

### Reference
[1] [Mockingjay source code](https://github.com/kylef/Mockingjay)<br>
[2] [NSURLProtocol Tutorial by Ray Wenderlich](https://www.raywenderlich.com/59982/nsurlprotocol-tutorial)<br>
[3] [Swift core libraries: swift-corelibs-foundation](https://github.com/apple/swift-corelibs-foundation)

