---
layout: post
comments:   true
title:  "Swift: Generic protocol (p.1)"
date:   2016-06-25 00:00:00
summary:    "In this article, we would look into how to implement a generic protocol. A few lacks of language support (Swift version prior to 3.0) would be also pointed out for discussion."
tags:   ios
---

In this article, we would look into how to implement a generic protocol. A few lacks of language support (Swift version prior to 3.0) would be also pointed out for discussion.

Let's get started with an example. We are writing a bunch of code to implement data fetching used for a specific screen. We expect to use the same behavior for different types of data, different screens. Here's the protocol:
```swift
protocol DataFetchingType {
    associatedtype DataType
    func fetchFromLocal(from from: NSDate, to: NSDate, completion: [DataType]? -> Void)
    func fetchFromServer(from from: NSDate, to: NSDate, completion: [DataType]? -> Void)
}
```
The protocol should have an associated type `DataType` which is particular for an api service.

OK! The next step is to create concrete classes that implement this protocol.
```swift
class EventsFetcher: DataFetchingType {
    typealias DataType = Event
    func fetchFromLocal(from from: NSDate, to: NSDate, completion: [DataType]? -> Void) {
        // Implementation goes here
    }
    func fetchFromServer(from from: NSDate, to: NSDate, completion: [DataType]? -> Void) {
        // Implementation goes here
    }
}

class OrdersFetcher: DataFetchingType {
    typealias DataType = Event
    func fetchFromLocal(from from: NSDate, to: NSDate, completion: [DataType]? -> Void) {
        // Implementation goes here
    }
    func fetchFromServer(from from: NSDate, to: NSDate, completion: [DataType]? -> Void) {
        // Implementation goes here
    }
}
```
So far, it's good. Now we put a data fetcher in a view model which is also generic.
```swift
class ViewModel<DataType> {
    var fetcher: DataFetchingType
    ...
}
```
Actually, XCode yields an error, complaining that `DataFetchingType` is a generic protocol and thus cannot be used in such a way like that. More painfully, the current version of Swift does not yet support writing it similarly to generic class

```swift
var fetcher: DataFetchingType<DataType>
```

### Solution

Here comes the trick to overcome this problem. The idea is simple, we use a generic class to wrap the protocol.
```swift
class GenericDataFetcher<DT>: DataFetchingType {
    typealias DataType = DT
    ............
}

class ViewModel<DataType> {
    var fetcher: GenericDataFetcher<DataType>
}

```
It's still generic and the compiler would not complain. And the hard part remaining is to make `GenericDataFetcher` flexible that we WOULD NOT write `EventFetcher` as a subclass of `GenericDataFetcher` (subclassing is not really a good idea here).

A solution: ***init GenericDataFetcher from a protocol, store the required functions, properties of that protocol.***

```swift
class GenericDataFetchingType<DT>: DataFetchingType {
    typealias DataType = DT
    private var _fetchFromLocal: (from: NSDate, to: NSDate, completion: [DT]? -> Void) -> Void
    private var _fetchFromServer: (from: NSDate, to: NSDate, completion: [DT]? -> Void) -> Void

    init<DF: DataFetchingType where DF.DataType == DT>(fetcher: DF) {
        self._fetchFromLocal = fetcher.fetchFromLocal(from:to:completion:)
        self._fetchFromServer = fetcher.fetchFromServer(from:to:completion:)
    }

    func fetchFromLocal(from from: NSDate, to: NSDate, completion: [DataType]? -> Void) {
        _fetchFromLocal(from: from, to: to, completion: completion)
    }

    func fetchFromServer(from from: NSDate, to: NSDate, completion: [DataType]? -> Void) {
        _fetchFromServer(from: from, to: to, completion: completion)
    }
}
```

```swift
class ViewModel<DataType> {
    var fetcher: GenericDataFetcher<DataType>
    init<DF: DataFetchingType where DF.DataType == DataType>(fetcher: DF) {
        self.fetcher = GenericDataFetcher(fetcher)
    }
}

let eventsViewModel = ViewModel(fetcher: EventsFetcher())
```
P/s: I wish we would not need this trick any more in the near future.

### Reference
- [1] [http://krakendev.io/blog/generic-protocols-and-their-shortcomings](http://krakendev.io/blog/generic-protocols-and-their-shortcomings)
- [2] [https://milen.me/writings/swift-generic-protocols](https://milen.me/writings/swift-generic-protocols)
- [3] [https://github.com/apple/swift-evolution/tree/master/proposals](https://milen.me/writings/swift-generic-protocols) (with keywords: generic, protocol :D)

Have fun!