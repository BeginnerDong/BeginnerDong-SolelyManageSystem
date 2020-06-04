export default {
  name: 'project',
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
        expand:true,
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
          key: 'order',
          label: '排序',
          application:[],
          formatter:function(val,tests){
            var testArray = ['未完','完整']
            return testArray[val.order];
          },
          componentName:'sls-select',
          optionsName:'orderOptions',
          listType:'',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          isHide:function(self){
            if(self.dialog&&self.$store.getters.getUserinfo.primary_scope<60){
              return true;
            }else{
              return false;
            }
          },
          placeholder:'请选择排序',
          width:50,
          header_search:{
            componentName:'sls-select',
            optionsName:'orderOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'默认更新时间desc',
            changeFunc:function(val,self){


              if(val==0){
                self.searchItem.end_time = ['between',[(new Date()).getTime(),(new Date()).getTime()+86400000*4]];
                self.order = {
                  'end_time':'asc'
                };
                self.fields[14]['header_search']['defaultValue'] = [];
                self.$set(self.fields,14,self.fields[14]);
              }else if(val==1){
                self.searchItem.domain_name_time = ['between',[(new Date()).getTime(),(new Date()).getTime()+86400000*4]];
                self.order = {
                  'domain_name_time':'asc'
                };
                self.fields[16]['header_search']['defaultValue'] = [];
                self.$set(self.fields,16,self.fields[16]);

              }else if(val==2){
                self.searchItem.server_time = ['between',[(new Date()).getTime(),(new Date()).getTime()+86400000*10]];
                self.order = {
                  'server_time':'asc'
                };
                self.fields[15]['header_search']['defaultValue'] = [];
                self.$set(self.fields,15,self.fields[15]);
              }else if(val==3){

                delete self.searchItem.end_time;
                delete self.searchItem.domain_name_time;
                delete self.searchItem.server_time;
                self.order = {
                  'create_time':'desc'
                };
              };

              if(val.length==0){
                  delete self.searchItem.end_time;
                  delete self.searchItem.domain_name_time;
                  delete self.searchItem.server_time;
                  self.order = {
                    'update_time':'desc'
                  };
              };
              self.initMainData(true);
            },
          }
        },

        {
          key: 'name',
          label: '项目名称',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入项目名称',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.name = ['like','%'+val+'%'];
              }else{
                delete self.searchItem.name;
              };
              self.initMainData();
            },
          },
          width:120,
        },
        {
          key: 'project_no',
          label: '项目名称',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入project_no',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.project_no = val;
              }else{
                delete self.searchItem.project_no;
              };
              self.initMainData();
            },
          },
          width:120,
        },

        {
          key: 'is_prepared',
          label: '配置完整',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['未完','完整']
            return testArray[val.is_prepared];
          },
          componentName:'sls-select',
          optionsName:'is_preparedOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          isHide:function(self){
            if(self.dialog&&self.$store.getters.getUserinfo.primary_scope<60){
              return true;
            }else{
              return false;
            }
          },
          placeholder:'请选择配置完整',
          width:50,
          header_search:{
            componentName:'sls-select',
            optionsName:'is_preparedOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择配置完整',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.is_prepared = val;
              }else{
                delete self.searchItem.is_prepared;
              };
              self.initMainData(true);
            },
          }
        },
        {
          key: 'sign_status',
          label: '项目阶段',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['立项','开发','交付测试','已交接','已完结','烂尾']
            return testArray[val.sign_status];
          },
          componentName:'sls-select',
          optionsName:'sign_statusOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          isHide:function(self){
            if(self.dialog&&self.$store.getters.getUserinfo.primary_scope<60){
              return true;
            }else{
              return false;
            }
          },
          placeholder:'请选择项目阶段',
          width:100,
          header_search:{
            componentName:'sls-select',
            optionsName:'sign_statusOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择项目阶段',
            multiple:true,
            defaultValue:[0,1,2,3],
            changeFunc:function(val,self){
              if(val&&val.length>0){
                self.searchItem.sign_status = ['in',val];
              }else{
                delete self.searchItem.sign_status;
              };
              self.initMainData(true);
            },
          }
        },
        {
          key: 'project_status',
          label: '项目状态备注',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',

        },
        {
          key: 'pay_standard',
          label: '付款标准',
          application:['编辑','添加'],
          componentName:'sls-textarea',
          listType:'normal',
          customSlot:'pay_standard',
        },
        {
          key: 'bad_amount',
          label: '坏账金额',
          application:['编辑'],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'total_amount',
          label: '总金额',
          application:['编辑'],
          componentName:'sls-input',
          listType:'',
          isHide:function(self){
            if(self.dialog&&self.$store.getters.getUserinfo.primary_scope<60){
              return true;
            }else{
              return false;
            }
          },
        },
        {
          key: 'content',
          label: '配置详情',
          application:['编辑','添加'],
          componentName:'tinymce-editor',
          listType:'',
          dialogStyle:'width:100%;',
        },

        {
          key: 'period',
          label: '项目工期',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'phone',
          label: '联系方式',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'start_time',
          label: '开发开始时间',
          application:['编辑','添加'],
          customSlot:'start_time',
          listType:'normal',
          componentName:'sls-datetime',
          placeholder:'请选择开发时间',
          dialog:{
            dateType:'date'
          },
          header_search:{
            componentName:'sls-date-time-range',
            style:'width:160px;margin-right:2px;',
            start_placeholder:'开发开始时间',
            end_placeholder:'开发结束时间',
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.start_time;
              }else{
                self.searchItem.start_time = ['between',value = value.map(function(e){return e/1000;})];
              };
              self.initMainData(true);
            },
          },
          width:200,
        },
        {
          key: 'sales_manager',
          label: '客户经理',
          application:['编辑','添加'],
          componentName:'sls-select',
          optionsName:'userOptions',
          listType:'',
          limit:10,
          defaultProps: {
            label: 'name',
            value: 'user_no',
          },
          placeholder:'请选择客户经理',
          width:100,
          isHide:function(self){
            if(self.dialog&&self.$store.getters.getUserinfo.primary_scope<60){
              return true;
            }else{
              return false;
            }
          },
          header_search:{
            componentName:'sls-select',
            optionsName:'userOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择客户经理',
            changeFunc:function(val,self){
              if(val){
                if(val=='test'){
                  self.searchItem.sales_manager = '';
                }else{
                  self.searchItem.sales_manager = val;
                };

              }else{
                delete self.searchItem.sales_manager;
              };
              self.initMainData(true);
            },
            isHide:function(self){

              if(self.$store.getters.getUserinfo.primary_scope>=60||self.$store.getters.getUserinfo.behavior==3){
                return false;
              }else{
                return true;
              }
            },
          }
        },
        {
          key: 'project_manager',
          label: '项目经理',
          application:['编辑','添加'],
          customSlot:'project_manager',
          componentName:'sls-select',
          optionsName:'userOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'name',
            value: 'user_no',
          },
          placeholder:'请选择项目经理',
          width:150,
          isHide:function(self){
            if(self.dialog&&self.$store.getters.getUserinfo.primary_scope<60){
              return true;
            }else{
              return false;
            }
          },
          header_search:{
            componentName:'sls-select',
            optionsName:'userOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择项目经理',
            changeFunc:function(val,self){
              if(val){
                if(val=='test'){
                  self.searchItem.project_manager = '';
                }else{
                  self.searchItem.project_manager = val;
                };

              }else{
                delete self.searchItem.project_manager;
              };
              self.initMainData(true);
            },
            isHide:function(self){

              if(self.$store.getters.getUserinfo.primary_scope>=60||self.$store.getters.getUserinfo.behavior==3){
                return false;
              }else{
                return true;
              }
            },
          }
        },

        {
          key: 'end_time',
          label: '开发截止时间',
          application:['编辑','添加'],
          listType:'',
          componentName:'sls-datetime',
          dialog:{
            dateType:'date'
          },
          placeholder:'请选择开发截止时间',
          header_search:{
            componentName:'sls-date-time-range',
            style:'width:160px;margin-right:2px;',
            start_placeholder:'开发截止开始时间',
            end_placeholder:'开发截止结束时间',
            defaultValue:[],
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.end_time;
              }else{
                self.searchItem.end_time = ['between',value = value.map(function(e){return e/1000;})];
              };
              self.initMainData(true);
            },
          },
          width:200,
        },
        {
          key: 'server_time',
          label: '配置到期时间',
          application:['编辑','添加'],
          customSlot:'server_time',
          listType:'',
          componentName:'sls-datetime',
          placeholder:'请选择服务器到期时间',
          header_search:{
            componentName:'sls-date-time-range',
            style:'width:160px;margin-right:2px;',
            start_placeholder:'服务器到期开始时间',
            end_placeholder:'服务器到期结束时间',
            defaultValue:[],
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.server_time;
              }else{
                self.searchItem.server_time = ['between',value = value.map(function(e){return e/1000;})];
              };
              self.initMainData(true);
            },
          },
          width:200,
        },

        {
          key: 'create_time',
          label: '创建时间',
          application:['编辑','添加'],
          listType:'normal',
          componentName:'sls-datetime',
          placeholder:'请选择创建时间',
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
          width:170,
        },
        {
          key: 'mainImg',
          label: '图片',
          application:['编辑','添加'],
          componentName:'upload',
          listType:'',
          limit:10,
        },
        {
          key: 'file',
          label: '文件',
          application:['编辑','添加'],
          componentName:'upload',
          listType:'',
          limit:10,
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
                return "api_projectUpdate"
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
                return "api_projectUpdate"
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
                return "api_projectAdd"
              },
              formData:function(self){
                var data = {

                  total_num:'',
                  valid_num:'',
                  invalid_num:'',
                  plan:'',
                  cell:'',
                  orgin:1

                };
                return data
              },
              postData:function(self){
                self.submitData.type = 1;
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
        sign_status:['in',[0,1,2,3]]
      },
      optionData:{
        labelOptions:[],
        typeOptions:[{
          text: '小程序',
          value: 1
        }, {
          text: 'app',
          value: 2
        }, {
          text: '网站',
          value: 3
        }, {
          text: '公众号',
          value: 4
        }, {
          text: '品牌设计',
          value: 5
        }, {
          text: '财务',
          value: 6
        }],
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
        stepOptions:[{
          text: '待联系',
          value: 1
        }, {
          text: '沟通中',
          value: 2
        }, {
          text: '已面访',
          value: 3
        }, {
          text: '已签单',
          value: 4
        }, {
          text: '已失效',
          value: 5
        }],
        statusOptions:[{
          text: '启用',
          value: 1
        }, {
          text: '禁用',
          value: -1
        }],
        is_preparedOptions:[{
          text: '未完',
          value:0
        }, {
          text: '完整',
          value:1
        }],
        orderOptions:[{
          text: '开发截止asc',
          value: 0
        }, {
          text: '配置准备预警',
          value: 1
        },{
          text: '服务器到期预警',
          value: 2
        },{
          text: '创建时间desc',
          value: 3
        }],
        originOptions:[{
          text: '58',
          value: 1
        }, {
          text: '百度',
          value: 2
        }, {
          text: '猪八戒',
          value: 3
        }, {
          text: '转介绍',
          value: 4
        }, {
          text: '其他',
          value: 5
        }, {
          text: '58财务',
          value: 6
        }],
        userOptions:[],
        salesOptions:[],

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
      selectionArray:[],
      header_str:'',
	  headerStyle:'height:15%'

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
      this.initUserData();
    },


    open(){
      const self =this;
      if(self.headerStyle=='height:100%'){
        self.headerStyle = 'height:15%';
      }else{
        self.headerStyle = 'height:100%';
      };
    },





    /**
     *
     */
    async initUserData (isNew) {

      const self = this;
      const postData  = {};

      postData.token = self.$store.getters.getToken;
      if (self.searchItem) {
        postData.searchItem = {
          behavior:["in", [2, 3]],
          user_type: 1
        }
      };
      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };

      postData.getAfter = {
        end: {
          condition: "=",
          key: "status",
          compute:{
            'total':['count','status',{
              status: 1,
              end_time : ['between',[(new Date()).getTime(),(new Date()).getTime()+86400000*4]],
              thirdapp_id:22
            }],
          },
          info: ["id"],
          middleKey: "status",
          searchItem: {
            status: 1,
            end_time : ['between',[(new Date()).getTime(),(new Date()).getTime()+86400000*4]],
            thirdapp_id:22
          },
          tableName: "Project",
        },
        domain: {
          condition: "=",
          key: "status",
          compute:{
            'total':['count','status',{
              status: 1,
              domain_name_time : ['between',[(new Date()).getTime(),(new Date()).getTime()+86400000*4]],
              thirdapp_id:22
            }],
          },
          info: ["id"],
          middleKey: "status",
          searchItem: {
            status: 1,
            domain_name_time : ['between',[(new Date()).getTime(),(new Date()).getTime()+86400000*4]],
            thirdapp_id:22
          },
          tableName: "Project",
        },
        server: {
          condition: "=",
          key: "status",
          compute:{
            'total':['count','status',{
              status: 1,
              server_time :['between',[(new Date()).getTime(),(new Date()).getTime()+86400000*10]],
              thirdapp_id:22
            }],
          },
          info: ["id"],
          middleKey: "status",
          searchItem: {
            status: 1,
            server_time :['between',[(new Date()).getTime(),(new Date()).getTime()+86400000*10]],
            thirdapp_id:22
          },
          tableName: "Project",
        },
      };

      var res =  await self.$$api_userInfoGet({data: postData});
      if(res.info.data[0]['end']['total']){
        self.header_str += '共有'+res.info.data[0]['end']['total']+'个项目开发截止预警;';
      };
      if(res.info.data[0]['domain']['total']){
        self.header_str += '共有'+res.info.data[0]['domain']['total']+'个项目配置准备预警;';
      };
      if(res.info.data[0]['server']['total']){
        self.header_str += '共有'+res.info.data[0]['server']['total']+'个项目服务器到期预警;';
      };
      self.optionData.userOptions = res.info.data;
      self.optionData.userOptions.push({
        name:'公共客户',
        user_no:'test'
      })

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
      if(JSON.stringify(self.order)=='{}'){
        postData.order = {
          'update_time':'desc'
        };
      }else{
        postData.order = self.order;
      };

      postData.getAfter = {
        UserProject: {
          condition: "=",
          key: "user_no",
          info: ["name", "user_no"],
          middleKey: "project_manager",
          searchItem: {status: 1},
          tableName: "UserInfo",
        },
        UserSales:{
          condition: "=",
          key: "user_no",
          info: ["name", "user_no"],
          middleKey: "sales_manager",
          searchItem: {status: 1},
          tableName: "UserInfo"
        },
        Payment:{
          compute: {payment: ["sum", "money", {confirm: 0}]},
          condition: "=",
          key: "project_no",
          middleKey: "project_no",
          searchItem: {confirm: 0},
          tableName: "Payment",
        },
        Client:{
          condition: "=",
          key: "id",
          middleKey: "client_no",
          info: ["origin", "plan"],
          searchItem: {status: 1},
          tableName: "Client"
        }
      };

      var res =  await self.$$api_projectGet({data: postData});
      self.mainData = res.info.data;
      for(var i=0;i<self.mainData.length;i++){
        var mainImgList = [];
        for(var j=0;j<self.mainData[i]['mainImg'].length;j++){
          mainImgList.push(self.mainData[i]['mainImg'][j].url)
        };
        self.mainData[i].mainImgList = mainImgList;
      };
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

      console.log('submitData',self.submitData);


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

          return;
        };
        console.log('postData',postData)

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
