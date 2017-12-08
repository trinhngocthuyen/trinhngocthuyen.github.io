---
layout: post
comments:	true
title:  "Reading: Week 49, Dec 04 - Dec 10"
date:   2017-12-04 00:00:00
summary:    ""
tags:   reading
categories:	[Reading]
---

### Dec 08, 2017
- [When Not to Use an Enum](http://matt.diephouse.com/2017/12/when-not-to-use-an-enum) <post-content-tag>#enum #analytics #ios</post-content-tag><br>
--> I share the same point with Matt that `enum` in this case is not a good choice. By using `struct` as Matt suggested, the code becomes more abstract. In the original post of Sundell, `AnalyticsManager` highly depends on concrete. Another option we could think of is to use `enum` is to use different analytics tracker for each workflow. For instance, for login flow, we have `LoginAnalyticsTracker` and `LoginAnalyticsEvent`. With this approach, we achieve both separation of responsibilities, and abstraction (protocol-based).


### Dec 07, 2017
- [Những câu chuyện trên máy bay](http://tapbut.ngochieu.com/nhung-cau-chuyen-tren-may-bay) <post-content-tag>#tapbut</post-content-tag><br>
--> Lâu rồi mới thấy anh Hiếu viết bài. Đây là một bài viết nhẹ nhàng, nhưng mình đọc thấy rất thích. Có 2 thể loại viết khiến mình đọc vào có 1 cảm hứng dồi đào. Một là thể loại mind-blowing, giống như *Thinking fast and slow*, *Phi lý trí* và sách của thầy Phan Dũng. Thể loại thứ hai là những mẫu chuyện (nhỏ) xoay quanh cuộc sống thường nhật, được ghi lại bởi những cái nhìn tinh tế, như cái bài viết trên :D.

- [Why Women Should Lead our A.I. Future](https://medium.com/intuitionmachine/why-women-should-lead-our-a-i-future-8a0b7085ffc5) <post-content-tag>#AI</post-content-tag><br>
--> Thật ra mình không đồng ý hẳn với quan điểm của tác giả bởi *"Ở đâu cũng có anh hùng, ở đâu cũng có người khùng người điên"*. Tuy nhiên, có một luận điểm mình thấy thuyết phục (bạn có thể thấy không thuyết phục):
> The reason for this is that women have a greater intuitive understanding of what makes us all human. Women have a natural inclination to focus on the important things that make us human. To maximize the benefit of AI technology we must focus on how AI improves our humanity and therefore we need to understand, at the very least, what makes us human and not what makes us machines.

- [Distance oracle – Truy vấn nhanh khoảng cách giữa hai điểm bất kỳ trên đồ thị](https://ongxuanhong.wordpress.com/2017/12/05/distance-oracle-truy-van-nhanh-khoang-cach-giua-hai-diem-bat-ky-tren-do-thi) <post-content-tag>#data-science</post-content-tag><br>
--> Post này có hàm lượng lý thuyết cao :). Bài này mình chọn hiểu phần mở đầu và kết luận của post, còn phần chi tiết trong slides thì mình chưa hiểu và cũng chưa định hiểu. Tóm váy lại là với bài toán truy vấn khoảng cách trên đồ thị thì việc những cấu trúc dữ liệu thông thường sẽ cho kém hiệu quả (thậm chí bất khả thi) đối với dữ liệu lớn. *Distance oracle* là một cấu trúc dữ liệu cho ra kết quả xấp xỉ nhưng đem lại lợi ích lớn về mặt không gian lưu trữ và thời gian truy vấn. Xấp xỉ này được kiểm chứng trên các dataset thực tế, và cho thấy sai lệch không đáng kể.


### Dec 06, 2017
- [Advice to aspiring data scientists: start a blog](http://varianceexplained.org/r/start-blog) <post-content-tag>#data-science #blogging #advice</post-content-tag><br>
--> Typical advice. Not only for data scientists, but also for software engineers, designers, or anyone. I really love the [pic](https://twitter.com/AmeliaMN/status/926509282874585089/photo/1) in the post. My personal experience: blogging has brought me lots of joy. The moment when you publish a post after dayssss writing is so good.

- [http://blogs.tedneward.com/patterns/builder](http://blogs.tedneward.com/patterns/builder) <post-content-tag>#ios #design-pattern</post-content-tag><br>
--> In short, *Builder* design pattern is useful for create an object constructed by different parts, and the construction process of that object is non-trivial.

### Dec 04, 2017
- [Đọc cái gì, và đọc ở đâu](https://thefullsnack.com/posts/the-source-of-knowledge.html) <post-content-tag>#reading</post-content-tag><br>
--> Một cái post nhẹ nhàng, dí dỏm cho đầu tuần. Tóm lại cái post này nêu ra 2 luận điểm chính. Thứ nhất, các "thánh" đều có bí quyết của riêng mình. Bí quyết của thánh này có thể trái ngược với các thánh khác. Có người học theo kiểu giải trí, có người học theo lối cày quốc. *Quan trọng nhất là xác định cái mình muốn học*. Luận điểm thứ 2, tác giả nêu ra một số nguồn thông tin hữu ích, bao gồm blogs, wiki, sách, bài báo...<br>

- [The Story Behind “anyone can login as root” Tweet](https://medium.com/@lemiorhan/the-story-behind-anyone-can-login-as-root-tweet-33731b5ded71)<br>
--> The tweet went viral last week. The tweet poster was not the one who discovered it, just the one who spread the news. In fact, the issue had been around for more than a week.
