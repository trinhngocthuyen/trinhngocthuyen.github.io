---
layout: post
comments:   true
title:  "Swift: Concrete types in Protocol"
date:   2016-06-19 00:00:00
summary:    "A specific use case that we are unable to use concrete types in protocol, and how to fix it."
tags: ios
categories: [Tech]
---

Suppose you are writing a language-translation app. The requirement is quite
simple: *Given a word, translate it from a language into another language.*

Here’s a simple approach. We define a protocol `TranslatorType` as follows

```swift
class Language {
   var words: [Word] = []
}
class VI_Language: Language { }
class EN_Language: Language { }
protocol TranslatorType {
   var sourceLanguage: Language { get }
   var destLanguage: Language { get }
   func translate(word: Word) -> Word
}
```

The `VI_EN_Translator` (which translates Vietnamese into English) should
conform to that protocol with `sourceLanguage` as `VI_Language` and
`destLanguage` as `EN_Language`.

```swift
class VI_EN_Translator: TranslatorType {
   private(set) var sourceLanguage = VI_Language()
   private(set) var destLanguage = EN_Language()
   func translate(word: Word) -> Word {
      ...
   }
}
```

It seems reasonable. Unfortunately, I got an error from XCode: *“Type
VI_EN_Translator does not conform to protocol TranslatorType”* despite the fact
that `VI_Language` is a subclass of `Language`. I don’t want to change
sourceLanguage to Language and cast it to `VI_Language` every I use it.

<img src = "/assets/ios/concrete_type_protocol_error.png">

Not sure wheter we should blame Swift/XCode/Apple for that. Here’s a tip to
overcome this issue:

```swift
class VI_EN_Translator: TranslatorType {
   private var _sourceLanguage = VI_Language()
   private var _destLanguage = EN_Language()
   var sourceLanguage: Language {
      return _sourceLanguage
   }
   var destLanguage: Language {
      return _destLanguage
   }
   func translate(word: Word) -> Word {
      ...
   }
}
```

This code still satisfies the protocol requirements and also allows us to use
particular properties/functions of the concrete types via `_sourceLanguage`,
`_destLanguage`.

