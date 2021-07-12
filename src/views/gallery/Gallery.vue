<template>
  <div class="lightgallery-wrap">
    <lightgallery
      v-if="imgList.length>0"
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
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@entrycube' >Diego Guzmán </a></h4> <p> Location - <a href='https://unsplash.com/s/photos/fushimi-inari-taisha-shrine-senbontorii%2C-68%E7%95%AA%E5%9C%B0-fukakusa-yabunouchicho%2C-fushimi-ward%2C-kyoto%2C-japan'>Fushimi Ward, Kyoto, Japan</a></p>"
      >
        <img class="img-responsive" :src="img.url" />
      </a>
      <!-- <a
        data-lg-size="1400-1400"
        class="gallery-item grid-item"
        data-src="https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@asoshiation' >Shah </a></h4><p> Location - <a href='https://unsplash.com/s/photos/shinimamiya%2C-osaka%2C-japan'>Shinimamiya, Osaka, Japan</a></p>"
      >
        <img
          class="img-responsive"
          src="https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
        />
      </a>
      <a
        data-lg-size="1400-1400"
        class="gallery-item grid-item"
        data-src="https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@katherine_xx11' >Katherine Gu </a></h4><p> For all those years we were alone and helpless.</p>"
      >
        <img
          class="img-responsive"
          src="https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
        />
      </a>

      <a
        data-lg-size="1496-720"
        class="gallery-item grid-item"
        :data-src="require('../../../public/assets/1.jpg')"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@katherine_xx11' >Katherine Gu </a></h4><p> For all those years we were alone and helpless.</p>"
      >
        <img class="img-responsive" src="../../../public/assets/1.jpg" />
      </a>

      <a
        data-lg-size="1617-1103"
        class="gallery-item grid-item"
        :data-src="require('../../../public/assets/2.jpg')"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@katherine_xx11' >Katherine Gu </a></h4><p> For all those years we were alone and helpless.</p>"
      >
        <img class="img-responsive" src="../../../public/assets/2.jpg" />
      </a>
      <a
        data-lg-size="6500-3517"
        class="gallery-item grid-item"
        :data-src="require('../../../public/assets/3.jpg')"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@katherine_xx11' >Katherine Gu </a></h4><p> For all those years we were alone and helpless.</p>"
      >
        <img class="img-responsive" src="../../../public/assets/3.jpg" />
      </a>
      <a
        data-lg-size="1058-1500"
        class="gallery-item grid-item"
        :data-src="require('../../../public/assets/4.jpg')"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@katherine_xx11' >Katherine Gu </a></h4><p> For all those years we were alone and helpless.</p>"
      >
        <img class="img-responsive" src="../../../public/assets/4.jpg" />
      </a>
      <a
        data-lg-size="1054-1500"
        class="gallery-item grid-item"
        :data-src="require('../../../public/assets/5.jpg')"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@katherine_xx11' >Katherine Gu </a></h4><p> For all those years we were alone and helpless.</p>"
      >
        <img class="img-responsive" src="../../../public/assets/5.jpg" />
      </a>
      <a
        data-lg-size="1500-938"
        class="gallery-item grid-item"
        :data-src="require('../../../public/assets/6.jpg')"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@katherine_xx11' >Katherine Gu </a></h4><p> For all those years we were alone and helpless.</p>"
      >
        <img class="img-responsive" src="../../../public/assets/6.jpg" />
      </a>

      <a
        data-lg-size="1500-1211"
        class="gallery-item grid-item"
        :data-src="require('../../../public/assets/7.jpg')"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@katherine_xx11' >Katherine Gu </a></h4><p> For all those years we were alone and helpless.</p>"
      >
        <img class="img-responsive" src="../../../public/assets/7.jpg" />
      </a>

      <a
        data-lg-size="1500-1169"
        class="gallery-item grid-item"
        :data-src="require('../../../public/assets/8.jpg')"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@katherine_xx11' >Katherine Gu </a></h4><p> For all those years we were alone and helpless.</p>"
      >
        <img class="img-responsive" src="../../../public/assets/8.jpg" />
      </a> -->
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
      .get("http://127.0.0.1:3000/gallery")
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
  },

  mounted() {
    var grid = this.$refs.grid;
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
  width: 82vw;
  // padding: 0 15px;

  a {
    display: block;
    img {
      border-radius: 20px;
    }
  }
}
</style>
