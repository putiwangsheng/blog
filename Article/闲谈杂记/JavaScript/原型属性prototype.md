# 原型属性prototype

@(web前端)

每一个`Function()`实例都有一个`prototype`属性，即函数原型属性。
#### 原型继承
JavaScript有两种继承方式，一种是原型继承（或者称基于类的继承，是JavaScript的核心特征），另一种是基于对象的继承。而原型继承就是有赖于`prototype`属性。
- 如果使用原生构造函数创建一个实例对象，该实例对象可以继承构造函数的`prototype`属性的属性和方法。
```JavaScript
Array.prototype.foo = 'foo';
var array = new Array();
console.log(array.foo); //foo
```
- 默认的`prototype`属性是一个`Object()`空对象，如果使用自定义构造函数，可以手动设置`prototype`的属性和方法。
```
function Person(){
}
console.log(Person.prototype);//{}
Person.prototype.foo = 'foo';
var person = new Person();
console.log(person.foo);//foo
```
- `__proto__`链接
使用new关键字时会在创建的对象与构造函数的`prototype`属性之间创建一个链接，这个链接即`__proto__`。
例如
```javascript
Array.prototype.foo = 'foo'
var myArray = new Array();
console.log(myArray.__proto__.foo);//foo
```
> `myArray.__proto__ = Array.prototype`
> 可以说`myArray.__proto__`引用`Array.prototype`
