import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App.vue';
import ArticleList from './components/ArticleList.vue';
import Article from './components/Article.vue';
import TagArticleList from './components/TagArticleList.vue';

import './css/hybrid.css';
import './css/iconfont.css';
import './css/reset.css';

Vue.use(VueRouter);

var router = new VueRouter();

// 每个路由映射到不同的组件
router.map({
    '/articles/:page': {
        component: ArticleList,
    },
    '/article/:_id': {
        component: Article
    },
    '/tagArticle/:tagName': {
        component: TagArticleList
    }
});

router.beforeEach(function () {
    window.scrollTo(0, 0);
});

// 重定向任意未匹配路径到/articles/1
router.redirect({
  '*': '/articles/1'
});

router.start(App, '#app');
