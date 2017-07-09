---
layout: post
title:  "Swift: Optional — map"
date:   2016-02-27 00:00:00
summary:    "A few experiments with optionals in Swift."
tags: ios
---

There are a number of cases in which we would like to initialize an object with
some parameters but what we currently have (i.e. these parameters),
unfortunately, are *Optional Type*. For instance, we have a **urlString** with
the type **String?** (or *Optional<String>*), and we want to get a **url** from
*urlString*.

Basically, we expect to get a *url* of **NSURL?** (or *Optional<NSURL>*). If
**urlString == nil**, the *url* should be *nil* as well.

However, the initialization of **NSURL** requires a **string** of **String**
(which is already unwrapped).

```swift
class NSURL {
   init?(string URLString: String)
}
```

Here comes a very popular way to deal with this *type-incompatibility*:
```swift
// let urlString: String? = "www.myurl.com"
if let urlString = urlString {
   let url = NSURL(string: urlString)
   // Do stuff
}
```

In case we wish to use the *url* outside the *if-let block*, it’s quite common
that we make *url* mutable and assign its value inside the condition block.
```swift
// let urlString: String? = "www.myurl.com"
var url: NSURL?
if let urlString = urlString {
   url = NSURL(string: urlString)
}
```

This looks acceptable but:

* *A few lines of code should have not been added for such a circumstance like this*
* *The only reason to change url from immutable to mutable (from let … to var …)
is merely this type-incompatibility*

#### *Map* is coming for the rescue

Luckily, we have a function **map** on **Optional**. (If Swift does not support,
we could define it :D). I am quite sure you also have used **map** on an
**Array** a lot, right?

For the sake of better understanding, I removed some unnecessary keywords that
are not directly relevant to this topic.
```swift
enum Optional<Wrapped> {
   map<U>(f: (Wrapped) -> U) -> U?
}
```

Now, we could init an object with a parameter of *Optional*, like this:
```
// let urlString: String? = "www.myurl.com"
let url = urlString.map { NSURL(string: $0 }
```

Of course we could use this tip with other functions apart from initializations
```
// let urlString: String? = "www.myurl.com"
let data = urlString.map { fetchDataFromPath($0 }   // data: NSData?
```

#### How about a function with 2 parameters?

```swift
fetchDataFromPath(path: String, withToken: String)
```

We can come up with the idea to turn a 2 optionals into an optional of
**Tuple**. Lets define an *operator ***<&>** to combine 2 optionals
```swift
infix operator <&> { associativity left }

func <&><T, U> (left: Optional<T>, right: Optional<U>) -> Optional<(T, U)> {
   if let left = left, right = right {
      return (left, right)
   }
   return nil
}
```

Or we could define it in a more concise way using *flatMap* on *Optional*.
```swift
infix operator <&> { associativity left }

func <&><T, U> (left: Optional<T>, right: Optional<U>) -> Optional<(T, U)> {
   return left.flatMap { x in right.flatMap { y in (x, y) } }
}
```

And this is how we use it:
```swift
// let urlString: String? = "www.myurl.com"
// let token: String? = "token"
let data = (urlString <&> token).map { fetchDataFromPath($0, withToken: $1) }
```

Have fun!
