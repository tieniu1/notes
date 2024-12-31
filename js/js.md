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
