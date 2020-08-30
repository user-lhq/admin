import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import '../node_modules/nprogress/nprogress.css'
import axios from 'axios'
import { getUser, removeUser } from '@/utils/auth'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 添加请求拦截器：axios 发出去的请求会先经过这里
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // console.log('请求进入了拦截器')

  const user = getUser()
  // config 是本次请求的相关配置 对象
  // console.log(config)

  // 如果有 user 数据，则本次请求中添加用户 token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // return config 是允许请求发送的开关
  // 我们可以在这之前进行一些业务逻辑操作
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器：axios 收到的响应会先经过这里
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  // response 就是响应结果对象
  // 这里将 response 原样返回，那么你发请求的地方收到的就是response
  // 我们可以控制请求收到的响应数据格式
  console.log('请求响应返回结果', response)
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, error => {
  // 对响应错误做点什么
  // console.log('请求异常', error)
  if (error.response.status === 401) {
    // 清楚本地存储中的无效token
    removeUser()
    // 跳转到登录页
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

Vue.use(Element)
// 所有组件都是 Vue 的实例
// 我们可以把一些需要在组件中频繁使用的成员放到 Vue.prototype 中
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
