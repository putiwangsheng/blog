<template>
    <div class="tagArticleList">
        <div class="list">
            <div class="border">
                <h4>
                    {{tagName}}
                </h4>
                <div
                 v-for="item in items"
                 class="item"
                :item="item"
                :index="$index"
                track-by="$index">
                    <p>
                        <a :href="'#/article/' + item.id">{{item.title}}</a>
                    </p>
                    <span class="date">{{item.date}}</span>
                </div>
            </div>
        </div>
        <classification :class-tags="classTags"></classification>

    </div>
</template>

<script>
import url from '../url.js';
import model from '../model/model.js';
import Classification from './Classification.vue';


export default{
    name: "tagArticleList",

    components: {
        Classification
    },

    data(){
        return {
            tagName: '',
            items: []
        };
    },

    route: {
        data: function(transition){
            var articleTagName = transition.to.params.tagName;
            var tagUrl = url.tagUrl + '?tagName=' + articleTagName;
            var articleUrl = url.articleUrl;

            model.getAll(articleUrl, tagUrl).then(data => {
                var articleData = data[0];
                var tagData = data[1];

                this.tagName = articleTagName;
                this.items = this.getDatas(articleData, tagData);
            });
        }
    },

    methods:{
        getDatas: function(articleData, tagData){
            var items = [];
            var titleArr = tagData[0].aritcleTitleList;

            for(let i = 0, len1 = titleArr.length; i < len1; i++){
                for(let j = 0, len2 = articleData.length; j < len2; j++){
                    if(titleArr[i] === articleData[j].title){
                        var item = {};
                        item.title = titleArr[i];
                        item.date = model.handleDate(articleData[j].date);
                        item.id = articleData[j]._id;
                        items[i] = item;
                    }
                }
            };
            return items;
        }
    }
}
</script>

<style>
.tagArticleList{
    width: 90%;
    margin: 2rem auto;
}
.list{
    width: 60%;
    float: left;
    background: linear-gradient(rgba(255,255,255,.6), rgba(255,255,255,.7) 5%, rgba(255,255,255,.8) 10%, #fff 25%, #fff 75%, rgba(255,255,255,.7) 95%,rgba(255,255,255,.6));
    border-radius: .5rem;
    padding: 1rem;
    margin: 1rem;
}
.border{
    border: .2rem solid #fb8da6;
    padding: 2rem;
    border-radius: .5rem;
    position: relative;
}
.item{
    position: relative;
}
.item p{
    padding-top: 1rem;
    padding-bottom: .5rem;
    border-bottom: .1rem dashed #fb8da6;
}
.item:hover{
    color: #d514fc;
}
.list h4{
    width: 100%;
    position: absolute;
    top: 0;
    text-align: center;
    margin: 0;
    padding: .1rem 0;
}
</style>
