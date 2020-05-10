import {gbs} from '../../../config/index.js';
export default {
  name: 'areaMenu',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      table_arguments:{
        height:'70%',
        row_key:'id',
        tree_props:'',
        default_expand_all:false,
        expand:false,
        selection:false,
        cell_style:{},
        tree_props:{
          children: 'children',
        }
      },
      searchForm:{
        status:'1'
      },
      fields: [
        {
          key: 'id',
          label: 'ID',
          width:'100',
          application:['table'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: "hasAuth",
          width:'100',
          label: '是否有权限',
          application:['添加','编辑'],
          componentName:'sls-checkbox',
          listType:'normal',
          customSlot:'hasAuth',
          optionsName:'hasAuthOptions',
          defaultProps: {
            label: 'text',
            value: 'value',
          },
        },
        {
          key: "isFirst",
          width:'100',
          label: '是否默认跳转',
          application:['添加','编辑'],
          componentName:'sls-checkbox',
          listType:'normal',
          customSlot:'isFirst',
        },
        {
          key: "name",
          label: '名称',
          application:['添加','编辑'],
          componentName:'sls-input',
          listType:'normal',

        },
        {
          key: "router",
          label: '路由',
          application:['添加','编辑'],
          componentName:'sls-input',
          listType:'normal',

        },
        {
          key: "isShow",
          label: '是否显示',
          width:'100',
          application:['添加','编辑'],
          componentName:'sls-checkbox',
          listType:'normal',
          customSlot:'isShow',
          optionsName:'isShowOptions',
          defaultProps: {
            label: 'text',
            value: 'value',
          },
        },
        {
          key: "button",
          label: '按钮',
          application:['添加','编辑'],
          customSlot:'button',
          componentName:'sls-input',
          listType:'normal',

        },
      ],

      // 需要给分页组件传的信息
      pagination: {
        current_page: 1,
        total: 0,
        page_sizes: [3, 9, 12, 24],
        layout: 'total, sizes, prev, pager, next, jumper',
        pagesize:10,
        is_page:true,
      },

      // 搜索配置
      search_data: {
        fields: [
          {
            key: 'title',
            label: '标题'
          }
        ],
        default_value: {
          title: ''
        }
      },

      // 按钮配置
      btn_info:[
        {
          type:'danger',
          icon:'delete',
          size:'normal',
          funcType:'submit',
          position:'header',
          text:function(data){
            return '更新权限'
          },
          func:{
            apiName:function(data){
              return "api_updateAuth"
            },
            postData:function(self){
              var postData = {
                searchItem:{
                  role:self.role,
                },
                data:{
                  auth:self.auth,
                }
              };
              console.log('postData',postData)
              return postData;
            }
          },
        },
        {
          type:'info',
          icon:'edit',
          size:'normal',
          position:'header',
          text:function(self){
            return '权限全选'
          },
          funcType:'func',
          func:{
            func:function(self){
              self.mainData = self.$$cloneForm(self.c_menu);
              self.auth = self.$$cloneForm(self.c_auth);
            },
          },
        },
        {
          type:'info',
          icon:'edit',
          size:'normal',
          position:'header',
          text:function(data){
            return '返回'
          },
          funcType:'func',
          func:{
            func:function(self){
              self.$router.push(self.path);
            },
          },
        },
      ],
      paginate: {
          count: 0,
          currentPage: 1,
          pagesize:10,
          is_page:true,
          page_sizes: [10, 30, 60, 90],
          layout: 'total, sizes, prev, pager, next, jumper',
      },
      searchItem:{
        type:3
      },
      optionData:{
        labelOptions:[],
        statusOptions:[{
          text: '启用',
          value: 1
        }, {
          text: '禁用',
          value: -1
        }],
        isShowOptions:['显示','隐藏']
      },
      defaultProps:{
        children: 'children',
        label: 'name',
        value:'id',
      },
      otherData:{
        deleteApiName:'api_label_update',
      },
      defaultChecked:[],
      formLabelWidth:'auto',
      btnName:'',
      formData:{},
      btnNow:{},
      submitData:{},
      orginFormData:{},
      selectionArray:[],
      dialog:{
        dialogFormVisible:false
      },
      checkedCities:['显示'],
      auth:[],
      c_auth:[],
      c_menu:[],
      router_to:'',
      isCheck:true,
      isNoCheck:false,
      user_no:'',
      path:''


    }

  },
  mounted () {
    console.log('this.$route.params',this.$route.params)
    this.init()
  },
  computed: {
    token: function () {
      return this.$store.getters.getToken
    }
  },
  watch: {
    $route (to, from) {
      console.log(to)
      this.init()
    },
    token(){

    }
  },
  methods: {


    /**
     * 初始化
     */
    init() {

      const self = this;
      self.role = this.$route.params.role;
      // self.auth = this.$route.params.defaultChecked;
      self.path = this.$route.params.path;
      // console.log('self.auth',self.auth)
      // if(!self.auth){
      //   self.$router.push('/home/adminLists');
      // };
      // self.user_no = this.$route.params.user_no;
      self.menu = this.$store.state.user.menu;
      console.log('init',self.menu);
      this.initRoleData()

    },
    
    
    async initRoleData(){
    
      const self = this;
      const postData  = {};
    
      postData.token = self.$store.getters.getToken;
      postData.searchItem = {
        role: self.role
      };
      var res = await self.$$api_authGet({data: postData});
      self.auth = res.info;
      this.initMainData()
    
    },


    isFirstChange(router){
      const self = this;
      self.isCheck = true;
      self.isNoCheck = false;
      if(!router||router=='undefined'){
        return;
      };


      var before_key = 'first_' + self.router_to;
      var key = 'first_' + router;
      if(key==before_key){
        self.auth.splice(self.auth.indexOf(before_key),1);
        self.router_to = '';
      }else if(self.auth.indexOf(before_key)>-1){
         self.auth.splice(self.auth.indexOf(before_key),1);
         self.auth.push(key);
         self.router_to = router;
      }else{
        self.auth.push(key);
        self.router_to = router;
      };

    },


    isFirstTest(router){
      const self = this;
      var key = 'first_' + router;

      if(self.auth.indexOf(key)>-1){
        return true;
      }else{
        return false;
      };
    },

    buttonChange(item){
      console.log('buttonChange',item);
      const self = this;
      for(var i=0;i<item.data.button.length;i++){
        var key = item.data.id + '_' +item.data.button[i];
        if(item.data.hasButton.indexOf(item.data.button[i])>-1){
          self.authChange(key,true);
        }else{
          self.authChange(key,false);
        };
      }

    },

    hasAuthChange(item){
      console.log('hasAuthChange',item);
      const self = this;
      self.authChange(item.data.id,item.data.hasAuth);
      var key = item.data.id + '_isShow';
      self.authChange(key,item.data.hasAuth);
    },

    isShowChange(item){
      console.log('isShowChange',item);
      const self = this;
      var key = item.data.id + '_isShow';
      self.authChange(key,item.data.isShow);
      self.authChange(item.id,item.data.isShow);
    },

    authChange(key,value){
      const self = this;
      console.log('key',key)
      var index = self.auth.indexOf(key);

      console.log('index',index)
      if(value&&index==-1){
        self.auth.push(key)
      }else if(!value&&index>-1){
        self.auth.splice(index,1)
      };
      console.log('self.auth',self.auth)
    },



    async initMainData(){
      const self =this;
      var results = [];
      var c_results = [];
      var data = self.$$cloneForm(self.menu);
      if(this.$route.params.primary_scope==90){
        var checkData = 'All';
      }else{
        var checkData = self.auth;
      };

      console.log('checkData',checkData);
      pushItemsExclude(data,results,c_results);
      self.mainData = results;
      self.c_menu = c_results;
      console.log('initMainData-results',results);
      console.log('initMainData-self.c_auth',self.c_auth);
      return;

      function pushItemsExclude(data,results,c_results){

        for (var i = 0; i < data.length; i++) {
          var childItem = {};
          var c_childItem = {};
          if(checkData!='All'){
            childItem = data[i];
            if(checkData.indexOf('first_' + data[i].router)>-1){
              self.router_to = data[i].router;
            };
            c_childItem = self.$$cloneForm(data[i]);
            if(checkData.indexOf(data[i].id)>-1){
              childItem.hasAuth = true;
            }else{
              childItem.hasAuth = false;
            };
            c_childItem.hasAuth = true;
            self.c_auth.push(data[i].id);
          }else if(checkData=='All'){
            childItem = data[i];
            childItem.hasAuth = true;
            c_childItem = self.$$cloneForm(data[i]);
            c_childItem.hasAuth = true;
            self.c_auth.push(data[i].id);
          };

          if(JSON.stringify(childItem)!='{}'&&data[i].button&&data[i].button.length>0){
            childItem.hasButton = [];
            c_childItem.hasButton = [];
            for(var j=0;j<data[i].button.length;j++){
              if(checkData.indexOf(data[i].id+'_'+data[i].button[j])>-1){
                childItem.hasButton.push(data[i].button[j]);
              };
              c_childItem.hasButton.push(data[i].button[j]);
              self.c_auth.push(data[i].id+'_'+data[i].button[j]);
            };
          };

          if(JSON.stringify(childItem)!='{}'&&data[i].children&&data[i].children.length>0){
            var newArray = self.$$cloneForm(data[i].children);
            childItem.children = [];
            c_childItem.children = [];
            pushItemsExclude(newArray,childItem.children,c_childItem.children);
          };

          if(JSON.stringify(childItem)!='{}'){
            results.push(childItem);
            c_results.push(c_childItem);
          };


        };

      };

    },





     beforeSearch(TableName){

       const self = this;
       if(JSON.stringify(self.getBefore) == "{}"&&JSON.stringify(self[TableName]['searchItem']) != "{}"){
         self.getBefore = {
           [TableName]:self[TableName],
         };
       }else{
         if(JSON.stringify(self[TableName]['searchItem']) == "{}"){
           self.getBefore = {};
         }else{
           self.getBefore[TableName] = self[TableName];
         };
       };
       self.initMainData();

     },


     filtersChange(params){
       const self = this;
       console.log(params);
       for (var key in params) {
         self.searchItem[key] = params[key][0]
       }
       console.log(self.searchItem)
       self.initMainData();
     },

     async header_search_fieldChange(Object){
       const self = this;
       console.log('field',Object);
       Object.field.header_search['changeFunc'](Object.value,self);
     },

     pageChange(val){
       console.log('pageChange',val);
       const self = this;
       self.paginate[val[0]] = val[1];
       self.initMainData();
     },

     onClickBtn(val){

       const self = this;
       console.log('val',val);
       self.formData = val[1];
       self.btnName = val[0];
       self.formData = val[2].func.formData?self.$$cloneForm(val[2].func.formData(self)):{};
       self.orginFormData = val[1];
       console.log('self.formData',self.formData)
       self.btnNow = val[2];
       if(!val[2].funcType){
         self.dialog.dialogFormVisible = true;
       }else if(val[2].funcType=='func'){
         val[2].func.func(self);
       }else if(val[2].funcType=='submit'){
         self.submit(self);
       };

     },

     async dialog_fieldChange(Object){
       const self = this;
       self.formData[Object.field.key] = Object.value;
       self.submitData[Object.field.key] = Object.value;
       console.log('field',Object);

     },

     async submit(){
       const self = this;

       this.$confirm('是否确定此操作?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async () => {
       	var postData = self.$$cloneForm(self.btnNow.func.postData(self));
         if(!postData){
           self.$$notify('数据故障','fail');
           return;
         };
         console.log('postData',postData)

         var res = await self['$$'+self.btnNow.func.apiName(self)]({data: postData});
         if(res){
           if(self.$$sCallBack(res)){
             self.dialog.dialogFormVisible = false;
           };
         };
       }).catch((e) => {
         console.log(e)
         self.$message({
           type: 'info',
           message: '故障'
         });
       });
     },

     onSelectionChange(val){
       const self = this;
       self.selectionArray = self.$$cloneForm(val);
       console.log('self.selectionArray',self.selectionArray);
     }


  }


}
