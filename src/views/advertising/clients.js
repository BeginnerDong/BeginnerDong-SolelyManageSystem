export default {
  name: 'clients',
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
            placeholder:'请选择排序',
            defaultValue:0,
            changeFunc:function(val,self){
              if(val==0){
                self.order = {
                  'plan_time':'asc'
                };
                self.fields[2]['header_search']['defaultValue'] = [];
                self.$set(self.fields,2,self.fields[2]);
              }else if(val==1){
                self.order = {
                  'create_time':'desc'
                };
              }else if(val==2){
                self.order = {
                  'rate':'desc'
                };
              };

              if(val.length==0){
                  self.order = {
                    'plan_time':'asc'
                  };
              };
              self.initMainData(true);
            },
          }
        },
        {
          key: 'rate',
          label: '星级评定',
          application:['编辑','添加'],
          componentName:'rate',
          customSlot:'rate',
          listType:'normal',
        },
        {
          key: 'plan_time',
          label: '设定回访时间',
          application:['设置回访时间'],
          listType:'normal',
          customSlot:'plan_time',
          componentName:'sls-datetime',
          placeholder:'请选择回访时间',
          header_search:{
            componentName:'sls-date-time-range',
            style:'width:160px;margin-right:2px;',
            start_placeholder:'回访开始时间',
            end_placeholder:'回访结束时间',
            defaultValue:[],
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.plan_time;
              }else{
                self.searchItem.plan_time = ['between',value = value.map(function(e){return e/1000;})];
              };
              self.initMainData(true);
            },
          },
          width:200,
        },
        {
          key: 'description',
          label: '项目名称',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
          width:100,
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入项目名称',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.description = ['like','%'+val+'%'];
              }else{
                delete self.searchItem.description;
              };

              self.initMainData(true);
            },

          },
        },
        {
          key: 'name',
          label: '客户姓名',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',

          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入客户姓名',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.name = ['like','%'+val+'%'];
              }else{
                delete self.searchItem.name;
              };

              self.initMainData(true);
            },

          },
        },
        {
          key: 'phone',
          label: '客户手机号',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'type',
          label: '项目类型',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['小程序','app','网站','公众号','品牌设计','财务']
            return testArray[val.type-1];
          },
          componentName:'sls-select',
          optionsName:'typeOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择项目类型',
          width:80,
          header_search:{
            componentName:'sls-select',
            optionsName:'typeOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择项目类型',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.type = val;
              }else{
                delete self.searchItem.type;
              };
              self.initMainData(true);
            },
          }
        },

        {
          key: 'step',
          label: '跟进阶段',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['待联系','沟通中','已面访','已签单','已失效']
            return testArray[val.step-1];
          },
          componentName:'sls-select',
          optionsName:'stepOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择跟进阶段',
          width:80,
          header_search:{
            componentName:'sls-select',
            optionsName:'stepOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择跟进阶段',
            multiple:true,
            defaultValue:[1,2,3],
            changeFunc:function(val,self){
              if(val&&val.length>0&&val!='all'){
                self.searchItem.step = ['in',val];
              }else{
                delete self.searchItem.step;
              };
              self.initMainData(true);
            },
          }
        },
        {
          key: 'conversation_description',
          label: '沟通记录',
          application:['添加沟通记录'],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'address',
          label: '客户地区',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'origin',
          label: '客户来源',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['58','百度','猪八戒','转介绍','其他','58财务']
            return testArray[val.origin-1];
          },
          componentName:'sls-select',
          optionsName:'originOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择客户来源',
          width:60,
          header_search:{
            componentName:'sls-select',
            optionsName:'originOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择客户来源',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.origin = val;
              }else{
                delete self.searchItem.origin;
              };
              self.initMainData(true);
            },
          }
        },
        {

          key: 'user_no',
          label: '添加者',
          application:[],
          customSlot:'user_no',
          componentName:'sls-select',
          optionsName:'userOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'name',
            value: 'user_no',
          },
          placeholder:'请选择添加者',
          width:100,

        },
        {
          key: 'sales_manager',
          label: '客户经理',
          application:['编辑','添加'],
          customSlot:'sales_manager',
          componentName:'sls-select',
          optionsName:'userOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'name',
            value: 'user_no',
          },
          placeholder:'请选择客户经理',
          width:100,

          header_search:{
            componentName:'sls-select',
            optionsName:'userOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择客户经理',
            defaultValue:this.$store.getters.getUserinfo.primary_scope<60
            &&this.$store.getters.getUserinfo.info.behavior!=3
            ?this.$store.getters.getUserinfo.user_no:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.sales_manager = val;
              }else{
                delete self.searchItem.sales_manager;
              };
              self.initMainData(true);
            },
          }
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
          key: 'content',
          label: '详情',
          application:['编辑','添加'],
          componentName:'tinymce-editor',
          listType:'',
          dialogStyle:'width:100%;',
        },
        {
          key: 'pay_standard',
          label: '付款标准',
          application:['签单'],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'total_amount',
          label: '总金额',
          application:['签单'],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'period',
          label: '开发工期',
          application:['签单'],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'content',
          label: '配置详情',
          application:['签单'],
          componentName:'tinymce-editor',
          listType:'',
          dialogStyle:'width:100%;',
        },
        {
          key: 'file',
          label: '文件',
          application:['签单'],
          componentName:'upload',
          listType:'',
          limit:10,
        },
        {
          key: 'project_manager',
          label: '售后产品经理',
          application:['签单'],
          customSlot:'sales_manager',
          componentName:'sls-select',
          optionsName:'pUserOptions',
          listType:'',
          limit:10,
          defaultProps: {
            label: 'name',
            value: 'user_no',
          },
          placeholder:'请选择售后产品经理',
        },
        {
          key: 'plan',
          label: '运营计划',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入运营计划',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.plan =  ['like','%'+val+'%'];
              }else{
                delete self.searchItem.plan;
              };
              self.initMainData(true);
            },

          },
        },
        {
          key: 'cell',
          label: '运营单元',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入运营单元',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.cell = ['like','%'+val+'%'];
              }else{
                delete self.searchItem.cell;
              };
              self.initMainData(true);
            },
          },
        },
        {
          key: 'keywords',
          label: '运营关键词',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入运营关键词',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.keywords = ['like','%'+val+'%'];
              }else{
                delete self.searchItem.keywords;
              };
              self.initMainData(true);
            },
          },
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
          width:170,
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
                return "api_clientUpdate"
              },
              formData:function(self){
                return self.formData
              },
              postData:function(self){
                if(self.submitData.create_time){
                  self.submitData.create_time = self.submitData.create_time/1000;
                };
                var postData = {
                  searchItem:{
                    id:self.formData.id,
                    user_no:self.formData.user_no
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
            type:'info',
            icon:'edit',
            size:'mini',
            position:'list',
            text:function(data){
              return '设置回访时间'
            },
            isHide:function(data,self){

              if(data.plan_time&&data.Conversation.length>0&&data.plan_time>new Date(data.Conversation[0]['create_time']).getTime()){

                return true;
              }else{
                return false;
              };
            },
            func:{
              apiName:function(self){
                return "api_clientUpdate"
              },
              formData:function(self){
                return self.formData
              },
              postData:function(self){
                var postData={
                  searchItem:{
                    id:self.formData.id,
                    user_no:self.formData.user_no
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
                return "api_clientUpdate"
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
                return "api_clientAdd"
              },
              formData:function(self){
                var data = {
                  title:'',
                  description:'',
                  mainImg:[],
                  step:1,
                  sales_manager:self.$store.getters.getUserinfo.user_no
                };
                return data
              },
              postData:function(self){
                if(!self.submitData.sales_manager){
                  self.submitData.sales_manager = self.$store.getters.getUserinfo.user_no;
                };
                if(!self.submitData.step){
                  self.submitData.step = 1;
                };
                var postData={
                  data:self.submitData
                };
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
              return '签单'
            },
            func:{
              apiName:function(self){
                return "api_clientUpdate"
              },
              formData:function(self){
                var data = {
                  pay_standard:'',
                  total_amount:'',
                  period:'',
                  project_manager:'',
                  content:'',
                  file:[]
                };
                return data
              },
              postData:function(self){

                if(!self.submitData.project_manager){
                  return {
                    errMsg:'请选择售后经理'
                  };
                };
                self.submitData.name = self.originFormData.description;
                self.submitData.client = self.originFormData.name;
                self.submitData.client_no = self.originFormData.id;
                self.submitData.phone = self.originFormData.phone;
                self.submitData.user_no = self.originFormData.sales_manager;
                self.submitData.sales_manager = self.originFormData.sales_manager;
                self.submitData.user_type = self.originFormData.user_type;
                self.submitData.thirdapp_id = self.originFormData.thirdapp_id;

                var postData={
                  searchItem:{
                    id:self.originFormData.id,
                    user_no:self.originFormData.user_no
                  },
                  data:{step:4},
                  saveAfter:[
                    {
                      tableName:'Project',
                      FuncName:'add',
                      data:self.submitData
                    }
                  ]
                };

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
              return '添加沟通记录'
            },
            func:{
              apiName:function(self){
                return "api_conversationAdd"
              },
              formData:function(self){
                var data = {
                  conversation_description:'',
                  client_id:self.formData.id
                };
                return data
              },
              postData:function(self){
                console.log('self.formData',self.formData)
                self.submitData.client_id = self.formData.client_id;
                self.submitData.description = self.submitData.conversation_description;
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
        step:['in',[1,2,3]]
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
        orderOptions:[{
          text: '回访时间asc',
          value: 0
        }, {
          text: '创建时间desc',
          value: 1
        }, {
          text: '星级desc',
          value: 2
        }],
        userOptions:[],
        salesOptions:[],
        pUserOptions:[]

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
      order:{
        'plan_time':'asc'
      },
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


    open(){
      const self =this;
      if(self.headerStyle=='height:100%'){
        self.headerStyle = 'height:15%';
      }else{
        self.headerStyle = 'height:100%';
      };
    },

    /**
     * 初始化
     */
    init () {
      this.initMainData();
      this.initUserData();
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
          user_type: 1,
        };
      };
      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };
      var res =  await self.$$api_userInfoGet({data: postData});
      var sales = [];
      for(var i=0;i<res.info.data.length;i++){
        if(res.info.data[i]['behavior']==3){
          self.optionData.pUserOptions.push(res.info.data[i]);
        }else if(res.info.data[i]['behavior']==2||res.info.data[i]['id']==641){
          sales.push(res.info.data[i]);
        };
      };
      if(!postData.searchItem.sales_manager&&self.$store.getters.getUserinfo.primary_scope<60&&self.$store.getters.getUserinfo.info.behavior!=3){
        self.optionData.userOptions = [
          {
            user_no:this.$store.getters.getUserinfo.user_no,
            name:this.$store.getters.getUserinfo.info.name
          },
          {
            user_no:'public',
            name:'公共客户'
          },
        ];
      }else{
        self.optionData.userOptions = sales;
        self.optionData.userOptions.push({
            user_no:'public',
            name:'公共客户'
          });
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
        self.paginate = {
          count: 0,
          currentPage: 1,
          pagesize:10,
          is_page:true,
          page_sizes: [10, 30, 60, 90],
          layout: 'total, sizes, prev, pager, next, jumper',
        };

      };
      postData.paginate = self.$$cloneForm(self.paginate);
      postData.token = self.$store.getters.getToken;
      if (self.searchItem) {
        postData.searchItem = self.$$cloneForm(self.searchItem)
      };

      postData.order = self.$$cloneForm(self.order);
      if(!postData.searchItem.sales_manager&&self.$store.getters.getUserinfo.primary_scope<60&&self.$store.getters.getUserinfo.info.behavior!=3){
        postData.searchItem.sales_manager = self.$store.getters.getUserinfo.user_no;
      };
      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };

      postData.getAfter = {
        User: {
          condition: "=",
          info: ["login_name"],
          key: "user_no",
          middleKey: "user_no",
          searchItem: {status: 1},
          tableName: "User",
        },
        UserSales:{
          condition: "=",
          info: ["name", "user_no"],
          key: "user_no",
          middleKey: "sales_manager",
          searchItem: {status: 1},
          tableName: "UserInfo"
        },
        Conversation:{
          condition: "=",
          key: "client_id",
          middleKey: "id",
          searchItem: {status: 1},
          tableName: "Conversation"
        },

      };
      var res =  await self.$$api_clientGet({data: postData});
      self.mainData = res.info.data;
      for(var i=0;i<self.mainData.length;i++){
        self.mainData[i]['coordinate'] = {
          latitude:self.mainData[i]['latitude'],
          longtitude:self.mainData[i]['longtitude'],
        };
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
      console.log('val',val)
      self.formData = val[1];
      self.originFormData = val[1];
      self.btnName = val[0];
      self.formData = val[2].func.formData?self.$$cloneForm(val[2].func.formData(self)):{};

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
