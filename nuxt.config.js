// eslint-disable-next-line nuxt/no-cjs-in-config
const webpack = require('webpack')

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'evanZhong',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Evan的前端博客，关于Evan，Evan博客管理平台等系列Evan的平台，主要内容为记录Evan前端开发的成长点滴' },
      { hid: 'Keyworkds', name: 'Keywords', content: 'Evan的前端博客，关于Evan，Evan前端攻城狮，ssr博客，前端博客，Evan的个人博客' },
      { 'http-equiv': 'Cache-Control', content: 'max-age=0' },
      { 'http-equiv': 'Expires', content: '0' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon1.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/main.less'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '@/plugins/element-ui', ssr: true },
    { src: '@/plugins/router', ssr: false }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    prefix: '*', // baseURL
    credentials: true
  },
  proxy: {
    '/p': {
      target: 'http://10.0.98.146',
      changeOrigin: true
    }
  },
  // 路由配置
  router: {
    mode: 'history'
  },
  loading: {
    color: '#00ab84'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {
      config.module.rules.push(
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true
              }
            }
          ]
        }
      )
    },
    postcss: [
      require('postcss-px2rem')({
        remUnit: 16
      })
    ]
  }
}
