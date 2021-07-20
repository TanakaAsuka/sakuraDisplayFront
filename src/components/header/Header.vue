<template>
    <div class="header">

        <router-link to="/">
                 樱花廊
        </router-link>

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
        height: .5rem;
        background: rgb(34,34,34);
        display: flex;
        align-items: center;
        color: white;
        padding-left: .25rem;
        // margin-bottom: .2rem;

        a{
            color: white;
            margin: 0 10px;
            text-decoration: none;
        }
        .router-link-exact-active{
            color: rgb(253, 63, 127);
        }
    }
</style>