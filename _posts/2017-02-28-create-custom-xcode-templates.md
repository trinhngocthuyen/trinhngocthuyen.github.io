---
layout: post
comments:	true
title:  "Create custom Xcode templates"
date:   2017-02-28 00:00:00
summary:    ""
tags:   xcode
---

Everytime we create a new file, Xcode suggests some built-in templates that may be useful. Luckily, we could also create our own templates.

Technically, Xcode looks for templates in `~/Library/Developer/Xcode/Templates` and `/Applications/Xcode.app/Contents/Developer/Library/Xcode/Templates`. Let's call the first path P1 and the second path P2. A template could be iferred by a folder `MY_TEMPLATE.xctemplate`.

Assume we gonna create a template for MVVM. It should create 3 files: `[Feature]Model.swift`, `[Feature]ViewModel.swift` and `[Feature]ViewController.swift`. Ex: `LoginModel.swift`, `LoginViewModel.swift` and `LoginViewController.swift`

- First of all, create a xctemplate folder in P1: `~/Library/Developer/Xcode/Templates/Custom/MVVM.xctemplate`. Note: we should place the xctemplate folder in P1 instead of P2 b/c P2 is only particular for a specific version of Xcode.
- The folder should include these files (you could copy it from P2 and modify it a little bit):
	- `___FILEBASENAME___Model.swift`
	- `___FILEBASENAME___ViewModel.swift`
	- `___FILEBASENAME___ViewController.swift`
- Create placeholder for the 3 files above. Here is the sample for `___FILEBASENAME__ViewController.swift`:

```swift
//
//  ___FILENAME___
//  ___PROJECTNAME___
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//___COPYRIGHT___
//

import Foundation
import UIKie

public class ___FILEBASENAMEASIDENTIFIER___ViewController: UIViewController {
	private let viewModel: ___FILEBASENAMEASIDENTIFIER___ViewModel

	public init(viewModel: ___FILEBASENAMEASIDENTIFIER___ViewModel) {
		self.viewModel = viewModel
		super.init(nibName: nil, bundle: nil)
		// Initialization goes here
	}

	public required init?(coder aDecoder: NSCoder) {
    	fatalError("init(coder:) has not been implemented")
	}
}
```

And then, magic happens :D

```swift
//
//  LoginViewController.swift
//  TestTemplates
//
//  Created by Thuyen Trinh on 2/28/17.
//  Copyright © 2017 Thuyen Trinh. All rights reserved.
//

import Foundation
import UIKit

final public class LoginViewController: UIViewController {
    fileprivate let viewModel: LoginViewModel
    
    public init(viewModel: LoginViewModel) {
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
        // Initialization goes here
    }
    
    public required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
```

#### Reference:
[1] [http://swiftandpainless.com/creating-a-smart-file-template](http://swiftandpainless.com/creating-a-smart-file-template)