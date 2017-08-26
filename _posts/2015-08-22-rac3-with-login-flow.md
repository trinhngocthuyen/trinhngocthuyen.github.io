---
layout: post
comments:   true
title:  "RAC 3.0 with Login workflow"
date:   2015-08-22 00:00:00
summary:    "A particular example of RAC 3.0, applied in Login workflow."
tags: ios
---


In this post, we will have a look at an example on how to use
[`ReactiveCocoa`](https://github.com/ReactiveCocoa/ReactiveCocoa) (v3.0) to handle
a simple Login workflow.

### An example

First of all, you may wonder why we should use it. Let’s have a look at the
following example.

Almost every app needs authentication, which is simply implemented by
login with email and password. It is not only a network task, but also a
task requiring interactions with a server. But the problem is: _“every
task may fail”_. This leads to the fact that sometimes we _spend more time
handling failures than successful cases_. These failures include
network failures and server-interaction failures.

#### Traditional version

```swift
func tapLoginButton() {
   ...
   YourAPI.login(loginParameters) { (result, error) in
      if error != nil {
         switch error.type {
         case .NetworkError:
            // Handle network failure
         case .IncorrectEmailOrPassword:
            // Handle failure
         case .InvalidInformation:
            // Handle failure
            // …
         } else {
            // Handle success
         }
      }
   }
}
```

This code has a few disadvantages:

* The handling implementation is put inside a closure. If we have 10 tasks that
need to be executed immediately after logging in, they have to be placed in this
closure. Ugly and hard to debug, right?
* Assume we need chaining tasks: If login task is done → execute task 1. If task 1
is done → execute task 2… In that case, each task need a closure:

```swift
func task1(completion: (SuccessType) -> ())
func task2(completion: (SuccessType) -> ())
```

* Errors and successful results don’t exist simultaneously. The parameters
declaration (result, error) seems redundant.

#### How to refactor?

Replace closures by `Signals` or `SignalProducers`. We will discuss the
differences between `Signal` and `SignalProducer` later.

```swift
class API {
   static func login(loginParameters: LoginParameters) -> 
                         SignalProducer<SuccessType, ErrorType> {
      let signalProducer = SignalProducer<SuccessType, ErrorType> {
         sink, disposable in
         // For now, dont care much about `sink` and `disposable`
         // Send request
         // Validate request
         if networkErrorOccured() {
            let error = makeUpNetworkError()
            sendError(sink, error)
         } else if serverErrorOccured() {
            let error = makeUpServerError()
            sendError(sink, error)
         } else {
            let successResult = parseJsonAndGetSuccessResult()
            sendNext(sink, successResult)
            sendCompleted(sink)
         }
      }
   }
}
func tapLoginButton() {
   let loginParameters = LoginParameters(username, password)
   let loginSignalProducer = API.login(loginParameters)
   // Task 1
   loginSignalProducer
   |> start(error: { error in
      handleErrorTask1()
   }, next { successfulResult in
      handleSuccessTask1()
   })
   // Task 2
   loginSignalProducer
   |> observe(error: { error in
      handleErrorTask2()
   }, next { successfulResult in
      handleSuccessTask2()
   })
   …
   // Task 10
   loginSignalProducer
   |> observe(error: { error in
      handleErrorTask10()
   }, next { successfulResult in
      handleSuccessTask10()
   })
}
```

This implementation looks more elegant since:

- Failure and success are handled separately
- Each observation is handled separately
- We dont have to take much care of asynchronous tasks

### What makes differences?

I think what make sense are the abstract types:

- `Result`: handles failures
- `Event`: handles asynchronous tasks
- `Signal`: handles observation for changes along with time

#### A little explanation

If you already heard of [FRP (Functional Reactive
Programming)](https://www.coursera.org/course/reactive), this may help you
understand more straightforwardly:

```swift
- Result<SuccessType, ErrorType>  = Try[SuccessType, ErrorType]
- Event<SomeType, ErrorType>      = Future[SomeType, ErrorType]
- Signal<SomeType, ErrorType>     = Observable[SomeType, ErrorType]
                                  = a series of Events
```

### Conclusion

* Don’t waste your time implementing Observer pattern or manually handling
asynchronous tasks.
* If you’re in favor of Java, a similar framework could be found as
[RxJava](https://github.com/ReactiveX/RxJava).

The next blog post, I will come up with a small comparison between RAC 2.0 and
RAC 3.0.

