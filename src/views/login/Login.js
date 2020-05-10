/**
 * Created by wjm on 2019/11/6.
 */
import {gbs} from '../../config/index.js';
export default {
  name: 'login',
  data () {
    return {

      isLoading:false,
      register: false,
      data: {
        login_name: '',
        password: '',
        repassword:''
      },
      rule:{
        login_name: {
          tips:'请输入登录名',
          regx:''
        },
        password:{
          tips:'请输入密码',
          regx:''
        },
        repassword:{
          tips:'请重复输入密码',
          regx:''
        },
      },
      formStyle: {},
      remumber_login_info: this.$store.state.user.remumber_login_info,
      login_actions: {
        disabled: false
      },
      isRemeber:false,
      router_auth:[],
      router_to:''
    }
  },
  created () {
  },
  mounted () {
    if (this.remumber_login_info.length>0) {
      this.data.login_name = this.remumber_login_info[this.remumber_login_info.length-1]['login_name'];
      this.data.password = this.remumber_login_info[this.remumber_login_info.length-1]['password'];
      this.$set(this.data);
      this.isRemeber = true;
    };
  },
  methods: {

    checkRule(keyArray){
      const self = this;
      for(var i=0;i<keyArray.length;i++){
        if(!self.data[keyArray[i]]){
          this.$message.error(self.rule[keyArray[i]]['tips']);
          return false;
        };
      };
      return true;
    },

    updateLoginInfo(){
      const self = this;
      for(var i=0;i<self.remumber_login_info.length;i++){
        if(self.remumber_login_info[i]['login_name']==self.data.login_name){
          self.remumber_login_info.splice(i, 1);
        };
      };
      if(self.isRemeber){
        self.remumber_login_info.push(self.data);
      };
      self.$store.commit('UPDATE_REMUMBER', {
        remumber_login_info:self.remumber_login_info
      });
    },


    async onLogin () {
      const self = this;
      console.log('window.screen.width',window.screen.width)
      if(window.screen.width<900){
        this.$message.error('请使用正确设备');
        return;
      };

      if (self.register) {
        if(!self.checkRule(['login_name','password','repassword'])) return;
      }else{
        if(!self.checkRule(['login_name','password'])) return;
      };

      var res =  await self.$$api_login({data: self.data});
      if(self.$$sCallBack(res)){
        self.updateLoginInfo();
        self.updateMenu(res.info);
        console.log('self.menu',self.menu);

        self.$store.commit('UPDATE_USERINFO', {
          userinfo:res.info,
          token:res.token,
          menu:self.menu,
          router_auth:self.router_auth,
          router_to:self.router_to
        });
        self.$store.commit('CLEAR_TABS', {
          currentItem:self.currentItem,
        });
        console.log('router_auth',self.router_auth);
        console.log('router_to',self.router_to);

        if(self.router_to){

          self.$router.push(self.router_to);
        }else{
          console.log('self.router_auth[0]',self.router_auth[0])
          self.$router.push(self.router_auth[0]);
        };

      };


    },

    onRegister (ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.login_actions.disabled = true
          this.$$api_user_register({
            data: this[ref],
            fn: data => {
              this.login_actions.disabled = false;
              this.$message.success('注册成功，请登录');
              this.toggleStatus(false);
            },
            errFn: () => {
              this.login_actions.disabled = false
            },
            tokenFlag: true
          })
        }
      })
    },

    resetForm (ref) {
      this.$router.push('/function')
      //this.$refs[ref].resetFields()
    },

    toggleStatus () {
      const self = this;
      self.register = !self.register;
      if (this.register === true) {
        this.$set(this.data, 'repassword', '')
      } else {
        this.$delete(this.data, 'repassword')
      }
    },


    updateMenu(userInfo){
      const self =this;
      var results = [];
      var router = [];
      var data = self.$$cloneForm(gbs.menu);
      if(userInfo.primary_scope==90){
        var checkData = 'All';
      }else{
        // var checkData = userInfo.passage_array;
        var checkData = userInfo.auth;
      };

      pushItemsExclude(data,results,router);
      self.menu = results;
      self.router_auth = router;
      return;

      function pushItemsExclude(data,results,router){

        for (var i = 0; i < data.length; i++) {
          var childItem = {};

          if(checkData!='All'&&checkData.indexOf(data[i].id)>=0){
            childItem = data[i];
            if(data[i].router){
              router.push(data[i]['router']);
            };

            if(checkData.indexOf('first_'+data[i].router)>-1){
              self.router_to = childItem.router;
            };
          }else if(checkData=='All'){
            childItem = data[i];
            if(data[i].router){
              router.push(data[i]['router']);
            };
            if(checkData.indexOf('first_'+data[i].router)>-1){
              self.router_to = childItem.router;
            };
          };

          if(JSON.stringify(childItem)!='{}'&&data[i].button&&data[i].button.length>0){

            var newChildItem = [];

            for(var j=0;j<data[i].button.length;j++){

              if(checkData=='All'||checkData.indexOf(data[i].id+'_'+data[i].button[j])!=-1){
                newChildItem.push(data[i].button[j])
              };
            };
            childItem.hasButton = newChildItem;
          };

          if(JSON.stringify(childItem)!='{}'&&data[i].children&&data[i].children.length>0){
            var newArray = self.$$cloneForm(data[i].children);
            childItem.children = [];
            pushItemsExclude(newArray,childItem.children,router);
          };

          if(JSON.stringify(childItem)!='{}'){
            results.push(childItem);
          };


        };

      };

    },

  },



}
