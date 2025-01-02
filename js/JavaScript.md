/_ 面试常见考点 _/

// 1. typeof 运算符返回值

```javascript
typeof 123; // "number"
typeof "string"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" (这是一个历史遗留bug)
typeof Symbol(); // "symbol"
typeof {}; // "object"
typeof []; // "object"
typeof function(){}; // "function"

// 2. instanceof 运算符
[] instanceof Array; // true
{} instanceof Object; // true

// 3. Object.prototype.toString.call() 方法
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
```
