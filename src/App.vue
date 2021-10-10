<template>
  <Header />
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
<Footer/>
</template>

<script>
import Header from "./components/header/Header.vue";
import Footer from "./components/footer/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer

  },
};
</script>

<style></style>
