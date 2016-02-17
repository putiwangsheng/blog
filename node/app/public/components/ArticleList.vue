<template>
    <section class="wrapper clearfix" :class="{ loading: !items.length }">
        <div class="article-list">
            <item v-for="item in items"
            :item="item"
            :index="$index"
            track-by="_id">
            </item>
        </div>
        <div>
            <classification :class-tags="classTags"></classification>
        </div>
    </section>
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
          classTags: []
      };
    },

    route: {
        data: function(){
            var tagArr = [];
            var articleUrl = url.articleUrl;
            var tagUrl = url.tagUrl;

            model.getAll(articleUrl, tagUrl).then(data => {
                var articleData = data[0];
                var tagData = data[1];

                this.getDate(articleData);
                this.items = articleData;

                this.classTags = this.getNumber(articleData, tagData);
            });
        }
    },

    methods: {
      uniqTagArr: function(arr){
          var uniqArr = {};
          for(let i = 0, len = arr.length; i < len; i++){
              uniqArr[arr[i].parentTagName] = true;
          };

          return Object.keys(uniqArr);
      },

      getDate: function(arr){
          arr.forEach(function(element){
              let dateArr = element.date.split('T');
              element.date = dateArr[0];

              var markdown = require("markdown").markdown;
              element.md = markdown.toHTML(element.md);
          });
      },

      getNumber: function(articleData, tagData){
          var tagArr = this.uniqTagArr(articleData);
          var classTags = [];

          for(let i = 0, len1 = tagArr.length;i < len1;i++){
              for(let j = 0, len2 = tagData.length;j < len2; j++){
                  if(tagArr[i] === tagData[j].tagName){
                      var classTag = {};

                      classTag.name = tagArr[i];
                      classTag.number = tagData[j].aritcleTitleList.length;
                      classTags[i] = classTag;
                  }
              }
          }

          return classTags;
      }
    }

}
</script>

<style>
.loading::before{
    content: 'Loading...';
    position: absolute;
    left: 45%;
    top: 40%;
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
