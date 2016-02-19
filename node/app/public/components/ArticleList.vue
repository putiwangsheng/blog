<template>
    <div>

    <section id="header">
        <img class="b-title" src="https://ooo.0o0.ooo/2016/01/27/56a88272da80e.png" alt="SEEKFNL" />
        <p class="s-title">
            <span style="color: #3369e8">Blog</span>
            <span style="color: #eeb211">of</span>
            <span style="color: #d50f25">ChangQi</span>
        </p>
        <div class="signature">
            <p>
                情不知所起
            </p>
            <p>
                一往而深
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
          items: []
      };
    },

    route: {
        data: function(){
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
    background-image: url("https://ooo.0o0.ooo/2016/01/26/56a76938f09fb.jpg");
    height: 40rem;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.8;
}
.b-title{
    position: relative;
    top: 1rem;
    left: 1rem;
}
.s-title{
    position: absolute;
    color: #fff;
    font-weight: 700;
    font-size: 2rem;
    -webkit-transform: rotate(-12deg) translate(255px, -10px);
    -moz-transform: rotate(-12deg) translate(255px, -10px);
    transform: rotate(-12deg) translate(255px, -10px);
}
.signature{
    display: inline-block;
    border: .3rem solid #ea7bf7;
    position: absolute;;
    top: 3rem;
    right: 8%;
    padding: .3rem;
}
.signature p{
    display: inline-block;
    vertical-align: top;
    width: 1rem;
    color: #fff;
}

#divider{
    margin: 4.5rem 0 0 0;
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
</style>
