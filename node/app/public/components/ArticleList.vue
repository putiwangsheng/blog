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
                class="tag"
                :classTag="classTag"
                :index="$index"
                track-by="$index">
                <a :href="'#/article'">{{classTag}}</a>
                <!-- <span>{{articleNumber}}</span> -->
            </p>
        </div>
    </section>
</template>

<script>
import Item from './Item.vue';
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
            let self = this,
              tagArr = [];

            console.log(self.items);
            $.get(url.articleUrl, function(data){

              if(typeof data === "string"){
                  data = JSON.parse(data);
              };

              self.getDate(data);
              self.items = data;

              let tagArr = self.uniqTagArr(data);
              self.classTags = tagArr;
            });
        }
    },

    methods: {
      uniqTagArr: function(arr){
          let uniqArr = {};
          for(let i = 0, len = arr.length; i < len; i++){
              uniqArr[arr[i].parentTagName] = true;
          };

          return Object.keys(uniqArr);
      },

      getDate: function(arr){
          arr.forEach(function(element){
              let dateArr = element.date.split('T');
              element.date = dateArr[0];

            //   let markdown = require("markdown").markdown;
            //   $('.article-content').html(markdown.toHTML(element.md));
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
.class-tags h4{
    padding-bottom: .5rem;
    border-bottom: .1rem dashed #ea7bf7;
}
.tag{
    padding: .3rem 0 0 0;
    color: #666;
}
.tag:hover{
    color: rgb(191, 112, 220);
}
</style>
