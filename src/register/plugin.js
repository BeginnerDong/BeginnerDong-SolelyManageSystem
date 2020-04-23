/**
 * Created by sailengsi on 2017/5/14.
 */

import  ajax  from 'utils/ajax'
import request from 'apis/'

var plugins = {}

for (var i = 0; i < request.length; i++) {
    plugins['api_' + request[i].method] = (function (n) {
      return function ({type = request[n].type, path = request[n].path, pathParams, data, fn, errFn,tokenFlag = request[n].tokenFlag||true, headers, opts} = {}) {
        // request[n].list[m].type, request[n].list[m].path, data, fn, opts
        return ajax.call(this, {
          type,
          pathParams,
          path,
          data,
          fn,
          errFn,
          tokenFlag,
          headers,
          opts
        })
      }
    })(i)


}
export default plugins
