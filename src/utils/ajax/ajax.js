import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../../router/'
import { Message } from 'element-ui';
import store from 'store/'
Vue.use(VueAxios, axios)

// 导入封装的回调函数
import {
  gbs
} from 'config/'

// 动态设置本地和线上接口域名
Vue.axios.defaults.baseURL = gbs.host
Vue.axios.defaults.timeout = 300000;

/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} fn        回调函数
 * @param  {boolean}   tokenFlag 是否需要携带token参数，为true，不需要；false，需要。一般除了登录，都需要
 */

export default function ({
  type,
  pathParams,
  path,
  data,
  fn,
  errFn,
  tokenFlag,
  headers,
  opts
} = {}) {
  var p = path
  if (typeof path === 'function') {
    p = path(pathParams || {})
  }


  if(tokenFlag!='false'){
    data.token = store.getters.getToken;
  };
  var options = {
    method: type,
    url: p,
    headers: headers && typeof headers === 'object' ? headers : {}
  };
  options['data'] = data;
  // axios内置属性均可写在这里
  if (opts && typeof opts === 'object') {
    for (var f in opts) {
      options[f] = opts[f]
    };
  };


  // 发送请求
  return Vue.axios(options).then((res) => {

    if (res.data['solely_code'] == 200000) {
      router.push('/login');
      return;
    };
    return res.data;

  }).catch((err) => {

    Message({
      showClose: true,
      message: '网络故障：',
      type: 'error'
    });

  });

};
