---
layout: post
comments:	true
title:  "Reading: Week 3, Jan 15 - Jan 21"
date:   2018-01-15 00:00:00
summary:    ""
tags:   reading
categories:	[Reading]
---


[[1] Practical story about Trie and Prefix Search](https://huydx.com/post/169427855284/practical-story-about-trie-and-prefix-search){:.post-link-reading} <content-meta>#tech-solution #data-structure #trie</content-meta>
- Bài viết đề cập đến bài toán *prefix matching*, xương sống của giải pháp cho tính năng *autocompletion*. Bài này tác giả viết khá dễ hiểu. Mình rất thích. Tuy nhiên, có một vài điểm mình hơi thắc mắc, chỗ ước lượng memory usage cho Trie. 
	- Thứ nhất, với thông số đề cập trong bài viết (265132 nodes, ~71MB), thì không biết 400KB/node tính từ đâu ra? 
	- Thứ hai, con số 71MB trên là chi phí cho lưu trữ thôi, hay bao gồm chi phí cho các thao tác duyệt trên Trie?
	- Thứ ba, chỗ ước lượng từ *1triệu title* -> *30GB* được ước lượng như thế nào? Theo mình hiểu thì nó phải thông qua bước trung gian như sau: *#title -> #nodes -> mem used*. Tuy nhiên mỗi title có độ dài khác nhau, nên sẽ tương ứng với số lượng nodes khác nhau.
	> ... nếu quora có 1tr title, thì sẽ tốn tầm 30GB cho trie của toàn bộ title...
	

