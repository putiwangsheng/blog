# About Blog

`vue + vue-router + vue-loader + webpack + babel + vue组件`实现的spa应用。

## 涉及知识
### spa
#### spa特点：
- **前后端分离**（分离页面的渲染工作），后端只提供数据接口，前端负责获取数据和视图渲染（根据不同的逻辑拼接html代码，呈现不同的视图（并非页面））。
- **控制器前置**，单页应用将路由处理放在浏览器端，即在浏览器端直接响应浏览器地址的变化，分发到对应的路由，向用户呈现对应的界面。
- **以小块组件为功能元件**，类似于传统网页中的 Ajax 组件，单页应用以小的组件为功能元件，在路由变化时，不再刷新整个页面，而是组合这些小的组件，替换变化的部分。

#### spa优缺点：
##### 优点
- 页面无需刷新，响应迅速，提升用户体验
##### 缺点
- 首页加载大量资源，所以需要一定的处理，比如按需加载
- 不利于SEO

#### spa开发实现结构：
- 页面逻辑的组织（mvvm模式）
- 代码的组织（组件化，功能独立，可复用）
- 路由控制（`vue-router`）

#### 关于`vue-router`：
- `router.map`：把路由映射到各个组件，`vue-router`会把组件渲染到正确的地方。（切换路由时，呈现对应的界面）
- 路由片段可以通过路由对象（切换路由时，路由对象更新）的`params`属性获得，如`id`，`tagName`等。
- 切换钩子函数`data`，设置加载当前组件的数据


### 组件化
组件是封装起来具有独立功能的UI部件。
vue组件类似于自定义元素

### 模块化
es6 module

### Promise
[http://simplyy.space/article/56da6d841795204c56032e21#说说你对Promise的理解](http://simplyy.space/article/56da6d841795204c56032e21#说说你对Promise的理解)

解决异步操作


### webpack
用webpack进行各类资源的打包，减少http请求。

webpack是一种模块加载器和打包工具，具备健全的加载器编译各类文件，支持模块化。能替代部分 grunt/gulp 的工作，如打包、压缩混淆、图片转base64等。

## 一些问题
### 路径问题
前后端路径问题 :(
`express`中使用`express.static`中间件来托管静态文件。需要将静态资源的目录作为参数传递给`express.static`，就可以提供静态资源服务器的访问。
对于
```
app.use('/static', express.static(path.join(__dirname, 'static'),{
            etag: false,
    })
```
>`/static`为虚拟url路径，`static`即静态资源目录，存放webpack打包生成的`bundle.js`文件。

项目中有一个app文件夹，static目录应该是app的子目录。这样当请求静态资源的时候才可以在静态资源目录找到并返回内容。
> `__dirname`指当前文件所属的文件夹的路径，即app文件夹的路径。

###  分页（减少首页加载时间）
博客首页会加载文章列表，但是如果将所有的文章都加载下来，并进行DOM处理和渲染，首页的加载速度会受到很大的影响。所以有必要进行数据的分页加载，以加快首页的展示时间。
根据当前页的页码和每页展示的列表个数，计算出当前页显示哪些文章。通过ajax请求动态生成每页的列表项。

### 多级下拉菜单
嵌套进行列表渲染。
由下面的简单例子扩展
**html**
```
<!-- the first menu start -->
<ul class="menu-level-one">
	<li v-for="first in multiMenu"><a>{{first.firstTag}}</a>
		<!-- the second menu start -->
        <ul class="menu-level-two">
	        <li v-for="second in first.secondTag"><a>{{second}}</a></li>
        </ul>
        <!-- the second menu end -->
     </li>
 </ul>
```
**js**
```javascript
new Vue({
	el: '',
	data: {
		multiMenu: [{firstTag: 'a', secondtag: ['a1', 'a2', 'a3', 'a4']},
		{firstTag: 'b', secondtag: ['b1', 'b2', 'b3', 'b4']}
		...
		]
	}
})
```
> `multiMenu`为数组，其成员为对象，有`firstTag`,`secondtag`两个属性，`firstTag`即一级标签的菜单项，而`secondtag`即每个一级菜单项所对应的二级菜单。

## 性能优化
- webpack打包，减少http请求
- 首屏分页
- 资源用cdn
- js文件放在文档底部

## 后记
### 关于MVVM
三部分：Model、View、ViewModel

View：视图层
ViewModel：负责View与Model之间信息转换
Model：数据层

### 关于vue
mvvm库，聚焦视图层

核心：
响应的数据绑定系统
组件系统

优点：
轻量，简单易用
