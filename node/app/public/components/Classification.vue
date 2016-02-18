<template>
    <div class="class-tags" v-if="hasloaded">
        <h4>分类</h4>
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
export default{
    name: "Classification",

    props:{
        classTags: Array
    },

    date(){
        return {
            classTags: []
        }
    },

    computed:{
        hasloaded(){
            if(this.classTags.length !== 0){
                return true;
            }
        }
    },

    route: {
        data: function(){
            console.log("sss");
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
}
.tag:hover{
    color: #d514fc;
}
.number{
    display: inline-block;
    text-align: center;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
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
