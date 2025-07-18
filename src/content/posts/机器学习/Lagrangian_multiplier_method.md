---
title: 【机器学习】- Lagrangian multiplier method
date: 2024-06-02
summary: 通过图像可以更加直观的看到拉格朗日乘数法本质上的原理
tags: [数学, 机器学习]
category: 机器学习
comments: true
draft: false
sticky: 0
---

## 拉格朗日介绍

拉格朗日乘数法是用于在**有约束条件下**寻找**函数极值**的一种方法。

假设我们有一个目标函数 $f(x, y)$ 需要优化，同时有一个约束条件 ( $g(x, y) = 0$。
即 $$min_{x,y} f(x, y) \ s.t. g(x, y) = 0$$  
这里min也可以是max 同理  
构建**拉格朗日函数** $$L(x, y, \lambda) = f(x, y) + \lambda g(x, y)$$  
分别对$x, y, \lambda$求导

$$
\begin{aligned}
&\frac{\partial L}{\partial x} = \frac{\partial f}{\partial x} + \lambda \frac{\partial g}{\partial x} = 0 \\
&\frac{\partial L}{\partial y} = \frac{\partial f}{\partial y} + \lambda \frac{\partial g}{\partial y} = 0\\
&\frac{\partial L}{\partial \lambda} = \frac{\partial g}{\partial y} = 0\\
\end{aligned}
$$

解方程组即可并代入即可得到解

## 几何直观理解

我们可以通过几何图像来直观理解拉格朗日乘数法。考虑以下情形：

- **目标函数** \( f(x, y) \) 的等高线（等值线）：
  这些是 \( f(x, y) = k \) 的曲线，表示在平面上函数值相同的点的集合。

- **约束条件** \( g(x, y) = c \) 的曲线：
  这是一条表示满足约束条件的所有点的曲线。

在极值点，目标函数的等高线与约束条件的曲线是**切线重合**的。这意味着在这个点上，目标函数的梯度（\(\nabla f\)）与约束条件函数的梯度（\(\nabla g\)）方向相同，即：  
\[\nabla f = \lambda \nabla g\]  
这正是拉格朗日乘数法的核心条件。

### 图像示例

我们可以用图像来更直观地理解这个概念：

![拉格朗日乘数法][]在上图中：- 蓝色曲线表示约束条件 \( g(x, y) = c \)。- 红色曲线表示目标函数 \( f(x, y) \) 的等高线。- 在极值点，红色和蓝色曲线相切，即它们有相同的切线方向。这意味着在这个点上，目标函数的梯度与约束条件的梯度方向相同，符合 \(\nabla f = \lambda \nabla g\)。### 结论拉格朗日乘数法通过引入一个新的变量（拉格朗日乘数），将有约束条件的优化问题转换为无约束条件的优化问题，进而求解。其几何意义是，在极值点，目标函数的等高线与约束条件曲线相切，即梯度方向一致。

## 拉格朗日乘数法的推导

[参考视频](https://www.bilibili.com/video/BV1Y7411P7nd)
