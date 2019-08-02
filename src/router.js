import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入公共样式
import './assets/common.css'
// 引入其他模块
import login from './components/login/login.vue'
import home from './components/home/home.vue'
import users from './components/users/users.vue'
import rights from './components/rights/rights.vue'
import roles from './components/roles/roles.vue'

// 引入element
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
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
        { path: '/users', component: users },
        { path: '/rights', component: rights },
        { path: '/roles', component: roles }
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
