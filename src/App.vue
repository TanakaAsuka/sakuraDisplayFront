<template>
  <Header />
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
  
</template>

<script>
// import Gallery from "./views/gallery/Gallery";
import Header from "./components/header/Header.vue";

export default {
  name: "App",
  components: {
    Header,
    // Gallery,
  },
};
</script>

<style></style>
