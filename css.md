# CSS

## 1. 为什么要初始化css样式？

浏览器兼容问题，不同浏览器对html元素的默认样式不同,初始化css可以解决浏览器兼容问题,减少因为兼容问题带来的调试时间。

常用 normalize.css初始化

## 2. CSS 优先级如何计算？

1. 权重优先

- 不同权重时，权重搞的优先（与加载循序无关）
- 权重顺序：`!impotant` > 内联 > ID > 类 > 标签

2. 相同权重时

- 内联样式优先级最高，外部样式和内嵌样式同时存在时后加载的样式会覆盖先加载的样式.

## 3. min-width、max-width、width 的包含优先级关系

- `min-width` 优先级最高
- `max-width` 其次
- `width` 优先级最低

**重点**

- `min-width` 是底线，`max-width` 是上限。
- 即使给`widht` 设置`!important` 也无法覆盖`min-width`和`max-width`。

## 以下样式导致 span 文字的颜色是什么

```css
.a1 {
  color: red;
}
.a2 {
  color: blue;
}
.a3 {
  color: green;
}
```

```html
<span class="a2 a3 a1">1111111111111</span>
```

绿色，因为绿色在css中最后加载。

## 元素竖向的百分比设定是相对于父元素的高度吗？

- 对于`height`属性来说是的。
- 对`magin/padding` 属性来说不是，他们的横向竖向百分比都是相对于父元素的宽度。

## BFC

BFC也叫区块格式化上下文是网页中一个独立的布局区域，就像一个容器，他有自己的一套布局规则。

- 独立性（内部元素不影响外部，外部元素不影响内部）

通常会为定位和清除浮动创建新的BFC，它将：

- 包含内部浮动（会撑开父元素高度，父元素完全包含浮动元素）
- 排除外部浮动（两列布局，如左边块设置float:left,右边块设置bfc）
- 阻止外边距重叠(BFC内的重叠规则一样，但是内部的最上元素的上边距，最下元素的下边距不会和外部元素的边距重叠)

**创建方式**

创建BFC的方式很多,可以查看[文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)
这是几种常用的方式：

1. 最推荐的方式`display:flow-root;`，这个是专门用来创建bfc的。
2. 常见的方式(Flex/grid)他们的弹性/网格格式化上下文除了布局之外,它和bfc相似，可以理解成自带bfc。
3. 传统方式`overflow`为`hidden` `auto` `scroll`
4. `position`为`absolute`或`fixed`。

**应用场景**

1. 清除浮动：
   子元素浮动，父元素设置bfc,父元素高度不会塌陷。

```html
<div style="display: flow-root;">
  <div style="float: left;">浮动元素</div>
</div>
```

2. 防止垂直方向外边距重叠
   其中一个元素包在div中，外层div设置bfc

```html
<div style="margin:20px">我有外边距</div>
<div style="display: flow-root;">
  <p style="margin: 20px;">我的外边距不会与外部元素折叠</p>
</div>
```

3. 自适应两栏布局
   侧边栏固定，主内容区自适应。

   如果需要侧边栏在右边，只需要将下面代码中的`float:left;`改为`float:right;`即可，不需要修改html结构.

```html
<div>
  <aside style="float: left;">侧边栏</aside>
  <main style="overflow: hidden;">主内容区（不会与侧边栏重叠）</main>
</div>
```

## 为什么要清除浮动?

清除浮动实际上是指清除浮动的副作用。

**浮动会导致这些问题：**

1. 父元素高度塌陷：如果子元素全是浮动元素，会脱离文档流，导致父元素的高度无法被撑开。
2. 影响后续元素的布局：浮动元素会影响它后面元素的排列。

**清除浮动的方法：**

1. 额外标签

```html
<div class="parent">
  <div class="float">浮动元素</div>
  <div style="clear: both;"></div>
</div>
```

缺点：增加无意义标签

