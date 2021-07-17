<template>
  <div class="lightgallery-wrap">
    <lightgallery
      v-if="imgList?.length > 0"
      :settings="{ speed: 500, plugins: plugins }"
      :onInit="onInit"
      :onBeforeSlide="onBeforeSlide"
      class="grid"
      ref="grid"
    >
      <a
        v-for="img in imgList"
        :key="img.uuid"
        :data-lg-size="img.widthAndHeight"
        class="gallery-item grid-item"
        :data-src="img.url"
        data-sub-html="
        <h4>
          
        </h4>
           "
      >
        <img class="img-responsive" :src="img.url" />
      </a>

    </lightgallery>
  </div>
</template>

<script>
import axios from "axios";
import Lightgallery from "lightgallery/vue";
import lgZoom from "lightgallery/plugins/zoom";
import autoPlay from "lightgallery/plugins/autoplay";
import fullScreen from "lightgallery/plugins/fullscreen";
import Masonry from "masonry-layout";

import imagesLoaded from "imagesloaded";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/scss/lg-autoplay.scss";
import "lightgallery/scss/lg-fullscreen.scss";

import {HOST} from "../../utils/serveConfig"

export default {
  name: "Gallery",

  components: {
    Lightgallery,
  },
  data: () => ({
    plugins: [lgZoom, autoPlay, fullScreen],
    imgList: [],
    msnry: {},
  }),
  created() {
    axios
      .get(HOST+"/gallery")
      .then((res) => {
        this.imgList = res.data.images;
        console.log(res);
        console.log(this.imgList);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  updated() {
    // this.msnry.layout();
    this.$nextTick(() => {
      var grid = document.querySelector(".grid");
      console.log(grid);
      const msny = new Masonry(grid, {
        itemSelector: ".grid-item",
        // columnWidth: 35,
        horizontalOrder: true,
      });

      let imgLoad = imagesLoaded(grid, function (instance) {});
      imgLoad.on("progress", function () {
        console.log("all images are loaded");
        msny.layout();
      });
    });
  },

  mounted() {
    console.log("mounted");
    // this.$nextTick().then(function () {});
  },
  methods: {
    onInit: () => {
      console.log("lightGallery has been initialized");
    },
    onBeforeSlide: () => {
      console.log("calling before slide");
    },
  },
};
</script>
<style lang="scss" scoped>
body {
  margin: 0;
}
.img-responsive {
  width: 100%;
}
.lightgallery-wrap {
  display: flex;
  justify-content: center;
}
.grid-item {
  width: 300px;
  margin: 5px;


}

.lightgallery-vue {
  width: 80vw;
  margin: auto;
  // padding: 0 15px;

  a {
    display: block;
    img {
      border-radius: 20px;
    }
  }
}
</style>
