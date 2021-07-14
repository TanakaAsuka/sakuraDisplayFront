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
    }
}
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        height: .5rem;
        background: rgba(34,34,34,0.85);
        display: flex;
        align-items: center;
        color: white;
        padding-left: .25rem;
        // margin-bottom: .2rem;

        a{
            color: white;
            margin: 0 10px;
        }
        .router-link-exact-active{
            color: orange;
        }
    }
</style>