2.  使用bfc父元素：为浮动元素增加一个有bfc的父元素

```css
.parent {
  overflow: hidden; /* 或 auto */
}
```

3. 伪元素

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
```

## 设置元素浮动后，该元素的display值是多少？

自动变为`display:block;`

## 你对 `line-height` 是如何理解的？

`line-height` 用来设置文本行之间的高度,实际上是两行文字基线(baseline)之间的距离

```
行高 = 文字实际高度（font-size）+行间距（上下间距）
行间距 = line-height - font-size
```

**`line-height``的值类型:**

1. normal

```css
.text {
  line-height: normal; /* 浏览器默认值，约为 1.2 */
}
```

2. 数组（推荐）

```css
.text {
  line-height: 1.5; /* 当前元素 font-size 的 1.5 倍 */
}
```

3. 百分比

```css
.text {
  line-height: 150%; /* 当前元素 font-size 的 150% */
}
```

4. 长度值

```css
.text {
  line-height: 20px; /* 固定值 */
}
```

**继承特性**

1. 使用数字（推荐）

```css
.parent {
  font-size: 16px;
  line-height: 1.5; /* 子元素继承 1.5 这个系数 */
}
.child {
  font-size: 20px; /* 最终 line-height = 20px * 1.5 = 30px */
}
```

2. 使用百分比或长度值

```css
.parent {
  font-size: 16px;
  line-height: 150%; /* 计算后的值 24px 被继承 */
}
.child {
  font-size: 20px; /* line-height 仍然是 24px */
}
```

**实际应用**

1. 单行文本垂直居中

```css
.text {
  height: 40px;
  line-height: 40px; /* 与 height 相等 */
}
```

2. 多行文本行间距

```css
.text {
  font-size: 16px;
  line-height: 1.5; /* 推荐使用无单位数值 */
}
```

**最佳实践**

1. 推荐使用**无单位数值**

- 更好地继承性
- 容易维护
- 避免以外的计算结果

2. 常用值

```css
body {
  line-height: 1.5; /* 正文内容 */
}
h1,
h2,
h3 {
  line-height: 1.2; /* 标题文字 */
}
```

## `display:none`、`visibility:hidden`、`opcity:0`的区别？

`display:none`

- 回流/重绘（性能差）
- 不占位
- 不继承，但是父元素为none时，子元素不会显示
- 不能点击
- 不支持transition

`visibility:hidden`

- 重绘
- 占位
- 继承，子元素可以设置`visible`来显示
- 不能点击
- 支持transition，但是只支持`visible`和`hidden`没有中间状态

`opcity:0`

- 重建图层
- 占位
- 继承，子元素无法覆盖
- 能点击
- 支持transition

## 浏览器如何解析CSS选择器的，换句话说CSS的匹配规则是什么？

从右向左，提升查找效率。

- 浏览器可以根据选择器过滤掉DOM中的元素，并向上遍历其父元素以确定匹配项
- 选择期链的长度岳端，浏览器可以越快地确定该元素是否余选择器匹配

**`div p em`**

- 如果从左往右匹配，有无数个div时，都得向下查找，效率低
- 只有当前元素是em时，才向上查找，效率高

## 文字超长的省略号写法

单行文本省略

```css
.single-line-ellipsis {
  width: 100px; /*固定宽度*/
  white-space: nowrap; /*强制文本一行显示*/
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /*省略号表示超出文本*/
}
```

**多行文本省略**

```css
.multi-line-ellipsis {
  width: 200px; /* 设置一个固定宽度，根据实际需求调整 */
  overflow: hidden; /* 超出宽度的部分隐藏 */
  text-overflow: ellipsis; /* 这行对于多行省略号只是辅助，主要靠下面的属性 */
  display: -webkit-box; /* 开启弹性伸缩盒子模型 */
  -webkit-line-clamp: 3; /* 显示的行数，超出部分用省略号表示，这里设置为 3 行，可根据需求修改 */
  -webkit-box-orient: vertical; /* 子元素垂直排列 */
}
```

