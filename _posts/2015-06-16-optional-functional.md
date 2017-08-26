---
layout: post
comments:   true
title:  "Optional - Functional"
date:   2015-06-16 00:00:00
summary:    "A demonstration of lazy evaluation using a simple trick"
tags:   ios
---

I have just read the chapter 5 of the book ["Functional programming in
Swift"](http://www.objc.io/books/fpinswift/). This chapter is about
**"Optionals"**. And there are some interesting things I want to share.

First of all, one of the most frustrating problem that developers have been
experiencing is working with `nil` (or `null`). Intuitively, `nil` (or `null`) implicitly means
**"failure"**. For instance, you look up in a dictionary but cannot find it,
then you got `nil`:

```swift
let mutualFriends= [
    "Anna": 137,
    "Chris": 222,
    "Dan": 80,
    "Fred": 152]   // mutualFriends: <String, Int?>
let x = mutualFriends["John"]      // x = nil
```

As usual, we want to assign x a *default value* instead of `nil`. We can customize
it in this way:

```swift
var x: Int = defaultValue
if let y= mutualFriends["John"] {
    x = y
}
```

In fact, Swift supports an operator `??` to make this sort of declaration
more concise:

```swift
let x = mutualFriends["John"] ?? defaultValue
```

This means: If the left of `??` is `nil`, then return the value of the right.
Let’s dive a little bit into the operator `??`. Roughly speaking it can be
defined as follows:

```swift
// Custom ?? function
func ??<T>(optional: T?, defaultValue: T) -> T {
    if let x = optional {
        return x
    } else {
        return defaultValue
    }
}
```

This function works perfectly despite one problem: `defaultValue` is always
computed even if the optional is not `nil`. Generally, the reason is that it is
computed before passing in the function parameters. What we desire is that the
computation of the defaultValue is only executed inside the else branch.

We can resolve it by passing **"HOW" defaultValue is computed** instead of the
value computed already. Intuitively, it reminds us of using a **function** as a
parameter. And see what it leads to:

```swift
// Custom ?? function
func ??<T>(optional: T?, computeDefaultValue: () -> T) -> T {
    if let x = optional {
        return x
    } else {
        return computeDefaultValue()
}
```

Come back to our example, we can use the operator `??` like this:

```swift
let x = mutualFriends["John"] ?? { myDefaultValue }
```

A little ugly with the closure, right? Fortunately, Swift does support
*"autoclosure type attribute"* to deal with with. Let’s look at the official
function of `??`:

```swift
// Swift 1.2 ?? function
func ??<T>(optional: T?, @autoclosure defaultValue: () -> T) -> T {
    ......
}
let x = mutualFriends["John"] ?? myDefaultValue
```
<img src = "/assets/ios/operator_or_autoclosure.png">

Now, with the `@autoclose` annotation, Swift is smart enough to map
`myDefaultValue` to a corresponding function. Everything seems quite natural so
far.

