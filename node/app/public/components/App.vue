<template>
    <div>
        <router-view
            keep-alive
            transition
            transition-mode="out-in">
        </router-view>

        <section id="footer">
            <p>
    		    © 2016 changqi
            </p>
        </section>
        <button class="top" v-on:click="scrollTop">

        </button>
    </div>
</template>

<script>
export default{
    methods: {
        scrollTop(){
            $("body").animate({scrollTop: 0},400);
        }
    }
}
</script>

<style>
#footer{
    width: 100%;
    height: 4rem;
    text-align: center;
    z-index: 10;
    clear: both;
}

#footer p{
    font-size: .5rem;
}

.top{
    width: 2.5rem;
    height: 2.5rem;
    background-color: #fff;
    border-radius: 50%;
    position: fixed;
    bottom: 1.5rem;
    right: 3rem;
}
</style>
