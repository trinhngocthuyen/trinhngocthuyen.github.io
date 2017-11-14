---
layout: post
comments:	true
title:  "An example of Survey with privacy"
date:   2017-11-14 00:00:00
summary:    "A while ago, I read the book Probabilistic Programming and Bayesian Methods for Hackers written by Cam Davidson-Pilon and was really impressed by an example of carrying out surveys. Although it is not a standard method with wide scope of use, from the perspective of a software engineer who is not from statistics background, I think its idea is pretty beautiful and worth knowing"
tags:   probability statistics
categories:	[Tech]
---

<!-- MarkdownTOC -->

- [Case study](#case-study)
- [Problem](#problem)
	- [An alternative](#an-alternative)
	- [Inference](#inference)
- [Reference](#reference)

<!-- /MarkdownTOC -->


A while ago, I read the book [*Probabilistic Programming and Bayesian Methods for Hackers*](http://nbviewer.jupyter.org/github/CamDavidsonPilon/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers) written by Cam Davidson-Pilon and was really impressed by an example of carrying out surveys. Although it is not a standard method with wide scope of use, from the perspective of a software engineer who is not from statistics background, I think its idea is pretty beautiful and worth knowing.

### Case study

> To determine the ratio of cheating in exams, N random students were chosen each of whom were asked if they had ever cheated during an exam. The frequency of yes responses reflected the probability of cheating (within the population in which those students were representative of).

For now, let's assume that the number of interviewees is large enough so that the result is reasonably reliable.

### Problem

One of the biggest challenges of this problem is to guarantee the privacy of interviewees' answers because this kind of information is sensitive. Otherwise, students could be more likely to lie. An anology is that one cannot ask another if he/she is diagnosed HIV positive and expect an honest response.

#### An alternative
There are several ways to tackle this issue. The author of the book introduced an approach by changing the way students give their answers. The algorithm in which a student responds to the interview is briefly described as follows:

- Step 1. *Flip a (fair) coin twice. The interviewer does not know which side appears in each flips.*
- Step 2. *If the first flip is HEAD, the student gives the honest answer.*
- Step 3. *Otherwise, if the second toss is HEAD, the student gives a YES response (regardless his/her honest answer).*
- Step 4. *Otherwise (the second coin turns TAIL), the student give a NO response (regardless his/her honest answer).*

With this approach, if the surveyor receives a YES response, he/she has no idea if that student cheated or not, because his/her answer corresponds to the 3rd step.

#### Inference
Ok, the randomness is established. How do we infer the cheating frequency?

Let $p$ be the probability of cheating among students. Then the probability of YES response is:

$$\begin{align}
P(\txt{YES response}) &= P(\txt{1st coin is HEAD, student cheated}) + P(\txt{1st coin is HEAD, 2nd coin is HEAD}) \\
&= 0.5*p+0.5*0.5 = 0.5*p+0.25
\end{align}$$

$\implies p = 2 * P(\txt{YES response}) - 0.5$

According to this formular, if there are 35 out of 100 students giving YES responses, the frequency of cheating equals 0.2.

This approach is pretty simple, right? But it ensures privacy without reliance on any technology system :D. Regardless other social factors, participants are less scared to provide their true answers.

### Reference
[1] [Cam, Davidson-Pilon. "Chapter 2: A little more on PyMC." Probabilistic Pogramming and Bayesian Methods for Hackers.](http://nbviewer.jupyter.org/github/CamDavidsonPilon/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers/blob/master/Chapter2_MorePyMC/Ch2_MorePyMC_PyMC3.ipynb)