## `<li>`和`<li>`之间有看不见的空白间距是什么原因引起的？有什么解决方法？

原因：

- 当元素被设置为`display: inline-block`时，元素之间的换行符、空白符号会被浏览器渲染为一个空格
- 这个空格的大小取决于元素的`font-size`

解决方法：

1. 设置父元素的`font-size:0`(常用)

```css
ul {
  font-size: 0; /*消除空格*/
}
li {
  font-size: 16px; /*重设字体大小*/
}
```

2. 取消HTML中的换行

```xml
<ul>
  <li>项目1</li><li>项目2</li><li>项目3</li>
</ul>

```

3. 使用Flexbox(推荐)

```css
ul {
  display: Flex;
}
```

## 图片为什么有上下左右间隙，怎么去除？

原因：

- 左右空白是由HTML中的换行符产生的。
- 上下空白是由于img是行内替换元素，它默认的对齐方式是**基线对齐**。

**基线作用:**

- 文字对齐:不同字体、不同大小的文字也能保持视觉上的对齐

- 在英文中是大写`H`的底部为基线,`jg`下班部分会低于基线。

## Chrome中文字小于12px怎么实现？

1. transform缩放（推荐）

```css
.small-text {
  font-size: 12px; /*最小支持12px*/
  transform: scale(0.8); /*缩放比例 = 目标大小/12 */
}
```

## 如果需要写动画，你认为最小间隔多少？

多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为`1000ms / 60 = 16.7ms`

## style 标签写在body后与body前（head）有什么区别？

1. 写在head中（推荐）

- 浏览器会先加载CSS，再渲染页面内容
- 避免页面出现无样式内容闪烁（FOUC）
- 符合HTML规范，更易维护

2. 写在body后

- 浏览器会先渲染HTML内容，再加载CSS
- 可能导致页面内容先以无样式显示，然后突然应用样式（FOUC）
- 不利于SEO优化，因为搜索引擎爬虫可能无法正确解析页面结构和内容，导致页面内容无法被准确索引
- 可能影响页面性能，因为浏览器需要重新计算样式

**最佳实践**

- 将style标签放在head中
- 对于关键CSS，可以考虑内联在head中
- 非关键CSS可以异步加载

## Chrome

## 已知如下代码，如何修改才能让图片宽度为300px？

```xml
<!-- 注意：下面的代码不可修改。 -->
<img src="1.png" style="width:480px !important" />
```

方案1:

```css
max-width: 300px;
```

## textarea 拉伸

textarea默认行为是一个可拖拽调整大小的文本框。

**控制拉伸方向**

```css
textarea {
  /* 禁止拉伸 */
  resize: none;

  /* 只允许水平拉伸 */
  resize: horizontal;

  /* 只允许垂直拉伸 */
  resize: vertical;

  /* 允许自由拉伸（默认值） */
  resize: both;
}
```

## 为什么要将JS放在HTML底部？

1. 避免阻塞渲染

- JS会阻塞HTML解析和渲染
- 放在底部可以让页面内容优先显示

2. DOM依赖

- JS 经常需要操作DOM
- 放在底部确保DOM已经构建完成

3. 资源加载优先级

- 让重要的内容（HTML、CSS）先加载

**例外情况**
某些JS需要放在头部

**现代解决方案**

1. async 属性

```html
<script async src="app.js"></script>
```

- 异步加载，不阻塞解析
- 加载完立即执行
- 执行顺序不确定

2. defer 属性

```html
<script defer src="app.js"></script>
```

- 异步加载，不阻塞解析
- DOM 解析完成后执行
- 保持脚本执行顺序

## 有没有使用过 css variable，它解决了哪些问题

