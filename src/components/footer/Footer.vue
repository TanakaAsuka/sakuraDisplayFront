<template>
  <div class="footer">
    <router-link to="beian">
      备案号：津ICP备20001155号-2
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Footer",
  setup() {
    return {};
  },
  activated() {
    console.log("actived");
  },
};
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  width: 100%;
  z-index: 99;
  bottom: 0;
  min-width: 375px;
  height: 0.5rem;
  background: linear-gradient(90deg, #232526, #414345);
  display: flex;
  align-items: center;
  color: rgb(150, 150, 150);
  padding-left: 0.25rem;
  overflow: hidden;


  a {
    color: inherit;
    margin: 0 10px;
    text-decoration: none;
  }
  .router-link-exact-active {
    color: rgb(243, 55, 118);
  }
}
</style>
