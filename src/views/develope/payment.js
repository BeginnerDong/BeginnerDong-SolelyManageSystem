export default {
  name: 'payment',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,

      table_arguments:{
        height:'70%',
        row_key:'id',
        tree_props:{
          children: 'child',
          child: 'child',
          hasChildren:'child'
        },
        default_expand_all:false,
        expand:false,
        selection:true,
        cell_style:{},
        loading:true
      },
      fields: [
        {
          key: 'id',
          label: 'ID',
          application:[],
          componentName:'sls-input',
          listType:'normal',
          width:50
        },
        {
          key: 'project_no',
          label: 'project_no',
          application:['添加','编辑'],
          componentName:'sls-input',
          listType:'',
          dialog:{
            suggest:true,
            querySearch:function(val,self){
              if(val){
                var postData = {
                  searchItem:{
                    name:['like','%'+val+'%'],
                    status:1
                  }
                }
              };
              var res = self.initProjectData(postData);
              return res;
            },
          },
          header_search:{
            componentName:'sls-input',
            placeholder:'请输入项目名称',
            suggest:true,
            querySearch:function(val,self){
              console.log('querySearch')
              if(val){
                var postData = {
                  searchItem:{
                    name:['like','%'+val+'%'],
                    status:1
                  }
                };
                var res = self.initProjectData(postData);
                return res;
              }else{
                delete self.searchItem.project_no;
                self.initMainData(true);
              }


            },
            changeFunc:function(val,self){
              if(val){
                self.searchItem.project_no = val;
              }else{
                delete self.searchItem.project_no;
              };
              self.initMainData(true);
            },
          }
        },

        {
          key: 'project_no_two',
          label: 'project_no',
          application:[],
          componentName:'sls-input',
          listType:'',

          header_search:{
            componentName:'sls-input',
            placeholder:'请输入project_no',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.project_no = val;
              }else{
                delete self.searchItem.project_no;
              };
              self.initMainData(true);
            },
          }
        },

        {
          key: 'Project',
          label: '项目信息',
          application:[],
          customSlot:'Project',
          componentName:'sls-input',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'name',
            value: 'user_no',
          },
          placeholder:'请输入项目名称',
          width:200,
          isHide:function(self){
            if(self.dialog&&self.$store.getters.getUserinfo.primary_scope!=90){
              return true;
            }else{
              return false;
            }
          },
          header_search:{
            componentName:'sls-input',

            style:'width:160px;margin-right:2px;',
            placeholder:'请选择客户经理',
            changeFunc:function(val,self){
              if(val){
                if(val=='test'){
                  self.searchItem.project_no = '';
                }else{
                  self.searchItem.project_no = val;
                };

              }else{
                delete self.searchItem.project_no;
              };
              self.initMainData(true);
            },
            isHide:function(self){

              if(self.$store.getters.getUserinfo.primary_scope==90||self.$store.getters.getUserinfo.behavior==3){
                return false;
              }else{
                return true;
              }
            },
          }
        },

        {
          key: 'description',
          label: '描述',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },



        {
          key: 'money',
          label: '金额',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'channel',
          label: '支付渠道',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },

        {
          key: 'sign_status',
          label: '项目阶段',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['立项','开发','交付测试','已交接','已完结','烂尾']
            return testArray[val.	sign_status];
          },
          componentName:'sls-select',
          optionsName:'sign_statusOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择项目阶段',
          width:100,
          header_search:{
            componentName:'sls-select',
            optionsName:'sign_statusOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择项目阶段',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.sign_status = val;
              }else{
                delete self.searchItem.sign_status;
              };
              self.initMainData(true);
            },
          }

        },

        {
          key: "confirm",
          label: '是否确认',
          application:['编辑'],
          listType:'normal',
          customSlot:'confirm',
          componentName:'sls-select',
          optionsName:'confirmOptions',
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          header_search:{
            componentName:'sls-select',
            optionsName:'confirmOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择确认阶段',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.confirm = val;
              }else{
                delete self.searchItem.confirm;
              };
              self.initMainData(true);
            },
          }

        },

        {
          key: 'create_time',
          label: '创建时间',
          application:['编辑'],
          listType:'normal',
          componentName:'sls-datetime',
          placeholder:'请选择创建时间',
          isHide:function(self){
            if(self.dialog&&self.$store.getters.getUserinfo.primary_scope<60){
              return true;
            }else{
              return false;
            }
          },
          header_search:{
            componentName:'sls-date-time-range',
            style:'width:160px;margin-right:2px;',
            start_placeholder:'创建开始时间',
            end_placeholder:'创建结束时间',
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.create_time;
              }else{
                self.searchItem.create_time = ['between',value = value.map(function(e){return e/1000;})];
              };
              self.initMainData(true);
            },
          },
          width:200,
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
              return '编辑'
            },
            func:{
              apiName:function(self){
                return "api_paymentUpdate"
              },
              formData:function(self){
                return self.formData
              },
              postData:function(self){
                if(self.submitData.create_time){
                  self.submitData.create_time = self.submitData.create_time/1000;
                };
                var postData={
                  searchItem:{
                    id:self.formData.id,
                    user_type:1
                  },
                  data:self.submitData
                };
                if(self.submitData.parentid&&self.submitData.parentid==self.formData.id){
                  self.$$notify('父级ID和子级ID重叠','fail');
                  return false;
                }else{
                  return postData;
                };

              }
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
                return "api_paymentUpdate"
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
              return '添加'
            },
            func:{
              apiName:function(self){
                return "api_paymentAdd"
              },
              formData:function(self){
                var data = {
                  description:'',
                  project_no:'',
                  money:'',
                };
                return data
              },
              postData:function(self){
                self.submitData.type = 0;
                self.submitData.confirm = 1;
                if(!self.submitData.channel){
                  return {
                    errMsg:'请输入支付渠道'
                  };
                };
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
        user_type:1,
        type:0
      },
      optionData:{
        labelOptions:[],
        confirmOptions:[{
          text: '未确认',
          value: 1
        }, {
          text: '已确认',
          value: 0
        }],
        userOptions:[],
        salesOptions:[],
        sign_statusOptions:[{
          text: '立项',
          value: 0
        }, {
          text: '开发',
          value: 1
        }, {
          text: '交付测试',
          value: 2
        }, {
          text: '已交接',
          value: 3
        }, {
          text: '已完结',
          value: 4
        },{
          text: '烂尾',
          value: 5
        }],

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

      this.initMainData();
    },

    async initProjectData (postData) {

      const self = this;
      postData.token = self.$store.getters.getToken;
      var res =  await self.$$api_projectGet({data: postData});

      if(res.info.data.length>0){
        for(var i=0;i<res.info.data.length;i++){
          res.info.data[i]['value'] = res.info.data[i]['name'];
        };
        return res.info.data;
      }else{
        return [{ "value": "无", "project_no": "" }];
      };

    },




    /**
     * 列表主函数
     */
    async initMainData (isNew) {

      const self = this;
      self.table_arguments.loading = true;
      const postData  = {};
      if(isNew){
        self.paginate.currentPage = 1;
      };
      postData.paginate = self.$$cloneForm(self.paginate);
      postData.token = self.$store.getters.getToken;
      if (self.searchItem) {
        postData.searchItem = self.$$cloneForm(self.searchItem)
      };
      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };
      postData.order = {
        'create_time':'desc'
      };
      postData.getAfter = {
        Project: {
          tableName: "Project",
          middleKey: "project_no",
          key: "project_no",
          condition: "=",
          searchItem: {status: 1},
          info: ["name", "total_amount"],
        },
        UserInfo:{
          tableName: "UserInfo",
          middleKey: "user_no",
          key: "user_no",
          condition: "=",
          searchItem: {status: 1},
          info: ["name"],
        }
      };

      var res =  await self.$$api_paymentGet({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;
      self.table_arguments.loading = false;
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
      if(Object.func){
        var res = await Object.func(Object.value,self);
        if(Object.callbak){
          Object.callbak(res);
        };
      }else{
        Object.field.header_search['changeFunc'](Object.value,self);
      };
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
      console.log('Object',Object);
      if(Object.field.key=='coordinate'){
        self.formData['latitude'] = Object.value.lat;
        self.formData['longtitude'] = Object.value.lng;
        self.submitData['latitude'] = Object.value.lat;
        self.submitData['longtitude'] = Object.value.lng;
      }else{
        self.formData[Object.field.key] = Object.value;
        self.submitData[Object.field.key] = Object.value;
      };

      if(Object.func){
        var res = await Object.func(Object.value,self);
        if(Object.callbak){
          Object.callbak(res);
        };

      };


    },

    async submit(){
      const self = this;

      this.$confirm('是否确定此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
      	var postData = self.$$cloneForm(self.btnNow.func.postData(self));
        if(!postData||postData.errMsg){
          self.$message({
            type: 'info',
            message: '操作失败'+','+postData.errMsg
          });
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
          message: '操作失败'
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
