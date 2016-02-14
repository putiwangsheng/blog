# 博客
这里准备搭建我的个人博客

## 搭建流程
> 所有命令应该在项目根目录使用

### 配置环境和文件
> 第一次 clone 下来的步骤

0. 设置 config 文件，"./config.js"文件，mongodb 配置文件 "./node/mongod.conf",
1. npm install 所有的依赖
2. npm run config 运行配置脚本程序  

### 运行服务器
> 重新开机后都要运行

1. npm run mongodb 启动数据库（端口默认为27017,修改见 "./node/mongod.conf"文件）
2. npm run server 启动服务器(默认同上，修改方式同上)

## 重写计划
### 后端
！！！禁止有相同的目录名或者文件名！！！（因为这俩会作为主键存在数据库中）

> node express mongodb

扫描文件目录树生成文章（md 文件）、标签（文件夹），前端交互生成评论

文章 model， 标签 model，详情见 node/app/model.js 里的相应 schema。

### pc 前端

#### 采用vue
- vue组件
- vue-router spa

#### 功能模块
- 首页文章列表
- 单个文章显示
- 评论
- 文章分类

#### 组件
.

### 架构

- spa 路由
    - 各类功能模块

- data
    - server
    - Model
        - 管理 model 的方法（以前写到了 vm 的 metheds 里，这次要分离出来。）
        - model 有关更改服务器数据的方法应该使用server层的方法协助完成。
    - vm（methods 应该是单纯的响应事件，假如事件与model有关，那么应该调用 Model 里的方法来协助完成，Model.add(object)，其中add方法）
