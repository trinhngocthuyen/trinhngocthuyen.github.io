---
layout: post
comments:   true
title:  "Swift: Currying"
date:   2016-04-17 00:00:00
summary:    "This topic has been mentioned as a part of Functional programming. Though it’s kind of fun to use currying, we often see it on the list along with functors, applicative, monads... In this article, I’ll show you a couple of ways to have fun with currying."
tags:   ios
---


This topic (aka Currying) has been mentioned as a part of Functional programming. Though it’s kind of fun to use currying, we often see it on the list of *what-must-not-be-named* (along with functors, applicative, monads...) LOL. In this article, I’ll show you a couple of ways to have fun with currying.

### What is currying?

Roughly speaking, currying is the act of ***translating a single function of N arguments into N functions of a single argument***. For those who did not know what it is, take a look at [this link](https://www.objc.io/blog/2014/11/10/functional-snippet-6-currying/).
Suppose we a have a function multiply:

```swift
func mutiply(op1: Int, op2: Int) -> Int {
   return op1 * op2
}
```
The type of multiply is: `(Int, Int) -> Int`.
Currying this function results in another function which is of type: `Int -> Int -> Int`. And this is how to get the result using the curried function:

```swift
let result = curriedMultiply(2)(3)
```

Note that the result of `curriedMultiply(2)` is a function `Int -> Int`. This function take an integer `x` as a parameter and return `2 * x`, equivalent to making a number double. Similarly, we could create lots of derived functions:

```swift
let makeDouble = curriedMultiply(2)		// Int -> Int
let makeTriple = curriedMultiply(3)		// Int -> Int
let makeFourTimes = curriedMultiply(4)	// Int -> Int
```

### What's the difference?

We transform the values before passing them as the parameters of a function on a very regular basis. In other words, we often use a function like this:

```swift
let result = f(g(a), h(b), k(c))
```
In this scenario, isolating the parameters make the function more flexible & reusable.

### Examples

#### Write function "curry"
First of all, lets write a function to curry a function:

```swift
func curry(f: (A, B) -> R) -> A -> B -> R {
	return { a in { b in f(a, b) } }
}
```
Similarly, you could write more implementations of curry for functions that have 3, 4, 5 parameters

```swift
func curry(f: (A, B, C) -> R) -> A -> B -> C -> R
func curry(f: (A, B, C, D) -> R) -> A -> B -> C -> D -> R
func curry(f: (A, B, C, D, E) -> R) -> A -> B -> C -> D -> E -> R
```
Now, lets curry a function

```swift
func addWithScale(op1: Int, op2: Int, scale: Int) -> Int {
	return (op1 + op2) * scale
}

let curriedAddWithScale = curry(addWithScale)
let result1 = curriedAddWithScale(1)(2)(3)		// result1 = 9
let scaleMySum = curriedAddWithScale(1)(2)		// scaleMySum: Int -> Int
let result2 = scaleMySum(3)						// result2 = 9
```

#### Use with custom operators `|>`

To make the code more readable, lets define an operator `|>` (we read it as "apply") that calculates the result of a specific function:

```swift
infix operator |> { associativity left }
func |> <A, R>(f: A -> R, x: A) -> R {
    return f(x)
}
```
Now, use it with `curriedAddWithScale`:

```swift
let result1 = curriedAddWithScale |> 1 |> 2 |> 3
let scaleMySum = curriedAddWithScale |> 1 |> 2
let result2 = scaleMySun |> 3 
```
Still the same? Hold on, you could add some argument labels like this:

```swift
let result1 = curriedAddWithScale
	|> (op1: 1)			// You could omit the label "op1" if you want
	|> (op2: 2)			// You could omit the label "op2" if you want
	|> (scale: 3)		// You could omit the label "scale" if you want
```

#### Use with Apple Swift functions
Have a look at the init methods of UIColor. How to get the right init function. We only want to curry this init method:
```swift
UIImage.init(red: CGFloat, green: CGFloat, blue: CGFloat, alpha: CGFloat)
```
Try this:

```swift
let curriedColorInit = curry(UIColor.init(red:green:blue:alpha:))
let orangeWithAlpha = curriedColorInit |> 0.945 |> 0.353 |> 0.133
let orange1 = orangeWithAlpha |> 0.9
let orange2 = orangeWithAlpha |> 0.3

```

#### Refactor closure
Suppose we have a function fetchData as follows:

```swift
func fetchData(path: String, successfulHandler: NSData? -> Void, failedHandler: NSError? -> Void) {
	...
}
```
I believe you have been a bit frustrated with this sort of functions because of the ugly caller like this:

```swift
fetchData("www.mysite.com", successfulHandler: { data in
    // Handle success
    }, failedHandler: { error in
        // Handle failure
})
```

or this

```swift
fetchData("www.mysite.com", successfulHandler: { data in
    // Handle success
    }) { error in
        // Handle failure
}

```
The `successfulHandler` and `failedHandler` should have the same indent, right? Moreover, the syntax to write the path and successfulHandler in the same line makes us hard to read.

Now, with the combination of curry and operator |> we could write it in such a readable manner like this:

```swift
let fetchDataWithHandlers = curry(fetchData) |> "www.mysite.com"
fetchDataWithHandlers
    |> (successful: { data in
        // Handle success
    })
    |> (failed: { error in
        // Handle failure
    })
```

```swift
let curriedAnimate = curry(UIView.animateWithDuration(_:animations:completion:))
curriedAnimate
    |> (duration: 0.25)
    |> (animation: { _ in
        // Animation here
    })
    |> (completion: nil)
```
It seems better looking now!

Have fun!

The playground could be found [here](https://github.com/trinhngocthuyen/iOS-blog-posts/tree/master/functional-currying/functional-currying.playground)