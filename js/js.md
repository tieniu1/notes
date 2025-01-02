# JavaScript

## JS类型

1. 基本类型(原始类型) - 存储在栈内存中

   - `number`
   - `string`
   - `boolean`
   - `null`
   - `undefined`
   - `symbol`
   - `bigInt`

   **基本类型特点**

   - 值直接存储在变量中（栈内存）

   ```JavaScript
   let a = 10
   let b = a
   let b = 20
   console.log(a) // 10 - 原始值不受影响
   ```

   - 值比较

   ```JavaScript
   let x = 5
   let y = 5
   console.log(x == y) // true - 直接比较值
   ```

2. 复杂类型(引用类型) - 存储在堆内存中

   - `object`
   - `array`
   - `function`
   - `date`
   - `regexp`

   **复杂类型特点**

   - 引用存储（堆内存）

   ```JavaScript
    // 1. 引用存储（堆内存）
    let obj1 = {name: 'test'};
    let obj2 = obj1;
    obj2.name = 'changed';
    console.log(obj1.name); // 'changed' - 引用同一对象
   ```

   - 引用比较

   ```JavaScript
    let obj3 = {value: 1};
    let obj4 = {value: 1};
    console.log(obj3 === obj4); // false - 比较引用地址
   ```

3. 主要区别

   **基本类型**

   - 存储在*栈*内存中
   - 直接复制值
   - 比较值
   - 大小固定
   - 不可变

   **引用类型**

   - 存储在*堆*内存中
   - 复制引用地址
   - 比较引用地址
   - 大小不固定
   - 可变

## 栈和堆的区别

栈 = 餐盘架(整齐、固定大小、先进后出)。
堆 = 快递货架(任意存放、大小不固定、通过地址找)

基本类型 = 栈内存
引用类型 = 堆内存（栈中存地址）

## `typeof` 检测某个值是什么类型?

- 8种返回值
  1. `undefind`
  2. `string`
  3. `number`
  4. `symbol`
  5. `bigint`
  6. `function`
  7. `object`
     - `array`
     - `null`(历史遗留问题)

typeof 返回的值是字符串类型
typeof 一个不存在的值，不报错，返回字符串`"undefind"`

## `instanceof` 检测构造函数的 prototype 属性是否出现在某个对象的原型链上

```JavaScript
function Car(make, model, year) {
  this.make = make;
  this.model = model;
}
var auto = new Car('Honda', 'Accord');
console.log(auto instanceof Car); // true

console.log(auto instanceof Object); // true
```

## undefined

- `undefined` 既是一个原始数据类型，也是一个原始值数据
- `undefined` 是全局对象上的一个属性 `window.undefined`
- `null == undefined`
- `void(0)` 返回 `undefined`
- `xx == null` 判断值是否为undefined和null,`==` 会进行类型转换，`null == undefined` 为 true
- 局部作用域下 `undefined` 可以当作变量使用。

```JavaScript
function fn(params) {
    let undefined = 1
    console.log(undefined)
}
fn() // 1
```

## switch

- `switch` 是分支匹配(精准匹配)，从多个固定的选项选择一个匹配的分支执行，在多个固定值时性能较好，更清晰。
- `if` 是范围匹配(条件判断),在多个条件判断时更灵活，复杂逻辑更直观。

## JavaScript 变量作用域

1. `var` 的函数作用域

   - 变量提升到最近的函数作用域
   - 在块语句中声明的变量会泄漏到外部
   - 如果没有函数包裹，会变成全局变量

2. `let` 和 `const` 的块级作用域
   - 只在声明所在的块内有效
   - 不会变量提升
   - 更符合直觉，推荐使用

## 给出这段代码的执行结果，并指出为什么。

```JavaScript
for (var index = 0; index < 10; index++) {
  setTimeout(() => {
    console.log(index);
  }, 0);
}
```

这段代码的执行结果是10个10。

代码分析：

- `for`循环：使用`var`声明变量`index`,由于`var`声明的作用域是函数作用域（或全局作用域）,而不是块作用域。
- `setTimeout`：将回调函数放入事件队列中，等待主线程执行完成之后才会执行。
- 延迟时间：`setTimeout`的延迟时间为0，意味着回调函数会尽快执行，但是也要等主线程的代码执行完。

由于`var`声明的`index`是全局变量，所有的`setTimeout`回调函数共享同一个`index`，当主线程执行完之后，此时`index`值已经是`10`。

**解决方法**

1. 使用`let`声明`index`
   `let`声明的是块作用域，每次循环都会创建一个新的`index`变量,`setTimeout`的回调函数会捕获当前的`index`值。

```JavaScript
for (let index = 0; index < 10; index++) {
  setTimeout(() => {
    console.log(index);
  }, 0);
}
```

2. 使用`IIFE`(立即执行函数)传参,每次循环都捕获本次的`index`

```JavaScript
for (var index = 0; index < 10; index++) {
  (function(i){
  setTimeout(() => {
    console.log(i);
  }, 0);
  })(index)
}
```

3. 使用`setTimeout`的第三个参数
   `setTimeout` 的第三个参数，会在每次循环时立即被求值，并将当前值传给回调函数。

```JavaScript
for (var index = 0; index < 10; index++) {
  setTimeout(
    (i) => {
      console.log(i);
    },
    0,
    index,
  );
}
```

## `i++` 和 `++i` 的区别？

`i++`和`++i` 是JavaScript中的两种自增操作符,它们的区别在于**返回值**和**执行时间**。

- `i++`(后置自增):
  - 先返回 `i` 的当前值，然后再将 `i` 的值加1。
  - 例如：`let a = i++;` 等价于 `let a = i; i = i + 1;`
- `++i`(前置自增):
  - 先将`i`的值加1，返回增加后的`i`的值
  - 例如：`let a = ++i;` 等价于 `i = i + i; let a = i;`
