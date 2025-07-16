---
title: 【机器学习】- LPP
date: 2024-05-17
summary: 介绍了LPP的推导
tags: [LPP, 降维算法]
category: 机器学习
comments: true
draft: false
sticky: 0
---

[原论文](https://proceedings.neurips.cc/paper_files/paper/2003/file/d69116f8b0140cdeb1f99a4d5096ffe4-Paper.pdf)
[详解博客](https://blog.csdn.net/qq_39187538/article/details/90402961)

LPP是无监督学习 意图根据`权重矩阵`来在降维过程中尽量保持相邻数据点的距离，，以便在低维空间中保持数据的局部邻接关系

## 前置

数据集$X \in R^{d * n}$
降维后数据集$Y \in R^{r * n}$
对于$x_i$转换后的数据$y_i$ 有

$$
y_{i} = A^{T}x_{i}
$$

## 推导

首先，我们将数据表示为一个图，其中每个节点代表一个数据点，边表示数据点之间的邻接关系。可以通过k近邻（k-nearest neighbors）或ε-邻域（ε-neighborhood）来确定邻接关系，并用权重矩阵$W$表示这些关系。

#### k近邻方法

对于k近邻方法，首先需要选择一个合适的参数 $k$，表示每个样本的邻近样本个数。然后，对于每个样本，找出与其距离最近的 $k$ 个样本，将这些样本视为其邻居。根据邻居关系构建权重矩阵，常见的方法是将邻居的权重设为1，非邻居的权重设为0或者根据距离赋予不同的权重值。

#### $\epsilon$-邻域方法

对于$\epsilon$-邻域方法，我们需要选择一个合适的参数 $\epsilon$，表示一个样本的邻域半径。对于每个样本，找出距离该样本在半径 $\epsilon$ 内的所有样本，将这些样本视为其邻居。根据邻居关系构建权重矩阵，方法与k近邻类似，可以将邻居的权重设为1，非邻居的权重设为0或者根据距离赋予不同的权重值。

$$
\begin{aligned}
W_{i,j} = \begin{cases}
	\frac{1}{n}, &\|x_{i} - x_{j}\| \lt \epsilon, \\
     0 & \text{ortherwise}
 \end{cases}
\end{aligned}
$$

当$\epsilon$为正无穷时 等价于PCA

我们希望保持其局部位置信息
有待优化函数

$$
\begin{aligned}
&\frac{1}{2}\sum\limits_{i,j}\|y_{i}-y_{j}\|^{2}W_{ij} \\
&=\frac{1}{2}\sum\limits_{i,j}\|A^{T}x_{i}-A^{T}x_{j}\|^{2}W_{ij} \\
&=\sum\limits_{i}(A^{T}x_{i}D_{ii}x_{i}^{T}A)-\sum\limits_{ij}(A^{T}x_{i}W_{ij}x_{i}^{T}A) \\
&=A^{T}X(D-W)X^{T}A=A^{T}XLX^{T}A \\
\end{aligned}
$$

其中$D_{i,i} = \sum\limits_{j}^{n}W_{i, j}$
有最终待优化式

$$
\begin{aligned}
argmin_{A} A^{T}XLX^{T}A \\
s.t. \ A^{T}XDX^{T}A=I
\end{aligned}
$$

拉格朗日数乘法

$$
XLX^{T}A=\lambda XDX^TA
$$

求解$(XDX^T)^{-1}XLX^T$的前k个特征向量即所求投影矩阵

$$
XLX^{T}A=\lambda A
$$
