---
layout: post
comments:	true
title:  "Reading: Week 52, Dec 25 - Dec 31"
date:   2017-12-31 00:00:00
summary:    ""
tags:   reading
categories:	[Reading]
---


### Dec 30, 2017

[[4] [Quora] I have a toddler. How should she prepare herself for the job market 15 years from now in the world of AI? Should I teach her Python as soon as she is willing to learn?](https://www.quora.com/I-have-a-toddler-How-should-she-prepare-herself-for-the-job-market-15-years-from-now-in-the-world-of-AI-Should-I-teach-her-Python-as-soon-as-she-is-willing-to-learn/answer/Andrew-Ng){:.post-link-reading}
- Interesting question! Early education is crucially important. Letting children get exposed to such materials is a very good mean of preparation for their future. This reminds me of a documentary I watched on Netflix last week: *"[The Mars generation"](https://www.netflix.com/title/80117263)*... A generation of teenage scientists, explorers, and those who carries human's quests for conquering the universe.
- Don't think that a 15-year-old kid is not ready to learn programming.
> "... Once upon a time, we wondered if everyone needed to be able to read/write..."


### Dec 28, 2017

[[3] Blockchain: what is in a block?](https://dev.to/damcosset/blockchain-what-is-in-a-block-48jo){:.post-link-reading} <content-meta>#blockchain</content-meta>
- A block (in Blockchain technology) is a data structure that represents a collection of transactions. This post gives information about how to make a block unique (or, how to generate the identifier for a given block). The identifer should have a piece of information of each included transaction. There are various ways to implement it. In this article, the author introduced a solution by hashing in pairs then bottoming up... Instead of hasing in pairs, we could use folding hash like: `h(h(h(A)|B)|C)...`. Another simple solution is simply `h(A|B|C|...)` but it is less sensitive to changes as compared to the Merkle tree approach.

[[2] Tổng quan về testing – phần 1: Tại sao lập trình viên cần biết về testing?](https://toidicodedao.com/2017/12/26/tong-quan-testing-1-lap-trinh-vien-biet-ve-testing){:.post-link-reading} <content-meta>#testing</content-meta>

### Dec 25, 2017

Merry Christmas 🎄!

[[1] Engineering the Architecture Behind Uber’s New Rider App](https://eng.uber.com/new-rider-app){:.post-link-reading} <content-meta>#ios #architecture #uber</content-meta>
- An old post (2016)... This is actually a variation of VIPER. The core benefit which impresses me is that *"routing is guided by business logic rather than view logic"*. Totally worth that level of complexity.

