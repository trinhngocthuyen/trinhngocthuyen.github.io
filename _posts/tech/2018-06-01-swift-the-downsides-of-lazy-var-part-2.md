---
layout: post
comments:	true
title:  "Swift: The downsides of lazy var (part 2)"
date:   2018-06-01 00:00:00
summary:    "Continue from the previous post, we will look into a few problems when working with lazy var..."
tags:   ios swift
categories:	[Tech]
---

Continue from the [previous post](/2018-05-31-swift-the-downsides-of-lazy-var-part-1.html), we will look into a few problems when working with lazy var.

### Problems

#### Problem 1: not working smoothly with structs

Since the getter of lazy var is mutating, using it with structs sometimes requires extra work. For example, this code below does not compile:

```swift
struct Person {
	private lazy var name = "thuyen"
	var alias: String { return name } 	// error: Cannot use mutating getter on immutable
}
```

To make this code work, we have to explicitly declare `getter` of `alias` as `mutating`. But personally, I would rather not make an object mutable just in order to access a specicic property.

```swift
struct Person {
	private lazy var name = "thuyen"
	var alias: String {
		mutating get { return name }
	}
}
```

Another approach is to wrap lazy var inside a class `LazyBox`, like in [this article](https://oleb.net/blog/2015/12/lazy-properties-in-structs-swift). We will later use this approach as we can handle more issues such as concurrency.

```swift
final class LazyBox<T> {
	private var _value: T?
	private let compute: () -> T
	init(_ compute: @escaping () -> T) {
		self.compute = compute
	}

	var value: T {
		if let _value = _value { return _value }
		let v = compute()
		_value = v
		return v
	}
}

struct Person {
	private let _name = LazyBox<String> { "thuyen" }
	var alias: String { return _name.value }
}
```

#### Problem 2: concurrency

Another problem is that `lazy var` is not thread-safe which means the closure can get executed multiple times due to accesses from different threads. This is also mentioned in the Apple documentation:
> If a property marked with the `lazy` modifier is accessed by multiple threads simultaneously and the property has not yet been initialized, there is no guarantee that the property will be initialized only once.

To prevent race condition, a simple implementation is to lock every read to the value:

```swift
final class LazyBox<T> {
	private let lock: Synchronizing = NSLock()
	private lazy var _lazyValue: T = compute()
	...
	var value: T {
		return lock.sync { _lazyValue }
	}
}
```

```swift
extension Locking {
	func lock()
	func unlock()
}

protocol Synchronizing {
	func sync<T>(execute: () throws -> T) rethrows -> T
}

extension Locking {
	func sync<T>(execute: () throws -> T) rethrows -> T {
		defer { unlock() }
		lock()
		return try execute()
	}
}

// Let's use NSLock for simplicity. Alternatives: DispatchQueue, pthread_mutex_t, semaphore...
extension NSLock: Locking, Synchronizing { }
```

Now, it works as expected. However, the computation should only occur in the first read access. Locking every read will hurt performance a bit. Therefore, a better implementation is to lock the computation instead.

```swift
final class LazyBox<T> {
	...
	var value: T {
		if let _value = _value { return _value }
		return lock.sync {
			// Perform computation here
			...
		}
	}
}
```

Note that performing computation more than once is still fine as long as they are synchronous and later computation reuses the result of previous ones.
We know for sure that in the next execution inside `lock.sync`, we definitely have `_value` computed. Then we can reuse that result, like this:

```swift
final class LazyBox<T> {
	...
	var value: T {
		if let _value = _value { return _value }
		return lock.sync {
			// Check again if the value is already computed (from the first one get called)
			if let _value = _value { return _value }
			let v = compute()
			_value = v
			return v
		}
	}
}
```

### Benchmark

I ran a performance test for the two implementations (locking computation only vs. locking every read). 
The result shows a significant performance gain for the former one (0.002s as compared to 0.065s). The code for the benchmark can be found [here](https://gist.github.com/trinhngocthuyen/c51e4025658510b63f28b30596714f55).
