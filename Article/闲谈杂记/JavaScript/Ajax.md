# Ajax
Ajax，一种不用刷新整个页面就可以更新页面局部内容的技术。核心是`XMLHttpRequest`对象。Ajax可以发送同步请求也可以发送异步请求（主要就是通过设置`XMLHttpRequest`对象实例`open`方法的第三个参数是`true`还是`false`），一般Ajax请求都是用的异步请求，除非有特殊的情况。

## 原生实现
### GET请求
```JavaScript
var xhr;
//1.创建异步调用对象
if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
}else{
    //兼容IE5，IE6
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

//2.设置请求的方法，url,是否采用异步
xhr.open('GET', url, true);
//3.发送请求
xhr.send();

//4.设置请求状态发生改变时的请求处理函数
xhr.onreadystatechange = function(){
    //状态变为4，即请求完成，响应就绪时
    if (xhr.readyState === 4){
        if (xhr.status === 200){
            //do something
        } else {
            //do something
        }
    }
}
```
### POST请求
```
xhr.open('POST', url, true);
//设置http请求头，在send之前（如果要像表单那样post数据）
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//参数为要发送的实际数据
xhr.send(data);
```
> 请求状态
> - 0：实例对象生成，open方法未被调用
> - 1：服务器连接已建立（open被调用），send未被调用
> - 2：请求已接收，send方法被调用
> - 3：请求处理中
> - 4：请求完成且响应就绪
>
> 兼容性问题
>
>  IE5，IE6不支持`XMLHttpRequest`对象，他们使用`ActiveXObject`，所以创建对象时首先检测一下浏览器是否支持`XMLHttpRequest`。

## GET与POST的区别
- 作用：GET一般用于获取信息，可以在URL中传递少量参数；POST一般用于更新服务器上的文件或数据库。
- 信息大小限制：GET发送的信息数量有限制；POST可以向服务器发送大量数据。
- 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠；GET更简单更快捷，大多情况下可以用。

## 缺点
- ajax不支持浏览器back按钮，因为无法改变页面URL
- 安全问题， AJAX暴露了与服务器交互的细节
- 对搜索引擎的支持比较弱
- 破坏了程序的异常机制，不容易调试

## 一些具体的细节
[http://javascript.ruanyifeng.com/bom/ajax.html#toc0]()
