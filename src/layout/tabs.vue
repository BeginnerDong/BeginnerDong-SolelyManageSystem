<template>

  <div>
      <div class='tabs' >
        <div  @click="clearTab" style="width:30px;padding:10px" >
          <i class="el-icon-delete" style="display:block;width:16px;margin:0 auto;"></i>
        </div>

          <div>
            <el-tag
              v-for="(item,index) in tabs"
              :key="item.router"
              v-if="item.isShow"
              closable
              :disable-transitions="false"
              @click="onTabClick(item)"
              @close="onRemoveTab(item)"
              style="margin-right: 5px;"
              :style="index==0?'background-color:#324057;color:white':''"
              >
              {{item.name}}
            </el-tag>
          </div>
      </div>

  </div>

</template>

<script>
  export default {
    name: 'sls-tabs',
    data() {
      return {
        strong: '',
        currentItem:{}
      }
    },
    computed: {
      tabs () {
        return this.$store.state.tabs.tabs
      }
    },
    mounted() {
    //      console.log('this.$store.state.tabs.list', this.$store.state.tabs.list);
    //      console.log('this.$store.state.tabs.pathList', this.$store.state.tabs.pathList);
    //      console.log('this.tabs_cur', this.tabs_cur);
    },
    created() {
      const self = this;
      self.currentItem = self.tabs[0];

    },
    methods: {

      getPageText (name) {
        return name.replace('编辑', this.$route.query.id ? '修改' : '添加')
      },

      clearTab(){
        const self = this;
        self.$store.commit('CLEAR_TABS', {
          currentItem:self.tabs[0],
        });
      },

      onTabClick(item) {
        const self = this;

        if(self.$router.history.current.fullPath!=item.router) self.$router.push(item.router);
      },

      onRemoveTab(item) {
        const self = this;
        self.$store.commit('REMOVE_TABS', {
          fullPath:item.router,
        });
        if(self.tabs.length==0){
          self.$router.push('/login');
        };
      }
    },

    watch: {
      $route (to, from) {
        this.strong = this.getPageText(to.name)
      }
    }
  }
</script>

<style >
  .tabs{
    padding: 10px 23px;
    display:flex;

    border-bottom:2px solid #324057;
  }

  .clear{
    padding: 0 16px;
    height: 42px;
    box-sizing: border-box;
    line-height: 42px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    color: #8391a5;
    position: relative;
    border:1px solid #d1dbe5;
  }


  .el-tabs__item.is-active {
    color: #409EFF!important;
  }
</style>
