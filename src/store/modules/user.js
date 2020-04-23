
import * as types from './mutations_types.js'
import {store} from '../../utils/'

// initial state
// shape: [{ id, quantity }]
const state = {
  // 登录成功后的用户信息
  userinfo: store.get('userinfo') || {},
  token: store.get('token') || '',
  router_to: store.get('router_to') || '',
  menu: store.get('menu') || [],
  router_auth: store.get('router_auth') || [],

  // 记住密码相关信息，现在暂且只做记住一个账号密码
  // 后期：每次登录成功一次，就缓存到列表中，然后在登录表单，输入时，会出现下拉列表选择之前登录过得用户

	remumber_login_info: store.get('remumber_login_info') || []

}

// getters
const getters = {
  getUserinfo (state) {
    return state.userinfo
  },

  getMenu (state) {
    return state.menu
  },

  getRouterTo (state) {
    return state.router_to
  },

  getRouterAuth (state) {
    return state.router_authsd
  },

  getToken (state) {
    return state.token
  },

  getRemumber (state) {
    return state.remumber_login_info
  }
}

// actions
const actions = {
  update_userinfo: ({ commit }, { userinfo, token }) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_USERINFO, { userinfo, token })
      resolve()
    })
  },

  remove_userinfo: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(types.REMOVE_USERINFO)
      resolve()
    })
  },

  update_remumber: ({commit}, {remumber_login_info}) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_REMUMBER, {
        remumber_login_info
      })
      resolve()
    })
  },

  remove_remumber: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(types.REMOVE_REMUMBER)
      resolve()
    })
  }
}

// mutations
const mutations = {

  [types.UPDATE_USERINFO] (state, postData) {
    state.userinfo = postData.userinfo || {}
    state.token = postData.token || {}
    state.menu = postData.menu || []
    state.router_auth = postData.router_auth || []
    state.router_to = postData.router_to || ''
    
    state.userinfo.auth = state.userinfo.passage_array
    store.set('userinfo', state.userinfo)
    store.set('token', state.token)
    store.set('menu', state.menu)
    store.set('router_to', state.router_to)
    store.set('router_auth', state.router_auth)
  },

  [types.REMOVE_USERINFO] (state) {
    store.remove('userinfo')
    store.remove('token')
    store.remove('menu')
    store.remove('router_auth')
    store.remove('router_to')
    state.userinfo = {}
    state.menu = []
    state.router_auth = []
    state.router_to = ''

  },

  [types.UPDATE_REMUMBER] (state, userDb) {
    console.log('userDb',userDb)
    state.remumber_login_info = userDb.remumber_login_info
    store.set('remumber_login_info', state.remumber_login_info)
  },

  [types.REMOVE_REMUMBER] (state) {
    store.remove('remumber_login_info')
    state.remumber_login_info = {
      login_name: '',
      token: ''
    }
  }

}

export default {

  state,
  getters,
  actions,
  mutations
}
