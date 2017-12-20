---
layout: post
comments:	true
title:  "MVVM best practice: Inputs - Outputs"
date:   2017-12-20 00:00:00
summary:    "When it comes to iOS architecture, MVVM is one of the most favorable candidates. Not only does it provide higher testability than MVC but also this architecture is lightweight as compared to its counterparts such as VIPER. Despite that, proper approaches should be adopted to take advantage of MVVM. Otherwise, we could end up with an alike version of MVC with an additional component (ViewModel)."
tags:   ios architecture mvvm
categories:	[Tech]
---

<!-- MarkdownTOC -->

- [Principles](#principles)
- [How-to](#how-to)
- [Why Inputs - Outputs?](#why-inputs---outputs)
- [Reference](#reference)

<!-- /MarkdownTOC -->


When it comes to iOS architecture, MVVM is one of the most favorable candidates. Not only does it provide higher testability than MVC but also this architecture is lightweight as compared to its counterparts such as VIPER. Despite that, proper approaches should be adopted to take advantage of MVVM. Otherwise, we could end up with an alike version of MVC with an additional component (ViewModel). 

This post introduces an approach call *Inputs - Outputs*, currently used at Kickstarter. You can see a high fraction of this style in the Kickstarter iOS app.

*Disclaimer: This approach is nothing but a convention. Don't get confused it with an architecture.*

### Principles

- `inputs` is a set of actions and events that have impacts on viewModel such as the tap action on a button, or the viewDidLoad event.
- `outputs` represents changes that views should reflect.
- Since `ouputs` may change over time, it's best to return an `Observable` (in RxSwift context) for each ouput.
- Behaviors defined in `inputs` should not be expressed as `Variable` because we don't need the inputs to be obseravable.

### How-to

```swift
protocol LoginViewModelInputsType {
	func viewDidLoad()
	func tapSubmit()
	func type(email: String)
	func type(password: String)
}

protocol LoginViewModelOutputsType {
	var validInput: Observable<Bool> { get }
	var isLoading: Observable<Bool> { get }
	var loginSuccess: Observable<Void> { get }
	var loginFailure: Observable<ErrorMessage> { get }
}

protocol LoginViewModelType {
	var inputs: LoginViewModelInputsType { get }
	var ouputs: LoginViewModelOutputsType { get }
}
```

This is what `LoginViewModel` looks like:

```swift
final class LoginViewModel: LoginViewModelType, LoginViewModelInputsType, LoginViewModelOutputsType {
	var inputs: LoginViewModelInputsType { return self }
	var ouputs: LoginViewModelOutputsType { return self }

	// MARK: - Inputs
	private let _tapSubmit = Variable<Void>(())
	func tapSubmit() { 
		_tapSubmit.value = ()
	}

	private let _email = Variable<String>("")
	func type(email: String) {
		_email.value = email
	}
	...

	// MARK: - Ouputs
	private let _loginSuccess = Variable<Void>(())
	var loginSuccess: Observable<Void> { return _loginSuccess.skip(1) }
	...

	init() {
		let loginObservable = _tapSubmit.asObservable().skip(1)
			.flatMapLatest(login)
			.share()

		loginObservable
			.bind(to: _loginSuccess)
			.diposed(by: disposeBag)

		// Binding for `_loginFailure` and `isLoading` goes here
		...
	}
}
```

### Why Inputs - Outputs?

First of all, by using protocols like this, we achieve higher level of abstraction. Therefore, our code is more behavior-oriented and easier to test.

Another advantage of this protocol-based convention is readability in unit tests. Let's take a look at the two simple tests below:

```swift
func test_When_PasswordIsEmpty_Then_InputIsInvalid() {
	viewModel.inputs.viewDidLoad()
	viewModel.inputs.type(email: "abc@xyz.com")

	// `grabLatestValue` is just an utility function we can write to retrieve
	// the latest value in the stream (during a specific period of time).
	// `RxBlocking` comes for the rescue.
	let validInput = grabLatestValue(viewModel.outputs.validInput, duration: 1)
	expect(validInput).to(beFalse())
}

func test_When_Submitting_Then_ShouldShowLoadingAndThenHideWhenCompleted() {
	viewModel.inputs.viewDidLoad()
	viewModel.inputs.type(email: "abc@xyz.com")
	viewModel.inputs.type(password: "Password0")
	viewModel.inputs.tapSubmit()

	let loadingStates = grabLatestValue(viewModel.outputs.isLoading, duration: 1)
	expect(loadingStates).to(beEqual([true, false]))
}
```

By looking at the codes related to `inputs` calls, we quickly have a sense of the scenarios we are trying to simulate. Similarly, what we expect to see are reflected upon `outputs`.

### Reference

[1] [https://github.com/kickstarter/native-docs/blob/master/vm-structure.md](https://github.com/kickstarter/native-docs/blob/master/vm-structure.md)<br>
[2] [https://github.com/kickstarter/native-docs/blob/master/inputs-outputs.md](https://github.com/kickstarter/native-docs/blob/master/inputs-outputs.md)
