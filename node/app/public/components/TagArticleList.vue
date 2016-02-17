<template>
    <div class="tagArticleList">
        <div class="">

        </div>
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
                        <a :href="'#/article/'">{{item}}</a>
                    </p>
                    <!-- <span>{{item.date}}</span> -->
                </div>
        </div>
    </div>

</template>

<script>
import url from '../url.js';
import model from '../model/model.js';

export default{
    name: "tagArticleList",

    data(){
        return {
            tagName: '',
            items: []
        }
    },

    route: {
        data: function(transition){
            var articleTagName = transition.to.params.tagName;
            var tagUrl = url.tagUrl + '?tagName=' + articleTagName;
            var items = [];

            model.getTagInfo(tagUrl).then(data => {
                data = data[0];

                items = data.aritcleTitleList;
                this.tagName = articleTagName;
                this.items = items;
            });
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
.item p{
    padding-top: 1rem;
    padding-bottom: .5rem;
    border-bottom: .1rem dashed #fb8da6;
}
.item:hover{
    color: #666;
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
