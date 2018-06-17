---
layout: post
comments:	true
title:  "Định lý cuối cùng của Fermat"
date:   2017-12-08 00:00:00
summary:    Khoảng 5-6 tháng trước mình xem một bộ phim tài liệu có tựa đề "BBC - Horizon - 1996 - Fermat’s Last Theorem". Đây là một câu chuyện về lịch sử toán học mà mình thấy rất hay nên muốn chia sẻ lại. Fermat là một nhà toán học người Pháp. Ông có nhiều đóng góp quan trọng trong lý thuyết số (number theory). Một trong số đó là định lý Fermat lớn, hay định lý cuối cùng của Fermat (Fermat’s Last Theorem).
tags:   maths science
categories:	[Misc]
---

Khoảng 5-6 tháng trước mình xem một bộ phim tài liệu có tựa đề [*BBC - Horizon - 1996 - Fermat's Last Theorem*](http://www.dailymotion.com/video/x223gx8). Đây là một câu chuyện về lịch sử toán học mà mình thấy rất hay nên muốn chia sẻ lại.

[Fermat](https://en.wikipedia.org/wiki/Pierre_de_Fermat) là một nhà toán học người Pháp. Ông có nhiều đóng góp quan trọng trong lý thuyết số (number theory). Một trong số đó là định lý Fermat lớn, hay định lý cuối cùng của Fermat (Fermat's Last Theorem). Để cho tiện, mình sẽ gọi nó là định lý Fermat.

Trong cuốn sách *Arithmetica* của Diophantus, Fermat đã ghi trên đó phát biểu định lý như sau:
> It is impossible to separate a cube into two cubes, or a bigquadrate into two bigquadrates, or in general any power higher than the second into two powers of like degree; I have discovered a truly remarkable proof which this margin is two small to contain.<br> - Dịch từ bản gốc, viết bằng chữ Latin - 

Diễn đạt theo công thức toán học của định lý này rất đơn giản: *không tồn tại nghiệm nguyên dương cho phương trình
$x^n + y^n = z^n$ với $n > 2$.*

Mặc dù vậy, không có bản thảo chứng minh nào của Fermat được tìm thấy. Nhiều người cho đến bây giờ vẫn tin rằng Fermat đã thực sự không có lời giải cho định lý mà ông đã phát biểu.

Trong suốt hai thế kỷ tiếp sau đó, bài toán này đã thách đố nhiều bộ óc của các nhà toán học trên thế giới. Nhưng chỉ có một vài trường hợp đặc biệt ($n=3,4,5,6,7$) được chứng minh. Bài toán ít được chú ý dần.

### Tiền đề

Một cột mốc quan trọng trong quá trình chứng minh định lý hóc búa này là khi [giả thuyết Shimura-Taniyama](http://mathworld.wolfram.com/Taniyama-ShimuraConjecture.html) (Shimura-Taniyama conjecture) được đề xuất vào năm 1955. Giả thuyết này xây dựng cầu nối giữa 2 dòng nghiên cứu tách biệt nhau: đường cong elliptic (elliptic curves) và dạng modular (modular forms). Mặc dù các nhà toán học bấy giờ tin rằng giả thuyết này đúng, vẫn chưa có ai chứng minh được.

Đến năm 1986, [Ken Ribet](https://en.wikipedia.org/wiki/Ken_Ribet), một nhà toán học người Mỹ, công bố một chứng minh dựa trên nghiên cứu của Gerhard Frey (người Đức) trước đó. Kết quả này đưa đến một mối liên hệ giữa giả thuyết Shimura-Taniyama và bài toán Fermat. Một cách cụ thể, nếu giả thuyết Shimura-Taniyama được chứng minh thì định lý Fermat cũng được chứng minh.

### Andrew Wiles

[Andrew Wiles](https://en.wikipedia.org/wiki/Andrew_Wiles) (1953) là một nhà toán học người Anh. Ông lần đầu biết đến định lý Fermat lúc mới 10 tuổi, ở một thư viện địa phương. Ông cũng đã bỏ công ra chứng minh, nhưng tạm gác lại vì không đủ công cụ.

Mãi về sau, khi Andrew Wiles khi nghe tin về công bố của Ribet, ông đã bỏ nghiên cứu hiện tại và dành 7 năm tiếp theo cho bài toán này. Ông giữ công việc này bí mật, và chẳng ai biết ông đang nghiên cứu về cái gì. 

Cuối cùng, vào năm 1993, Wiles đã hoàn tất bản chứng minh của mình. Trong một hội nghị toán học ở Cambridge, Wiles có 3 buổi thuyết trình về lý thuyết số. Buổi cuối cùng, sau khi giới thiệu về một kỹ thuật sử dụng trong chứng minh của mình, ông ghi trên bảng phát biểu của định lý Fermat, và nói *"Tôi nghĩ là tôi đã chứng minh được nó rồi"*.

Những ngày sau đó, báo giới đồng loạt đưa tin về sự kiện này. Cuối cùng thì sau ba thế kỷ, bài toán của Fermat cũng đã có lời giải. 

Tuy nhiên...

Bài báo của Wiles được gửi cho các chuyên gia phản biện. Trong quá trình đọc và dò xét, [Nick Katz](https://en.wikipedia.org/wiki/Nick_Katz), 1 trong số những người phản biện, phát hiện ra một lỗi cơ bản trong bản chứng minh. Wiles đã dành cả mùa thu đó để chỉnh sửa, nhưng không thành. Đã có nhiều lời kêu gọi giúp đỡ nhưng ông từ chối công bố bản chứng minh (có lỗi) của mình. Cuối cùng, vào tháng 9 năm 1994, trước khi quyết định công bố bản chứng minh chưa hoàn thiện này, ông đã giải được nút thắt vấn đề. Lời giải lại chính là cách tiếp cận mà ông đã bỏ mặc 3 năm trước đó. Bài báo của Wiles được xuất bản vào năm 1995.

### Bình luận

Đây được xem là một thành tựu to lớn trong lý thuyết số lúc bấy giờ, không phải bởi ứng dụng của định lý Fermat, mà bởi những công cụ toán học ra đời để chứng minh nó. Thật đáng tiếc khi Wiles đã không sửa chửa được bản chứng minh lỗi sớm hơn vì khi hoàn thành xong bản chứng minh đúng của mình, ông đã bước qua tuổi 41 và quá hạn về độ tuổi cho giải thưởng Fields. Nếu không thì có lẽ ông đã dành được giải thưởng cao quý này rồi.

Một bài toán với phát biểu đơn giản đến thế, nhưng mãi tới ba trăm năm sau mới giải được. Riêng đối với Andrew Wiles thì đã dành ngót nghét chục năm cho bài toán được xem là không giải được này.

Chứng minh của Andrew Wiles bao gồm nhiều công cụ toán học, nhiều khái niệm mà thời của Fermat lúc bấy giờ không có. Do đó, mặc dù có người nghĩ rằng có thể Fermat đã giải được bài toán bằng một cách nào đó, nhiều người vẫn đặt dấu chấm hỏi cho tuyên bố của Fermat rằng ông đã thực sự chứng minh được nó.

### Tham khảo
[1] [BBC - Horizon - 1996 - Fermat's Last Theorem](www.dailymotion.com/video/x223gx8)<br>
[2] [Fermat's Last Theorem: The Whole Story](https://simonsingh.net/books/fermats-last-theorem/the-whole-story)
