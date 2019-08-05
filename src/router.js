import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入公共样式
import './assets/common.css'
// 引入其他模块
import login from './components/login/login.vue'
<<<<<<< HEAD

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
=======
import home from './components/home/home.vue'
import users from './components/users/users.vue'
import rights from './components/rights/rights.vue'
import roles from './components/roles/roles.vue'

// 引入element
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
>>>>>>> be99e3889f7062001f88c9e1dc597a78c70a3261
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
<<<<<<< HEAD
        { path: '/users/:page?', component: users },
        { path: '/rights', component: rights },
        { path: '/roles', component: roles },
        { path: '/categories', component: Categories },
        { path: '/goods', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
=======
        { path: '/users', component: users },
        { path: '/rights', component: rights },
        { path: '/roles', component: roles }
>>>>>>> be99e3889f7062001f88c9e1dc597a78c70a3261
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
