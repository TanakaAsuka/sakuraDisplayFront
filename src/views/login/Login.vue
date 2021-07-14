<template>
  <section class="user">
    <div class="user_options-container">
      <div class="user_options-text">
        <div class="user_options-unregistered">
          <h2 class="user_unregistered-title">没有账号？</h2>
          <p class="user_unregistered-text">点击按钮注册成为会员.</p>
          <button
            class="user_unregistered-signup"
            @click="handleRegister"
            id="signup-button"
          >
            注册
          </button>
        </div>

        <div class="user_options-registered">
          <h2 class="user_registered-title">已有账号?</h2>
          <p class="user_registered-text">点击按钮会员登录.</p>
          <button
            class="user_registered-login"
            ref="user_registered_login"
            @click="handleLogin"
            id="login-button"
          >
            登录
          </button>
        </div>
      </div>

      <div
        class="user_options-forms"
        ref="user_options_forms"
        id="user_options-forms"
      >
        <div class="user_forms-login">
          <h2 class="forms_title">登录</h2>
          <form class="forms_form">
            <fieldset class="forms_fieldset">
              <div class="forms_field">
                <input
                  v-model="loginusername"
                  type="text"
                  placeholder="用户名"
                  class="forms_field-input"
                  required
                  autofocus
                  name="loginusername"
                />
              </div>
              <div class="forms_field">
                <input
                  v-model="loginpassword"
                  type="password"
                  placeholder="密码"
                  class="forms_field-input"
                  required
                  name="loginpassword"
                />
              </div>
            </fieldset>
            <div class="forms_buttons">
              <button type="button" class="forms_buttons-forgot">
                忘记密码?
              </button>
              <div @click="handleSubmitLogin" class="forms_buttons-action">
                登录
              </div>
            </div>
          </form>
        </div>
        <div class="user_forms-signup">
          <h2 class="forms_title">注册</h2>
          <form class="forms_form">
            <fieldset class="forms_fieldset">
              <div class="forms_field">
                <input
                  type="text"
                  placeholder="请输入昵称"
                  class="forms_field-input"
                  required
                  v-model="nickname"
                  name="nickname"
                />
              </div>

              <div class="forms_field">
                <input
                  type="text"
                  placeholder="请输入用户名"
                  class="forms_field-input"
                  required
                  v-model="username"
                  name="username"
                />
              </div>
              <div class="forms_field">
                <input
                  type="password"
                  placeholder="请输入密码"
                  class="forms_field-input"
                  required
                  v-model="password"
                  name="password"
                />
              </div>
              <div class="forms_field">
                <input
                  type="password"
                  placeholder="请确认密码"
                  class="forms_field-input"
                  required
                  v-model="repeatpass"
                  name="repeatpass"
                />
              </div>
            </fieldset>
            <div class="forms_buttons">
              <input
                type="button"
                value="注册"
                @click="handleSubmitRegister"
                class="forms_buttons-action"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { useToast } from "vue-toastification";
