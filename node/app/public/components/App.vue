<template>
    <div>

        <section id="header">
            <img class="b-title" src="https://ooo.0o0.ooo/2016/01/27/56a88272da80e.png" alt="SEEKFNL" />
            <p class="s-title">
                <span style="color: #3369e8">Blog</span>
                <span style="color: #eeb211">of</span>
                <span style="color: #d50f25">ChangQi</span>
            </p>
            <div class="signature">
                <p>
                    情不知所起
                </p>
                <p>
                    一往而深
                </p>
            </div>
        </section>
        <hr id="divider"></hr>

        <router-view
            keep-alive
            keep-alive
            transition
            transition-mode="out-in">
        </router-view>

        <section id="footer">

        </section>
    </div>

</template>

<style>
#header{
    background-image: url("https://ooo.0o0.ooo/2016/01/26/56a76938f09fb.jpg");
    height: 40rem;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.8;
}
.b-title{
    position: relative;
    top: 1rem;
    left: 1rem;
}
.s-title{
    position: absolute;
    color: #fff;
    font-weight: 700;
    font-size: 2rem;
    -webkit-transform: rotate(-12deg) translate(255px, -10px);
    -moz-transform: rotate(-12deg) translate(255px, -10px);
    transform: rotate(-12deg) translate(255px, -10px);
}
.signature{
    display: inline-block;
    border: .3rem solid #ea7bf7;
    position: absolute;;
    top: 3rem;
    right: 8%;
    padding: .3rem;
}
.signature p{
    display: inline-block;
    vertical-align: top;
    width: 1rem;
    color: #fff;
}

#divider{
    margin: 4.5rem 0 0 0;
    border: none;
    border-top: .1rem solid #fff;
    text-align: center;
}
#divider:after{
    content: url("https://ooo.0o0.ooo/2016/01/27/56a99d661f678.png");
    background-color: #e2e2e2;
    position: relative;
    top: -.8rem;
    display: inline-block;
}

#footer{
    background-color: rgb(191, 112, 220);
    width: 100%;
    height: 2rem;
}
</style>
