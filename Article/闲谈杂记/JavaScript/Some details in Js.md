# Some details in Js

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

## && 和 ||
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
