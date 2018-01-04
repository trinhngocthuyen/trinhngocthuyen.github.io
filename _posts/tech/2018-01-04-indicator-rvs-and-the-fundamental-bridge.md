---
layout: post
comments:	true
title:  "Indicator r.v.s and the fundamental bridge"
date:   2018-01-04 00:00:00
summary:    "Expectation (also called expected value or mean) is a very important concept in probability and statistics. One usage we could name is estimation in statistics in which we try to infer the parameters of a statistical model. Another simple application is the step of sanity checks in training a nerual network: verify if the loss function gives a value which is acceptably around its expectation..."
tags:   probability statistics
categories:	[Tech]
---

<!-- MarkdownTOC -->

- [Indicator r.v.s](#indicator-rvs)
- [Fundamental bridge](#fundamental-bridge)
	- [Example 1](#example-1)
	- [Example 2](#example-2)
- [Discussion](#discussion)
- [Reference](#reference)

<!-- /MarkdownTOC -->


*Expectation* (also called *expected value* or *mean*) is a very important concept in probability and statistics. One usage we could name is *estimation* in statistics in which we try to infer the parameters of a statistical model. Another simple application is the step of [sanity checks](http://cs231n.github.io/neural-networks-3/#sanitycheck) in training a nerual network: verify if the loss function gives a value which is acceptably around its expectation.

There are a few ways to compute the expectation of a *random variable*. Apart from [LOTUS](https://en.wikipedia.org/wiki/Law_of_the_unconscious_statistician), we could obtain it using the *fundamental bridge*. This post will introduce *indicator random variables* (r.v.s); and the bridge between this kind of r.v.s and its expectation.

### Indicator r.v.s

An ***indicator random variable*** for an event $A$ is a random variable which takes only 2 values: 1 (when $A$ occurs) and 0 (otherwise). We usually denote it as $I_A$.

It seems trivial, right? Yet, it provides a powerful connection between probability and expectation. This link is called *fundamental bridge*.

### Fundamental bridge

> The probability of an event is the expected value of its indicator r.v:<br>
> $$P(A) = E(I_A)$$

This is true since $E(I_A) = 1 \times P(A) + 0 \times P(\bar{A}) = P(A) \quad\blacksquare$

#### Example 1

Let's take an example to see how this link is applied to compute the expected value of a random variable.

> Randomly, k distinguishable balls are placed into n distinguishable boxes, with all possibilities equally likely. Find the expected number of empty boxes.

Let $X$ be the number of empty boxes. We need to determine $E(X)$.

Let $I_j$ be the indicator of the $j^{th}$ box being empty. Then, $X = I_1 + I_2 + ... + I_n$

$\implies E(X) = E(I_1) + E(I_2) + ... + E(I_n)$ (by linearity of expectation).

We have $E(I_j) = P(\txt{the} j^{th} \txt{is empty}) = P(\txt{all} k \txt{balls are placed in other boxes})$

Since all possibilities are equally likely, given a ball, the probability it is assigned to any box except the $j^{th}$ one is $(n-1)/n$. 

$\implies E(I_j) = (\frac{n-1}{n})^k$

$\implies E(X) = n \times (\frac{n-1}{n})^k  = \frac{(n-1)^k}{n^{k-1}}$

#### Example 2

> A group of 50 people are comparing their birthdays (as usual, assume their birthdays are independent, are not February 29, etc.). Find the expected number of pairs of people with the same birthday.

First of all, we assign these $n$ people ($n=50$) to pairs. One could belongs to multiple pairs. In total, we have $n \choose 2$ pairs, labeled from 1 to $k = {n \choose 2}$.

Let $X$ be the r.v denoting the number of pairs in which a birthday match occurs. 

Let $I_j$ be the indicator r.v for the event when two people in the $j^{th}$ pair have the same birthday. Then, $X = I_1 + I_2 + ... + I_k$

We have $E(I_j) = P(\txt{2 people have the same birthday}) = 1/365$

$\implies E(X) = E(I_1) + E(I_2) + ... + E(I_k) = k \times 1/365 = {n \choose 2} / 365$

### Discussion

When I first read the definition of indicator r.v.s, I thought *"So trivial! Is it really worth a mention"*. But it turns out to be a quite useful tool to calculate expectations.

Conventionally, determining expectations could be done using LOTUS. Sometimes, the analytical transforms required could be troublesome whereas using the *fundamental bridge* may result in a very elegant solution.

### Reference

[1] [Joseph K. Blitzstein and Jessica Hwang, "Chapter 4: Expectation", Introduction to Probability](https://www.amazon.com/Introduction-Probability-Chapman-Statistical-Science/dp/1466575573)



