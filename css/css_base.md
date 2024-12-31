# CSS

## css 引入方式

css 有4种主要引入方式。

1. 内联样式（行内样式）

```html
<div style="color: red; font-size: 14px;">内容</div>
```

2. 内部样式表（嵌入样式）

```html
<head>
  <style>
    div {
      color: red;
    }
  </style>
</head>
```

3. 外部样式表（外链）

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

4. @import 导入式

```css
/* 可以在 CSS 文件中使用 */
@import url("other.css");
```

```html
/* 或在 style 标签中使用 */
<style>
  @import url("styles.css");
</style>
```

**方式特点**

1. 内联样式

- 优先级最高
- 代码复用性差
- 不推荐在实际开发中使用

2. 内部样式表

- 只对当前页面有效
- 可以重用当前页面的样式
- 适合但页面应用

3. 外部样式表

- 实际开发中最常用
- 利于维护和缓存
- 可以多个页面共用

4. @import

- 可以在样式表中导入其他样式表
- 加载顺序晚于link
- 可能造成页面闪烁

## css引入方式优先级规则

1. `!important` 规则,无论是哪种引入方式，带有`!important`的声明都有最高优先级
2. 内联样式(行内样式)
3. 内部样式(<style>)和外部样式(<link>)

   1. 这两种优先级相同
   2. 遵循**“后加载优先”**原则

4. @import 导入式

```css
@import url("style.css"); /* 优先级最低 */
```

## 选择器优先级规则

一个选择期优先级可以说是由三个不同的只相加，可以认为是百（ID）十（类）个（元素）。

三位数的三个个数：

- ID：选择器中包含ID选择器，百位得一分
- 类：选择器中包含类选择器、属性选择器、伪类选择器，十位得一分
- 元素：选择器中包含元素、伪元素，个位得一分。

通用选择器（`*`）、组合符（`+`、`>`、`~`、`''`）不会影响优先级

**注意**：
每个选择器都有自己的优先级等级，他们不会被较低等级的选择器覆盖。例如，权重为一百万的类选择器不会覆盖权重为一的ID选择器。

评估优先级是对不同的优先级等级单独进行平分，从最高的等级开始，必要时再计算低优先等级的权重。仅当某一列的优先级权重相同时，才需要评估下一列。
否则可以忽略低等级的选择期，因为他们没法覆盖高优先级等级的选择器。

## 元素竖向的百分比设定是相对于父容器的高度吗？

1. `height` 的百分比

- 相对于**父元素**的高度

2. `margin/padding`的百分比

```css
.box {
  margin-top: 10%; /* 相对于父元素的宽度 */
  margin-bottom: 10%; /* 相对于父元素的宽度 */
  padding-top: 10%; /* 相对于父元素的宽度 */
  padding-bottom: 10%; /* 相对于父元素的宽度 */
}
```

- 无论是垂直方向还是水平方向，都是相对于**父元素的宽度**计算

3. `top/bottom` 的百分比

- 相对于最近的定位父元素的高度

4. `line-height` 的百分比

```css
.text {
  line-height: 150%; /* 相对于元素自身的font-size */
}
```

- 相对于元素自身的font-size

## 处理高度百分比失效问题

给父元素设置固定高度（px/vh）

## 使用padding实现等比例盒子

由于padding的百分比是基于父元素的宽度，所以可以基于这个特点来完成固定宽高比

```css
.box {
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 的宽高比 */
}
```

## `display:none` 、`visibility:hidden`、`opactiy:0`的区别?

- `display:none` 不占空间，不可点击（回流+重绘）

  - 不会被继承，但是父元素为none时，子元素也不会显示
  - 影响`transition`的过渡效果

- `visibility:hidden` 占空间，不可点击（重绘）

  - 不会被继承，子元素可以通过设置`visibility:visible` 来显示
  - 不影响`transition` 的过渡效果，但是只能用`visible`和`hidden` 没有中间状态

- `opactiy:0` 占空间，可点击(重建图层，性能较高)
  - 会被继承
  - 支持`transition`

**性能比较**

```css
opactiy:0 > visibility:hidden > display:none
```

## 回流、重绘、重建图层都是什么意思？

1. 回流（Reflow）

- 回流也叫重排，当页面布局和几何属性改变时发生，形象性能最大

```css
/* 以下属性修改都会触发回流 */
.box {
  width: 100px; /* 改变大小 */
  height: 100px;
  padding: 10px; /* 改变内边距 */
  margin: 10px; /* 改变外边距 */
  position: relative; /* 改变定位 */
  top: 10px;
  display: block; /* 改变显示方式 */
}
```

2. 重绘（Repaint）

- 当元素外观变化但布局不变是发生
- 性能影响相对较小

```css
/* 以下属性修改只会触发重绘 */
.box {
  color: red; /* 改变颜色 */
  background: blue; /* 改变背景 */
  border-radius: 10px; /* 改变圆角 */
  visibility: hidden; /* 改变可见性 */
}
```

3. 重建图层（composite）

