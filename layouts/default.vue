<template>
  <div>
    <div class="wrapper">
      <div class="wrapper-top">
        <Header :title="'主页'" />
      </div>
      <div class="wrapper-content">
        <Nuxt />
      </div>
      <div class="wrapper-footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import clickHeart from 'assets/js/clickHeart'
export default {
  mounted () {
    this.init()
  },
  methods: {
    // 初始化方法
    init () {
      // 增加鼠标点击爱心
      clickHeart(window, document)
      this.addLive2D()
    },
    addLive2D () {
      // const scriptEle1 = document.createElement('script')
      // const scriptEle2 = document.createElement('script')
      // const mainBody = document.body
      // scriptEle1.src = '~/assets/js/L2Dwidget.0.min.js'
      // scriptEle2.src = '~/assets/js/L2Dwidget.min.js'
      // // scriptEle1.src = 'static/L2Dwidget.0.min.js'
      // // scriptEle2.src = 'static/L2Dwidget.min.js'
      // mainBody.appendChild(scriptEle1)
      // mainBody.appendChild(scriptEle2)
      // L2Dwidget.init({
      //   display: {
      //     superSample: 2,
      //     width: 200,
      //     height: 400,
      //     position: 'right',
      //     hOffset: 0,
      //     vOffset: 0
      //   }
      // })
    }
  }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
}

#live2dcanvas {
  border: 0 !important;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.wrapper-top {
  height: 60px;
}
.wrapper-content {
  min-height: 100vh;
  padding: 0 40px;
  height: 100%;
  box-sizing: border-box;
}
.wrapper-footer {
  width: 100%;
  position: relative;
  z-index: 1;
  height: 60px;
  line-height: 60px;
}
</style>
