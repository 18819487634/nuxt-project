import Vue from 'vue'
import request from '../request'

const install = {
  install (Vue) {
    Vue.prototype.$request = request
  }
}
Vue.use(install)

export default ({ app }, inject) => {
  app.request = request
}
