---
layout: post
comments:	true
title:  "Method dispatch in Swift"
date:   2017-09-25 00:00:00
summary:    "Method dispatch is a term referring to mechanisms by which the program determines which operation should be executed (by operation, I mean a set of instructions). There are times we expect a method behavior to be determined only at runtime. This motivation give rise to different mechanisms of dispatching a method, each of which has its own pros and cons."
tags:   ios swift programming method-dispatch optimization
categories:	[Tech]
---

<!-- toc -->

- [Static dispatch](#static-dispatch)
- [Dynamic dispatch](#dynamic-dispatch)
	- [Table dispatch](#table-dispatch)
	- [Message dispatch](#message-dispatch)
- [Swift: What is what?](#swift-what-is-what)
	- [Methodology to determine dispatch mechanism](#methodology-to-determine-dispatch-mechanism)
	- [Trivial cases](#trivial-cases)
	- [Other cases](#other-cases)
	- [What are the principles?](#what-are-the-principles)
- [Conclusion](#conclusion)
- [Reference](#reference)

<!-- /toc -->

Method dispatch is a term referring to mechanisms by which the program determines which operation should be executed (by operation, I mean a set of instructions). There are times we expect a method behavior to be determined only at runtime. This motivation give rise to different mechanisms of dispatching a method, each of which has its own pros and cons.

### Static dispatch

- Sometimes called *direct dispatch*.
- If a method is statically dispatched, the compiler could be able to locate where the instructions are, at compile time. Therefore, when such function is called, the system jumps directly to the memory address of this function to perform the operation. This direct behavior results in very fast execution, and also allows the compiler to perform various kinds of optimizations such as inlining. In fact, due to the huge performance gains, there is a phase in the compilation pipeline in which the compiler attempts to make functions static if applicable. This optimization is known as **devirtualization**.

### Dynamic dispatch
- With this approach, the program does not know which implementation to choose until runtime.
- While *static dispatch* is super lightweight, it limits flexibility, especially when it comes to polymorphism. That is why *dynamic dispatch* is widely supported by OOP languages.
- Every language has its own mechanisms to support dynamic dispatch. Swift provides 2 ways to achieve dynamism: **table dispatch** and **message dispatch**.

#### Table dispatch
- This is the most common choice provided in compiled languages. With this method, a class is associated with a so-called **virtual table** which comprises an array of function pointers to the real implementation correponding to that class.
- Note that the vtable is constructed at compile time. Thus, there are only two additional instructions (read and jump) as compared to static dispatch. So the dispatch should be theoretically pretty fast.

#### Message dispatch

- In fact, it is Objective-C that provides this mechanism (sometimes, it is referred as [*message passing*](https://en.wikipedia.org/wiki/Message_passing)) and Swift code just uses the Objective-C runtime lib. Every time an Objective-C method is called, the invocation is passed to `objc_msgSend` which handles the look ups. Technically, the process starts from the given class and iterates the class hierarchy to pull out the implementation.
- Unlike table dispatch, the *message passing dictionary* could be modified at runtime, enabling us to adjust the program behaviors while running. Method swizzling is one of the most popular technique, by taking advantage of this special feature.
- *Message dispatch* is the most dynamic among the three. As a trade off, the cost of resolving implementation could be a little expensive though the lookup performance is guarded by caching mechanism.
- This mechanism is a keystone of Cocoa frameworks. Looking at the source of code Swift, you will see that KVO is implemented using swizzling.

### Swift: What is what?

> Given a function, what kind of dispatch is it using? Where is the proof?

#### Methodology to determine dispatch mechanism

As a skeptic, I am more interested in the second part of the question. It is easy to come up with a hypothesis but testing it is not straightforward all the time. After hours googling, I happened to know the [SIL documentation](https://github.com/apple/swift/blob/master/docs/SIL.rst) which reasonably explains the presence of dispatch strategies. Here is a brief summary:

(1) If a function uses table dispatch, it appears in the `vtable` (or `witness_table` for protocols).

```
sil_vtable Animal {
	#Animal.makeSound!1: (Animal) -> () -> () : main.Animal.makeSound() -> ()	// Animal.makeSound()
  ......
}
```

(2) If a function is dispatched via message, the keyword `volatile` should be present in the invocation. Also, you will find the two marker `foreign` and `objc_method`, indicating that the function is invoked using Objective-C runtime. Refer: [here](https://github.com/apple/swift/blob/master/docs/SIL.rst#dynamic-dispatch).

```
%14 = class_method [volatile] %13 : $Dog, #Dog.beWild!1.foreign : (Dog) -> () -> (), $@convention(objc_method) (Dog) -> () // user: %15
```

(3) If there is no evidence of the two cases above, the answer is *static dispatch*.

<!-- As the SIL is usually lengthy, you are recommended to read it yourself. -->

#### Trivial cases

- First of all, functions of structs or any value types must be statically dispatched. This makes sense because they could never be overriden.
- Explicitly enforced: 
	- Functions with `final` keyword are also statically dispatched.
	- Functions with `dynamic` are invoked via message passing. Piror to Swift 4, a function with `dynamic` modifier is implicitly visible to Objective-C. Meanwhile Swift 4 requires you to explicitly declare it with `@objc` attribute.
- Ordinary extensions (without `final`, `dynamic`, `@objc`) are directly dispatched. Now, recall a compiled error you may once experienced: *declarations in extensions cannot override yet*. It's because those functions, of course, follow static dispatch.<br>
You may ask: *"What if I make those extensions dynamic?"*. You got the point! If an extension is dynamic, it can be overriden 😇.

```swift
extension Animal {
	func eat() { }
	@objc dynamic func getWild() { }
}
class Dog: Animal {
	override func eat() { }	// Compiled error!
	@objc dynamic override func getWild() { }	// Ok :)
}
```

#### Other cases

```swift
protocol Noisy {
	func makeNoise() -> Int	// TABLE
}
extension Noisy {
	func makeNoise() -> Int { return 0 }	// TABLE
	func isAnnoying() -> Bool { return true }	// STATIC
}
class Animal: Noisy {
	func makeNoise() -> Int { return 1 }	// TABLE
	func isAnnoying() -> Bool { return false } // TABLE
	@objc func sleep() { }	// Still TABLE
}
extension Animal {
	func eat() { }	// STATIC
	@objc func getWild() { }	// MESSAGE
}
```

- `Noisy.isAnnoying()`, and `Animal.getWild()` are statically dispatched since they are extensions.
- `Noisy.makeNoise()` uses table dispatch despite having the default implementation.
- We have to be careful with `isAnnoying()`. Consider the two usages below. `animal2.isAnnoying()` picks the implementation of the protocol extension (because it's a direct method and no lookup is needed). Using in such way could be a source of bugs 😱.

```swift
let animal1 = Animal()
print(animal1.isAnnoying())	// Value: false
let animal2: Noisy = Animal()
print(animal2.isAnnoying())	// Value: true
```
- On the other hand, `animal1.makeNoise()` and `animal2.makeNoise()` produce the same result because protocol requirements are resolved by table lookups.
- The `@objc` annotation in `@objc func sleep()` means that the function is visible to Objective-C. It does not necessarily imply that the process will choose the Objective-C method to execute. From the SIL of the function call (see below), we could see the term `$@convention(method)` which implies that the Swift method is chosen over the objc method.

```
%9 = class_method %8 : $Animal, #Animal.sleep!1 : (Animal) -> () -> (), $@convention(method) (@guaranteed Animal) -> () // user: %10
```

#### What are the principles?

- *Direct dispatch* is prioritized.
- If overriding is needed, *table dispatch* is the next candidate.
- Need both overriding and visibility to Objective-C? Then *message dispatch*.

Another key take-away is that explicity is better. Implicit inference (like extensions with `@objc`) is subject to change.

Here is the summary of some common cases. You are recommended to double check by reading the SIL generated.

|					| Direct 			| Table 				| Message 				|
|---				|:---:				|:---:					|:---:					|
| **Explicitly enforced** | `final`, `static` |	---				| `dynamic`				|
| **Value type** 	| all methods 		| ---					| ---					|
| **Protocols**		| extensions		| initial declaration 	| ---					|
| **Class**			| extensions		| initial declaration 	| extensions with `@objc` |

<figcaption><i>Table 1</i>. Summary of method dispatch in Swift (reading from top to bottom). Note that some cases such as <i>class extensions with</i> <code>@objc dynamic</code> is already mentioned aboved in <i>explicitly enforced</i>. Many blog posts divide classes into 2 groups: NSObject subclasses vs. (regular) classes. Though NSObject inherits a number of methods that were written on top of Objective-C runtime, I see no reason to separate them.
</figcaption>

### Conclusion
In this post, we got to know what method dispatch is and different types of dispatch in Swift. We dived into some examples to understand how Swift resolves a specific function. Also, by reading the SIL, we could be able to collect proofs for an assumption on which dispatch a function should follow.

- *Static dispatch* is greate because of its performance. That is why Swift is swift (as compared to Objective-C, a dynamic language).
- While *message dispatch* seems to be less performant, it offers great flexibility enabling a bunch of cool techniques.
- Understanding *method dispatch* is vitally important. Not only does it help you write more optimized code but also you could avoid a few strange bugs.
- Among these mentioned above, we have put aside the optimization of the compiler. The capacity of the code to be optimized depends greatly on how we write code :).

Finally, things might be different in later Swift versions. Don't forget to check the validity of this post 😇.

### Reference

[1] [Method Dispatch in Swift - by Brian King](https://www.raizlabs.com/dev/2016/12/swift-method-dispatch)<br>
[2] [The Case for Message Passing in Swift - by Michael Buckley](http://www.buckleyisms.com/home/2014/6/16/the-case-for-message-passing-in-swift.html)<br>
[3] [\[swift\] Dynamic keyword - by Srdan](https://dev.srdanstanic.com/ios/swift/2017/02/10/swift-dynamic-keyword)<br>
[4] [Swift Intermediate Language (SIL)](https://github.com/apple/swift/blob/master/docs/SIL.rst)<br>
[5] [Friday Q&A 2014-07-04: Secrets of Swift's Speed](https://www.mikeash.com/pyblog/friday-qa-2014-07-04-secrets-of-swifts-speed.html)<br>
[6] [The Swift Programming Language (Swift 4): Declaration Modifiers](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration-modifiers)<br>


