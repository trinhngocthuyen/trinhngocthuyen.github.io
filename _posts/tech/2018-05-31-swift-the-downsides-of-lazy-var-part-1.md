---
layout: post
comments:	true
title:  "Swift: The downsides of lazy var (part 1)"
date:   2018-05-31 00:00:00
summary:    "Lazy evaluation is a really powerful technique which enhances app performance by avoiding unecessary computation. In Swift, apart from this advantage, it also brings convenience when it comes to coding style..."
tags:   ios swift
categories:	[Tech]
---

Lazy evaluation is a really powerful technique which enhances app performance by avoiding unecessary computation. In Swift, apart from this advantage, it also brings convenience when it comes to coding style. For instance, I usually place the setup of a UI element in a closure instead of putting a whole bunch of code in `viewDidLoad()`. And when we need `self` for that setup, `lazy` comes to the rescue.

```swift
private lazy var nameLabel: UILabel = {
	let label = UILabel()
	label.text = self.person.name
	// ... Further setup
	return label
}()
```

Putting aside the overhead complexity it adds to the compilation process, there are some more cases we need to pay attention.

Consider this code:

```swift
final class ViewController {
	private lazy var progressView: ProgressView = {
		let _progressView = ProgressView(delegate: self)
		// Further setup
		return _progressView
	}()
	...
}

extension ViewController: ProgressViewDelegate {
	func progressViewUpdateProgress() {
		let value = progressView.value
		...
	}
}
```

Everything seems pretty normal. But taking a closer look, we notice that there's a chance that while `progressView` is being configured, it may be called which ends up executing the closure twice. This introduces some critical issues as the second call will overwrite the value in the first setup.

```swift
// 1. execute closure
// --> create, not yet return 
// --> still marked progressView as "not yet initialized"
let _progressView = ProgressView(delegate: self) 

// 2. delegate is called
progressViewUpdateProgress() 

// 3. access progressView, but it is marked as "not yet initialized" since we didn't reach the return
// --> execute closure (again)
let value = progressView.value 
```

This twice execution can lead to a few issues as follows:
- The creation may take forever, then the app crashes.
- The second `progressView` is not set up properly. For example, if we first use `progressView` in `view.addSubview(progressView)`, the first one is added to `view` but the second one does not have `superview` at all 😱. The assumption that `progressView` has `superview` is not true anymore.

...

Apparently, this should not be a limitation of the language. Rather, we should pay careful attention to such scenarios...
However, by using `lazy var`, the problem seems to hide quite cleverly. 

In this example, we use `lazy var` just for convenience. But as a tradeoff, the app is more vulnerable. So... Better change it to `let` to make things less unpredictable... 

Let's not abuse `lazy` 😛.






