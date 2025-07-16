---
title: SVM
date: 2024-06-13
summary: 介绍了SVM的推到，设计到
tags: [SVM]
category: 机器学习
comments: true
draft: false
sticky: 0
---

## 简述

支持向量机（SVM）是一个二分类模型 找到一个超平面使得数据到这个超平面的距离最大化 实现样本分类和预测

## 原理推导

### 问题重述

对于数据集$D={(X_{i}, y_{i})}, y_{i}\in{1, -1}$, 希望找到一个划分超平面

$$
W^Tx+b=0
$$

其中$W=(w_{1}, w_{2}, ... , w_n)$为超平面法向量，$b$ 为位移项  
任意点$(X_{i}, y_i)$到平面的距离都为  
$$r=\frac{|W^{T}x+b|}{||w||}$$
任意点的距离，无论是在超平面上方($y_{i}=1$) 还是在超平面的下方($y_i=-1$)，都有$|W^{T}x + b|=y_{i}(W^{T}x+b)$ [^$y_{i}的正负$]  
则原式为  
$$r=\frac{y_{i}(W^{T}x+b)}{||w||}$$

同时我们可以根据缩放和平行  
将经过支持向量且与超平面平行的面的方程设为[^平移转换]

$$
W^{T}x+b=1
$$

即经过缩放 `支持向量`到超平面的距离为1 则有$$r \geq \frac{1}{||w||}$$  
此时 我们知道正负的距离相等时才是我们希望的情景，因此有

$$
\rho_{sum} = \rho_++\rho_{-}=2r
$$

故我们有目标方程

$$
\max{r_{sum}=\frac{2}{||w||}} \quad s.t.y_i(W^{T}x+b)\geq1, \ i =1,2,...m
$$

等价于

$$
\min{\frac{1}{2}||w||^2} \quad s.t.y_i(W^{T}x_{i}+b)\geq1, \ i =1,2,...m
$$

