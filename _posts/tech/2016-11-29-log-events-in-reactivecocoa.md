---
layout: post
comments:	true
title:  "Log events in ReactiveCocoa"
date:   2016-11-29 00:00:00
summary:    "I used to spend a lot of time reading documentations of ReactiveCocoa (Framework overview, design guidlines, basic operators...) but, unfortunately, missed this one..."
tags:   ios
categories: [Tech]
---

I used to spend a lot of time reading documentations of ReactiveCocoa (Framework overview, design guidlines, basic operators...) but, unfortunately, missed [this one](https://github.com/ReactiveCocoa/ReactiveSwift/blob/master/Documentation/DebuggingTechniques.md){:.ga-link}.

I strongly agree that debugging is not quite easy in the async world. Printing log is my common way to deal with it :D. And yes, I didn't know that RAC provides such a built-in logger.

Actually, I also have my own extensions (`logWhenStarted, logWhenNext, logWhenFailed, logWhenCompleted...`) to log events. But I have to call N functions instead. Ex: `producer.logWhenStarted("Started").logWhenCompleted("Completed").logWhenFailed("Failed")`

Let's look at that of RAC

### How to use it?

```swift
func racLog(identifier: String, event: String, fileName: String, functionName: String, lineNumber: Int) {
    NSLog("\(identifier) --> event: \(event)")
}

loginProducer(username, password)
	.logEvents(identifier: "DemoLogEvent", events: [.Started, .Next, .Completed, .Failed], logger: racLog)
	.start()
```

For more convenience, we could make a default logEvents function (nt_logEvents) that uses other parameters as of RACLog

```swift
loginProducer(username, password)
	.nt_logEvents(identifier: "LoginViewModel")
	.start()
```

### Well, perfect except...
Sometimes we desire to print the next value in a custom way. I think the event `Next` should be treated as a special case and need a closure to turn a next value into a string. It seems my function (logWhenNext) is more handy in this case

```swift
func logWhenNext(logText: String) -> SignalProducer<Value, Error>
func logWhenNext(log: Value -> String) -> SignalProducer<Value, Error>
```