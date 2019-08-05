import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入公共样式
import './assets/common.css'
// 引入其他模块
import login from './components/login/login.vue'

// 引入element
import ElementUi from 'element-ui'

// import 'element-ui/lib/theme-chalk/index.css' index.html 里面在线引用了
const home = () => import('./components/home/home.vue')
const users = () => import('./components/users/users.vue')
const rights = () => import('./components/rights/rights.vue')
const roles = () => import('./components/roles/roles.vue')
const Categories = () => import('./components/categories/Categories.vue')
const Goods = () => import('./components/goods/Goods.vue')
const GoodsAdd = () => import('./components/goods/GoodsAdd.vue')
// 安装路由功能
Vue.use(VueRouter)
Vue.use(ElementUi)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/home',
      component: home,
      children: [
        { path: '/users/:page?', component: users },
        { path: '/rights', component: rights },
        { path: '/roles', component: roles },
        { path: '/categories', component: Categories },
        { path: '/goods', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    }

  ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
// 导出路由
export default router
