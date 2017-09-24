---
layout: post
comments:	true
title:  "How a Swift file is compiled"
date:   2017-09-23 00:00:00
summary:    "First of all, this is not \"how an iOS/MacOS app is built\". An app consists of a bunch of source code files, structured in modules/frameworks, each of which could be purely in swift/objective-c, or mixed and match..."
tags:   ios swift compiler
categories:	[Tech]
---

<!-- TOC -->

- [Compilation pipeline](#compilation-pipeline)
- [Swift Intermediate Language \(SIL\)](#swift-intermediate-language)
  - [Name mangling](#name-mangling)
  - [Make SIL more readable](#make-sil-more-readable)
  - [A walk through SIL syntax](#a-walk-through-sil-syntax)
- [Conclusion](#conclusion)
- [Reference](#reference)

<!-- /TOC -->

First of all, this is not "how an iOS/MacOS app is built". An app consists of a bunch of source code files, structured in modules/frameworks, each of which could be purely in swift/objective-c, or mixed and match. Besides, linking those modules is also another aspect. [The two terms *compiling* and *building* should not be confused!](https://stackoverflow.com/questions/15198725/build-or-compile)

This post is about how the compiler translates a single Swift file into lower-level code. In other words, we are interested in what happens when we run this command: 
```xcrun swiftc main.swift```


### Compilation pipeline

![png](assets/ios/swift_build_pipeline.png)
<figcaption>Source: http://llvm.org/devmtg/2015-10/slides/GroffLattner-SILHighLevelIR.pdf</figcaption>

[1] **Parse**. First, the compiler parses the source code and build the [Abstract syntax tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree). We could see the AST by the option `-dump-ast`:

```xcrun swiftc -dump-ast main.swift```

Semantic analysis could be performed when the AST is constructed.

[2] **SILGen**. Generate the Swift intermediate language. To get the SIL after this phase:

```xcrun swiftc -emit-silgen main.swift```

[3] **SIL Optimizations**. Perform some performance optimizations on the SIL generated.

```xcrun swiftc -emit-sil main.swift```

[4] **IR**. Generate the LLVM Intermediate representation. You can examine the IR by:

```xcrun swiftc -emit-ir main.swift```

[5] **Code Generation**. LLVM generates the assembly code and finally produces lower-level code (.o, executable...). To view the assembly:

```xcrun swiftc -S main.swift```


### Swift Intermediate Language (SIL)

#### Name mangling

My first look at the SIL was like "omg. what the heck is \_T04main6AnimalC9makeSoundyyF?". But it's not as scary as you thought.

```
// Animal.makeSound()
sil hidden @_T04main6AnimalC9makeSoundyyF : $@convention(method) (@guaranteed Animal) -> () {
// %0                                             // user: %1
bb0(%0 : $Animal):
  debug_value %0 : $Animal, let, name "self", argno 1 // id: %1
  %2 = tuple ()                                   // user: %3
  return %2 : $()                                 // id: %3
} // end sil function '_T04main6AnimalC9makeSoundyyF'
```
***Name mangling*** is used to squash additional information of an entity into a single string. The encoded name could tell us its type (class/struct/enum), module, context... For example, in `_T04main6PersonVACycfC`, the letter `V` following `Person` implies that `Person` is a struct. We won't dive into the detail of this technique. For more info, you could read [here](https://github.com/apple/swift/blob/master/docs/ABI/Mangling.rst).

#### Make SIL more readable
We could trace a mangled string back to the originally readable text using `swift-demangle`
```
xcrun swift-demangle _T04main6AnimalC9makeSoundyyF
// Output: _T04main6AnimalC9makeSoundyyF ---> main.Animal.makeSound() -> ()
```

In short, more friendly SIL could be obtained by:

```xcrun swiftc -emit-silgen main.swift | xcrun swift-demangle```

```
// Animal.makeSound()
sil hidden @main.Animal.makeSound() -> () : $@convention(method) (@guaranteed Animal) -> () {
// %0                                             // user: %1
bb0(%0 : $Animal):
  debug_value %0 : $Animal, let, name "self", argno 1 // id: %1
  %2 = tuple ()                                   // user: %3
  return %2 : $()                                 // id: %3
} // end sil function 'main.Animal.makeSound() -> ()'
```

#### A walk through SIL syntax

Consider this simple code:

```swift
struct Person { }
class Animal {
  func makeSound() { }
}

func isEndangered(animal: Animal) -> Bool { return false }

class Dog: Animal {
  override func makeSound() { }
  func doSimpleMath(x: Int, y: Int) -> Int { return x + y }
  func makeFriends(animal: Animal, person: Person) { }
}
```

Let's look at the SIL and demystify some basic syntax. I strongly recommend this [official documentation](https://github.com/apple/swift/blob/master/docs/SIL.rst) for full details.

```
// Animal.makeSound()
sil hidden @main.Animal.makeSound() -> () : $@convention(method) (@guaranteed Animal) -> () {
// %0                                             // user: %1
bb0(%0 : $Animal):
  debug_value %0 : $Animal, let, name "self", argno 1 // id: %1
  %2 = tuple ()                                   // user: %3
  return %2 : $()                                 // id: %3
} // end sil function 'main.Animal.makeSound() -> ()'
```
- A function starts with keyword `sil`. 
- The keyword `hidden` corresponds to `internal` in Swift code, indicating that this function is only visible to objects in the same Swift module.
- `@main.Animal.makeSound() -> ()` is the demangled text of `_T04main6AnimalC9makeSoundyyF`, representing the function name.
- `$@convention(method)` means: a call to this function requires a context. For example, in `self.makeSound()`, `self` is the context of the function call.
- `$@convention(thin)` says: this is a free function. No context is needed to make an invocation.

```
sil hidden @main.Dog.makeFriends(animal: main.Animal, person: main.Person) -> () : $@convention(method) (@owned Animal, Person, @guaranteed Dog) -> () {
......
```
- If the argument is reference type, an annotation `@owned` is attached.

```
......
  debug_value %0 : $Int, let, name "x", argno 1   // id: %3
  debug_value %1 : $Int, let, name "y", argno 2   // id: %4
  debug_value %2 : $Dog, let, name "self", argno 3 // id: %5
  // function_ref static Int.+ infix(_:_:)
  %6 = function_ref @static Swift.Int.+ infix(Swift.Int, Swift.Int) -> Swift.Int : $@convention(method) (Int, Int, @thin Int.Type) -> Int // user: %8
  %7 = metatype $@thin Int.Type                   // user: %8
  %8 = apply %6(%0, %1, %7) : $@convention(method) (Int, Int, @thin Int.Type) -> Int // user: %9
  return %8 : $Int                                // id: %9
......
```
- A function call is made by taking the function pointer (`function_ref`) and applying it with arguments. 
- Each instance method requires a metatype as an argument at the end of the invocation.


```
sil_vtable Animal {
  #Animal.makeSound!1: (Animal) -> () -> () : main.Animal.makeSound() -> ()	// Animal.makeSound()
  ......
}

sil_vtable Dog {
  #Animal.makeSound!1: (Animal) -> () -> () : main.Dog.makeSound() -> ()	// Dog.makeSound()
  #Dog.doSimpleMath!1: (Dog) -> (Int, Int) -> Int : main.Dog.doSimpleMath(x: Swift.Int, y: Swift.Int) -> Swift.Int	// Dog.doSimpleMath(x:y:)
  #Dog.makeFriends!1: (Dog) -> (Animal, Person) -> () : main.Dog.makeFriends(animal: main.Animal, person: main.Person) -> ()	// Dog.makeFriends(animal:person:)
  ......
}
```
- Each class has a [virtual table](https://en.wikipedia.org/wiki/Virtual_method_table) `vtable` in order for the compiler to lookup the correct method to execute in runtime (if it's dynamically dispatched). We will talk about method dispatch in the upcoming posts.


### Conclusion

In this post, we took a glance into the pipeline in which Swift code is compiled. We also looked into the SIL, a high-level intermediate language Apple came up with for analysis and optimization of Swift code.

From the perspective of a practical developer, this topic does not help us write clean code or overwhelming design patterns. Despite that, it helps you understand (just a tiny bit) what the code is actually going on under the hood, and... thereby less scared when reading lower-level interpretations of the code. By reading these stuffs, we could figure out some specific patterns that are at the core principles of the language.

### Reference

[1] [Official documentation: Design of SIL](https://github.com/apple/swift/blob/master/docs/SIL.rst)<br>
[2] [Swift's High-Level IR: A Case Study of Complementing LLVM IR with Language-Specific Optimization](https://llvm.org/devmtg/2015-10/#talk7)<br>
[3] [Introduction to Swift Intermediate Language — Alex Blewitt](https://www.youtube.com/watch?v=NH-qIKOoKgA)



