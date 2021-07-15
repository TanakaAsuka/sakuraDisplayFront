<template>
  <div id="app">
    <file-pond
      name="uploadFile"
      ref="pond"
      class-name="my-pond"
      label-idle="点击/拖动图片"
      allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
      server="/upload"
      :captureMethod="null"
    />
  </div>
</template>

<script>
// Import FilePond
import vueFilePond from "vue-filepond";

// Import plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js";
import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js";

// Import styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Create FilePond component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);
import { ref, onMounted } from "vue";
export default {
  name: "upload",
  data: () => ({ myFiles: [] }),
  methods: {
    handleFilePondInit: function() {
      console.log("FilePond has initialized");

      // example of instance method call on pond reference
      this.$refs.pond.getFiles();
    },
  },
  components: {
    FilePond,
  },
};
</script>
<style lang="scss">
.my-pond {
  font-size: inherit;
}
</style>
