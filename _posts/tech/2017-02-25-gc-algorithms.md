---
layout: post
comments:   true
title:  "Garbage Collection (GC) algorithms"
date:   2017-02-25 00:00:00
summary:    ""
tags:   programming garbage-collection
categories: [Tech]
---

As an iOS developer, I am quite familiar with *Reference Counting*. It is considered a fundamental knowledge regarding memory manangement that every iOS developers must acknowledge. Today, I figured out a few more algorithms of garbage collection.

![](https://github.com/kenfox/gc-viz/raw/master/docs/REF_COUNT_GC.gif)
![](https://github.com/kenfox/gc-viz/raw/master/docs/MARK_SWEEP_GC.gif)
![](https://github.com/kenfox/gc-viz/raw/master/docs/MARK_COMPACT_GC.gif)
![](https://github.com/kenfox/gc-viz/raw/master/docs/COPY_GC.gif)
<figcaption>Fig 1. From left to right: Reference Counting, Mark-Sweep, Mark-Compact, Copying</figcaption>

#### Reference Counting (RC)
- This is simple & easy to implement. However, it has some major drawbacks one of which is not being able to deal with **retain cycles**. Developers have to manually use **weak reference** if appropriate.

#### Mark-Sweep
- It traverses the heap memory twice. The first time is to **mark live objects**. A live object is detected by checking if it is **reachable from root objects**. The second time is to **sweep (deallocate) dead objects**.
- This algorithm could automatically detect retain cycles
- This algorithm, like RC, does not solve the problem that **heap memory** is **fragmented**. Looking at the gif above, you could see that a mark-sweep phase, the dead objects are cleaned, leaving the blank/free memory pieces which are distributed discretely. This is called **memory fragmentation**.

#### Mark-Compact
- Like Mark-Sweep, this algorithm also marks live objects. But the way it dispose of memory is a bit different. The GC just **moves live objects up** and aligns them together; and then clean the rest (not-in-use objects).
- This results in an advantage: new objects are allocated on the heap at the end of the used memory (which resembles stack allocation). And this change makes heap allocation *as cheap as stack allocation*.

#### Copying
- The idea is that we just need to copy the live objects to another place. Work on that memory region and don't care about the rest. We can also perform the copy while traversing the heap.
