---
layout: post
comments:	true
title:  "What is Simpson's paradox?"
date:   2017-09-07 00:00:00
summary:    "If you're from the world of statistics, you may have heard of it. Two doctors, Dr. Hibbert and Dr. Nick, both perform 2 types of surgeries: heart surgery and band-aid removal..."
tags:   probability statistics paradox
categories: [Reasoning]
---

If you're from the world of statistics, you may have heard of it...

*Two doctors, Dr. Hibbert and Dr. Nick, both perform 2 types of surgeries: heart surgery and band-aid removal. The table below displays records for 100 surgeries, each of which can be either a success or a failure.*

|				| Heart	| Band-aid	|
|:---			|:---:	|:---:		|
| **Success**	| 70	| 10		|
| **Failures**	| 20	| 0			|
| Total			| 90	| 10		|

<figcaption><center>Fig1. Dr. Hibbert</center></figcaption>

|				| Heart	| Band-aid	|
|:---			|:---:	|:---:		|
| **Success**	| 2		| 81		|
| **Failures**	| 9		| 9			|
| Total			| 11	| 90		|

<figcaption><center>Fig2. Dr. Nick</center></figcaption>

From the table, we can see that Dr. Hibbert is better than Dr. Nick with respect to each type of surgery:
- Heart surgery: Hibbert: 70/90 > Nick: 2/11
- Band-aid removal: Hibbert 10/10 > Nick: 81/90

However, comparing the total successes and failures shows the opposite relationship. Nick, on average, turns out to have more successful surgeries than Hibbert (80 out of 100 as compared to 83/100).

Now you got the paradox, right? :D

Intuitively, the paradox could be described [like this](https://brilliant.org/wiki/simpsons-paradox)

> Simpson's paradox occurs when some groups of data show a certain relationship in each group, but when the data is combined, that relationship is reversed

Looking from mathematical view:

Let $A_1, A_2$ respectively denote the numbers of Dr. Hibbert's heart surgeries and band-aid removals. The numbers of successes with responds to these 2 types are $a_1, a_2$ $(0 \le a_i \le A_i)$.

Let $B_1, B_2$ respectively denote the numbers of heart surgeries and band-aid removals held by Dr. Nick. The numbers of successes with responds to these 2 types are $b_1, b_2$ $(0 \le b_i \le B_i)$.

The paradox wee see in the tables above is given by:

$$\frac{a_i}{A_i} \ge \frac{b_i}{B_i}, \txt{for} i = 1, 2. \txt{but} \frac{\sum_i a_i}{\sum_i A_i} \le \frac{\sum_i b_i}{\sum_i B_i}$$

Here is another case that satisfies this expression:

$$\frac{2}{2} > \frac{7}{8} \txt{and} \frac{5}{8} > \frac{1}{2} \txt{but} \frac{2+5}{2+8} < \frac{7+1}{8+2}$$

The paradox takes place due to the imbalance between the number of surgeries of each type. Dr. Hibbert obviously held more heart surgeries which are typically more risky than band-aid removals. The large fraction of such surgeries turns the overall stats on its head.

So, we have to be careful when aggregating data especially when data is not equally distributed among groups. And as I said earlier in the [previous post](/2017-07-30-a-misuse-of-expectation.html), it's convenient to use the ratio as a measure of comparison in statistics. However, it wipes out the information about the number of trials in which the ratio is calculated. This could present some misleading pictures, and fallacious conclusions could be made as a results.

### Read more

[1] [Blitzstein, Joseph K., and Jessica Hwang. “Conditional Probability.” *Introduction to Probability*, CRC Press/Taylor & Francis Group, 2015.](https://www.amazon.com/Introduction-Probability-Chapman-Statistical-Science/dp/1466575573)

[2] https://brilliant.org/wiki/simpsons-paradox

[3] https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2880329
