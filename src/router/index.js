import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    // {
    //   name: 'home',
    //   path: '/',
    //   // @ 表示 src 目录
    //   component: () => import('@/views/home')
    // },
    { // 显示到 App 根组件的路由出口
      // name: 'layout', // 使用 JavaScript 命名路由导航不会渲染默认子路由
      path: '/',
      component: () => import('@/views/layout'),
      children: [ // 所有 children 路由都显示到父路由的 router-view 中
        {
          name: 'home',
          path: '', // 父路由的默认内容
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
