<template>
    <div class="article">
        <div class="a-date">
            {{articleInfo.date}}
        </div>
        <article>
            <h1>{{articleInfo.title}}</a></h1>
            <div class="a-content">
                {{{articleInfo.article}}}
            </div>
        </article>
    </div>

</template>

<script>
import url from '../url.js';
import model from '../model/model.js';

export default{
    name: "Article",

    data(){
        return {
            articleInfo: {}
        }
    },

    route: {
        data: function(transition){
            var articleId = transition.to.params._id;
            var articleUrl = url.articleUrl + '?_id=' + articleId;
            var markdown = require("markdown").markdown;
            var articleInfo = {};

            model.getArticleList(articleUrl).then(data => {
                data = data[0];

                articleInfo.title = data.title;
                articleInfo.article = markdown.toHTML(data.md);
                articleInfo.date = data.date.split('T')[0];
                this.articleInfo = articleInfo;
            });
        }
    }
}
</script>

<style>
.article{
    width: 75%;
    margin: 2rem auto;
}
article {
    background-color: rgb(255, 255, 255);
    border-radius: .4rem;;
    box-shadow: 2px 2px 3px #918b8b;
    padding: 1.5rem 2.5rem;
}
.a-date{
    padding: .5rem .7rem;
    font-weight: bolder;
    color: #666;
}
.article h1{
    text-align: center;
    font-size: 1.6rem;
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
.a-content p{
    text-indent: 2rem;
}
.a-content h1,h2,h3,h4{
    margin-top: 1rem;
    margin-bottom: .1rem;
    color: #444955;
}
h2{
    padding-left: .4rem;
    border-left: .2rem solid #c969ef;
}
</style>
