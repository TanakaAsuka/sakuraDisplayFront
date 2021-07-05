import { createApp } from 'vue'

import App from './App.vue'
import "./base/base.scss"
import "normalize.css";
import router from './router'

// import "lightgallery/lg-autoplay.css";

let app=createApp(App).use(router)

app.mount('#app')
