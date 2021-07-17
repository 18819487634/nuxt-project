import Vue from 'vue'
import {
  Carousel,
  CarouselItem,
  Message,
  Button,
  Loading
} from 'element-ui'

const install = {
  install (Vue) {
    Vue.prototype.$Message = Message
    Vue.prototype.$Loading = Loading
  }
}
export default ({ app }, inject) => {
  app.Message = Message
  app.Loading = Loading
}
Vue.use(install)

Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Button)
