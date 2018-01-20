---
layout: post
comments:	true
title:  "Reading: Week 3, Jan 15 - Jan 21"
date:   2018-01-15 00:00:00
summary:    ""
tags:   reading
categories:	[Reading]
---

[[5] Spaced repitition in learning theory](https://www.youtube.com/watch?v=cVf38y07cfk){:.post-link-reading} <rate4/> <content-meta>#learning #methodology</content-meta>
- Without revision, we tend to forget things not long after we have just learned it. The *forgetting curve* is set to drop dramatically then. So it's better to review when we start forgetting. Normally, the interval since the last revision extends. For example, 3 days after learning something new, review it. Then take the next review 5 days later, then 7 days later...
- A difficulty of apply this technique is to determine *when to review*. We continuously acquire new knowledge (each at different time, and could be more farmiliar as compared to others), not to mention the influence of being driven by sentiments. An approach to deal with this difficulty which is mentioned in the video is *sorting info based on answers to questions*. This, in part, reminds me of the app *Duolingo*. It evaluates how well we memorize the words based on questions/answers. However, the vocabs are still lession-structured and hence not making use of this technique.

[[4] Quora: *"When Google or Facebook rejects a candidate, why don’t they give him/her a simple explanation for the rejection to help the candidate work on the gaps in their knowledge?"*](https://www.quora.com/When-Google-or-Facebook-rejects-a-candidate-why-don%E2%80%99t-they-give-him-her-a-simple-explanation-for-the-rejection-to-help-the-candidate-work-on-the-gaps-in-their-knowledge){:.post-link-reading} <rate3/> <content-meta>#career #advice</content-meta>

[[3] Huy Tran @ NASA](https://women.nasa.gov/huy-tran/){:.post-link-reading} <rate4/> <content-meta>#biography</content-meta>
- Really into this biography. Profoundly inspired by her story, partly because she was a Vietnamese who left the country for freedom, for a better education, a better future. 
- One particular point I really enjoyed is what her mentor consoled her (quoted at the end of the text).
> One day, after months of doing research in a set of material compositions, I ran the tests and the samples failed miserably. I was frustrated that I had wasted so much time and funding. My mentor sat me down and told me, ***“This is research. Sometimes things work and sometimes they don’t. And you just need to understand what your results tell you and then you move on. If you get it right the first time, then we would have to call it ‘search’ rather than ‘re-search’!”***

[[2] On being an Engineering Manager](http://codeplease.io/2018/01/15/on-being-an-engineering-manager){:.post-link-reading} <rate5/> <content-meta>#manager #retrospective</content-meta>
- Fascinating! From the perspective of a reader, this reflection provides me a clear sense of *what it is like to be an engineering manager, or a team lead*.
- Interpersonal skills matter as most of the problems a team lead deals with are about humans (who are unpredictable by nature). 
- A reality of taking this role is that you have less time to get involved in coding tasks no matter how much you want it.

[[1] Practical story about Trie and Prefix Search](https://huydx.com/post/169427855284/practical-story-about-trie-and-prefix-search){:.post-link-reading} <rate5/> <content-meta>#tech-solution #data-structure #trie</content-meta>
- Bài viết đề cập đến bài toán *prefix matching*, xương sống của giải pháp cho tính năng *autocompletion*. Bài này tác giả viết khá dễ hiểu. Mình rất thích. Tuy nhiên, có một vài điểm mình hơi thắc mắc, chỗ ước lượng memory usage cho Trie. 
	- Thứ nhất, với thông số đề cập trong bài viết (265132 nodes, ~71MB), thì không biết 400KB/node tính từ đâu ra? 
	- Thứ hai, con số 71MB trên là chi phí cho lưu trữ thôi, hay bao gồm chi phí cho các thao tác duyệt trên Trie?
	- Thứ ba, chỗ ước lượng từ *1triệu title* -> *30GB* được ước lượng như thế nào? Theo mình hiểu thì nó phải thông qua bước trung gian như sau: *#title -> #nodes -> mem used*. Tuy nhiên mỗi title có độ dài khác nhau, nên sẽ tương ứng với số lượng nodes khác nhau.
	> ... nếu quora có 1tr title, thì sẽ tốn tầm 30GB cho trie của toàn bộ title...
	

