import cookie from 'js-cookie'

const state = () => ({
  token: null,
  activeIndex: 0
})

const mutations = {
  setToken (state, token) {
    state.token = token
    cookie.set('token', token)
    if (process.browser && token) {
      // 加下划线表示私有属性
      window._token = token
    }
  },
  setActiveIndex (state, activeIndex) {
    state.activeIndex = activeIndex
  }
}

const actions = {
  getUseInfo ({ commit, state }) {
    const SSOTOKEN = '1111'
    commit('setToken', SSOTOKEN)
  }
}

export default {
  state,
  mutations,
  actions
}
