<template>
    <div>
        <navigation></navigation>

        <div class="article">
            <div class="detail">
                <span>{{articleInfo.date}}</span>
                <a :href="'#/tagArticle/' + articleInfo.parentTagName">{{articleInfo.parentTagName}}</a>
            </div>
            <article>
                <h1>{{articleInfo.title}}</a></h1>
                <div class="a-content markdown-body">
                    {{{articleInfo.html}}}
                </div>
            </article>
        </div>
    </div>

</template>

<script>
import url from '../util/url.js';
import store from '../store/store.js';
import Navigation from './Navigation.vue';

export default{
    name: "Article",

    components: {
        Navigation
    },

    data(){
        return {
            articleInfo: {}
        }
    },

    route: {
        data: function(transition){
            var articleId = transition.to.params._id;
            var singleArticleUrl = url.articleUrl + '?_id=' + articleId;

            store.getRequestInfo(singleArticleUrl).then(data => {
                var data = data[0];
                data.date = store.getDate(data.date);
                this.articleInfo = data;
            });
        }
    }

}
</script>

<style>
.article{
    width: 75%;
    margin: 5rem auto;
    height: 100%;
    color: #444955;
    font-size: 1.1rem;
}

article {
    background-color: rgb(255, 255, 255);
    border-radius: .4rem;;
    box-shadow: 2px 2px 3px #918b8b;
    padding: 1.5rem 2.5rem;
}
.detail{
    padding: .5rem .7rem;
    font-weight: bold;
}
.detail span{
    color: #666;
}
.detail a{
    background-color: #d274f7;
    padding: .1rem .7rem .1rem 1.7rem;
    margin: 0 1rem;
    border-radius: 2rem;
    color: #fff;
    font-size: .9rem;
    position: relative;

}
.detail a::before{
    content: '';
    display: inline-block;
    width: .85rem;
    height: .85rem;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: .3rem;
    left: .5rem;
}
.detail a:hover{
    background-color: #666;
}
.article h1{
    text-align: center;
    font-size: 2.1rem;
    letter-spacing: .2rem;
    padding-bottom: .8rem;
    border-bottom: .1rem dashed #000;
    text-shadow: 1px 1px 0 #b0aeb0;
    color: #000;
}

.a-content{
    padding: 1rem 0;
    line-height: 1.7;
}
.a-content a{
    color: #8c41a3;
}
/*.a-content p{
    text-indent: 2rem;
}*/
.a-content h1,
.a-content h2,
.a-content h3,
.a-content h4{
    margin-top: .5rem;
    margin-bottom: .2rem;
    color: #444955;
}
.a-content h2{
    margin-top: 1.5rem;
}
.a-content h1{
    display: none;
}
.a-content strong{
    color: #8c41a3;
}
</style>
