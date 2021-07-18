<template>
  <Header/>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  
</template>

<script>

// import Gallery from './views/gallery/Gallery'
import Header from './components/header/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>

</style>
