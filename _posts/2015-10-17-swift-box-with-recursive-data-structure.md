---
layout: post
title:  "Swift: Box with recursive data structure"
date:   2015-10-17 00:00:00
summary:    "A workaround to model recursive data structure with enum"
tags:   ios
---

*Note: This code is written in Swift 1.2 and not yet validated in Swift 2.0*

Despite that value types in general (and *enum/struct* in particular) bring a
lot of advantages, there are several limitations remaining. In particular:
- Both enum and struct do not support **recursive** data structure
- Enum with a **type-parameterized** case is not allowed

And Box is a micro framework to deal with the painful facts above.

### Why?

First of all, lets find out the reasons for fact 1 and fact 2. We shall begin
with an example: _implementing a very familiar data struct: `LIST`_.

A list could consist of a head and a tail, which is also a list. A list could be
nothing as well.

<img src = "/assets/ios/list_recursive_ds.png">

Unfortunately, this code throws a compiler error. In fact, when XCode allocates
memory for `List<Int>` — for example, it couldn’t estimate how much is enough
for `Cons(Int, List<Int>)` because it does not yet figure out the memory
capacity for `List<Int>` in `Cons(Int, List<Int>)`.

Secondly, it does not accept a type-parameterized associated value: `Cons(T,
List<T>)`. ← For this, I still don’t know why.

### How to overcome?

Luckily, `Box` is coming for the rescue. The idea is very simple: *make it
non-recursive, non-type-paramaterized* by using another data structure.
The new data structure’s responsibility is wrapping the value in a box. And when
you need the value, just unwrap the box.

```swift
class Box<T> {
    var value: T
    init(_ value: T) {
        self.value = value
    }
}

enum List<T> {
    case Cons(Box<T>, Box<List<T>>)
    case Nil
    
    init(_ head: T, _ tail: List<T>) {
        self = Cons(Box(head), Box(tail))
    }
}
```

By this, `List<T>` is not recursive anymore. *But of course, it’s still
logically a recursion :D*. The compiler won’t complain about the memory
allocation problem because it can estimate how much memory a box takes.

### Other examples

If you use `ReactiveCocoa 3.0`, you will see `Box` as a submodule
of it. In fact, `RAC 3.0` includes another submodule called `Result`. This
micro framework also use `Box`, too.

```swift
/// This is excerpted from the framework Result
/// Ref: https://github.com/antitypical/Result/blob/swift1.2/Result/Result.swift

public enum Result<T, Error>: Printable, DebugPrintable {
	case Success(Box<T>)
	case Failure(Box<Error>)
	...
}

/// This is excerpted from the framework ReactiveCocoa
/// Ref: https://github.com/ReactiveCocoa/ReactiveCocoa/blob/swift-1.2/ReactiveCocoa/Swift/Event.swift
public enum Event<T, E: ErrorType> {
	/// A value provided by the signal.
	case Next(Box<T>)
	case Error(Box<E>)
	case Completed
	case Interrupted
  ...
}
```

Now you can define your own recursive data structure using this trick.


The full demonstration can be found [here](https://gist.github.com/trinhngocthuyen/11a6b08f103999f352da).

<u>Updated:</u>
Swift 2.1 has come with the support for recursive enums. Bravo! [Checkout the keyword: `indirect`]([https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Enumerations.html).


Have fun!