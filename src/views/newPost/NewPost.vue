<template>
  <div class="lightgallery-wrap">
    <lightgallery
      v-if="imgList?.length > 0"
      :settings="{ speed: 500, plugins: plugins }"
      :onInit="onInit"
      class="grid"
      ref="grid"
    >
      <a
        v-for="img in imgList"
        :key="img.uuid"
        :data-lg-size="img.widthAndHeight"
        class="gallery-item grid-item"
        :data-src="img.url"
        data-sub-html=""
      >
        <img class="img-responsive" :src="img.url" />
      </a>
    </lightgallery>
  </div>
</template>

<script>
import { ref, nextTick, onMounted, onUnmounted, watch, onUpdated } from "vue";
import { useRoute } from "vue-router";
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
let loading = false;
const useLoadEffet = (imgList) => {
  // 加载更多数据时
  return () => {
    if (loading) return;
    loading = true;
    axios
      .get(HOST + "/newPost/" )
      .then((res) => {
        if (res.data.images == null) {
          toast.warning("到底了...", {
            maxToasts: 2,
            position: "bottom-center",
          });
          return;
        }
        imgList.value = imgList.value.concat(res.data.images);
        console.log(imgList.value);
        loading = false;
      })
      .catch((err) => {
        loading = false;
        toast.error("发送请求错误，请检查网络后重试");
        console.error(err);
      });
  };
};

export default {
  name: "newPost",
  components: {
    Lightgallery,
  },
  setup() {
    const route = useRoute();
    let msnry = ref({});
    let imgList = ref([]);
    let lightGallery = null;
    let plugins = ref([lgZoom, autoPlay, fullScreen]);
    // lightGallery 初始化后将实例赋值给变量
    const onInit = (detail) => {
      lightGallery = detail.instance;
    };

    // 请求新数据过来时刷新lightGallery
    watch(imgList, () => {
      nextTick(() => {
        lightGallery.refresh();
      });
    });

    const loadMore = useLoadEffet(imgList);
    loadMore();
    onUpdated(() => {
      nextTick(() => {
        var grid = document.querySelector(".grid");
        const msny = new Masonry(grid, {
          itemSelector: ".grid-item",
          horizontalOrder: true,
          fitWidth: true,
        });

        let imgLoad = imagesLoaded(grid, function(instance) {});
        imgLoad.on("progress", function() {
          console.log("all images are loaded");
          msny.layout();
        });
      });
    });

    return { imgList, msnry, onInit, plugins };
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
  width: 90vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 900px) {
  .grid-item {
    width: 300px;
    margin: 5px;
  }
}
@media screen and (min-width: 900px) {
  .grid-item {
    width: 400px;
    margin: 10px;
  }
}

.lightgallery-vue {
  margin: auto;

  a {
    display: block;
    img {
      border-radius: 20px;
    }
  }
}
</style>
