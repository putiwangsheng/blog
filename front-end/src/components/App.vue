<template>
    <div>
        <router-view
            keep-alive
            transition
            transition-mode="out-in">
        </router-view>

        <section id="footer">
            <p>
    		    &copy; 2016 changqi
            </p>
            <p>
                <span>空山清梦</span>
                <a href="https://github.com/putiwangsheng"><i class="iconfont icon-github"></i></a>
                <span>向死而生</span>
            </p>
        </section>
        <a class="top" href="#">
            <i class="iconfont icon-arrowup"></i>
        </a>
    </div>
</template>

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
    margin-top: .5rem;
}

#footer span{
    margin: 0 .5rem;
}

.icon-github:hover{
    color: #cf86e0;
}
.top{
    width: 2.2rem;
    height: 2.2rem;
    line-height: 2rem;
    text-align: center;
    background-color: #cf86e0;
    border-radius: 50%;
    position: fixed;
    bottom: 1.5rem;
    right: 2.8rem;
    cursor: pointer;
}
.iconfont.icon-arrowup{
    font-size: 1.4rem;
    color: #fff;
}
</style>
