/**
 * Created by wjm on 2019/11/6.
 */
import Vue from 'vue'
import cps from 'cps/'
import plugins from './plugin'
import func from '../utils/func/func.js'
import _ from 'underscore'

/**
 * 把一些全局对象和一些全局方法，注册到Vue原型上
 */
Vue.use({
  install (Vue, options) {
    //Vue.mixin(mixins)
    Vue.prototype['_'] = _;

    // 注册全局方法，如常用的接口方法，工具方法等。
    _.each(plugins, (item, key) => {
      Vue.prototype['$$' + key] = item
    })

    _.each(func, (item, key) => {
      Vue.prototype['$$' + key] = item
    })

  }
})

_.each(cps, (item, key) => {
  var cpName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
  if (cpName && cpName[0] === '-') {
    cpName = cpName.replace('-', '')
  };

  Vue.component(cpName, item)
})