这里经过[SVM](https://zhuanlan.zhihu.com/p/49331510)的过程转化为拉格朗日函数

$$
	L(w,b,\alpha)=\frac{1}{2}||w||^{2}+\sum\limits^{m}_{i=1}\alpha_{i}(1-y_{i}(w^Tx_{i}+b))
$$

对$w$和$b$求导，偏导为0

$$
w=\sum\limits_{i=1}^{m}\alpha_{i}y_{i}x_{i}
$$

$$
\sum\limits_{i=1}^{m}\alpha_{i}y_{i}=0
$$

代入后求出结果  
$$max_{\alpha} \sum\limits_{i=1}^{m}\alpha_{i}-\frac{1}{2}\sum\limits_{i=1}^{m}\sum\limits_{j=1}^{m}\alpha_{i}\alpha_{j}y_{i}y_{j}x_{i}^{T}x_{j}$$
$$s.t. \sum\limits_{i=1}^{m}\alpha_{i}y_{i}=0,\alpha_{i}>=0, i=1,...,m$$
解除$\alpha$ 即可得到模型

### 软间隔

经典svm是将所有样本都正确分类，但在一些比较特殊的情况下，完全分类并不是最理想的结果，有时样本根本就不是线性可分的，因此需要有一个软间隔的svm

$$
min_{m,b} \frac{1}{2}\|w\|^{2}+C\sum\limits_{i=1}^{m}l_{0or1}(y_{i}(w^{T}x_{i}+b)-1)
$$

$$
l_{0or1}(z)=
\begin{cases}
    1, & \text{if } z < 0 \\
    0, & \text{} ortherwise
\end{cases}
$$

当C是正无穷时，就是经典的svm，但这个$l$的数学性质不太好 不可导且不连续  
使用$hinge$函数代替  
原式变为  
$$min_{m,b} \frac{1}{2}\|w\|^{2}+C\sum\limits_{i=1}^{m}max(0,1-y_{i}(w^{T}x_{i}+b))$$
令$\xi_{i}$ 为$max(0,1-y_{i}(w^{T}x_{i}+b))$
则原式的拉格朗日方程

$$
L(w,b,\alpha,\xi,\mu)=min_{m,b} \frac{1}{2}\|w\|^{2}+C\sum\limits_{i=1}^{m}max(0,1-y_{i}(w^{T}x_{i}+b))
$$

$$+\sum\limits_{i+1}^{m}\alpha_{i}(1-\xi_{i}-y_{i}(w^{T}x_{i}+b))-\sum\limits_{i=1}^{m}\mu_{i}\xi_{i}$$
其中$\alpha_{i},\mu_{i}>=0$为拉格朗日乘子
对$w,b,\xi_{i}$的偏导为0得到
$$w=\sum\limits_{i=1}^{m}\alpha_{i}y_{i}x_{i}$$
$$\sum\limits_{i=1}^{m}\alpha_{i}y_{i}=0$$
$$C=\alpha_{i}+\mu_{i}$$
代入得到

$$
max_{\alpha} \sum\limits_{i=1}^{m}\alpha_{i}-\frac{1}{2}\sum\limits_{i=1}^{m}\sum\limits_{j=1}^{m}\alpha_{i}\alpha_{j}\alpha_{i}\alpha_{j}x_{i}^{T}x_{j}
$$

$$s.t. \sum\limits_{i=1}^{m}\alpha_{i}y_{i}=0,C>=\alpha_{i}>=0, i=1,...,m$$

1. 对于所有的支持向量（位于间隔边界上的训练样本）：
   - $y_i(\mathbf{w}^T\mathbf{x}_i + b) - 1 + \xi_i = 0$，$\xi_i$是松弛变量（Slack Variable）上文$\xi_{i}$ 为$max(0,1-y_{i}(w^{T}x_{i}+b))$。这个等式表示支持向量满足间隔边界上的约束条件。
2. 对于所有的非支持向量（位于间隔边界以内的训练样本）：
   - $y_i(\mathbf{w}^T\mathbf{x}_i + b) - 1 + \xi_i \geq 0$，$\xi_i$是松弛变量（Slack Variable）。这个不等式表示非支持向量满足间隔边界以内的约束条件。
3. 松弛变量和拉格朗日乘子的关系：- $\alpha_i \geq 0$，$\mu_i \geq 0$，$\alpha_i \left(y_i(\mathbf{w}^T\mathbf{x}_i + b) - 1 + \xi_i\right) = 0$，$\mu_i\xi_i = 0$，其中$\alpha_i$是拉格朗日乘子（Lagrange Multiplier），$\mu_i$是松弛变量的拉格朗日乘子（Lagrange Multiplier）。这个关系表示拉格朗日乘子和松弛变量之间的约束条件。

简单来说，KKT条件要求在最优解下，支持向量满足间隔边界上的约束条件，非支持向量满足间隔边界以内的约束条件，并且拉格朗日乘子和松弛变量之间存在一定的关系。

- 核函数
  用于将输入数据从原始特征空间映射到一个高维特征空间，从而使得在原始特征空间中线性不可分的问题在高维特征空间中变得线性可分。

$$
[ \nabla_w L(w, b) = \begin{cases}
\frac{1}{n} \sum_{i=1}^{n} -y_i x_i + \lambda w & \text{if } y_i (w \cdot x_i + b) < 1 \
\lambda w & \text{otherwise}
\end{cases} ]
$$

[参考yemaolin](https://blog.csdn.net/weixin_62264287/article/details/131396018)  
[svm视频](https://www.bilibili.com/video/BV1TP411U7dH)

[^$y_{i}的正负$]:
    当$W^{T}x+b>0$时，$y_{i}>0$，$W^{T}x+b<0$时，$y_{i}<0$  
    [^平移转换 ]: 设原方程为$W^{T}x+b=\delta$ 则有$\frac{W^{T}}{\delta}x+\frac{b}{\delta}=1$ 同时令$W=\frac{W^{T}}{b}$ ,$b=\frac{b}{\delta}$ 即可得到原式
