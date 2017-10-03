---
layout: post
comments:	true
title:  "FAQ on ReactiveCocoa"
date:   2017-02-25 00:00:00
summary:    "This post highlights some Q&A related to ReactiveCocoa - a FRP framework specifically built for iOS."
tags:   ios
categories: [Tech]
---

### Table of Contents
* [Fundamental Concepts](#fundamental-concepts)
  * [Q: What is ReactiveCocoa?](#q-what-is-reactivecocoa)
  * [Q: What is ReactiveSwift?](#q-what-is-reactiveswift)
  * [Q: What can we do with ReactiveCocoa?](#q-what-can-we-do-with-reactivecocoa)
  * [Q: What is a stream?](#q-what-is-a-stream)
  * [Q: What can be considered a stream?](#q-what-can-be-considered-a-stream)
  * [Q: What aspects of streams should we care about?](#q-what-aspects-of-streams-should-we-care-about)
  * [Q: What alternatives could we have for RAC?](#q-what-alternatives-could-we-have-for-rac)
  * [Q: When should we use it?](#q-when-should-we-use-it)
* [Signal and SignalProducer](#signal-and-signalproducer)
  * [Q: What is Signal? What is SignalProducer?](#q-what-is-signal-what-is-signalproducer)
  * [Q: I created a SignalProducer, I added some observers, but none of them are executed. What happened?](#q-i-created-a-signalproducer-i-added-some-observers-but-none-of-them-are-executed-what-happened)
  * [Q: It's hard to debug with RAC. How to troubleshoot issues effectively?](#q-its-hard-to-debug-with-rac-how-to-troubleshoot-issues-effectively)
* [Operators](#operators)
  * [Q: What's the difference between the 2 operators "then" and "flatMap"?](#q-whats-the-difference-between-the-2-operators-then-and-flatmap)
  * [Q: How to cancel a SignalProducer (from the outside)?](#q-how-to-cancel-a-signalproducer-from-the-outside)

### Fundamental Concepts

#### Q: What is ReactiveCocoa?
ReactiveCocoa is an FRP (Functional Reactive Programming) framework particularly used for iOS. FRP = **reactive programming** built on the components of **functional concepts**.

- Reactive programming is [programming with asynchronous data streams](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754){:.ga-link}.
- Functional concepts: *high-order functions, monads, functors, function compositions, natural transformation (map, filter, reduce...)... (You do not need to digest & comprehend it now)*.

References:

- Github: ReactiveCocoa: https://github.com/ReactiveCocoa/ReactiveCocoa
- Github: ReactiveSwift: https://github.com/ReactiveCocoa/ReactiveSwift
- Framework overview: https://github.com/ReactiveCocoa/ReactiveSwift/blob/master/Documentation/FrameworkOverview.md
- Design guidelines: https://github.com/ReactiveCocoa/ReactiveSwift/blob/master/Documentation/DesignGuidelines.md

P/s: For convenience, we sometimes use the abbreviation RAC to refer to ReactiveCocoa.

#### Q: What is ReactiveSwift?
Prior to RAC 5.0, there had been only 1 module ReactiveCocoa to contain the whole source code. In RAC 5.0, they separated the **core components** to a new module called ReactiveSwift. And ReactiveCocoa now acts as a **wrapper** of reactive concepts with Cocoa frameworks (in order to work with NSObject, UI classes, binding stuff...).

P/s: In this page, when I mention RAC, I implicitly mean the 2 modules (ReactiveCocoa & ReactiveSwift) as a whole. Just forget the separation in this FAQ.

#### Q: What can we do with ReactiveCocoa?
Using RAC, we could eliminate some old-fashioned technology stacks/programming patterns:

- Observer pattern
- Delegate pattern
- Closures/callbacks

Additionally, RAC could help us save a lot effort to implement:

- Binding
- Task management

#### Q: What is a stream?
> [A stream is a sequence of ongoing events ordered in time](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754){:.ga-link}.

#### Q: What can be considered a stream?
**Anything!** From now on, you have to keep in mind that **everything can be a stream**.

- The data downloaded from server
- The state of DB
- The event user taps on the screen
- ...

Again, remember, everything can be a stream. Let your mind free (big grin)

#### Q: What aspects of streams should we care about?
We should care about the life cycle of a stream:

- Stream is created & **started**
- Stream received a success with a **value**
- Stream received a **failure**
- Stream **completed**
- Stream is **disposed**

![Alt text](https://camo.githubusercontent.com/36c0a9ffd8ed22236bd6237d44a1d3eecbaec336/687474703a2f2f692e696d6775722e636f6d2f634c344d4f73532e706e67){:.ga-link}

Besides, we should acknowledge some operations on streams:

- Transform a stream
- Compose streams: combine/zip/merge 2 streams, forward events of a stream to another stream, start a new stream on an event

Note that streams are immutable (a basic principle in Functional Programming). Therefore, operations on streams always return a new stream. For ex: the code bellow will return another `SignalProducer`: `stringProducer.filter { !$0.isEmpty }`

#### Q: What alternatives could we have for RAC?
RxSwift is a really qualified candidate. It commenced later than RAC but it has been drawing much attention. From my observation, brand new projects tend to adopt RxSwift due to the active community. Besides, this community also ports the FRP to other platforms (Go, Android, .NET...), therefore, the contribution is more actively.

Btw, there is an article explaining why they upgrade their project from RAC 2.x → RxSwift. It's worth a look: http://artsy.github.io/blog/2015/12/08/reactive-cocoa-to-rxswift/

#### Q: When should we use it?
We could use it aggressively in different use cases. Here are some that I always prefer RAC:

- Async tasks with **callbacks**
- Handle **complicated workflows** that need *retry, timeout, cancellation*...
- Get tired using **delegates**
- **Binding** things

### Signal and SignalProducer

#### Q: What is Signal? What is SignalProducer?
`Singal` and `SignalProducer` are 2 implementations of streams. The bare difference between them is that `Signal` represents **hot observable** while `SignalProducer` refers to **cold observable**. I personally prefer `SignalProducer` over `Signal`.

#### Q: I created a SignalProducer, I added some observers, but none of them are executed. What happened?
Perhaps you forgot to start the producer. We need to start it manually, it's cold observable, remember?

#### Q: It's hard to debug with RAC. How to troubleshoot issues effectively?
The easiest way which I often use is printing log to verify if a value arrived, (or) the stream completed, (or) any error occurred... Well, RAC provides a built-in function `logEvents` for debugging. You could also write your own functions :D

```swift
let loginProducer = login(email: email, password: password)
  .logEvents(identifier: "--- Login", events: [.started, .value, .completed, .failed])
let signupProducer = signup(email: email, password: password)
  .logWhenStarted("--- Signup. Started")
  .logWhenNext({"--- Signup. Next: \($0)"})
  .logWhenFailed({"--- Signup. Failed with error: \($0)"})
```

### Operators

#### Q: What's the difference between the 2 operators "then" and "flatMap"?
Now we compare the 2 implementations. Assume that we do not care about the returned values of the producer. Given that: `downloadUrl1()` and `downloadUrl2()` is of type `SignalProducer<Void, NSError>`

```
Impl 1:	// Using `then`
    downloadUrl1().then(downloadUrl2())	
Impl 2:	// Using `flatMap`
    downloadUrl1.flatMap(.latest) { _ in downloadUrl2() }
```

- The operator `then` triggers on event completed: `downloadUrl2()` starts  when `downloadUrl1()` completes
- The operator `flatMap` triggers on event value: `downloadUrl2()` starts when `downloadUrl1()` receives a value

Discussion: As a best practice, for this kind of download, we often call `sendCompleted()` immediately after `sendNext()`. So basically, the 2 implementations above are considered the same.

#### Q: How to cancel a SignalProducer (from the outside)?
Manually dispose of the producer

```swift
let disposable = producer.start()	// Starting a producer returns a disposable
...
// You manually dispose it by calling .dispose()
disposable.dispose()	
...
// You could also add it to a parent composite disposable.
// When the parent is disposed, it triggers disposing of the attached disposables
parentCompositeDisposable.add(disposable)	
```

Or trigger by another signal/producer, like this
```swift
producer.take(until: cancelProducer)	// cancelProducer = cancelButton.rac_tap
```

