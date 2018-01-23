---
layout: post
comments:	true
title:  "Tản mạn: Câu hỏi tồi hay là sự hời hợt"
date:   2018-01-23 00:00:00
summary:    "Có nhiều lần mình thấy có người hỏi những câu hỏi khiến mình đọc vào chẳng muốn trả lời (nếu có khả năng trả lời). Một ví dụ điển hình là “anh ơi, sao cái này em build không được?”. Bản thân mình cảm thấy đây là một câu hỏi rất chung chung và thiếu thông tin. Nếu bạn là dev thì hẳn là bạn đã phải sấp mặt với những cái bugs mà ta phải chửi bới cả tiếng đồng hồ con bọ (bugs) mới nghe điếc lỗ tai mà chui ra ngoài. Đó là khi ta có đầy đủ thông tin. Còn thiếu thông tin như trên thì… ta chỉ biết cách ra ngoài vườn bắt con bọ mà tra khỏi xem đồng bọn của nó ở đâu trong cái mớ code của mình."
tags:   problem-solving questioning
categories:	[Reasoning]
---

Có nhiều lần mình thấy có người hỏi những câu hỏi khiến mình đọc vào chẳng muốn trả lời (nếu có khả năng trả lời). Một ví dụ điển hình là *"anh ơi, sao cái này em build không được?"*. Bản thân mình cảm thấy đây là một câu hỏi rất chung chung và thiếu thông tin. Nếu bạn là dev thì hẳn là bạn đã phải sấp mặt với những cái bugs mà ta phải chửi bới cả tiếng đồng hồ con bọ (bugs) mới nghe điếc lỗ tai mà chui ra ngoài. Đó là khi ta có đầy đủ thông tin. Còn thiếu thông tin như trên thì... ta chỉ biết cách ra ngoài vườn bắt con bọ mà tra khỏi xem đồng bọn của nó ở đâu trong cái mớ code của mình.

[1] Trong giải quyết vấn đề, *nếu bạn phát biểu rõ vấn đề của mình là đã giải được 50% bài toán rồi*. Nói vậy là để cho thấy tầm quan trọng của việc hiểu và trình bày vấn đề. Giống như Toán học, việc phát biểu phải nêu bật được 2 phần ***giả thiết*** và ***kết luận***. 
- *Kết luận* chính là mục đích cần đạt (mà bạn không đạt được). Ví dụ, bạn muốn chương trình được build thành công, nhưng thực tế trình biên dịch lại báo lỗi.
- *Giả thiết* là những thông tin cho sẵn, là ngữ cảnh của bài toán. Ví dụ, để chạy được thành công bạn phải làm `A -> B -> C`, nhưng trên thực tế bạn chỉ làm `A -> C`.

Như vậy, câu hỏi *"anh ơi, sao cái này em build không được?"* chỉ mới nêu lên được kết luận, chứ chưa nêu đầy đủ giả thiết của bài toán. Dĩ nhiên trong một số trường hợp, ta không cần phải nêu ra giả thiết vì nó được ngầm hiểu. Ví dụ, *"một cộng một bằng mấy?"* thì ta ngầm định rằng *một* ở đây là con số 1 trong Toán, chứ không phải thằng nào hay con nào có tên là Một cả.

[2] Đặt trong ngữ cảnh bạn đi hỏi để tìm kiếm sự giúp đỡ từ bên ngoài, thì việc truyền đạt thông tin đến người khác một cách đầy đủ lại càng quan trọng hơn. Những thông tin ấy có để được truyền đạt thông qua text (mô tả xem nó bị gì), hình ảnh (chụp hình cái mà bạn cho là lỗi), clip (quay lại quá trình reproduce lỗi)...

Nên nhớ rằng, trong trường hợp này bạn đang ở vị thế thấp hơn so với những người có thể giúp bạn. Không giống như loại câu hỏi chỉ quan tâm đến kết luận của sếp (vì sếp có vị thế cao hơn). Việc hỏi những câu như trên chỉ tổ khiến người ta có ít thiện cảm với mình hơn.

[3] Thông thường, khi nhờ người khác hỗ trợ, bạn giao tiếp với người đó thông qua một cuộc hội thoại face-to-face, hoặc offline discussion (cái comment thread của Facebook là một ví dụ điển hình).
- ***Face-to-face conversation*** thì nhanh và tức thời, nên người ta có thể hỏi lại bạn dần dần để làm rõ thông tin. Giống như bác sỹ bắt mạch cho bệnh nhân; nếu bệnh nhân trả lời chung chung kiểu *"tôi thấy mệt trong người"* thì ổng sẽ không gằn dọng nói *"không mệt thì đi khám chi!"*, mà ổng sẽ hỏi thêm *"mệt chỗ nào? bị lâu chưa?"*.
- Trái lại, ***Offline conversation*** thì chậm và có độ trễ (ví dụ 3 tiếng sau người ta mới phản hồi). Cho nên cố gắng trong một lần, bạn truyền tải đầy đủ thông tin chút xíu.

[4] Ở một công ty nọ mình làm, nhiều lần bạn bè hay mấy đứa em mình hay nhờ mình support (ví dụ: debug giùm), mình luôn luôn hỏi: *"anh/em/mày/ông đã điều tra được gì rồi"* mà câu trả lời có thể tóm tắt lại thành *"(dạ) chưa"*, thì cả nguồn sống sẽ bỗng chốc thu bé lại thành một nếp nhăn trên trán mình (Đùa thôi chứ mình không khó ưa đến thế đâu). Một câu trả lời mình muốn nghe nhất sẽ có dạng như sau:
> "Mình expect là [...] nhưng thực tế thì [...].<br>
> Mình đã thử [...] nhưng [...].<br>
> Search stackoverflow/google thì [...].<br>
> À, có một điểm kỳ lạ là [...].<br>
> Mình có dùng [...], không biết có ảnh hưởng ko.<br>
> Mặc dù chưa có căn cứ cụ thể, nhưng mình phán đoán rằng [...]"

Tương tự, có một cái FB group kia, lâu lâu mình thấy có một vài thanh niên post lên *"Mọi người giúp với, em build cái này bị lỗi hoài."*. Cho năm trăm đồng hình ảnh cái lỗi đó là gì có phải hơn ko 😤.

[5] Vì sao lại có sự hời hợt này? 
- *Lười*: Có tâm thì chịu mất sức/thời gian.
- *Được nuông chiều*: Có thể một phần do bạn thường nhận được câu trả lời cho những trường hợp như vậy nên cứ thế mà hỏi. 
- *Bị "lây nhiễm"*: Bạn thấy người khác hay hỏi vậy, nên bạn cũng làm tương tự.


