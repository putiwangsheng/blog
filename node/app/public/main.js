import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App.vue';
import ArticleList from './components/ArticleList.vue';
import Article from './components/Article.vue';

Vue.use(VueRouter);

var router = new VueRouter();

router.map({
    '/': {
        component: ArticleList,
    },
    '/article': {
        component: Article
    }
});

router.beforeEach(function () {
    window.scrollTo(0, 0);
});

router.start(App, '#app');
