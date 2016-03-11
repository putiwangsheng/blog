# this关键字

JavaScript中，`this`是创建函数时系统在后台创建的一个关键字，一般是对函数所在对象的一个引用（除了`new`，`call()`和`apply()`）。
```
var object = {
	name: 'lala',
	getName: function(){
		return this.name;
	}
}
console.log(object.getName());//'lala'

这里的this指向object对象
```
#### 判断this值的几种情况
- `this`的值**随函数调用的上下文**而改变，即`this`绑定上下文对象（隐式绑定）。

```
var foo = 'foo';
var myObject = {
	foo: 'I am myObject.foo'
};
var sayFoo = function(){
	console.log(this.foo);
};
myObject.sayFoo = sayFoo;

//函数调用上下文为myObject，this指向myObject
myObject.sayFoo();//'I am myObject.foo'

//全局范围内this指向全局对象window
sayFoo();//'foo'
```
> 当`this`值的宿主函数被封装在另一个函数中或在另一个函数的上下文中调用时（即函数嵌套时），`this`永远指向`head`对象的引用。比如在浏览器环境中head对象就是`window`。

- 构造函数内的`this`及原型方法内的`this`指向的是利用`new`创建的**新对象实例**（`new`绑定）。

```
var Person = function(x){
	this.name = x;
}
Person.prototype.getName = function(){
	return this.name;
}
var person = new Person('lili');
console.log(person.getName());//'lili'
```
- `call()`和`apply()`能在调用函数时控制`this`指向**指定对象**，取代默认对象（显式绑定）。

```
var myObject = {};
var myFunction = function(param1, param2){
	this.foo = param1;
	this.bar = param2;
	console.log(this);//Object {foo: "foo", bar: "bar"}
}

myFunction.call(myObject, 'foo', 'bar');

console.log(myObject);//Object {foo: "foo", bar: "bar"}
```
