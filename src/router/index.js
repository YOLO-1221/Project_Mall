import Vue from 'vue'
import VueRouter from "vue-router";

// 对文件进行相关的懒加载
const Home = () => import("../views/home/Home")
const Category = () => import("../views/category/Category")
const Profile = () => import("../views/profile/Profile")
const Cart = () => import("../views/cart/Cart")

// 1、安装插件
Vue.use(VueRouter)

// 2、创建router
// 配置映射关系
const  routes = [
  {
    path: '',
    redirect: "/home"
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/cart',
    component: Cart
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3、导出router
export default router
