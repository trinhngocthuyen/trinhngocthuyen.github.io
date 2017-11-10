---
layout: post
comments:	true
title:  "Method Swizzling: What, Why and How"
date:   2017-10-20 00:00:00
summary:    "Method swizzling is a very powerful technique that takes advantage of dynamism. The core idea of this technique is to replace the real implementation of a method at runtime. With this power, we could be able to do a lot of cool stuffs. Actually, this special feature is offered by the Objective-C runtime, via message dispatch."
tags:   ios swift dynamism swizzle
categories:	[Tech]
---

<!-- MarkdownTOC -->

- [What is Method swizzling?](#what-is-method-swizzling)
- [Why does it matter?](#why-does-it-matter)
- [How to swizzle a method?](#how-to-swizzle-a-method)
- [A look at NSKeyValueObservation](#a-look-at-nskeyvalueobservation)

<!-- /MarkdownTOC -->



### What is Method swizzling?

*Method swizzling* is a very powerful technique that takes advantage of dynamism. The core idea of this technique is to replace the real implementation of a method at runtime. With this power, we could be able to do a lot of cool stuffs.

Actually, this special feature is offered by the Objective-C runtime, via message dispatch. You could read my [previous post](/2017-09-25-method-dispatch-in-swift){:.ga-link} to have a clear picture of method dispatch in Swift.



### Why does it matter?

A very common case study of this is integrating analytics in your app. Take Google Analytics (GA) for example, each time user enters a screen, the app should call the GA APIs for page views tracking. 

One could implement it simply by making GA requests once the method `viewWillAppear` of each view controllers is invoked.

However, there could be up to hundreds of view controllers in the app. Manually calling GA APIs in each controller is apparently ineffective although it only costs just a single line of code. Another drawback is that it is hard to control which one is missing. Also, you have limited ability to hook into the code of 3rd party libraries if necessary.

The problem appears to be quite simple with *method swizzling*. All you have to do is to write a custom function `_tracked_viewWillAppear` then swap it with the original function `viewWillAppear`. I will talk in detail later.



### How to swizzle a method?
The magic function you need to remember is [`method_exchangeImplementations`](https://developer.apple.com/documentation/objectivec/1418769-method_exchangeimplementations){:.ga-link}: 

```swift
func method_exchangeImplementations(_ m1: Method, _ m2: Method)
```

As the name reflects, the implementations of `m1` and `m2` get swapped after calling this function (if the exchange is successful). It means that an invocation to `m1` actually executes the code inside `m2` and vice versa.

```swift
let selector1 = #selector(UIViewController.viewWillAppear(_:))
let selector2 = #selector(UIViewController._swizzled_viewWillAppear(_:))
let method1 = class_getInstanceMethod(UIViewController.self, selector1)!
let method2 = class_getInstanceMethod(UIViewController.self, selector2)!
method_exchangeImplementations(method1, method2)
```

This is what the function `_swizzled_viewWillAppear` looks like:
```swift
extension UIViewController {
    @objc dynamic func _swizzled_viewWillAppear(_ animated: Bool) {
        NSLog("Enter screen: \(type(of: self))")
        _swizzled_viewWillAppear(animated)
    }
}
```

When `viewWillAppear` is called, the system runs the code inside `_swizzled_viewWillAppear` instead. In this function, a recursive call is made which ends up executing the implementation of the original `viewWillAppear`. In short, when the view is about to be displayed, the program prints a log, for example, `Enter screen: LoginViewController` and does what it is supposed to do.

Notice:
- In order to swizzle successfully, the methods must be dynamically dispatched via message. So, we explicit declare it with `dynamic` keyword. Of course, at times you don't necessarily need that keyword to make it dynamic :D.
- The swizzling action for a pair of methods should only run once.


### A look at NSKeyValueObservation
Look at the implementation of [`NSKeyValueObservation`](https://github.com/apple/swift/blob/master/stdlib/public/SDK/Foundation/NSObject.swift){:.ga-link}. Have you seen any swizzling 😎?

```swift
class Person: NSObject {
    @objc dynamic var name: String = ""
    var observation: NSKeyValueObservation?
    
    override init() {
        super.init()
        observation = observe(\.name) { object, change in
            print("Observe a change. Name: \(object.name)")
        }
    }
}

let person = Person()
person.name = "Thuyen"
// Console: 
// Observe a change. Name: Thuyen
```

Though the function `_swizzle_me_observeValue` is not exposed, we know that the swizzle method must be dynamically dispatched. So, if we create a method with the exactly same name, our function will be called when an observed change is triggered.

```swift
extension NSKeyValueObservation {
    @objc func _swizzle_me_observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSString : Any]?, context: UnsafeMutableRawPointer?) {
        print("_swizzle_me_observeValue gets called")
    }
}

let person = Person()
person.name = "Thuyen"
// Console:
// _swizzle_me_observeValue gets called
```

Have fun!
