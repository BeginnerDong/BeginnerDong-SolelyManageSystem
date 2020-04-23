import Vue from 'vue'
import Router from 'vue-router'
import MainRouter from './mainRouter'
import store from '../store/index.js';

Vue.use(Router)

const router = new Router({
   routes: MainRouter
});


router.beforeEach((to, from, next) => {

  store.commit('UPDATE_TABS', {
    fullPath:to.fullPath,
  });
  if(!store.state.user.token&&to.path!='/login'){
    router.push('/login');
    return;
  };

  if(to.meta.noRequireAuth||(store.state.user.router_auth&&store.state.user.router_auth.indexOf(to.path)>-1)){
    next();
  };


});


export default router
