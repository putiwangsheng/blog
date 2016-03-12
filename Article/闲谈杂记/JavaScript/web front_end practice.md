# web front_end practice

## 使用`toString()`检测对象类型
默认情况下，每个对象会从`Object`上继承`toString()`方法，一般会返回`"[object type]"`，type是一个对象类型。所以可以用`toString()`方法来检测一个对象的内置类型。
#### eg:
```
var toString = Object.prototype.toString;

toString.call(new Date);//"[object Date]"
toString.call(new String); // "[object String]"
toString.call(Math); // "[object Math]"
toString.call(new Array); // "[object Array]"

//Since JavaScript 1.8.5
toString.call(undefined); // "[object Undefined]"
toString.call(null); // "[object Null]"
```
## 数组、对象的浅复制与深复制
对象的浅复制指的是复制的对象的引用，当一个对象里的值被改变时，相应的，复制对象也会被改变。
而深复制则是将对象的每一项进行复制，相当于生成了一个新的对象，只是这个新对象里的值和该对象一模一样。这样的话，一个对象的改变不会引起另一个对象的相应改变。
下面是对数组和对象的深复制代码
```
function cloneObject(src) {
    var result;

    if(src instanceof Array){
        result = [];
        for (var i = 0, len = src.length; i < len; i++) {
            result[i] = cloneObject(src[i]);
        }
    }else if (src instanceof Object) {
        result = {};
        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                result[key] = cloneObject(src[key]);
            }
        }
    }else{
        result = src;
    }
    return result;
}
```
> 重点是在循环赋值时调用了函数`cloneObject()`，这样可以保证当数组或对象的元素是非原始值的时候，同样实现的是深复制。


## 数组去重操作（只考虑数组元素为数字或者字符串）
列举一下看到的有关数组去重的几种方法
```javascript
function uniqArray(arr) {
    var obj = {};
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {

        var key = arr[i];

        if (!obj[key]) {
            result.push(key);
            obj[key] = true;
        }
    }
    return result;
}
```
> 该方法引入了一个对象，将数组元素保存在对象的键中。另外定义了一个空数组，循环遍历将对象中的键加入数组中。


```
function uniqArray(arr) {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        obj[arr[i]] = true;
    }
    return Object.keys(obj);
}
```
> 这种应该是对上面一种方法的进一步优化，并没有定义空数组，而是利用对象的`keys()`方法直接将对象的键返回，就是我们需要的去重后的数组。
> 但是上面两种方法有一个小的问题，对象的键默认都是字符串，那么返回的数组中的元素自然也变成了字符串。


```
function uniqArray(arr) {
    var re = [];
    for (var i in arr) {
        if (re.indexOf(arr[i]) === -1){
            re.push(arr[i]);
        }
    }
    return re;
}
```
> 该方法主要是利用了数组的`indexOf()`方法，参数为数组元素，当元素不存在时，将返回-1，此时将元素加入新数组。但是需要注意的是`indexOf()`方法不支持IE9以下。


## css颜色覆盖的问题（层叠规则）
代码如下：
```
<ul class="buttons">
    <li class="active"></li>
</ul>
```
```
.bottons > li{
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: .15rem solid #c300ff;
    border-radius: 50%;
    background-color: #fff;
}
.bottons .active{
    background-color: #009925;
}
```
> 我要去看看《css设计指南》


## 获取页面元素位置
- **绝对位置**，应该指的是相对于文档左上角的位置。
	1. 利用元素的`offsetTop`，`offsetLeft`属性，表示元素左上角到其父元素（offsetParent对象）左上角的距离。计算绝对位置，将元素的这两个属性和其父元素的两个属性相加。
	2. ```
	element.getBoundingClientRect().left + docment.docmentElement.scrollLeft;
	element.getBoundingClientRect().top + docment.docmentElement.scrollTop;

		```
- **相对位置**，指相对于浏览器窗口（viewport，即视口）的位置。滚动条滚动的垂直距离，是document对象的`scrollTop`属性；滚动条滚动的水平距离是document对象的`scrollLeft`属性。
两种方法：
1. 先计算出绝对位置，然后减去滚动条的位置
2. 比较简单的，直接用`getBoundingClientRect()`方法，返回一个对象，包含`left`,`right`,`top`,`bottom`四个属性，分别对应这个元素左上角和右下角相对于浏览器窗口左上角的位置。
## 键盘事件的一些兼容性问题
- 传入事件处理函数的参数在一些浏览器中有时只能通过全局对象获得。所以最好写成`e = e || window.event (e为传入的参数)`
- `keyCode`键盘值的兼容性问题
  - 在IE下：
> 支持keyCode
> 不支持which和charCode,二者值为 undefined

  - 在Firefox下：
> 支持keyCode，除功能键外，其他键值始终为 0
> 支持which和charCode，二者的值相同

  - 在Opera下：
> 支持keyCode和which，二者的值相同
> 不支持charCode，值为 undefined


## 关于+ RegExp(['\x241'])
\x24：十六进制转义，代表ASCII码''$''。

$1是javascript全局对象 RegExp 的属性，返回在模式匹配期间找到的、最近保存的部分

\+ 相当于 `Number()`函数
## &&和 ||
js中的逻辑运算符&&和||并不总是返回布尔值，它们在非Boolen环境下返回实际操作数的值。
**&&**
```
2 && 3 //3
0 && 3 //0
1 && 0 //0
```
> &&运算的规则是，对于`exp1 && exp2`，当exp1能转化为false时返回exp1，否则返回exp2

**用途**
对于 `vari1 && vari2`,可以相当于一个三元式，`vari1 ? vari2: vari1`。避免使用不存在的对象的属性时出错。

**||**
```
2 || 3 //2
0 || 3 //3
1 || 0 //1
```
> ||运算的规则是，对于`exp1 || exp2`，当exp1能转化为true时返回exp1，否则返回exp2

**用途**：设置默认值
```
//当vari1为undefined时，test会被赋值为vari2
var test = vari1 || vari2;
```
