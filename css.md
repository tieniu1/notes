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
