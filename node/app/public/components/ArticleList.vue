<template>
    <div>
    <section id="header">
        <div class="head-title">
            <!-- <img class="b-title" src="https://ooo.0o0.ooo/2016/01/27/56a88272da80e.png" alt="SEEKFNL" /> -->
            <p class="s-title">
                <span style="color: #3369e8">Blog</span>
                <span style="color: #eeb211">of</span>
                <span style="color: #d50f25">ChangQi</span>
            </p>
        </div>

    </section>
    <hr id="divider"></hr>

    <section class="wrapper clearfix" :class="{ loading: !items.length }">
        <div class="article-list">
            <item v-for="item in items"
            :item="item"
            :index="$index"
            track-by="_id">
            </item>

            <div class="page" v-show="items.length > 0">
                <a v-if="page > 1" class="pre" :href="#">prev</a>
                <a class="next" :href="#">next</a>
            </div>
        </div>
        <classification></classification>
    </section>
</div>

</template>

<script>
import Item from './Item.vue';
import Classification from './Classification.vue';
import model from '../model/model.js';
import url from '../url.js';

export default{

    name: "ArticleList",

    components: {
        Item,
        Classification
    },

    data () {
      return {
          items: [],
          page: 1
      };
    },

    route: {
        data: function(transition){
            var page = transition.to.params.page;
            var articleUrl = url.articleUrl;

            model.getArticleList(articleUrl).then(data => {
                var articleData = data;
                this.handleData(articleData);
                this.items = articleData;
            });
        }
    },

    methods: {
      handleData: function(arr){
          arr.forEach(function(element){
              element.date = model.handleDate(element.date);
              element.md = model.toMarkdown(element.md);
          });
      }
  }
}
</script>

<style>
#header{
    height: 10rem;
    position: relative;
}
.head-title{
    position: absolute;
    top:1rem;
    left: 1rem;
}
.b-title{

}
.s-title{
    color: #fff;
    font-weight: 700;
    font-size: 1.5rem;
    /*-webkit-transform: rotate(-12deg) translate(255px, -10px);
    -moz-transform: rotate(-12deg) translate(255px, -10px);
    transform: rotate(-12deg) translate(255px, -10px);*/
}

#divider{
    margin-top: 3rem;
    border: none;
    border-top: .1rem solid #fff;
    text-align: center;
}
#divider:after{
    content: url("https://ooo.0o0.ooo/2016/01/27/56a99d661f678.png");
    background-color: #e2e2e2;
    position: relative;
    top: -.8rem;
    display: inline-block;
}

.wrapper{
    padding: 3rem 8%;
}
.clearfix:after {
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}
.article-list{
    width: 70%;
    margin: 0 7% 0 0;
    float: left;
}
.page{
    background-color: #fff;
    height: 1.9rem;
    line-height: 1.9rem;
    border-radius: .3rem;
}
.page .pre,.page .next{
    padding: 0 .5rem;
}
.page .next{
    float: right;
}
</style>
