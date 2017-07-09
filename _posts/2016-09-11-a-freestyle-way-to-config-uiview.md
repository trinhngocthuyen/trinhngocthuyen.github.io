---
layout: post
title:  "A freestyle way to config UIView"
date:   2016-09-11 00:00:00
summary:    "This article is to introduce a freestyle way to set up views in iOS (by code)."
categories: ios
tags:	ios
---


This article is to introduce a freestyle way to set up views in iOS (by code).

Normally, a view is set up like this

```swift
label = UILabel()
label.text = "Hello, It's raining outside. Enjoy?"
label.textAlignment = .Center
label.font = .headerFont()
label.textColor = .headerColor()
view.addSubview(label)
```

Configuring a view sometimes includes a sequence of steps. We can rougly call it "chaining actions". "Chaining actions", in the general perception, is the execution of multiple actions on the same actor.

```swift
actor.doSomething()
     .doNextStep()
     .doFinalStep()	
```

Based on that premise, we could think of this implementation

```swift
label = UILabel()
	.config {
		$0.text = "Hello, It's raining outside. Enjoy?"
		$0.textAlignment = .Center
		$0.font = .headerFont()
		$0.textColor = .headerColor()
	}
	.addTo(view)
```
And

```swift
view.addSubview(label, withConfig: {
		$0.text = "Hello, It's raining outside. Enjoy?"
		$0.textAlignment = .Center
		$0.font = .headerFont()
		$0.textColor = .headerColor()
	})
	.addSubview(button, withConfig: {
		$0.setTitle("Enjoy", forState: .Normal)
		$0.addTarget(self, action: #selector(tapYes), forControlEvents: .TouchUpInside)
	})
```

In fact, this style consumes more lines of code than the conventional approach. Yet, it reflects the idea more clearly. Those inside a closure `config` implicitly mean they are in the same context, making the code more structured and readable.


Now, let's codeeee

Basically, we would make some extensions over `UIView`

```swift
extension UIView {
	func config(@noescape closure: UIView -> Void) -> UIView {
        closure(self)
        return self
    }

    func addTo(parent: UIView) -> Self {
        parent.addSubview(self.nt_view)
        return self
    }
}
```
Sadly, the closure is not generic enough to config a `UILabel` since it takes a `UIView` as the parameter
_(--> You cannot declare `$0.text = "..."` because `$0` is a `UIView`. Do not think of casting it to `UILabel` :D)_

You may think of the keyword `Self` to make the compiler infer the input's type. Yes, you're on the right way.
However, it's a classic problem that `Self` is only valid for `protocol extensions`
_(Remember: implementing extensions with so-called generic things is kind of limited)_


To overcome this issue, we create a protocol `NTViewType` which requires a properties `nt_view: UIView`. The idea is quite simple. We **perform extensions on this protocol** and the **detail implementation operates on `nt_view`**. And the value `nt_view` of `UIView` is **just itself**.


```swift
protocol NTViewType {
	var nt_view: UIView { get }
}

extension UIView: NTViewType {
	var nt_view: UIView { return self }
}

extension NTViewType {
	func config(@noescape closure: Self -> Void) -> Self {
		closure(self)
        return self
	}

	func addTo(parent: UIView) -> Self {
        parent.addSubview(nt_view)
        return self
    }

    func addSubview<T: NTViewType>(subview: T, @noescape config: T -> Void) -> Self {
        nt_view.addSubview(subview.nt_view)
        config(subview)
        return self
    }
}

```

Have fun and make your own styleeeee