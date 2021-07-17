<template>
  <div class="wrap">
    <form action="" method="post" name="delete_pic_form">
      <input
        v-model="picID"
        type="text"
        name="delete_pic"
        placeholder="请输入要删除的图片"
      />

      <div id="btn" @click="handleDelete(picID)">删除</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { HOST } from "../../utils/serveConfig";
import { useToast } from "vue-toastification";
import qs from "qs";
const toast=useToast()
export default {
  data() {
    return {
      picID: "",
    };
  },
  methods: {
    async handleDelete(picID) {
      console.log(HOST);
      try {
        let res = await axios.post(HOST + "/delete", qs.stringify({
          "picID":this.picID
        }));

        let {err,msg}=res.data

        if(err==0){
          toast.success(msg)
        }else{
          toast.error(msg)
        }

        console.log(res)

      }catch(e){
        console.log(e)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 650px;
  height: 150px;
  // border: 1px solid red;
  display: flex;
  justify-content: center;
  margin: 25px auto 0 auto;
  text-align: center;

  form {
    display: flex;
  }

  input[name="delete_pic"] {
    width: 420px;
    height: 35px;
    border-radius: 10px;
    outline: none;
    border: none;
    background: oldlace;
    padding-left: 25px;
  }
  #btn {
    width: 60px;
    height: 40px;
    border: 1px solid rgba(34, 34, 34, 0.85);
    text-align: center;
    line-height: 40px;
    margin-left: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  #btn:hover {
    background: crimson;
    color: white;
    border: 1px solid transparent;
  }
}
</style>