---
layout: post
comments:	true
title:  "Reading: Week 50, Dec 11 - Dec 17"
date:   2017-12-11 00:00:00
summary:    ""
tags:   reading
categories:	[Tech]
---

### Dec 13, 2017

- [Friday Q&A 2017-10-27: Locks, Thread Safety, and Swift: 2017 Edition](https://www.mikeash.com/pyblog/friday-qa-2017-10-27-locks-thread-safety-and-swift-2017-edition.html) <post-content-tag>#ios #concurrency</post-content-tag><br>
--> Now I understand the name of `os_unfair_lock`. *Lock fairness* means that different threads could have some chances to acquire the lock. Otherwise, there could happend the situation in which a thread holds the lock (many times) for a long time. This lock, which is available since ios 10, is the replacement of `OSSpinlock`, to avoid thread priority issue.<br>
--> The high performance of `os_unfair_lock` comes from the fact it constantly check if the lock has been released or not.<br>
--> The author pointed out that `DispatchQueue` seems to be the right choice among those mentioned. I also run a benchmark and this is the result: `NSLock` ~< `pthread_mutex_t` < `DispatchQueue` ~< `DispatchSemaphore` < `os_unfair_lock`


### Dec 11, 2017

- [Can you solve the egg drop riddle? - Yossi Elran](https://ed.ted.com/lessons/can-you-solve-the-egg-drop-riddle-yossi-elran) <post-content-tag>#ted #riddle</post-content-tag><br>
--> Interesting riddle. Definitely worth a share.

- [Doing Data Science at Twitter](https://medium.com/@rchang/my-two-year-journey-as-a-data-scientist-at-twitter-f0c13298aee6) <post-content-tag>#data-science</post-content-tag><br>
--> The author mentioned two types of data scientists. One is particularly strong in statistics, other highly excels at programming skills.
--> Really enjoy Dan's comparison =]]
> “Big data is like teenage sex: everyone talks about it, nobody really knows how to do it, everyone thinks everyone else is doing it, so everyone claims they are doing it” — Dan Ariely