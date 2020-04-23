<template>

  <div class="left" id='admin-left'>
  <el-menu

    :default-active="default_index"
    class="left_menu_class"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    background-color="#324057"
    text-color="#fff"
    active-text-color="#3bbef9"

    >

    <template v-for="(item,index) in menu" >
      <el-submenu v-if="item.children&&item.isShow" :index="item.id.toString()" :key="item.name">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.name}}</span>
        </template>

        <template v-for="(c_item,c_index) in item.children" >
          <el-submenu v-if="c_item.children&&c_item.isShow" :index="c_item.id.toString()" :key="c_item.name">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{c_item.name}}</span>
            </template>

            <template v-for="(cc_item,cc_index) in c_item.children" >
              <el-submenu v-if="cc_item.children&&cc_item.isShow" :index="cc_item.id.toString()" :key="cc_item.name">
                <i class="el-icon-location"></i>
                <span>{{cc_item.name}}</span>
              </el-submenu>
              <el-menu-item v-else-if="cc_item.isShow" :index="cc_item.id.toString()" :key="cc_item.name">
                <i class="el-icon-menu"></i>
                <span slot="title">{{cc_item.name}}</span>
              </el-menu-item>
            </template>
          </el-submenu>

          <el-menu-item v-else-if="c_item.isShow" :index="c_item.id.toString()" :key="c_item.name">
            <i class="el-icon-menu"></i>
            <span slot="title">{{c_item.name}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-else-if="item.isShow" :index="item.id.toString()" :key="item.name">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>

  </el-menu>



      <div class="toggle-menu"
        @click='toggleMenu'
      >
        <i></i>
      </div>

  </div>
</template>

<script>
  import {gbs} from '../config/index.js';
  export default {
    name: 'left-menu',
    data () {
      return {
        menu_list: [],
        win_size: {
          height: ''
        },
        active_path:'',
        nbPath:'/adv/article/list',
        menu:[],
        default_index:''

      }
    },
    created () {
      const self =this;



    },

    mounted () {
      const self = this;
      self.menu = this.$store.state.user.menu;
      self.default_index = self.$store.state.tabs.tabs[0]['id'];

    },
    methods: {

      handleSelect(index,indexPath){
        const self = this;
        var item = self.$$getArrayByTarget(self.menu,'id',index)[0];
        if(item.router){
          self.$router.push(item.router);
        };
      },


      handleOpen(index){

      },

      handleClose(){

      },

      initMenu(){
        const self = this;

      },

      checkInAuth(item){

        var index = this.$store.state.user.userinfo.auth.indexOf(item);
        if(index>=0){
          return true;
        }else{
          return false;
        };

      },
      setSize () {
        this.win_size.height = (this.$$lib_$(window).height() - 50) + 'px'
      },
      toggleMenu () {
        console.log(99635)
        this.active_path = this.$route.path;
        this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open')
      },
      updateCurMenu (route) {
        const self = this;

        self.active_path = '';
        route = route||self.$route;
        if (route.matched.length) {
          var rootPath = route.matched[0].path;
          var fullPath = route.fullPath;
          self.$store.dispatch('set_cur_route', {
            rootPath,
            fullPath
          });
          var routes = self.$router.options.routes;
          for (var i = 0; i < routes.length; i++) {
            if (routes[i].path === rootPath && !routes[i].hidden) {
              self.menu_list = routes[i];
            };
          };
          this.active_path = this.$route.fullPath;
          this.nb_array = [route.matched[1].path];
        } else {
          self.$router.push('/404');
        };
      }

    },





    watch: {

      $route (to, from) {
        const self = this;
      }


    }

  }

</script>
<style>

  .left{
    width: 100%;
    height: 100%;
    text-align:left;
    background-color: #324057!important;
    overflow: auto;
  }

  .left_menu_class{
    border: none
  }



</style>

<!--<style scoped lang='less'>
  @import url(./LeftMenu.less);
</style>
