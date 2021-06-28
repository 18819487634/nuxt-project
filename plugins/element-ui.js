import Vue from 'vue'
import {
  Carousel,
  CarouselItem,
  Message
} from 'element-ui'

const install = {
  install (Vue) {
    Vue.prototype.$Message = Message
  }
}
export default ({ app }, inject) => {
  app.Message = Message
}
Vue.use(install)

Vue.use(Carousel)
Vue.use(CarouselItem)
