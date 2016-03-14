<template>
    <div>
    <section id="header">
        <div class="head-title">
            <img class="b-title" src="https://ooo.0o0.ooo/2016/01/27/56a88272da80e.png" alt="SEEKFNL" />
            <p class="s-title">
                <span style="color: #3369e8">Blog</span>
                <span style="color: #eeb211">of</span>
                <span style="color: #d50f25">ChangQi</span>
            </p>
        </div>

    </section>
    <hr id="divider"></hr>

    <section class="wrapper clearfix">
        <div class="article-list">
            <item v-for="item in items | orderBy 'date' -1"
            :item="item"
            :index="$index | formatItemIndex"
            track-by="_id">
            </item>
        </div>
        <classification></classification>
    </section>

    <div class="page" v-show="items.length > 0">
        <ul>
            <li><a v-if="page > 1" :href="'#/articles/' + (page - 1)" class="iconfont icon-double-arrow-up"></a></li>

            <li v-for="pageItem in pages"><a :href="'#/articles/' + (pageItem + 1)" :class="{currentPage: page === (pageItem + 1)}">{{pageItem + 1}}</a></li>

            <li><a v-if="page < limit" :href="'#/articles/' + (page + 1)" class="iconfont icon-double-arrow-down"></a></li>
        </ul>
    </div>
</div>

</template>

<script>
import Item from './Item.vue';
import Classification from './Classification.vue';
import store from '../store/store.js';
import url from '../util/url.js';

export default{

    name: "ArticleList",

    components: {
        Item,
        Classification
    },

    data () {
      return {
          items: [],
          page: 1,
          pages: null,
          limit: null
      };
    },

    route: {
        data: function(transition){
            var page = +transition.to.params.page;
            var articleUrl = url.articleUrl;
            var self = this;

            store.getRequestInfo(articleUrl)
            .then(data => {
                var allPages = data.length;
                self.getPages(allPages);
            })
            .then(() => {
                // when the data changes,trigger the view change
                store.getArticlesByPage(page).then(data => {
                    self.handleData(data);
                    self.items = data;
                    self.page = page;
                });
            });

        }
    },

    methods: {
      handleData(arr){
          arr.forEach(function(element){
              element.date = store.getDate(element.date);
          });
      },

     getPages(allPages){
         var limit = Math.ceil(allPages/store.perPage);
         this.pages = limit;
         this.limit = limit;
     }
  },

  filters: {
      formatItemIndex (index) {
        return (this.page - 1) * store.perPage + index + 1;
      }
  }
}
</script>

<style>
#header{
    height: 11rem;
    background-color: #cf86e0;
    border-bottom: .2rem solid #fb8da6;
    position: relative;
}
.head-title{
    position: absolute;
    top:.9rem;
    left: 1.5rem;
}
.s-title{
    color: #fff;
    font-weight: 700;
    font-size: 2rem;
    -webkit-transform: rotate(-12deg) translate(255px, -10px);
    -moz-transform: rotate(-12deg) translate(255px, -10px);
    transform: rotate(-13deg) translate(245px, -30px);
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
    margin: 0 6% 0 0;
    float: left;
}
.page{
    position: fixed;
    right: 1rem;
    top:45%;
}
.page li{
    padding: .15rem 0;
    font-size: .8rem;
    text-align: center;
    color: #666;
}
.page a{
    display: block;
    padding: .1rem;
}
.page a:hover{
    background-color: #eee;
}
.currentPage{
    color: #cf86e0;
    font-size: 1.1rem;
}
</style>
