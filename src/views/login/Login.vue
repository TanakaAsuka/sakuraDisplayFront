<template>
  <div class="wrap">
    <div class="title">
      <h3 :class="titleActive==0?'active':''" @click="loginTitle">登录</h3>
      <h3>/</h3>
      <h3 :class="titleActive==1?'active':''" @click="registerTitle">注册</h3>
    </div>

    <div class="content">
      <div class="login" v-if="titleActive==0">
        <form action="" method="post">
          <div class="username">
            <input type="text" placeholder="请输入用户名" v-model="loginusername" />
          </div>
          <div class="password">
            <input type="password" placeholder="请输入密码" v-model="loginpassword" />
          </div>
          <div class="submit" @click="handleSubmitLogin">登录</div>
        </form>
      </div>

      <div class="register" v-else>
        <form action="" method="post">
          <div class="nickname">
            <input type="text" placeholder="请输入昵称" v-model="nickname" />
          </div>
          <div class="username">
            <input type="text" placeholder="请输入用户名" v-model="username" />
          </div>
          <div class="password">
            <input type="password" placeholder="请输入密码" v-model="password" />
          </div>
          <div class="password">
            <input type="password" placeholder="请再次输入密码" v-model="repeatpass" />
          </div>
          <div class="submit" @click="handleSubmitRegister">注册</div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { useToast } from "vue-toastification";
import common from "../../utils/common";
import { HOST } from "../../utils/serveConfig";
export default {
  data() {
    return {
      titleActive:0,
      nickname: "",
      username: "",
      password: "",
      repeatpass: "",
      loginusername: "",
      loginpassword: "",
    };
  },
  methods: {
    handleSubmitRegister() {
      const toast = useToast();
      // 验证昵称用户名密码
      for (let i in common) {
        console.log(i);
        let reg = new RegExp(common[i]);
        let result = reg.test(this[i]);

        if (!result) {
          if (i == "username") {
            toast.error("请确认用户名数字字母下划线或中文组成，且不超过16位!");
          }
          if (i == "nickname") {
            toast.error(
              "请确认昵称由数字字母下划线或中文组成，不包含特殊字符!"
            );
          }
          if (i == "password") {
            toast.error(
              "请确认密码长度在6~18之间，只能包含字母、数字和下划线!"
            );
          }

          return;
        }
        if (this.repeatpass != this.password) {
          toast.error("确认密码和密码不一致！");
          return;
        }
      }
      // 验证通过，提交请求
      axios
        .post(
          HOST + "/register",
          qs.stringify({
            nickname: this.nickname,
            username: this.username,
            password: this.password,
          })
        )
        .then((res) => {
          console.log(res);
          const { err, msg } = res.data;
          if (err == 0) {
            // 注册成功
            console.log("register-this:",this)
            this.titleActive=0;
            toast.clear();
            toast.success("注册成功，请登录!");
          } else {
            toast.error(msg);
          }
        })
        .catch((err) => {
          toast.error("发送请求出错，请检查网络后重试");
          console.error(err);
        });
    },
    registerTitle(){
      this.titleActive=1
    },
    loginTitle(){
      this.titleActive=0
    },
    handleSubmitLogin() {
      const toast = useToast();
      // 验证昵称用户名密码
      let reg = new RegExp(common["username"]);
      let result = reg.test(this.loginusername);
      if (!result) {
        toast.error("请确认用户名数字字母下划线或中文组成，且不超过16位!");
        return;
      }
      reg = new RegExp(common["password"]);
      result = reg.test(this.loginpassword);
      if (!result) {
        toast.error("请确认密码长度在6~18之间，只能包含字母、数字和下划线!");
        return;
      }
      // 验证通过
      axios
        .post(
          HOST + "/login",
          qs.stringify({
            username: this.loginusername,
            password: this.loginpassword,
          })
        )
        .then((res) => {
          console.log(res);
          let { err, msg } = res.data;

          if (err == 0) {
            
            toast.clear();
            toast.success(msg, {
              timeout: 2000,
            });
            this.$router.push("/");
          } else {
            toast.error(msg);
          }
        })
        .catch((err) => {
          toast.error("登录出错，请检查网络后重试");
          console.error(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: calc(100vh - .5rem);
  margin: 0 auto;
  max-width: 550px;
  min-width: 375px;
}
.content{
  padding-right: .15rem;
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  h3:nth-of-type(2){
    margin: 0 8px;
  }

  .active{
    color: rgb(243, 55, 118);
  }
}



.username,.password,.nickname,.btn{
  padding-left: .15rem;
  padding-right: .15rem;
  
}

form input{
  width: 100%;
  border: none;
  height: .5rem;
  margin-top: .15rem;
  padding-left: .15rem;
  background: linear-gradient(90deg,#232526,#414345);
  color: white;
  border-radius: .08rem;
  outline: none;
  &::placeholder{
    color: white;
  }

}



.submit{
  width: 135px;
  height: 45px;
  border-radius: .08rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0 auto auto;
  background: linear-gradient(90deg,#232526,#414345);
  color: white;
  cursor: pointer;
}

</style>
