---
layout: post
comments:   true
title:  "A misuse of Expectation"
date:   2017-07-30 00:00:00
summary:    "This post is to demonstrate a common use of expectation that is not correct. The example is excerpted from lecture 23 of MIT6_042J"
tags:   probability expectation
categories: [Tech]
---

This post is to demonstrate a common use of expectation that is not correct. The example is excerpted from [lecture 23 of MIT6_042J](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-042j-mathematics-for-computer-science-fall-2010/video-lectures/lecture-23-expectation-ii) by Tom Leigton. For full understanding, I recommend you watch this informative and fascinating lecture.


### Example: RISC vs Z8002
Data in table 1 is from a paper by some famous professors. They wanted to demonstrate that programs on a RISC processor are generally shorted than on a Z8002 processor. They performed some benchmarks and measured the code size of a problem on the 2 processors.

P/s: Actually, Tom Leighton did not mention the source of this data. The most matched I can trace is [here](https://courses.cs.washington.edu/courses/cse548/05wi/files/Patterson-A-VLSI-RISC.pdf) (a pretty long time ago).


| Benchmark				| RISC	| Z8002	| Z8002/RISC	|
|:----------------------|:-----:|:-----:|:-------------:|
| E-string search		| 150	| 120	| 0.8			|
| F-bit test			| 120	| 180	| 1.5			|
| Ackerman				| 150	| 300	| 2.8			|
| Rec 2-sort			| 2800	| 1400	| 0.5			|
|-----------------------|-------|-------|---------------|
| **Average**			|		|		| **1.2**		|

<figcaption>Table 1. Sample program lengths for benchmark problems using RISC and
Z8002 compilers, with the ratio of Z8002/RISC</figcaption>

A conclusion was drawn that **programs on Z8002 processors were generally longer (by 20%) than on RISC processors**. (*)

However, some critics of the paper took the other ratio RISC/Z8002 (instead of Z8002/RISC) on the same data.

| Benchmark				| RISC	| Z8002	| RISC/Z8002	|
|:----------------------|:-----:|:-----:|:-------------:|
| E-string search		| 150	| 120	| 1.25			|
| F-bit test			| 120	| 180	| 0.67			|
| Ackerman				| 150	| 300	| 0.5			|
| Rec 2-sort			| 2800	| 1400	| 2.0			|
|-----------------------|-------|-------|---------------|
| **Average**			|		|		| **1.1**		|

<figcaption>Table 2. Sample program lengths for benchmark problems using RISC and
Z8002 compilers, with the ratio of RISC/Z8002</figcaption>

Another conclusion was made in the same way that **RISC processors were 10% longer on average**. (**)

(*) and (**) obviously contradict each other.

####  What's wrong?
The mistake lies in the way we interpret the average value 1.2. The false claim like above was:

$$\begin{align}
E[Y/X] & = 1.2 \implies E[Y] = 1.2*E[X] \hspace{5pt} & ❌\\
E[X/Y] & = 1.1 \implies E[X] = 1.1*E[Y] & ❌
\end{align}$$

where $X, Y$ denote code size of a program on RISC and Z8002 respectively.

In fact: $E[X/Y] \neq E[X] * E[Y]$

A counterexample for this deduction:

- $X = 1$ with prob. 1 $\implies E[X] = 1$
- $Y = 1$ with prob. 0.5, and $Y = -1$ with prob. 0.5 $\implies E[Y] = 0$

Then:
- $X/Y = 1$ with prob. 0.5 and $X/Y = -1$ with prob. 0.5 $\implies E[X/Y] = 0$

$$\implies E[X/Y] = 0 \neq \frac{E[X]}{E[Y]} = \frac{1}{0}$$

We have the *linearity rule* and *product rules* (if mutually independent) for expectation, but not the ~~*quotation rule*~~.

#### Discussion
People reason this way all the time. The ratio helps us quickly assess whether one is superior. But it somehow gets us into a logical mistake without intention. This kind of false reasoning happens requently, not only to those with non-science background.
