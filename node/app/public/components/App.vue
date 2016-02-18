<template>
    <div id="app">
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
}
</style>
