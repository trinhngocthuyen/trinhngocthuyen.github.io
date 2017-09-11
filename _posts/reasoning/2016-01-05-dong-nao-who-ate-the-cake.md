---
layout: post
comments:   true
title:  "Động não: Who ate the cake?"
date:   2016-01-05 00:00:00
summary:    ""
tags:	logic brain-exercises
categories: [Reasoning]
---

*One day, a piece of cake meant for Eric went missing. His parents, Mr. and Mrs. Tan, suspected that one of his siblings ate the piece of cake and so questioned them. Here were their answers:*

*Alfred said,* ***“It wasn’t Charles. It was Darius.”***<br>
*Brenda said,* ***“It wasn’t Darius. It was Alfred.”***<br>
*Charles said,* ***“It wasn’t Brenda. It was Darius.”***<br>
*Darius said,* ***“It wasn’t Alfred. It wasn’t Charles.”***

*Exactly four of the eight statements were true. Who ate the piece of cake?*

*Trích: https://brilliant.org/problems/greedy-pig-detective-you-have-a-harder-time-now*

---
<br>

Để đơn giản, ta đặt tên các mệnh đề như sau:

*A = “It was Charles” –> “It wasn’t Charles” = not(A) (phủ định của A)*<br>
*B = “It was Darius” –>  “It wasn’t Darius” = not(B)*<br>
*C = “It was Alfred” –>  “It wasn’t Alfred” = not(C)*<br>
*D = “It was Brenda” –>  “It wasn’t Brenda” = not(D)*

Ở đây, trong 4 mệnh đề ***A, B, C, D***, chỉ có 1 mệnh đề đúng vì chỉ có một người đã ăn miếng bánh.

Theo đề, 4 trong tập 8 mệnh đề sau là đúng, 4 mệnh đề còn lại là sai:<br>
***S = { not(A), B, not(B), C, not(D), B, not(C), not(A) }***

S có thể chia thành 2 tập con:<br>
***S1 = { B, not(B), C, not(C) }***<br>
***S2 = { not(A), not(A), not(D), B }***

Dễ dàng nhận thấy, tập ***S1*** có đúng 2 mệnh đề đùng và 2 mệnh đề sai. Do đó tập ***S2*** cũng phải có đúng 2 mệnh đề đúng, 2 mệnh đề sai.

Ngoài ra, ***not(A)*** và ***not(A)*** cùng chân trị (cùng đúng hoặc cùng sai)–> ***not(D)*** và ***B*** cũng cùng chân trị.

Vì ***not(D)*** và ***B*** có cùng chân trị nên 1 trong 2 mệnh đề ***B, D*** sẽ có 1 mệnh đề đúng, 1 mệnh đề sai. Suy ra, ***A*** không thể đúng (theo điều kiện ở trên)

–> ***not(A) = Đúng***<br>
–> ***not(D) = B = Sai*** –> ***D = Đúng***<br>
–> Brenda là người đã ăn miếng bánh.