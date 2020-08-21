import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'

Vue.use(VueRouter)

const router = new VueRouter({
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
// 全局前置守卫
// 当你访问路由器页面的时候，会先进入这里
// to 要去那里的相关数据
// from 来自哪里的相关数据
// next 允许通过的方法
router.beforeEach((to, form, next) => {
  // 路由导航前开始进度条
  nprogress.start()
  const userInfo = window.localStorage.getItem('user_info')
  if (to.path !== '/login') {
    // 如果是非登录页面
    // 如果登录跳转登录页
    if (!userInfo) {
      next({ name: 'login' })
    } else {
      next()
    }
    // 登录了，允许通过
  } else {
    // 如果是登录页面
    if (!userInfo) {
      // 没有登录，允许通过
      next()
    } else {
      // 登录了不允许通过
      // next(false) // 中断当前导航
      window.location.href = '/#/'
      window.location.reload()
    }
  }
})
router.afterEach((to, from) => {
  // 路由导航完成，结束进度条
  nprogress.done()
})
export default router
