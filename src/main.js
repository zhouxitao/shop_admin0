import Vue from 'vue'
import App from './App.vue'

// 引入路由实例
import router from './router.js'

// 引入全局axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 设置默认全局基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
