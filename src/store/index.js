import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user.js'
import tabs from './modules/tabs.js'


export default new Vuex.Store({
  modules: {
    user,
    tabs
  }
})
