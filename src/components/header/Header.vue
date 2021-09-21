<template>
    <div class="header">

        <router-link to="/">
                 樱花廊
        </router-link>

        <!-- <router-link to="/newPost">
                 新发布
        </router-link> -->

        <router-link to="/about">
                 关于
        </router-link>
        
    </div>
</template>

<script>
export default {
    name:"Header",
    setup () {
        
        return {}
    },
    activated(){
        console.log("actived")
    }
}
</script>

<style lang="scss" scoped>
    .header{
        position: sticky;
        z-index: 99;
        top: 0;
        width: 100%;
        min-width: 375px;
        height: .5rem;
        // background: rgb(34,34,34);
        background: linear-gradient(90deg,#232526,#414345);
        display: flex;
        align-items: center;
        color: white;
        padding-left: .25rem;
        overflow: hidden;

        a{
            color: white;
            margin: 0 10px;
            text-decoration: none;
        }
        .router-link-exact-active{
            color: rgb(243, 55, 118);
        }
    }
</style>