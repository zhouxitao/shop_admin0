import Vue from 'vue'
import App from './App.vue'

// 引入路由实例
import router from './router.js'

// 引入全局axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 设置默认全局基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
<<<<<<< HEAD
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
Vue.config.productionTip = false

// 请求拦截

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = localStorage.getItem('token')
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
=======

Vue.config.productionTip = false
>>>>>>> be99e3889f7062001f88c9e1dc597a78c70a3261
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
