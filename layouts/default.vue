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
const routerMenu = ['my_project', 'about', 'message']
export default {
  mounted () {
    this.init()
  },
  methods: {
    // 初始化方法
    init () {
      // 增加鼠标点击爱心
      clickHeart(window, document)
      this.initMenu()
    },
    // 初始化header菜单栏状态
    initMenu () {
      const pathName = this.$route.name
      // if (!pathName) return
      const index = routerMenu.indexOf(pathName)
      this.$store.commit('setActiveIndex', index)
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
