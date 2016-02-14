<template>
    <section class="wrapper clearfix">
        <div class="article-list">
            <item v-for="item in items"
            :item="item"
            :index="$index"
            track-by="_id">
            </item>
        </div>

        <div class="class-tags">
            <h4>分类</h4>
            <p  v-for="classTag in classTags"
                :classTag="classTag"
                :index="$index"
                track-by="_id">
                <a :href="'#/article'">{{classTag.tagName}}</a>
            </p>
        </div>
    </section>
</template>

<script>
import Item from './Item.vue';
import Classification from './Classification.vue';
import url from '../url.js';

export default{
    name: "ArticleList",

    components: {
        Item
    },

  data () {
      return {
          items: [],
          classTags: []
      };
  },

  route: {
      data: function(){
          let self = this;

          $.get(url.articleUrl, function(data){

              if(typeof data === "string"){
                  data = JSON.parse(data);
              };

              self.items = data;
          });

          $.get(url.tagUrl, function(data){

              if(typeof data === "string"){
                  data = JSON.parse(data);
              };

              // data.forEach(function(element, index, array){
              //     self.classTags.push(element.tagName);
              // })
              self.classTags = data;

          });
      }
  }

}
</script>

<style>
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
.class-tags{
    width: 20%;
    float: left;
    background-color: #fff;
    border-radius: .4rem;;
    box-shadow: 2px 2px 3px #918b8b;
    padding: 1rem;
    margin: .5rem 0 1.5rem 0;
}
h4{
    padding-bottom: .5rem;
    border-bottom: .1rem dashed #ea7bf7;
}
.class-tags p{
    padding: .3rem 0 0 0;
}
</style>
