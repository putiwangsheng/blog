<template>
    <div class="class-tags" v-if="hasloaded">
        <h4>Tag</h4>
        <p  v-for="classTag in classTags"
            class="tag"
            :index="$index"
            track-by="$index">
            <a :href="'#/tagArticle/' + classTag.name">{{classTag.name}}</a>
            <span class="number">{{classTag.number}}</span>
        </p>
    </div>

</template>

<script>
import store from '../store/store.js';
import url from '../util/url.js';

export default{
    name: "Classification",

    data(){
        return {
            classTags: []
        }
    },

    created(){
        var articleUrl = url.articleUrl;
        var tagUrl = url.tagUrl;

        store.getAll(articleUrl, tagUrl).then(data => {
            var articleData = data[0];
            var tagData = data[1];

            this.classTags = this.getNumber(articleData, tagData);
        });


    },

    computed:{
        hasloaded(){
            if(this.classTags.length !== 0){
                return true;
            }
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
    position: relative;
    font-family: monospace;
}
.tag:hover{
    color: #d514fc;
}
.number{
    display: inline-block;
    text-align: center;
    width: 1rem;
    border-radius: 50%;
    background-color: #fb8da6;
    color: #fff;
    font-size: .5rem;
    position: absolute;
    right: .5rem;
    bottom: .1rem;
}
.number:hover{
    background-color: #666;
}
</style>
