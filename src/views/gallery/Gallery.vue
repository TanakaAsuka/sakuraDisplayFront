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
import { ref,onMounted, onUnmounted } from "vue";
import axios from "axios";
import Lightgallery from "lightgallery/vue";
import lgZoom from "lightgallery/plugins/zoom";
import autoPlay from "lightgallery/plugins/autoplay";
import fullScreen from "lightgallery/plugins/fullscreen";
import Masonry from "masonry-layout";
import { useToast } from "vue-toastification";
import imagesLoaded from "imagesloaded";

import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/scss/lg-autoplay.scss";
import "lightgallery/scss/lg-fullscreen.scss";

import { HOST } from "../../utils/serveConfig";
const toast = useToast();
let next = 0;

export default {
  name: "Gallery",

  components: {
    Lightgallery,
  },
  data: () => ({
    plugins: [lgZoom, autoPlay, fullScreen],
    msnry: {},
  }),
  setup() {
    let imgList=ref([])
    loadMore()

    let loading=false

    function loadMore() {
      if(loading)return;
      loading=true
      axios
        .get(HOST + "/gallery/" + next)
        .then((res) => {
          if(res.data.images==null){
            toast.warning("到底了...",{
              maxToasts: 2,
            })
            return
          }
          imgList.value = imgList.value.concat(res.data.images);
          console.log("加载了")
          console.log(res);
          console.log(imgList.value);
          loading=false
          next+=10
        })
        .catch((err) => {
          loading=false
          toast.error("网络错误，请检查网络后重试");
          console.error(err);
        });
    }
    function scrollHandle() {
      const scrollHeight = document.body.scrollHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      let distance = scrollHeight - scrollTop - clientHeight;

      if (distance < 200) {
        loadMore();
      }

      console.log("distance:", distance);
    }
    onMounted(() => {
      console.log("mounted");
      window.addEventListener("scroll", scrollHandle, false);
    });
    onUnmounted(()=>{
      window.removeEventListener("scroll", scrollHandle, false);
    })

    return {imgList}
  },
  created() {},
  updated() {
    // this.msnry.layout();
    this.$nextTick(() => {
      var grid = document.querySelector(".grid");
      console.log(grid);
      const msny = new Masonry(grid, {
        itemSelector: ".grid-item",
        // columnWidth: 35,
        horizontalOrder: true,
        fitWidth: true,
      });

      let imgLoad = imagesLoaded(grid, function(instance) {});
      imgLoad.on("progress", function() {
        console.log("all images are loaded");
        msny.layout();
      });
    });
  },

  mounted() {
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
  width: 80vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.grid-item {
  width: 300px;
  margin: 5px;
}

.lightgallery-vue {
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
