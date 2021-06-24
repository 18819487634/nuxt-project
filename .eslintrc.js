module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'vue'
  ],
  globals: {
    _: false,
    mapActions: false,
    mapGetters: false,
    mapMutations: false,
    mapState: false
  },
  // add your custom rules here
  rules: {
    indent: [2, 2],
    // 允许存在声明但未使用的变量
    'no-unused-vars': [0, { vars: 'all', args: 'after-used' }]
  }
}
