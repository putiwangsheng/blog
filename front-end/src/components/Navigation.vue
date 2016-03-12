<template>
    <nav>
        <div class="head">
            <h1>Qi</h1>
        </div>
        <div class="menu">
            <!-- top menu -->
            <ul>
                <li class="top-menu"><a :href="'#/articles/' + '1'">首页</a></li>
                <li class="top-menu"><a :href="href" target="_blank">分类</a>

                    <!-- the first menu start -->
                    <ul class="menu-level-one" v-if="hasTag">
                        <li v-for="first in multiMenu"><a :href="'#/tagArticle/' + first.firstTag">{{first.firstTag}}</a>

                            <!-- the second menu start -->
                            <ul class="menu-level-two">
                                <li v-for="second in first.secondTag"><a :href="'#/tagArticle/' + second">{{second}}</a></li>
                            </ul>
                            <!-- the second menu end -->

                        </li>
                    </ul>
                    <!-- the first menu end -->

                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import store from '../store/store.js';
import url from '../util/url.js';

export default{
    data(){
        return {
            multiMenu: []
        };
    },

    created(){
        store.getRequestInfo(url.tagUrl).then(data => {
            this.firstTags = this.getFirstMenu(data, 1);
            this.multiMenu = this.createMultiMenu(this.firstTags, data);
        });
    },

    computed: {
        hasTag(){
            return this.multiMenu.length !== 0;
        }
    },

    methods: {
        getFirstMenu(arr, level){
            var tagNames = [];
            for(let i = 0, len = arr.length; i < len; i++){
                if(arr[i].tagRank === level){
                    tagNames.push(arr[i].tagName);
                }
            };
            return tagNames;
        },

        createMultiMenu(arr, data){
            var tags = [];

            for(let i = 0, len1 = arr.length; i < len1; i++){
                var menu = {};
                menu.firstTag = arr[i];

                var subTags = [];
                var count = 0;
                for(let j = 0, len2 = data.length; j < len2; j++){
                    if(data[j].parentTagName === arr[i]){
                        subTags[count] = data[j].tagName;
                        count++;
                    };
                }
                menu.secondTag = subTags;

                tags[i] = menu;
            };
            return tags;
        }
    }
}
</script>

<style>
nav{
    width: 100%;
    height: 10rem;
    background-color: #cf86e0;
    border-bottom: .4rem solid #fb8da6;
    position: relative;
}
.top-menu{
    font-size: 1.15rem;
}
.top-menu li{
    font-size: 1.1rem;
    font-weight: 500;
}
.head h1{
    color: #fff;
    font-size: 4rem;
    position: absolute;
    top: 1rem;
    left: 4rem;
}
/*顶级菜单*/
.menu{
    position: absolute;
    bottom: 0;
    margin-left: 3.5rem;
}
.menu li{
    display: inline-block;
    margin-right: 1rem;
    position: relative;
    z-index: 999;
}
.menu a{
    display: block;
    padding: .3rem .6rem;
    color: #fff;
    font-weight: bolder;
}
.menu li ul a{
    font-weight: normal;
}
.menu a:hover{
    border-top: .15rem solid #fb8da6;
    background-color: #a45eba;
}
/*一级菜单*/
.menu li ul{
    width: 7rem;
    display: block;
    position: absolute;
    left: 0;
    top: 100%;
    display: none;
}
.menu li li{
    display: block;
    margin-right: 0;
}
.menu-level-one a:hover{
    border: none;
}
.menu li:hover > ul{
    background-color: #a45eba;
    display: block;
}
.menu li:hover{
    background-color: #a45eba;
}
.menu li li a:hover{
    background-color: #b36bbc;
}
/*二级菜单*/
.menu li li ul{
    position: absolute;
    left: 100%;
    top: 0;
}
</style>
