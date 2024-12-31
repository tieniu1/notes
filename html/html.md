# HTML

## 1. 讲一讲HTML语义化

1. 利于开发：可读性高,方便维护
2. 利于SEO：方便爬虫根据语义标签确定

## 2. 常用语义化标签

- head
- footer
- main
- slide
- selection
- article
- canvas
- audio
- video

## 3. 语义化实践中应该注意什么？

1. 少使用没有语义的标签比如`div` `span`
2. 少使用样式标签，比如 `b` `font`
3. 需要强调的文本，可以包含在`strong` `em` 标签中
4. 写css类名、变量命名时也要遵循语义化原则，不随便取名。

## 4. meta viewport 是做什么的，怎么写？

`meta viewport` 是移动端网页开发中的重要标签，用于控制页面在移动设备上的显示方式。

```HTML
<meta name="viewprot" content="width=device-width,initial-scale=1.0,user-scalable=no" />
```

**作用**

1. 控制视口大小：确保网页在移动设备上正确显示，不会出现缩放问题
2. 适配移动端：使网页宽度自动适配设备屏幕
3. 优化移动体验：防止用户需要手动缩放来查看内容

**常用参数说明：**

- `width=device-width` : 视口宽度等于设备宽度
- `initial-scale=1.0` : 初始缩放比例为1
- `maximum-scale=1.0` : 最大缩放比例
- `minimum-scale=1.0` : 最小缩放比例
- `user-scalable=no` : 禁止用户缩放

## 5. 你用过哪些`meta` 标签

```HTML
<meta charset="utf-8">

<!-- 作者 -->
<meta name="author" content="张三" />

<mtea name="viewprot" content="width=device-width,initial-scale=1.0,user-scalabel=no"/>
```

## 6. 说一下无障碍

能被残障人士容易使用的网站才叫无障碍网站

比如为<img> 添加 alt 属性，描述图片内容，这样在无图浏览器或语音浏览器中可以当作文字显示或者读出来。

## 7. 说一下Web Worker

不会阻塞主线程，并行处理。不能操作dom，不能访问window对象,数据通信需要使用postMessage。

一般用于 Excel类应用，在线文档编辑，实时通讯。

## 8. 说一下Data URL

Data URL 是一种将文件或图片直接嵌入到文档中的方式。

```HTML
<!-- 图片示例 -->
<img src="data:image/png;base64,xxxxxxxxx" />
```

```css
background-image: url(data:image/png;base64,xxxxxxxxx);
```

**优点**

1. 减少http请求
2. 适合小文件内联
3. 无序额外资源文件

**缺点**

1. 体积增大约1/3
2. 无法缓存（PS:如果html或css文件被缓存，也会被缓存下来）
3. 代码可读性差

**使用场景**

- 小图标
- 简单图形

## 9. Canvas 和 SVG 有什么区别

Canvas 和 SVG 都是在网页上绘制图形的技术，但是他们有不同的特点和应用场景。

| Canvas                                   | SVG                                                         |
| ---------------------------------------- | ----------------------------------------------------------- |
| 位图                                     | 矢量图                                                      |
| 通过JavaScript逐像素绘制                 | 使用XML描述图形，基于元素的结构                             |
| 分辨率依赖画布大小，放大时失真           | 无失真，缩放时保持清晰                                      |
| 需要手动管理交互，较复杂(使用js监听事件) | 内置交互性，方便添加事件监听 (可以使用onclick onmourseover) |
| 动态绘制性能好                           | 复杂图形性能差                                              |
| 游戏、实时数据可视化                     | 图标、图表、可缩放图形                                      |

Canvas 适合高性能动态绘制，Svg适合高质量可缩放图形。

## 10. 元素嵌套

- 行内元素可以嵌套行内元素
- 块元素可以嵌套任何元素
- p 标签不能嵌套 div
- a 标签不能嵌套 a标签

## 11. 常见元素种类

- **行内元素(inline)**

  - 不独占一行；行内元素余其他行内元素在同一行排列；一行排不下换行
  - 默认情况下宽度由内容决定，但是个别行内元素可以设置宽高（img）
  - 水平方向的margin和padding有效

- **块元素(block)**

  - 独占一行
  - 设置宽高
  - margin和padding有效

- **行内块(inline-block)**
  - 和其他元素同一行（行内元素特点）
  - 可以设置宽高（块级元素特点）
  - margin和padding有效

## 12. a标签作用

1. 超链接
2. 打电话
3. 发邮件
4. 锚点定位
5. 下载文件
6. 打开新窗口
7. 触发javascript

```HTML
<a href="javascript:void(0)" onclick="alter("hello")">点击</a>
```

## 14. img 为什么是行内元素，但是可以设置宽高？

img 通常被视为行内元素，但是在某些方面表现的像行内块元素。

img虽然是行内元素，但是可以通过`width` 和 `height` 属性或css设置它的宽和高，这样使得它在视觉上表现的类似块级元素
