---
layout: post
comments:	true
title:  "Brain exercising #1"
date:   2017-08-30 00:00:00
summary:    ""
tags:   maths
---

I happened to see this problem on Twitter. It reminded me of my secondary school when I was passionate about solving math problems :)... I am thinking of a little corner of this blog for this sort of exercising.

Claim: *If $p$ is prime, all the coefficients in $(a+b)^p$ except the first and the last are divisible by $p$.*

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">If p is prime, all the coefficients in (a+b)^p except the first and last are divisible by p.</p>&mdash; Algebra Fact (@AlgebraFact) <a href="https://twitter.com/AlgebraFact/status/902629585828945923">August 29, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Equivalent claim: *If $p$ is prime, $p \mid C^k_p$ for all $k, 0<k<p$*.

*Proof.*

$$C^k_p = \frac{p!}{k! (p-k)!} = \frac{p(p-1)!}{k! (p-k)!}$$

Let $x = (p-1)!, y = k!(p-k)!$. Then $C^k_p = \frac{px}{y}$

$C^k_p \in \mathbb{Z} \implies y \mid px \hspace{5pt} (*)$

We know that $\forall z<p: gcd(p, z) = 1$. So, $\forall z<p: gcd(p, z!) = 1$.

Because $k, p-k < p$, we have $gcd(p, k!) = gcd(p, (p-k)!) = 1$

$\implies gcd(p, y) = 1 \hspace{5pt} (**)$

From $(*)$, $(**)$ $\implies y \mid x \implies p \mid p \;\frac{x}{y} = C^k_p$ ■

