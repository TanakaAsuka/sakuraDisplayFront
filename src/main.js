import { createApp } from 'vue'

import App from './App.vue'
import "./base/base.scss"
import "normalize.css";
import router from './router'
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import store from './store/store'





let app=createApp(App)
app.use(router)
app.use(store)
app.use(Toast,{
  position:"top-right",
  transition: "Vue-Toastification__fade",
  timeout: 8000,
  maxToasts: 6,
})

app.mount('#app')
