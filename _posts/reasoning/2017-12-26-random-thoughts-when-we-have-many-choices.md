---
layout: post
comments:	true
title:  "Tản mạn: Khi chúng ta có nhiều lựa chọn"
date:   2017-12-26 00:00:00
summary:    "Khi nói đến giải quyết vấn đề, người ta đôi khi dùng một cụm dài hơn là giải quyết vấn đề và ra quyết định (problem solving and decision making). Ta có thể hiểu việc giải bài toán thông qua hai hình thái: <br>(1) Từ không có lời giải -> có lời giải<br>(2) Từ có nhiều lời giải -> chọn ra lời giải tối ưu..."
tags:   reasoning decision-making
categories:	[Reasoning]
---

[1] Khi nói đến *giải quyết vấn đề*, người ta đôi khi dùng một cụm dài hơn là *giải quyết vấn đề và ra quyết định* (problem solving and decision making). Ta có thể hiểu việc giải bài toán thông qua hai hình thái:
- (1) Từ không có lời giải -> có lời giải
- (2) Từ có nhiều lời giải -> chọn ra lời giải tối ưu

Trường hợp thứ 2 chính là quá trình *ra quyết định*. Về cơ bản thì người ta sẽ cần một bộ *tiêu chuẩn đánh giá* để đưa ra quyết định. Mỗi tiêu chuẩn có một trọng số khác nhau, thể hiện mức độ quan trọng của tiêu chuẩn đó.

[2] Tuy nhiên, việc lựa chọn ra một giải pháp phù hợp trong số N giải pháp đã có không đơn giản như vậy. 
- Thứ nhất, công đoạn đưa ra bộ tiêu chuẩn đánh giá đúng đắn có thể chiếm đến 80% thời gian và công sức. *Và một bộ tiêu chuẩn như thế nào thì được coi là đúng đắn?* Bản thân mình thấy rằng việc trả lời những câu hỏi dạng *"như thế nào thì được coi là...?"* có thể khiến bạn đắm chìm trong một đại dương các câu hỏi khác liên quan. 
- Thứ hai, việc so sánh có thể không dễ dàng như so sánh toán học 1 < 2. Nó cảm tính, và đôi khi khó định lượng.

[3] Vì vậy, đôi khi có nhiều sự lựa chọn lại gây nhiều khó khăn hơn so với khi có ít lựa chọn. Chi phí cho việc đưa ra quyết định không chỉ bao gồm thời gian và công sức để đưa ra bộ tiêu chuẩn đánh giá, quá trình so sánh các lựa chọn; mà còn bao gồm cả chi phí cơ hội ta bỏ qua, sự tiếc nuối nếu ta chọn phải một phương án đem lại ít lợi ích hơn.

[4] Để hạn chế tình trạng này, một cách đơn giản và rõ ràng là: *giới hạn số lượng lựa chọn, hoặc gán các chọn lựa mặc định*. Chẳng hạn, bạn cảm thấy mệt mỏi vì mỗi sáng thức dậy phải chọn một bộ quần áo thích hợp để đi làm, thì có thể khiến mình bớt nhọc óc hơn bằng cách mua ít quần áo lại. Hoặc mặc định là thứ hai sẽ mặc bộ đồ này, thứ ba mặc bộ đồ kia...

Có lần mình đọc một [bài phỏng vấn Andrew Ng](http://labs.septeni-technology.jp/machine-learning/kham-pha-bo-oc-dang-sau-google-brain-andrew-ng-cuoc-doi-su-sang-tao-va-ca-nhung-that-bai/), một cây đại thụ trong lĩnh vực AI. Bài gốc bằng tiếng Anh có thể tìm thấy [ở đây](https://www.huffingtonpost.com/2015/05/13/andrew-ng_n_7267682.html). Ngoài những lời khuyên hữu ích mà Andrew chia sẻ, có một điểm mình rất ấn tượng; đó là thói quen mặc áo sơ mi xanh của ông. Thật ra, mình cũng để ý đến điều đó khi học khoá Machine Learning trên Coursera. Nhưng mình chỉ nghĩ rằng đó đơn thuần chỉ là sở thích cá nhân, hoặc do các videos được ghi trong cùng một (vài) ngày.
> "For myself, one of the habits I have is working out every morning for seven minutes with an app. I find it much easier to do the same thing every morning because it’s one less decision that you have to make. It’s the same reason that my closet is full of blue shirts. I used to have two color shirts actually, blue and magenta. I thought that’s just too many decisions. [Laughter] So now I only wear blue shirts."<br> - Andrew Ng -

[5] Nói chung, cái post này ra đời do một lần một so sánh hai thư viện mã nguồn mở (open-source libraries), gọi là A và B, cùng giải quyết chung một vấn đề. Cả hai đều khá phổ biến. A thì danh sách tính năng mà nó hỗ trợ ít hơn, trong khi cái kia (B) thì hỗ trợ tận răng. Hầu như những thứ mà bạn cần đều có sẵn, vấn đề còn lại chỉ là google đúng từ khoá, tìm đúng concept và sử dụng đúng cách. Do đó, nếu chọn B thì sẽ tốn thêm chi phí học concepts mới. Nếu project làm chung với nhiều người thì sẽ mất thêm thời gian, công sức phổ cập những thứ mình đã học nữa. Ngoài ra, vì B hỗ trợ nhiều quá, nên nhiều trường hợp mình có N cách code khác nhau để cùng ra một kết quả. Khi đó, ta phải giải thêm 1 bài toán phụ là: đưa ra coding convention hay best practice cho nó. Cũng đau khổ tương tự việc đặt tên biến (lol).

Dĩ nhiên, kết quả chọn A hay B sẽ còn phụ thuộc vào rất nhiều yếu tố khác. Nhưng ta có thể thấy rằng, bản thân việc lựa chọn đã là một vấn đề. Nhưng khi giải xong thì nội tại của nó lại phát sinh thêm những vấn đề khác nữa.

> "Cuộc đời là một chuỗi các vấn đề cần giải quyết, một chuỗi các quyết định cần phải ra"<br>- Thầy Phan Dũng -
