import VueRouter from 'vue-router'
import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

NProgress.configure({
  easing: 'ease-out-in', // 动画方式
  template: '<div class="bar" role="bar"></div>', // 自定义模板
  speed: 700, // 递增进度条速度
  showSpinner: true, // 是否显示加载icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化是最小百分比
})

const router = new VueRouter({
  mode: 'history'
})

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (window.location.pathname !== to.fullPath) {
      NProgress.start()
      next()
    }
  })
  app.router.afterEach((to, from) => {
    NProgress.done()
  })
}
