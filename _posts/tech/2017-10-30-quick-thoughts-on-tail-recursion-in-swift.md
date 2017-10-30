---
layout: post
comments:	true
title:  "Quick thoughts on Tail recursion in Swift"
date:   2017-10-30 00:00:00
summary:    "I always thought that Tail call optimization (TCO), sometimes called tail recursion optimization, is supported in most languages by default. It turns out to be opposite."
tags:   
categories:	[Tech]
---

<!-- MarkdownTOC -->

- [Problem](#problem)
- [Investigation](#investigation)
- [Discussion](#discussion)

<!-- /MarkdownTOC -->


### Problem

I always thought that *Tail call optimization (TCO)*, sometimes called *tail recursion optimization*, is supported in most languages by default. It turns out to be opposite.

I happened to find it out when solving a Hackerrank problem (using Python). As a fan of functional programming, I used recursion for better readability. Of course, I wrote the code in *tail recusion* to avoid memory issues and let the system take care the rest. Yet, a `segmentation fault` exception was thrown as a potential evidence of the absence of TCO.

After a few minutes googling, I found that there is an approach to eliminate the memory issues without changing my code to while-loop style. Here is the [reference](http://chrispenner.ca/posts/python-tail-recursion). You don't need to understand it, just remember that in Python, there exist a solution to fix it.

How about Swift?

### Investigation

Consider this code:

```swift
func sumPrefix(_ n: Int, _ acc: Int) -> Int {
  if n == 0 { return acc }
  return sumPrefix(n - 1, acc + n)
}
_ = sumPrefix(1000000, 0)
```

Build this code with `-Onone` (no optimization), and run the program. You will get a crash!

`xcrun swiftc -Onone main.swift; ./main`

When turning on the optimization, the program executes properly.

`xcrun swiftc -O main.swift; ./main`


Clearly, the tail recursion optimization was not supported in the `-Onone` build. Otherwise, it would have not crashed. About the `-O` build, the tail call was optimized. A nice way to inspect it is looking at the `asm` file: `xcrun swiftc -O -S main.swift > main.asm`.

No `callq` instruction was found! That means, the recursive instruction which expands the stack frame is replaced by jump instructions. 

But wait! No `callq` indicates that the invocation `_ = sumPrefix(1000000, 0)` was inlined. How do we know that the exception was not raised as a result of inlining or TCO? Let's force Swift not to inline this function:

```swift
@inline(never)
func sumPrefix(_ n: Int, _ acc: Int) -> Int {
	...
}
```

Now, `callq` is back! And there is only one function call.
```
...
_main:
	pushq	%rbp
	movq	%rsp, %rbp
	movl	$1000000, %edi
	xorl	%esi, %esi
	callq	_main.sumPrefix(Swift.Int, Swift.Int) -> Swift.Int
	xorl	%eax, %eax
	popq	%rbp
	retq

	.private_extern	_main.sumPrefix(Swift.Int, Swift.Int) -> Swift.Int
	.globl	_main.sumPrefix(Swift.Int, Swift.Int) -> Swift.Int
	.p2align	4, 0x90
_main.sumPrefix(Swift.Int, Swift.Int) -> Swift.Int:
	pushq	%rbp
	movq	%rsp, %rbp
	testq	%rdi, %rdi
	je	LBB1_4
	.p2align	4, 0x90
...
LBB1_4:
	movq	%rsi, %rax
	popq	%rbp
	retq
...
```

### Discussion

Although the problem does not happen in optimized builds, I expect the TCO support to be available in any level of optimization. You cannot write readable code that crashes on Debug builds.

As recursion is a crucial piece of functional programming, I believe this is definitely a lack of support and a limitation of language. Take Scala as an example, you could instruct the program to optimize the tail call using [@tailrec](https://www.scala-exercises.org/scala_tutorial/tail_recursion). Or at least, in Python, we could fix it with *decorators* and achieve the same result.

In fact, there was a proposal for TCO. You could find it [here](https://lists.swift.org/pipermail/swift-evolution/2015-December/000370.html). But it was a pretty long time ago... And I think it will keep staying there for a while.

Honestly, I cannot imagine how hard it is to bring this feature to the world :)



