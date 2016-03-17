<template>
    <article class="article-item">
        <h1 class="article-title"><a :href="'#/article/' + item._id">{{item.title}}</a></h1>
        <div class="article-tag">
            <a :href="'#/tagArticle/' + item.parentTagName"><p>{{item.parentTagName}}</p></a>

        </div>
        <div class="date iconfont icon-calendar">
            {{item.date}}
        </div>

        <div class="article-content markdown-body">
            {{{item.html | limitShow}}}
        </div>
    </article>

</template>

<script>
export default{
    name: "Item",

    props: {
        item: Object
    },

    filters: {
        limitShow(text){
            var end = text.indexOf("</p>");
            var newText = text.substring(0, end + 4);
            return newText;
        }
    }

}
</script>

<style>
.article-item{
    background-color: #fff;
    border-radius: .4rem;;
    box-shadow: 2px 2px 3px #918b8b;
    padding: 1rem;
    margin: .5rem 0 3rem 0;
    position: relative;
    white-space: normal;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
}
.article-item:hover{
    box-shadow: 4px 4px 5px #918b8b;
}
.article-title{
    font-size: 1.8rem;
    padding-bottom: .8rem;
    border-bottom: .1rem dashed #ea7bf7;
    text-shadow: 1px 1px 0 #b0aeb0;
    color: #ea7bf7;
}
.article-title:hover{
    color: #fb8da6;
}
.article-tag{
    position: absolute;
    background-color: whiteSmoke;
    width: 10rem;
    right: .5rem;
    text-align: center;
    -webkit-transform: rotate(40deg) translate(5px, -60px);
    -moz-transform: rotate(40deg) translate(5px, -60px);
    transform: rotate(40deg) translate(5px, -60px);
    z-index: 1;
}
.article-tag p{
    padding: .2rem 0;
    color: #fb8da6;
    font-weight: 700;
    border-top: .1rem dashed #fb8da6;
    border-bottom: .1rem dashed #fb8da6;
}
.article-tag:hover{
    background-color: #ededed;
}
.date{
    display: inline-block;
    color: #666;
    border-left: .2rem solid #fb8da6;
    border-right: .2rem solid #fb8da6;
    padding: .1rem .5rem;
    font-size: .8rem;
    position: absolute;
    right: .5rem;
    bottom: .5rem;
}

.article-content{
    overflow: hidden;
    margin-bottom: 1.2rem;
    padding: 1rem 0;
    line-height: 1.8;
}

.article-content h1{
    display: none;
}
.article-content p{
    text-indent: 2rem;
}
</style>
