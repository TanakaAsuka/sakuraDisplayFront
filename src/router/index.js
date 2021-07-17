import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from '../views/gallery/Gallery.vue'
import axios from "axios"
import {
  useToast
} from "vue-toastification";
const toast = useToast()

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/about/About.vue')
  },
  {
    // 如果没登陆，跳去登录页
    // 如果登录，看下是不是管理员
    // 如果不是管理员，则跳回首页
    // 如果是管理员，则进入路由
    path: '/upload',
    beforeEnter: (to, from, next) => {
      // ...
      axios.get("http://127.0.0.1:3000/userauth")
        .then(res => {
          console.log(res)
          let {
            err,
            msg
          } = res.data
          if (err == 0) {
            next()
          } else {
            next({
              name: "Login"
            })
            toast.warning(msg)
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    name: 'Upload',
    // route level code-splitting
    // this generates a separate chunk (upload.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/upload/Upload.vue')
  },
  {
    // 如果没登陆，跳去登录页
    // 如果登录，看下是不是管理员
    // 如果不是管理员，则跳回首页
    // 如果是管理员，则进入路由
    path: '/delete',
    beforeEnter: (to, from, next) => {
      // ...
      axios.get("http://127.0.0.1:3000/userauth")
        .then(res => {
          console.log(res)
          let {
            err,
            msg,
            username
          } = res.data
          if (err == 0) {
            // 只有名为admin_yixuan的管理员才能进来做删除操作
            if (username != "admin_yixuan") {
              next({
                name: "Home"
              })
            }else{
              next()
            }
            
          } else {
            next({
              name: "Login"
            })
            toast.warning(msg)
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    name: 'Delete',
    // route level code-splitting
    // this generates a separate chunk (upload.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/delete/Delete.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "login" */ '../views/login/Login.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router