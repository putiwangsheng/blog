# About Promise

## 为什么需要学习Promise
在`Promise`出现之前，js处理异步一直使用的是回调函数（`callback`）。在处理http请求（`xmlHttpRequest`），事件，使用`animation`，`setTimeout`时，都会用到`callback`。

当异步任务很多的时候，`callback`就会层层嵌套，导致的一个问题就是，回调地狱：
```javascript
runAnimation(0);
setTimeout(function() {
    runAnimation(1);    
    setTimeout(function() {
        runAnimation(2);
    }, 1000);
}, 1000);
```
不管从可读性还是可维护性上来说，`callback`都不是一个很好的解决异步的方法。

## 什么是Promise
### 解决的问题
解决异步编程的一个更合理强大的方案。有了`Promise`，就不用再像使用`callback`一样层层嵌套了。

### 概念上
`Promise`，可以理解为“承诺”。
`Promise`是一个**对象**，从它可以获取异步操作的消息，保存异步操作的结果。

### 与`callback`的四点主要不同
- `callback`是函数，`Promise`是对象
- `callback`作为函数参数传递，`Promise`是函数返回的对象
- `callback`会处理成功和失败，`Promise`不处理任何事（处理是在`then`方法的回调函数里）
- `callback`可以被调用多次，`Promise`只能成功或者失败一次

## 三个状态
- `pending`（等待）
- `resolved`（已完成）
- `rejected`（已拒绝）

## 四个函数
### new Promise(fn)
ES6 Promise通过`new Promise()`创建一个`promise`对象实例。
```javascript
var promise = new Promise(function(resolve, reject) {
  // ... some code(asynchronous manipulation)

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
构造函数接受一个回调函数作为参数，当运行`new Promise`时会立即调用这个函数。

该函数的作用是，当`promise`的状态变为已完成或已拒绝时，告知`Project`对象。

所以该函数有两个函数作为参数，`resolve`和`reject`。

`resolve`函数，将`Promise`对象的状态从“未完成”变为“成功”（即从`Pending`变为`Resolved`），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从`Pending`变为`Rejected`），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

那当异步操作成功或者是失败（即`Promise`的状态变为`resolved`或者是`rejected`）的时候，该如何处理结果呢，就用到`promise`实例的`then`方法。

### promise.then(onResolve, onRejected)
`then`方法处理前一个`promise`的结果，接受两个回调函数作为参数。
- 第一个回调函数是`Promise`对象的状态变为`Resolved`时调用。
- 第二个回调函数是`Promise`对象的状态变为`Rejected`时调用。其中，第二个函数可选。
- 这两个函数都接受前一个`Promise`对象传出的值作为参数。
```javascript
//value为前一个promise对象传出的值
promise.then(function(value) {
  // handle success
}, function(value) {
  // handle failure
});
```

- `then`方法**总是返回一个新的`promise`对象**
```javascript
promise
    .then(function() {
        return 5;
    })
    .then(function(value) {
        console.log(value); // 5
    });
```

- `then`方法也可以**接收另一个`promise`作为参数**或者在其异步函数里**返回一个`promise`**，这样可以将异步操作**串联起来**。（异步api串行）
```javascript
promise
    .then(function() {
        //deal data
    })
    .then(newPromise)
    .then(function(){
	    //deal new data
    })
```
```javascript
promise
    .then(function() {
        //deal data
        return promise;
        //该promise会替代原来每个then会返回的新的promise对象
    })
    .then(function() {
	    //deal data
    });
```

### Promise.all([promise1, promise2,...])
`Promise.all`方法用于将多个Promise实例，包装成一个新的`Promise`实例。
```javascript
var p = Promise.all([p1, p2, p3]);
```
`Promise.all([p1, p2, p3])`返回新的`promise`，将p1，p2，p3的结果组成的数组传出，可以作为参数传入`then`的callback。
```javascript
Promise.all([p1, p2, p3]).then(function(data){
	//data->[data1, data2, data3...]
	//deal data
})
```

`Promise.all`让**并行**变得简单。

### promise.catch(onReject)
`promise.catch(handler)`相当于`promise.then(null, handler)`，用于指定发生错误时的回调函数。
```javascript
getJSON("/posts.json").then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

[http://jamesknelson.com/grokking-es6-promises-the-four-functions-you-need-to-avoid-callback-hell/]()