1. 动态修改主题
2. 减少重复代码
3. JavaScript 动态修改
4. 响应式设计
   - 根据条件改变变量值
   - 简化媒体查询

**和Sass/Less变量的区别**

1. 运行时 vs 编译时
   - CSS 变量：运行时生效，可动态修改
   - Sass/Less：编译时处理，不可动态修改
2. 作用域
   - CSS 变量：支持继承和作用域
   - Sass/Less：编译后就是固定值

## `+` 和 `~` 选择器有什么不同

`+` 相邻兄弟选择器
选择紧跟在指定元素后的第一个兄弟元素

```css
/* 选择紧跟在 h1 后面的第一个 p 元素 */
h1 + p {
  color: red;
}
```

`~` 一般兄弟选择器
选择指定元素后面的所有兄弟元素

```css
/* 选择 h1 后面的所有 p 元素 */
h1 ~ p {
  color: blue;
}
```

## 匹配前 N 个子元素及最后 N 个子元素

使用`nth-child` 和 `nth-last-child` 。

```css
li:nth-child(-n + 3) {
  color: red;
}
li:nth-last-child(-n + 3) {
  color: blue;
}
```

`nth-child(n)` 中，n是一个从0开始的递增计数器，n从0开始，依次取值0,1,2,3,4...

**常见公式：**

```css
/* 选择前 3 个 */
li:nth-child(-n+3)

/* 选择奇数项 */
li:nth-child(2n+1)
li:nth-child(odd)

/* 选择偶数项 */
li:nth-child(2n)
li:nth-child(even)

/* 选择第 3 个之后的 */
li:nth-child(n+3)
```

## 如何解决Flex布局7个元素使用 space-between 最后一行两边分布的去问题？

1. 最后一行增加占位元素。

## Grid

Grid是一个二维布局系统，比Flex布局更强大。

Flex 适合内容单行或单列流动方向单一的布局或简单的对齐需求。

Grid适合做复杂的页面布局适合做后体管理系统的栅格化布局。

可以和Flex布局搭配使用，Grid做整体布局，Flex做局部布局。

# 移动端适配

## 移动端适配方案

**1. rem 方案**

使用flexible，flexible 的原理是把html的fontSize设置为页面宽度/10，这时1rem就是1/10屏幕宽度。

以iPhone6为例：布局视口为375px，则1rem = 37.5px，这时设计稿上给定一个元素的宽为75px（设备独立像素），我们只需要将它设置为75 / 37.5 = 2rem即可。

可以搭配 PostCSS-px2rem 插件完成转换。

```css
.name-item {
  font-size: 75px;
  line-height: 150px;
}
```

转换为：

```css
.name-item {
  font-size: 2rem;
  line-height: 4rem;
}
```

**缺陷**

- flexible 一律按`dpr=1`处理，在不同高倍屏上显示的效果不同。
- 需要js

**2. vw方案**
使用vw作为单位，统一使用的`iPhone6`的视觉设计稿（即宽度为`750px`），那么`100vw=750px`，即`1vw = 7.5px`。如果设计稿上某一元素的宽度为`value`像素，其对应的vw值则可以通过`vw = value / 7.5`来计算得到。

可以搭配postcss-px-to-viewport来完成转换。

```css
.name-item {
  font-size: 75px;
  line-height: 150px;
}
```

```css
.name-item {
  font-size: 10vw;
  line-height: 20vw;
}
```

**3. vw + rem 方案**
html使用vw作为fontSize,其他元素都使用rem作为单位。纯css实现控制，也能通过通过媒体查询限制最大字号。

```css
html {
  /* 设置 1rem = 100px */
  font-size: 13.33333vw; /* (100 * 100 / 750)vw */
}

.name-item {
  font-size: 1rem; /*(75px)*/
  line-height: 2rem; /*(150px)*/
}

/* 控制 font-size 最大值 */
@media screen and (min-width: 750px) {
  html {
    font-size: 100px;
  }
}
```
