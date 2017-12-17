---
layout: post
comments:	true
title:  "Reading: Week 50, Dec 11 - Dec 17"
date:   2017-12-11 00:00:00
summary:    ""
tags:   reading
categories:	[Reading]
---

### Dec 17, 2017
[>> Friday Q&A 2017-12-08: Type Erasure in Swift](https://www.mikeash.com/pyblog/friday-qa-2017-12-08-type-erasure-in-swift.html)<post-content-tag>#ios #protocols #generic #type-safety</post-content-tag>
- This post discussed several approaches towards type-easure. The *underlying functions approach* is the same as what I blogged a while ago
in *[Swift: Generic protocol (p.1)](https://trinhngocthuyen.github.io/2016-06-25-swift-generic-protocol-p1.html)*. 

- We can recognize the noticeable presence of *Bridge* design pattern here because it is compatibility that motivates type erasure.

- This article published recently also mentions type erasure, and a few more problems when working with associate types: [Patterns for Working With Associated Types](http://appventure.me/2017/12/10/patterns-for-working-with-associated-types). A nice-to-read!

### Dec 16, 2017

[>> Diary of a Wimpy Kid (Diary of a Wimpy Kid, Book 1)](https://www.amazon.com/Diary-Wimpy-Kid-Book-ebook/dp/B005CRQ4OW)<post-content-tag>#books #reading</post-content-tag>
- This book is increadibly fantastic. The story was written in a very distinctively witty manner. I really love the way the author portraited the Greg-Rowley friendship and how Greg learned from his hard lessons. Also, the differences in how children and parents normally conceive were described so vividly, which brought me lots of laugh... I'm gonna grab other books of the series :).

[>> FluidDATA](https://www.producthunt.com/posts/fluiddata)<post-content-tag>#podcasts #tools</post-content-tag>
- Podcast lovers will be definitely into FluidDATA. The wonderful power of this site is that you can search podcasts based on your interests. This feature also provides you relevant sources whose contents meet your creteria.

### Dec 15, 2017

[>> Swift Analytics: Comparing structs, enums and protocols](http://chris.eidhof.nl/post/swift-analytics)<post-content-tag>#ios #analytics</post-content-tag>
- Well, the [original post](https://www.swiftbysundell.com/posts/building-an-enum-based-analytics-system-in-swift) by John has drawn lots of attention from the community. The way developers use to handle analytics diverges. Chris's post gives a fair comparison between the approaches mentioned. In short, each has both benefits and drawbacks. It's up to your needs to pick the most suitable implementation. Personally, I prefer Dave's approach.


### Dec 14, 2017

[>> SourceKit and You](https://academy.realm.io/posts/appbuilders-jp-simard-sourcekit) <post-content-tag>#ios #talk</post-content-tag>
- Đây là một bài nói, chứ hỏk phải bài đọc. Tóm lại bài nói là, `SourceKit` cho phép mình làm việc với language syntax, và giải quyết nhiều vấn đề thú vị như *code analysis*, *code generation*, *code refactoring*...<br>

- Đã nghe nói về `SourceKit` và cũng thử qua các thư viện nổi tiếng xây dựng trên cái này như `SwiftLint`, `Sourcery` trong mấy cái projects thử nghiệm. Về cảm nhận cá nhân thì mình thấy `SwiftLint` cực kỳ hiệu quả. Nếu coding style là quan trọng đối với team thì nó hoàn toàn đáng thời gian để tích hợp. Mình nhớ lần đầu gắn thử vào project trên công ty (code base hơi lớn), mặc dù đã disable các rules, và chỉ enable 1 vài rules thôi mà số lượng warnings/errors bay nhảy lên 3 con số (999+). Lý tưởng nhất là tích hợp lúc đầu. Còn không thì chia theo pha mà tích hợp (mỗi pha enable 1 số rules tuỳ theo mức độ nghiêm trọng, và mức độ vi phạm của project hiện tại). Đây là cách làm trong đầu mình, chứ project trên công ty vẫn chưa có dấu chân của swiftlint đâu :)).<br>

- Sẵn tiện nhắc về *code analysis*, mình có một trải nghiệm cũng thú vị. Project mình tham gia lúc ấy khá đặc thù về mặt code base. Đó là một dòng các apps mà tụi chúng share gần hết 80% các features, (20% còn lại ngốn mất 80% thời gian và công sức của team đó LOL (jk)). Sau một thời gian quan sát, tôi thấy có nhiều classes/structs/enums mới ra đời, nhưng na na với những app khác. Đây hẳn là *code smell* - tôi nghĩ.
	- Vì muốn đánh giá được mức độ phức tạp của project hiện tại, xem thử coi mức độ giãn nở của project ra sao theo thời gian, tôi quyết định viết 1 cái script rú-bì (ruby), xài chủ yếu là regex và đọc ghi file là chủ yếu (code chuối lắm =]]). Nó cho mình xem overview của project theo 1 vài thông số như: số lượng classes/structs/enums/protocols, trong đó có bao nhiêu thằng được xài chung, có bao nhiêu thằng chỉ xài ở 1 vài apps. Đại ý là vậy, sau này dự sẽ thêm tiêu chí khác vào.
	- Tuy nhiên, vì dùng regex chứ không xài mấy cái hào nhoáng như `SourceKit`, có khá nhiều trường hợp biên phải xử lý, ví dụ như nested classes/structs/enums, comments, typealias. Cũng vì xử lý nhiều vậy nên thòi gian chạy không được nhanh lắm. Cực khổ vậy đó, nên mới cần ba cái frameworks này chớ :D.
	- Đánh giá chung thì cái script tôi viết ra không đủ để phục vụ nhu cầu tương lai. Nhưng tôi không hối hận khi dành cuối tuần ngồi code thay vì đi chơi. Đơn giản vì cái mình viết ra giúp cho mình có 1 cái nhìn tổng quan, giúp đưa ra chẩn đoán sơ bộ về một đối tượng nào đó. Bước đầu tiên trong giải quyết vấn đề là nhận diện vấn đề! Ngoài ra, nó còn đem lại lợi ích về mặt học tập :).


### Dec 13, 2017

[>> Friday Q&A 2017-10-27: Locks, Thread Safety, and Swift: 2017 Edition](https://www.mikeash.com/pyblog/friday-qa-2017-10-27-locks-thread-safety-and-swift-2017-edition.html) <post-content-tag>#ios #concurrency</post-content-tag>
- Now I understand the name of `os_unfair_lock`. *Lock fairness* means that different threads could have some chances to acquire the lock. Otherwise, there could happend the situation in which a thread holds the lock (many times) for a long time. This lock, which is available since ios 10, is the replacement of `OSSpinlock`, to avoid thread priority issue.

- The high performance of `os_unfair_lock` comes from the fact it constantly check if the lock has been released or not.

- The author pointed out that `DispatchQueue` seems to be the right choice among those mentioned. I also run a benchmark and this is the result: `NSLock` ~< `pthread_mutex_t` < `DispatchQueue` ~< `DispatchSemaphore` < `os_unfair_lock`

[>> Meet the man behind the most important tool in data science](https://qz.com/1126615/the-story-of-the-most-important-tool-in-data-science/) <post-content-tag>#data-sience #story</post-content-tag>


### Dec 11, 2017

[>> Can you solve the egg drop riddle? - Yossi Elran](https://ed.ted.com/lessons/can-you-solve-the-egg-drop-riddle-yossi-elran) <post-content-tag>#ted #riddle</post-content-tag>
- Interesting riddle. Definitely worth a share.

[>> Doing Data Science at Twitter](https://medium.com/@rchang/my-two-year-journey-as-a-data-scientist-at-twitter-f0c13298aee6) <post-content-tag>#data-science</post-content-tag>
- The author mentioned two types of data scientists. One is particularly strong in statistics, other highly excels at programming skills.

- Really enjoy Dan's comparison =]]
> “Big data is like teenage sex: everyone talks about it, nobody really knows how to do it, everyone thinks everyone else is doing it, so everyone claims they are doing it” — Dan Ariely
