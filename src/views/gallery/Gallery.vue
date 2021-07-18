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
import { ref, nextTick, onMounted, onUnmounted, watch, onUpdated } from "vue";
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
let next = 20;
let loading = false;
const useLoadEffet = (imgList) => {
  // 加载更多数据时
  return () => {
    if (loading) return;
    loading = true;
    axios
      .get(HOST + "/gallery/" + next)
      .then((res) => {
        if (res.data.images == null) {
          toast.warning("到底了...", {
            maxToasts: 2,
          });
          return;
        }
        imgList.value = imgList.value.concat(res.data.images);
        console.log(imgList.value);
        loading = false;
        next += 10;
      })
      .catch((err) => {
        loading = false;
        toast.error("网络错误，请检查网络后重试");
        console.error(err);
      });
  };
};
const useScrollEffect = (loadMore) => {
  return () => {
    const scrollHeight = document.body.scrollHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    let distance = scrollHeight - scrollTop - clientHeight;

    if (distance < 400) {
      loadMore();
    }
  };
};

export default {
  name: "Gallery",
  components: {
    Lightgallery,
  },
  setup() {
    let msnry = ref({});
    let imgList = ref([]);
    let lightGallery = null;
    let plugins=ref( [lgZoom, autoPlay, fullScreen])
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
    const scrollHandle = useScrollEffect(loadMore);
    loadMore();
    onUpdated(() => {
      nextTick(() => {
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
    });
    onMounted(() => {
      window.addEventListener("scroll", scrollHandle, false);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", scrollHandle, false);
    });

    return { imgList, msnry, onInit,plugins };
  }
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