import common from "../../utils/common";
export default {
  data() {
    return {
      nickname: "",
      username: "",
      password: "",
      repeatpass: "",
      loginusername: "",
      loginpassword: "",
    };
  },
  methods: {
    handleRegister() {
      let userForms = this.$refs.user_options_forms;
      userForms.classList.remove("bounceRight");
      userForms.classList.add("bounceLeft");
    },
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
          "http://127.0.0.1:3000/register",
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
            this.handleLogin();
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
    handleLogin() {
      let userForms = this.$refs.user_options_forms;
      userForms.classList.remove("bounceLeft");
      userForms.classList.add("bounceRight");
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
        .get(
          "http://127.0.0.1:3000/login",{
            params: {
              username: this.loginusername,
              password: this.loginpassword,
            }
          }
        )
        .then((res) => {
          console.log(res);
          let {err,msg}=res.data

          if(err==0){
            toast.success("登录成功",{
              timeout: 2000
            });
            this.$router.replace('/')
            
          }else{
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
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/**
 * * General variables
 * */
/**
 * * General configs
 * */
* {
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1em;
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}
input[type="submit"] {
  cursor: pointer;
}
input::-moz-placeholder {
  font-size: 0.136rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.016rem;
  color: #ccc;
}
input:-ms-input-placeholder {
  font-size: 0.136rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.016rem;
  color: #ccc;
}
input::placeholder {
  font-size: 0.136rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.016rem;
  color: #ccc;
}

/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
@keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
@keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
/**
 * * Show Sign Up form
 * */
@-webkit-keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
/**
 * * Page background
 * */
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 0.5rem);
  background: #ccc;
  background-size: cover;
}
.user_options-container {
  position: relative;
  width: 80%;
}
.user_options-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.85);
  border-radius: 3px;
}

/**
 * * Registered and Unregistered user box and text
 * */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #fff;
  font-weight: 300;
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 0.2656rem;
  line-height: 0.16rem;
}

.user_unregistered-text,
.user_registered-text {
  font-size: 0.13rem;
  line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.032rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
.user_registered-login:hover,
.user_unregistered-signup:hover {
  color: rgba(34, 34, 34, 0.136);
  background-color: #ccc;
}

/**
 * * Login and signup forms
 * */
.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 420px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transform: translate3d(100%, -50%, 0);
  transition: transform 0.4s ease-in-out;
}
.user_options-forms .user_forms-login {
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}
.user_options-forms .forms_title {
  margin-bottom: 45px;
  font-size: 0.24rem;
  font-weight: 500;
  line-height: 1em;
  text-transform: uppercase;
  color: #e8716d;
  letter-spacing: 0.016rem;
}
.user_options-forms .forms_field:not(:last-of-type) {
  margin-bottom: 20px;
}
.user_options-forms .forms_field-input {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 6px;
  font-family: "Montserrat", sans-serif;
  font-size: 0.16rem;
  font-weight: 300;
  color: gray;
  letter-spacing: 0.016rem;
  transition: border-color 0.2s ease-in-out;
}
.user_options-forms .forms_field-input:focus {
  border-color: gray;
}
.user_options-forms .forms_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
}
.user_options-forms .forms_buttons-forgot {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.016rem;
  color: #ccc;
  text-decoration: underline;
  transition: color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-forgot:hover {
  color: #b3b3b3;
}
.user_options-forms .forms_buttons-action {
  background-color: #e8716d;
  border-radius: 3px;
  padding: 10px 35px;
  font-size: 0.16rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.016rem;
  transition: background-color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-action:hover {
  background-color: #e14641;
}
.user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
  position: absolute;
  top: 70px;
  left: 40px;
  width: calc(100% - 80px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out,
    transform 0.5s ease-in-out;
}
.user_options-forms .user_forms-signup {
  transform: translate3d(120px, 0, 0);
}
.user_options-forms .user_forms-signup .forms_buttons {
  justify-content: flex-end;
}
.user_options-forms .user_forms-login {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

/**
 * * Triggers
 * */
.user_options-forms.bounceLeft {
  -webkit-animation: bounceLeft 1s forwards;
  animation: bounceLeft 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-signup {
  -webkit-animation: showSignUp 1s forwards;
  animation: showSignUp 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-login {
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-120px, 0, 0);
}
.user_options-forms.bounceRight {
  -webkit-animation: bounceRight 1s forwards;
  animation: bounceRight 1s forwards;
}

/**
 * * Responsive 990px
 * */
@media screen and (max-width: 990px) {
  .user_options-forms {
    min-height: 395px;
  }
  .user_options-forms .forms_buttons {
    flex-direction: column;
  }
  .user_options-forms .user_forms-login .forms_buttons-action {
    margin-top: 30px;
  }
  .user_options-forms .user_forms-signup,
  .user_options-forms .user_forms-login {
    top: 40px;
  }

  .user_options-registered,
  .user_options-unregistered {
    padding: 50px 45px;
  }
}
</style>