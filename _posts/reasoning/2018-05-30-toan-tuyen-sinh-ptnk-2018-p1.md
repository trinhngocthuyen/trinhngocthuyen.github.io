---
layout: post
comments:	true
title:  "Toán: Tuyển sinh PTNK 2018 (p1)"
date:   2018-05-30 00:00:00
summary:    "Cùng giải đề thi tuyển sinh (vào lớp 10 chuyên Toán) Phổ Thông Năng Khiếu, năm 2018 nào. Trong đề có một câu bất đẳng thức như sau..."
tags:   maths
categories:	[Reasoning]
---

Cùng giải đề thi tuyển sinh (vào lớp 10 chuyên Toán) Phổ Thông Năng Khiếu, năm 2018 nào. Trong đề có một câu bất đẳng thức như sau:

> Bài 2 (2đ): Cho $a, b$ là 2 số nguyên thỏa mãn $a^3 + b^3 > 0$\\
a) Chứng minh rằng $a^3 + b^3 \geq a + b > 0$\\
b) Chứng minh rằng $a^3 + b^3 \geq a^2 + b^2$\\
c) Tìm tất cả các bộ số nguyên $x, y, z, t$ sao cho $x^3 + y^3 = z^2 + t^2$ và $z^3 + t^3 = x^2 + y^2$

#### Lời giải

a) Điều kiện $a^3 + b^3 > 0 $ tương đương với $a^3 > (-b)^3$ $\implies a > -b \implies a + b > 0$

Giờ ta cần chứng minh $a^3 + b^3 \geq a + b$, hay $S = a^3 + b^3 - (a + b) \geq 0$.

Vai trò của $a$ và $b$ như nhau nên bài toán không mất tính tổng quát khi ta giả sử $a \geq b$.

\- TH1: Nếu $b \geq 0$ thì $a^3 \geq a, b^3 \geq b$ (vì $a$, $b$ là 2 số nguyên không âm). Suy ra $a^3 + b^3 \geq a + b$.

Dấu bằng xảy ra khi $a, b \in \\{0, \pm 1\\}$

\- TH2: Nếu $b < 0$. Đặt $c = -b$ với $a \geq c \geq 1$.

Khi đó $S = a^3 - c^3 - (a - c) = (a - c)(a^2 + c^2 + ac - 1) = (a - c) P$

Vì $(a - c + 1)^2 \geq 0$ nên $a^2 + c^2 + 1 - 2ac + 2a - 2c \geq 0$\\
$\implies (a^2 + c^2 + ac - 1) - 3ac + 2a - 2c + 2 \geq 0$\\
$\implies P \geq 3ac - 2a + 2c - 2 = ac + 2(a + 1)(c - 1)$\\
$\implies P > 0 \txt{(vì } a \geq c \geq 1 \txt{)}$

Suy ra $S \geq 0$. Dấu bằng xảy ra khi $a = c$. Lúc này $a^3 = a \implies a = c = 0, \pm 1$

Gộp cả hai điều kiện ta rút ra kết luận: bất đằng thức được chứng minh và dấu bằng xảy ra khi $a, b \in \\{0, \pm 1\\}$ $\quad\blacksquare$.

...

b) Lập luận tương tự câu a). Đối với trường hợp $b < 0$ thì xét $(a - c)^2 + (a - c) \geq 0$.

Dấu đẳng thức xảy ra khi $a, b \in \\{0, 1\\}$.

...

c) Sử dụng kết quả của câu b), ta có:

$x^3 + y^3 \geq x^2 + y^2= z^3 + t^3 \geq z^2 + t^2$

Dấu bằng xảy ra khi $x, y \in \\{0, 1\\}$ và $z, t \in \\{0, 1\\}$. Thế vào được các nghiệm:

$(0, 0, 0, 0), (1, 1, 1, 1), (0, 1, 0, 1), (0, 1, 1, 0), (1, 0, 0, 1), (1, 0, 1, 0)$.

