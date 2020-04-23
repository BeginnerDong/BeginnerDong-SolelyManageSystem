
import * as types from './mutations_types.js'
import {store,func} from '../../utils/'
import {gbs} from 'config/'

const state = {
  // 登录成功后的用户信息
  tabs: store.get('tabs') || []
}

// getters
const getters = {
  getTabs (state) {
    return state.tabs
  },
}

// actions
const actions = {
  update_tabs: ({ commit }, { menu }) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_TABS, { menu })
      resolve()
    })
  },

  remove_tabs: ({ commit }, { menu }) => {
    return new Promise((resolve, reject) => {
      commit(types.REMOVE_TABS, { menu })
      resolve()
    })
  }
}

// mutations
const mutations = {
  [types.UPDATE_TABS] (state, postData) {

    if(!store.get('menu')){
      return;
    };
    var menu = func.getArrayByTarget(store.get('menu'),'router',postData.fullPath)||[];
    if(menu.length>0) {
      var menuItem = menu[0];
    }else{
      return;
    };

    if(state.tabs.length>0){
      var hasIndex = 0;
      for(var i=0;i<state.tabs.length;i++){
        if(state.tabs[i]&&state.tabs[i]['router']==menuItem.router) state.tabs.splice(i,1);
      };
    };
    state.tabs.unshift(menuItem);
    if(state.tabs.length>11){
      state.tabs.splice(12,1);
    };
    store.set('tabs', state.tabs);
  },
  [types.REMOVE_TABS] (state, postData) {
    if(state.tabs.length>0){
      var hasIndex = 0;
      for(var i=0;i<state.tabs.length;i++){
        if(state.tabs[i]&&state.tabs[i]['router']==postData.fullPath) state.tabs.splice(i,1);
      };
    };
    store.set('tabs', state.tabs);
  },
  [types.CLEAR_TABS] (state, postData) {
    console.log('postData',postData)
    state.tabs = [];
    if(postData.currentItem) state.tabs.push(postData.currentItem);
    store.set('tabs', state.tabs);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
