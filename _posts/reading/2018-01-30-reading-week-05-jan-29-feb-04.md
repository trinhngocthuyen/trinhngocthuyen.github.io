---
layout: post
comments:	true
title:  "Reading: Week 05, Jan 29 - Feb 04"
date:   2018-01-30 00:00:00
summary:    ""
tags:   reading
categories:	[Reading]
---  

[[8] Một vài ghi chú về CMS GC](https://huydx.com/post/170457666224/m%E1%BB%99t-v%C3%A0i-ghi-ch%C3%BA-v%E1%BB%81-cms-gc){:.post-link-reading} <rate5/> <content-meta>#programming #gc</content-meta>
- Bài viết rất hay. Thật ra đây là một concept chung cho các ngôn ngữ lập trình, không riêng gì Java. Mỗi ngôn ngữ có thể dùng các cơ chế dọn rác khác nhau... Cách tổ chức vùng nhớ ra các vùng *Eden, Survivor, Tenured* trong bài thì Java-specific. Tuy nhiên, cách phân hoạch và hành vi  như vậy giống như hành vi của *Copying collector* (cụ thể là *Generational collector*) nhỉ??
- Mình cũng có 1 bài note về các thuật toán GC: [Garbage Collection (GC) algorithms](https://trinhngocthuyen.github.io/2017-02-25-gc-algorithms.html), chủ yếu ghi vắn tắt từ một cái bài viết khác: [Visualizing Garbage Collection Algorithms](https://spin.atomicobject.com/2014/09/03/visualizing-garbage-collection-algorithms/).

[[7] Top mistakes in RxSwift you want to avoid](http://adamborek.com/top-7-rxswift-mistakes/){:.post-link-reading} <rate4/> <content-meta>#ios #rxswift</content-meta>
- #3 should be noticed!

[[6] Binary Frameworks in Swift](https://pspdfkit.com/blog/2018/binary-frameworks-swift/){:.post-link-reading} <rate4/> <content-meta>#ios #swift #ABI #compiler</content-meta>
- A knowledge-rich article! The big picture is to achieve *Source compatibility*, *Binary framework & runtime compatibility* (including *Module format stability* and *ABI stability*)... ABI stability enables using different libraries with different Swift versions. Once ABI stability is offered, developers will suffer less from Swift migration. Or we could use a pre-built components/libraries to speed up compile time (like what Carthage does).
- This feature (ABI stability) was supposed to introduced along with Swift 4. But it was deferred and very much expected in Swift 5.
- Read more at [Swift ABI Stability Manifesto](https://github.com/apple/swift/blob/master/docs/ABIStabilityManifesto.md)

[[5] The 3 Laws of TDD: Focus on One Thing at a Time](https://qualitycoding.org/3-laws-tdd/){:.post-link-reading} <rate4/> <content-meta>#ios #testing #tdd</content-meta>
- The core principle of these 3 laws is building software incrementally: do a bit of this, then a bit of that.
- Doing one thing at a time is a good way to prevent yourself from messing up. The more code you write, the less control you have. P/s: how *"one"* in *"one thing"* is conveyed really differs.

[[4] Scale or not scale](https://huydx.com/post/170305534289/scale-or-not-scale){:.post-link-reading} <rate5/> <content-meta>#scalability</content-meta>

[[3] Nghe nhanh: Overlock đôi tai đến 400%](https://www.ptcn.me/nghe-nhanh/){:.post-link-reading} <rate4/> <content-meta>#productivity #advice #personal-development</content-meta>
- Thú thật là mình không thường xuyên nghe sách nói hay podcasts, nên cũng ít xài kỹ thuật này. Nhưng khi xem video thì mình hay tua nhanh, 1.3x - 1.5x tuỳ video (nếu video Tiếng Việt thì có thể nhanh hơn). Nhờ cách này mà mình thấy bớt chán hơn, và xem video nhanh hơn. Chrome extension có thể hữu ích: [Video Speed Controller](https://github.com/igrigorik/videospeed).

[[2] Người quan sát](https://theringoteam.wordpress.com/2018/01/24/nguoi-quan-sat/){:.post-link-reading} <rate3/>
- TIL: *Actor-observer bias*.
- This explains why we are so harsh on others when they make mistakes whereas we tolerate ourselves (with the very same mistakes).
- This blog post somehow reminds me of a TED-Ed video *[Why is Herodotus called “The Father of History”?](https://www.youtube.com/watch?v=A542ixwyBhc)*... Prior to Herodotus, history was much biased by story tellers. Most of them tended to be exaggerated. Herodotus approached with a different way - by collecting evidences (from different sources). Although some of them may be biased, this method paved way for a revolutionized form of history which is more comprehensive.

[[1] Xây dựng thương hiệu bằng scandal có được không?](http://ngahodac.com/xay-dung-thuong-hieu-bang-scandal-co-duoc-khong/){:.post-link-reading} <rate3/>
- Bài viết này hẳn là ra đời dựa trên cái vụ của VietjetAir đón tiếp U23VN. Mình cũng cực kỳ thấy phản cảm với hình thức đón tiếp hết sức vô duyên này. Nhiều người lên tiếng trên mạng xã hội rằng họ sẽ tẩy chay hãng hàng không này vì nó bôi nhọ hình tượng dân tộc. Tuy nhiên, một cách thực tế mà nói thì phần lớn những người đã và đang chọn hãng này cũng sẽ vẫn chọn lại nó vì *"giá rẻ"*.

