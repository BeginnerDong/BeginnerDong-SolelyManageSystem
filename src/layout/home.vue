<template >
  <div class="home">
    <div class="headNav">
      <head-nav ref="headNav"></head-nav>
    </div>

    <div class="main_content">
      <div class="leftNav" >
        <left-menu></left-menu>
      </div>

      <div class="right-content">
        <div style="height: 10%;">
          <tabs></tabs>
        </div>

        <div class="content" >
          <div style="height: 100%;">
            <!--<keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>-->
            <router-view ></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import HeadNav from './headNav.vue'
  import LeftMenu from './leftNav.vue'
  import Tabs from './tabs.vue';

  export default {
    name: 'home',
    data () {
      return {

      }
    },
    components: {
      HeadNav, LeftMenu, Tabs
    },
    mounted () {
      const self = this;
    },
    beforeDestroy() {
    },
  }
</script>
<style>
  .home{
    width: 100%;
    height: 100%;
  }

  .headNav{
    width: 100%;
    height: 8%;
    overflow: hidden;
  }

  .main_content{
    width: 100%;
    height: 92%;
    position: relative;
  }

  .content {
    /*background: #f1f2f7;*/
    background: #FFF;
    padding: 0px 16px;
    height: 90%;
  }

  .right-content {
    float: left;
    width: 87%;
    height: 100%;
    overflow: hidden;
  }

  .leftNav{
    float: left;
    width: 13%;
    height: 100%;
  }

</style>