- 将页面分成多个图层单独渲染
- 最后合成到一起
- 性能最好

```css
/* 以下属性会创建新的图层 */
.box {
  transform: translate3d(0, 0, 0); /* 3D 变换 */
  opacity: 0.5; /* 透明度 */
  will-change: transform; /* 显式声明 */
  position: fixed; /* 固定定位 */
  animation: slide 1s; /* 动画 */
}
```

**性能对比**

```
回流> 重绘> 重建图层(性能最好)
```

## `position`

| 值             | 定位参照物                   | 是否脱离文档流 | 是否影响其他元素 | 是否创建定位上下文 | 特殊说明                                                                   |
| -------------- | ---------------------------- | -------------- | ---------------- | ------------------ | -------------------------------------------------------------------------- |
| static（默认） | 无                           | 否             | 是               | 否                 | top/right/bottom/left/z-index 无效                                         |
| relative       | 元素自身原始位置             | 否             | 否               | 是                 | 原位置会被保留                                                             |
| absolute       | 最近的非 static 定位祖先元素 | 是             | 否               | 是                 | 若无定位祖先元素则相对于视口                                               |
| fixed          | 视口（viewport）             | 是             | 否               | 是                 | 在 transform 非 none 的父元素内失效                                        |
| sticky         | 最近的滚动祖先元素           | 否             | 是               | 是                 | 1. 必须指定 top/right/bottom/left 之一2. 父元素不能有 overflow:hidden/auto |

## margin塌陷

> **1. 垂直相邻兄弟元素之间的外边距会被折叠（除非后面的元素需要清除之前的浮动）**

```html
<div class="box1">盒子1</div>
<div class="box2">盒子2</div>

<style>
  .box1 {
    margin-bottom: 20px;
  }
  .box2 {
    margin-top: 30px;
    /* 最终两个盒子之间的距离是30px，而不是50px */
  }
</style>
```

**解决相邻兄弟元素之间的margin塌陷**

1. 使用 Flex 布局

```html
<div class="container">
  <div class="box1">盒子1</div>
  <div class="box2">盒子2</div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
  .box1 {
    margin-bottom: 20px;
  }
  .box2 {
    margin-top: 30px;
  }
  /* 在 flex 容器中不会发生外边距折叠 */
</style>
```

2. 使用 Grid 布局

```html
<div class="container">
  <div class="box1">盒子1</div>
  <div class="box2">盒子2</div>
</div>

<style>
  .container {
    display: grid;
  }
  .box1 {
    margin-bottom: 20px;
  }
  .box2 {
    margin-top: 30px;
  }
  /* 在 grid 容器中不会发生外边距折叠 */
</style>
```

3. 使用浮动

```html
<div class="box1">盒子1</div>
<div class="box2">盒子2</div>

<style>
  .box1 {
    float: left;
    margin-bottom: 20px;
  }
  .box2 {
    float: left;
    clear: both; /* 确保垂直排列 */
    margin-top: 30px;
  }
  /* 浮动元素不会发生外边距折叠 */
</style>
```

4. 使用绝对定位

```css
.box2 {
  position: absolute;
}
/* 绝对定位的元素不会发生外边距折叠 */
```

优先使用Flex或Grid布局，这是最现代和推荐的方案。

> **2. 父子元素的 margin 合并**

**1.父元素与子元素的margin-top折叠条件**

需要同时满足：

- 没有border-top
- 没有padding-top
- 没有inline内容
- 没有创建bfc
- 没有间隙

```html
<div class="parent">
  <div class="child">子元素</div>
</div>

<style>
  .parent {
    /* 父元素 */
  }
  .child {
    margin-top: 20px;
    /* 子元素的 margin-top 会传递给父元素 */
  }
</style>
```

**阻止margin-top折叠**

```css
/* 阻止 margin-top 折叠 */
.parent {
  border-top: 1px solid transparent;
  /* 或 */
  padding-top: 1px;
  /* 或 */
  display: flow-root; /* 创建 BFC */
}
```

**2. 父元素与子元素的margin-bottom折叠条件**

需要同时满足：

- 没有border-bottom
- 没有padding-bottom
- 没有inline内容
- 没有height和min-height

```html
<div class="parent">
  <div class="child">子元素</div>
</div>

<style>
  .parent {
    margin-bottom: 20px;
  }
  .child {
    margin-bottom: 30px;
  }
  /* margin-bottom 也会折叠 */
</style>
```

**阻止margin-bottom折叠**

```css
.parent {
  border-bottom: 1px solid transparent;
  /* 或 */
  padding-bottom: 1px;
  /* 或 */
  height: 100px;
  /* 或 */
  min-height: 100px;
}
```

> **3. 空的区块**

如果块级元素没有设定边框、内边距、行级内容、高度、最小高度来分隔块级元素的上下边距，就会出现上下边距的折叠。

```html
<div class="box"></div>
<style>
  .box {
    margin: 20px 0;
  }
</style>
```

## CSS选择器的执行顺序

css选择期是从右向左解析的。这是为了提高选择器的匹配效率。
