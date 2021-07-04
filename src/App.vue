<template>
  <Header/>
  <Gallery/>
</template>

<script>

import Gallery from './views/gallery/Gallery'
import Header from './components/header/Header.vue'

export default {
  name: 'App',
  components: {
    Gallery,Header
  }
}
</script>

<style>

#app {
  width: 100%;
}
</style>
