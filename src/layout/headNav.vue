<template>
  <div id="headNav" style="width:100%;height: 100%;" >
    <div style="width:100%;height: 100%;"></div>
    <header class="head-nav" id="header" >
      <div style="width: 100%;height: 20%;"></div>
      <div style="height: 80%;">
        <div  class='head_left'>

          <img class='logo' src="https://www.solelycloud.com/newcms/static/img/logo.png" >
        </div>
        <div class="head_middle" >
        </div>
        <div class="head_right">
          <div style="width: 100%;height: 15%;"></div>
          <el-dropdown
            trigger="click"
            @command='setDialogInfo'>
              <span class="el-dropdown-link" style="color:#3bbef9;font-size: 16px;">
                  {{this.$store.state.user.userinfo.login_name}}
              <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                  <!--<el-dropdown-item command='info'>修改信息</el-dropdown-item>-->
                  <el-dropdown-item
                    command='pass'
                    >修改密码</el-dropdown-item>
                  <!--<el-dropdown-item
                    command='set'
                    >系统设置</el-dropdown-item>-->
                  <el-dropdown-item
                    command='logout'>退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>


        </div>
      </div>
    </header>


    <el-dialog size="small" :title="dialog.title" :visible.sync="dialog.show_pass" >
      <el-form style="margin:20px;width:80%;"
               label-width="100px"
               :model="dialog.user_info"
               :rules="dialog.user_info_rules"
               ref='user_info'>

        <el-form-item class='edit-form' label="登录名" prop='username'>
          <el-input v-model="dialog.user_info.login_name"  placeholder=''>
          </el-input>
        </el-form-item>

        <el-form-item class='edit-form' label="新密码" prop='password'>
          <el-input
            type='password'
            placeholder='新密码'
            auto-complete='off'
            v-model="dialog.user_info.password">
          </el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show_pass = false">取 消</el-button>
                <el-button type="primary" @click="updUserPass('user_info')">确 定</el-button>
            </span>
    </el-dialog>



  </div>
</template>

<script>
  export default {
    name: 'head-nav',
    data () {
      return {
        dialog: {
          show_access: false,
          show_set: false,
          show_pass: false,
          title: '修改密码',
          user_info: this.$store.state.user.userinfo,

          set_info: {
            login_style: '',
            disabled_update_pass: [],
            select_users: []
          },

          user_info_rules: {
            old_password: [{
              required: true,
              message: '旧密码不能为空！',
              trigger: 'blur'
            }],
            password: [{
              required: true,
              message: '新密码不能为空！',
              trigger: 'blur'
            }, {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'))
                } else {
                  if (this.dialog.user_info.password !== '') {
                    this.$refs.user_info.validateField('password_confirm')
                  }
                  callback()
                }
              }
            }],
            password_confirm: [{
              required: true,
              message: '确认密码不能为空！',
              trigger: 'blur'
            }, {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'))
                } else if (value !== this.dialog.user_info.password) {
                  callback(new Error('两次输入密码不一致!'))
                } else {
                  callback()
                }
              }
            }]
          }
        },
        mainData:[],
        isPhone:false

      }
    },
    mounted () {
      const self = this;
      //self.mainData = self.$router.options.routes;




    },
    beforeDestroy() {


    },
    methods: {

      /**
       * 退出登录
       */



      checkInAuth(item){

        var index = this.$store.state.user.userinfo.auth.indexOf(item)


        if(index>=0){
          return true;
        }else{
          return false;
        };

      },

      logout () {
        this.$confirm('你确定退出登录么?', '确认退出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('remove_userinfo').then(() => {
            this.$router.push('/login')
          })
        })
      },

      /**
       * 弹出框-修改密码或者系统设置
       * @param {string} cmditem 弹框类型
       */
      setDialogInfo (cmditem) {
        if (!cmditem) {
          console.log('test')
          this.$message('菜单选项缺少command属性')
          return
        }
        switch (cmditem) {
          case 'info':
            this.$router.push({
              path: '/demo/user/edit',
              query: {
                id: this.$store.state.user.userinfo.id
              }
            })
            break
          case 'pass':
            this.dialog.show_pass = true
            this.dialog.title = '修改密码'
            break
          case 'set':
            this.onGetSetting()
            this.dialog.show_set = true
            this.dialog.title = '系统设置'
            break
          case 'logout':
            this.logout()
            break
        }
      },

      /**
       * 修改密码
       * @param  {object} userinfo 当前修改密码的表单信息
       */
      async updUserPass (userinfo) {


            var postData={
              searchItem:{
                user_no:this.$store.state.user.userinfo.user_no
              },
              data:{
                login_name:this.dialog[userinfo].login_name,
                password:this.dialog[userinfo].password,
              }
            };

            try{
              var res = await this.$$api_userUpdate({data: postData});
            }catch(err){
              console.log(err);
              self.$message('网络故障');
            };
            if(this.$$sCallBack(res)){
              this.dialog.show_pass = false;
            };

      },

      /**
       * 获取系统设置信息
       */
      onGetSetting () {
        // 获取系统设置信息
        if (this.$store.state.user.userinfo.pid === 0) {
          this.$$api_system_getSetting({
            fn: data => {
              if (data.setting_info.disabled_update_pass) {
                data.setting_info.disabled_update_pass = data.setting_info.disabled_update_pass.split(',')
              } else {
                data.setting_info.disabled_update_pass = []
              }
              data.setting_info.login_style = data.setting_info.login_style + ''

              this.dialog.set_info = data.setting_info
            }
          })
        } else {
          this.$message.error('只有管理员才能操作！')
        }
      },

      /**
       * 修改系统设置信息
       */
      onUpdateSetting () {
        // console.log(this.dialog.set_info.login_style);
        // console.log(this.dialog.set_info.disabled_update_pass);
        // console.log(this.dialog.set_info.id);

        this.$$api_system_updateSetting({
          data: {
            id: this.dialog.set_info.id,
            login_style: this.dialog.set_info.login_style,
            disabled_update_pass: this.dialog.set_info.disabled_update_pass && this.dialog.set_info.disabled_update_pass.length ? this.dialog.set_info.disabled_update_pass.join(',') : ''
          },
          fn: data => {
            this.dialog.show_set = false
          }
        })
      }
    }
  }

</script>

<style>
  .head_left {
    float: left;
    width: 30%;
    height: 100%;
  }

  .head_middle {
    float: left;
    width: 50%;
    height: 100%;
  }

  .head_right {
    float: left;
    width: 20%;
    height: 100%;
  }

  .logo {
    height: 30px;
  }

  .fa-user {
    position: relative;
    top: -2px;
    margin-right: 4px;
  }

  .head-nav {
    width: 100%;
    height: 8%;
    background: #324057;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99;
    color: #FFF;
    border-bottom: 1px solid #1F2D3D;
  }

  .userinfo {
    text-align: right;
  }

  .username {
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    margin-top:60x;
    .el-dropdown {
      color: #FFF;
    };
    margin-right: 30px;

  }
  /* .el-menu-item{
    color:white!important;
    background-color: #324057!important;
  }
  .el-menu-item:hover {
    background-color: white!important;
    color:#324057!important;
  }

  .el-menu.el-menu--horizontal {
      border-bottom:none;
  } */
</style>
