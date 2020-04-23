export default {
  name: 'staff',
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
        selection:true,
        cell_style:{}
      },
      fields: [
        {
          key: 'id',
          label: '员工ID',
          application:[],
          componentName:'sls-input',
          listType:'normal',
          width:50
        },
        {
          key: 'user_no',
          label: '员工NO',
          application:[],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入员工NO',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.user_no = val;
              }else{
                delete self.searchItem.user_no;
              };
              self.initMainData();
            },
          },
        },
        {
          key: 'login_name',
          label: '员工登录名',
          application:['编辑账号','添加账号'],
          componentName:'sls-input',
          listType:'normal',
          placeholder:'请输入员工登录名',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入员工登录名',
            changeFunc:function(e,self){
              if(e.target._value){
                self.searchItem.login_name = ['LIKE',['%'+e.target._value+'%']];
              }else{
                delete self.searchItem.login_name;
              };
              self.initMainData();
            },
          }
        },
        {
          key: 'mainImg',
          label: '员工头像',
          application:['编辑账号','添加账号'],
          dialogStyle:'width:100%;',
          customSlot:'mainImg',
          componentName:'upload',
          listType:'normal',
          limit:10,
        },
        {
          key: 'password',
          label: '员工密码',
          application:['编辑账号','添加账号'],
          componentName:'sls-input',
          dialog:{
            type:'password'
          }
        },
        {
          key: "name",
          label: '员工姓名',
          application:['添加信息','编辑信息'],
          componentName:'sls-input',
          listType:'normal',
          formatter:function(val){
            return val.info.name
          },
          placeholder:'请输入员工姓名',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入员工姓名',
            changeFunc:function(e,self){
              if(e.target._value){
                self.UserInfo.searchItem.name = ['LIKE',['%'+e.target._value+'%']]
              }else{
                delete self.UserInfo.searchItem.name
              };
              self.beforeSearch('UserInfo');
            },
          },

        },
        {
          key: "phone",
          label: '员工电话',
          application:['添加信息','编辑信息'],
          componentName:'sls-input',
          listType:'normal',
          formatter:function(val){
            return val.info.phone
          },
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入员工电话',
            changeFunc:function(e,self){
              if(e.target._value){
                self.UserInfo.searchItem.phone = ['LIKE',['%'+e.target._value+'%']]
              }else{
                delete self.UserInfo.searchItem.phone
              };
              self.beforeSearch('UserInfo');
            },
          },
        },
        {
          key: "level",
          label: '员工级别',
          application:['添加信息','编辑信息'],
          type:'input',
          listType:'normal',
          formatter:function(val){
            return val.info&&val.info.level?val.info.level:''
          }
        },
        
        
        {
          key: "score_ratio",
          label: '是否实习',
          application:['添加信息','编辑信息'],
          componentName:'sls-select',
          optionsName:'scoreRatioOptions',
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          formatter:function(val){
            if(val.status==1){
              return '正式';
            }else{
              return '实习';
            };
          }
        },
        {
          key: "salary",
          label: '起步薪资',
          application:['添加信息','编辑信息'],
          type:'input',
          listType:'normal',
          formatter:function(val){
            return val.info&&val.info.salary?val.info.salary:''
          }
        },
        {
          key: "workdays",
          label: '工作日',
          application:['添加信息','编辑信息'],
          type:'input',
          listType:'normal',
          formatter:function(val){
            return val.info&&val.info.workdays?val.info.workdays:''
          }
        },
        {
          key: "holiday",
          label: '法定假日',
          application:['添加信息','编辑信息'],
          type:'input',
          listType:'normal',
          formatter:function(val){
            return val.info&&val.info.holiday?val.info.holiday:''
          }
        },
        {
          key: "passage1",
          label: '职务',
          application:['添加信息','编辑信息'],
          type:'input',
          listType:'normal',
          formatter:function(val,tests){
            return val.info&&val.info.passage1?val.info.passage1:'';
          },
        },
        {
          key: "behavior",
          label: '部门',
          application:['添加信息','编辑信息'],
          type:'select',
          listType:'normal',
          customSlot:'behavior',
          componentName:'sls-select',
          optionsName:'behaviorOptions',

          filter_multiple: false,
          listType:'normal',
          defaultProps: {
            label: 'text',
            value: 'value',
          },
        },
        {
          key: "behavior",
          label: '是否计薪',
          application:['编辑账号','添加账号'],
          type:'select',
          listType:'normal',
          formatter:function(val,tests){
            return ['是','否'][val.behavior];
          },
          componentName:'sls-select',
          optionsName:'behaviorUserOptions',
          filter_multiple: false,
          listType:'normal',
          defaultProps: {
            label: 'text',
            value: 'value',
          },
        },
        {
          key: "name",
          label: '内容',
          application:[],
          type:'vueEditor',
        },
        {
          key: 'primary_scope',
          label: '员工权限',
          application:['编辑账号','添加账号'],
          componentName:'sls-input',
          listType:'normal',
          isHide:function(self){

            if(self.dialog&&self.$store.getters.getUserinfo.primary_scope<60){
              return true;
            }else{
              return false;
            }
          },
        },
        {
          key: "status",
          label: '状态',
          application:['编辑账号'],
          componentName:'sls-select',
          optionsName:'statusOptions',
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          formatter:function(val){
            if(val.status==1){
              return '启用';
            }else{
              return '关闭';
            };
          }
        },
        
        {
          key: 'create_time',
          label: '创建时间',
          listType:'normal',
          placeholder:'请选择创建时间',
          header_search:{
            componentName:'sls-datetime',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择创建时间',
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.create_time;
              }else{
                self.searchItem.create_time = ['between',value = value.map(function(e){return e/1000;})]
              };
              self.initMainData();
            },
          },
        },
        {
          label: '操作',
          listType:'deal',
          width:200
        },
      ],
      // 按钮配置
      btn_info: [

          {
            type:'info',
            icon:'edit',
            size:'mini',
            position:'list',
            text:function(data){
              if(data){
                return JSON.stringify(data.info)!= '[]'?'编辑信息':'添加信息'
              }else{
                return ['编辑信息','添加信息'];
              }

            },
            func:{
              apiName:function(self){
                return JSON.stringify(self.formData.info) != "[]" ?"api_userInfoUpdate":"api_userInfoAdd"
              },

              formData:function(self){

                var data = self.formData.info;
                return data
              },

              postData:function(self){
                if(self.btnName=='编辑信息'){
                  var postData={
                    searchItem:{
                      id:self.orginFormData.info.id,
                      user_no:self.orginFormData.info.user_no
                    },
                    data:self.submitData
                  }
                }else if(self.btnName=='添加信息'){
                  var postData={
                    data:self.submitData
                  };
                };
                postData.data.user_no=self.orginFormData.user_no;

                return postData;
              }
            },
          },
          {
            type:'info',
            icon:'edit',
            size:'mini',
            position:'list',
            text:function(data){
              return '编辑账号'
            },
            func:{
              apiName:function(self){
                return "api_userUpdate"
              },
              formData:function(self){

                return self.formData
              },
              postData:function(self){
                var postData={
                  searchItem:{
                    id:self.formData.id,
                    user_no:self.formData.user_no,
                  },
                  data:self.submitData
                }
                return postData;
              }
            },
          },
          {
            type:'info',
            icon:'edit',
            size:'mini',
            position:'list',
            text:function(data){
              return '管理权限'
            },
            isHide:function(data,self){
              if(self.formData.user_no==self.$store.getters.getUserinfo.user_no&&self.$store.getters.getUserinfo.primary_scope<60){
                return true;
              }else{
                return false;
              };
            },
            funcType:'func',
            func:{
              func:function(self){
                console.log('self.orginFormData',self.orginFormData);

                self.$router.push({
                  path:'/home/access',
                  name:'权限管理',
                  params:{
                    defaultChecked:self.orginFormData.passage_array,
                    user_no:self.orginFormData.user_no,
                    primary_scope:self.orginFormData.primary_scope,
                    path:'/home/staff',
                  }
                });

              },
              postData:function(self){
                var postData={
                  searchItem:{
                    id:self.formData.id,
                  },
                  data:data
                };
                return postData;
              },
            },
          },
          {
            type:'danger',
            icon:'delete',
            size:'medium',
            funcType:'submit',
            position:'header',
            text:function(data){
              return '删除选中'
            },
            func:{

              apiName:function(self){
                return "api_userUpdate"
              },

              postData:function(self){
                var deleteArray = [];
                for (var i = 0; i < self.selectionArray.length; i++) {
                  deleteArray.push(self.selectionArray[i].id);
                };
                var postData = {
                  searchItem:{
                    id:['in',deleteArray],
                    user_type:1
                  },
                  data:{
                    status:-1
                  }
                };
                return postData;
              }

            },
          },
          {
            type:'info',
            icon:'edit',
            size:'medium',
            position:'header',
            text:function(data){
              return '添加账号'
            },
            func:{
              apiName:function(self){
                return "api_userAdd"
              },
              formData:function(self){
                var data = {
                  login_name:'',
                  password:'',
                };
                return data
              },
              postData:function(self){
                self.submitData.user_type = 1;
                var postData={
                  data:self.submitData
                };
                return postData;
              }
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
        user_type:1
      },
      optionData:{
        labelOptions:[],
        scoreRatioOptions:[{
          text: '正式',
          value: 1
        }, {
          text: '实习',
          value: 2
        }],
        statusOptions:[{
          text: '启用',
          value: 1
        }, {
          text: '禁用',
          value: -1
        }],
        behaviorUserOptions:[{
          text: '是',
          value: 0
        }, {
          text: '否',
          value: 1
        }],
        behaviorOptions:[
          {
            text: '开发',
            value: 1
          },
          {
            text: '销售',
            value: 2
          },
          {
            text: '运营',
            value: 3
          },
          {
            text: '人事/行政',
            value: 4
          },
          {
            text: '财务',
            value: 5
          },
        ],
      },
      otherData:{
      },
      UserInfo:{
        tableName:'UserInfo',
        searchItem:{
        },
        fixSearchItem:{
          status:1
        },
        key:'user_no',
        middleKey:'user_no',
        condition:'in',
      },
      dialog:{
        formLabelWidth:'auto',
        dialogFormVisible:false,
        title:'用户'
      },
      getBefore:{},
      formLabelWidth:'auto',
      btnName:'',
      formData:{},
      btnNow:{},
      submitData:{},
      orginFormData:{},
      selectionArray:[]

    }

  },

  mounted () {
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
    init () {
      this.initMainData()
    },

    /**
     * 列表主函数
     */
    async initMainData () {

      const self = this;
      const postData  = {};
      postData.paginate = self.$$cloneForm(self.paginate);
      postData.token = self.$store.getters.getToken;
      if (self.searchItem) {
        postData.searchItem = self.$$cloneForm(self.searchItem)
      };
      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };
      var res =  await self.$$api_userGet({data: postData});

      self.mainData = res.info.data;
      console.log('self.mainData',self.mainData);
      self.paginate.count = res.info.total;

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
      self.submitData = {};
      self.formData = val[1];
      self.btnName = val[0];
      self.formData = val[2].func.formData?self.$$cloneForm(val[2].func.formData(self)):{};
      self.orginFormData = val[1];
      self.btnNow = val[2];
      if(!val[2].funcType){
        self.dialog.dialogFormVisible = true;
      }else if(val[2].funcType=='func'){
        val[2].func.func(this);
      }else if(val[2].funcType=='submit'){
        self.submit();
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


        var res = await self['$$'+self.btnNow.func.apiName(self)]({data: postData});
        if(res){
          if(self.$$sCallBack(res)){
            self.dialog.dialogFormVisible = false;
            if(self.btnNow.func.callback){
              self.btnNow.func.callback(self);
            }else{
              self.initMainData();
            };
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

  },


}
