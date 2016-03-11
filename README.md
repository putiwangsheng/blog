# 博客
- 后端：由SimplyY编写，采用express + mongodb + node-restful
- 前端：采用vue + vue-router + vue-loader + webpack,完成spa.

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

## pc 前端

#### 基本功能
- 首页文章列表
- 单个文章显示
- 标签列表
- 属于单个tag的所有文章列表显示
- 回到顶部
- 多级下拉菜单
- 评论（未完成）

#### 组件
1. 根组件App
2. main view
    - ArticleList(Item)
    - Classification
3. Article
4. TagArticleList
5. Navigation
