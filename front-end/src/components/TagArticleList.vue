<template>
    <div>
        <navigation></navigation>

        <div class="tagArticleList clearfix">
            <div class="list">
                <div class="border">
                    <h3>
                        {{tagName}}
                    </h3>

                    <div
                     v-for="item in items"
                     class="item"
                    :item="item"
                    :index="$index"
                    track-by="id">
                        <p>
                            <a :href="'#/article/' + item.id">{{item.title}}</a>
                        </p>
                        <span class="date"><i class="iconfont icon-calendar"></i>{{item.date}}</span>
                    </div>
                </div>
            </div>
            <classification></classification>
        </div>
    </div>

</template>

<script>
import url from '../util/url.js';
import store from '../store/store.js';
import Classification from './Classification.vue';
import Navigation from './Navigation.vue';

export default{
    name: "tagArticleList",

    components: {
        Classification,
        Navigation
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

            store.getAllInfo(articleUrl, tagUrl).then(data => {
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
            var titleArr = tagData[0].articleTitleList;

            for(let i = 0, len1 = titleArr.length; i < len1; i++){
                for(let j = 0, len2 = articleData.length; j < len2; j++){
                    if(titleArr[i] === articleData[j].title){
                        var item = {};
                        item.title = titleArr[i];
                        item.date = store.getDate(articleData[j].date);
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
    width: 85%;
    height: 100%;
    margin: 4rem auto;
}
.list{
    width: 60%;
    float: left;
    background: linear-gradient(rgba(255,255,255,.6), rgba(255,255,255,.7) 5%, rgba(255,255,255,.8) 10%, #fff 25%, #fff 75%, rgba(255,255,255,.7) 95%,rgba(255,255,255,.6));
    border-radius: .5rem;
    padding: 1rem;
    margin: .5rem 10% 1rem 0;
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
.list h3{
    width: 100%;
    top: 0;
    text-align: center;
    margin: 0;
    padding: .1rem 0;
}

</style>
