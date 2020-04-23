export default {
  name: 'projectNews',
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
          key: 'create_time',
          label: '创建时间',
          listType:'normal',
          application:[],
          width:100
        },
        {
          key: 'name',
          label: '标题',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'project_title',
          label: '项目名称',
          customSlot:'project_title',
          application:[],
          componentName:'sls-input',
          listType:'normal',
          width:100
        },


        {
          key: 'develop_type',
          label: '开发类型',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['cms','api','program','web','design','other']
            return testArray[val.develop_type-1];
          },
          componentName:'sls-select',
          optionsName:'develop_typeOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择开发类型',
          width:100,
          header_search:{
            componentName:'sls-select',
            optionsName:'develop_typeOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择开发类型',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.	develop_type = val;
              }else{
                delete self.searchItem.	develop_type;
              };
              self.initMainData(true);
            },
            isHide:function(self){

              if(self.$store.getters.getUserinfo.primary_scope<60&&self.$store.getters.getUserinfo.info.behavior!=3){
                console.log(true)
                return true;
              }else{
                return false;
              }
            },
          }
        },
        {
          key: 'function_type',
          label: '功能类型',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['功能变更','功能修复','样式变更','样式修复','动态','开发任务']
            return testArray[val.function_type-1];
          },
          componentName:'sls-select',
          optionsName:'function_typeOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择功能类型',
          width:100,
          header_search:{
            componentName:'sls-select',
            optionsName:'function_typeOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择功能类型',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.	function_type = val;
              }else{
                delete self.searchItem.	function_type;
              };
              self.initMainData(true);
            },
          }
        },
        {
          key: 'step',
          label: '阶段',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['普通','待客户确认','客户确认','待开发','开发完成','待开发确认'];
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
          placeholder:'请选择阶段',
          width:100,
          header_search:{
            componentName:'sls-select',
            optionsName:'stepOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择阶段',
            multiple:true,
            defaultValue:[1,2,3,4],
            changeFunc:function(val,self){
              if(val&&val.length>0){
                self.searchItem.step = ['in',val];
              }else{
                delete self.searchItem.step;
              };
              self.initMainData(true);
            },

          }
        },
        {
          key: 'estimated_time',
          label: '预计完成时间',
          application:['编辑','添加'],
          customSlot:'estimated_time',
          listType:'normal',
          componentName:'sls-datetime',
          placeholder:'请选择预计完成时间',
          header_search:{
            componentName:'sls-date-time-range',
            style:'width:160px;margin-right:2px;',
            start_placeholder:'预计完成时间开始时间',
            end_placeholder:'预计完成时间结束时间',
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.estimated_time;
              }else{
                self.searchItem.estimated_time = ['between',value = value.map(function(e){return e/1000;})];
              };
              self.initMainData(true);
            },
          },
          width:150,
        },

        {
          key: 'start_time',
          label: '开发开始时间',
          customSlot:'start_time',
          application:['编辑','添加','开发'],
          listType:'normal',
          componentName:'sls-datetime',
          placeholder:'请选择开发时间',
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
          width:180,
        },
        {
          key: 'end_time',
          label: '开发截止时间',
          application:['编辑','添加','开发'],
          listType:'',
          componentName:'sls-datetime',
          placeholder:'请选择开发截止时间',
          header_search:{
            componentName:'sls-date-time-range',
            style:'width:160px;margin-right:2px;',
            start_placeholder:'开发截止开始时间',
            end_placeholder:'开发截止结束时间',
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.end_time;
              }else{
                self.searchItem.end_time = ['between',value = value.map(function(e){return e/1000;})];
              };
              self.initMainData(true);
            },
          },
          width:150,
        },
        {
          key: 'process_type',
          label: '反馈类型',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['内部反馈','外部反馈']
            return testArray[val.process_type-1];
          },
          componentName:'sls-select',
          optionsName:'process_typeOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择反馈类型',
          width:100,
          header_search:{
            componentName:'sls-select',
            optionsName:'process_typeOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择反馈类型',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.process_type = val;
              }else{
                delete self.searchItem.process_type;
              };
              self.initMainData(true);
            },
          }
        },

        {
          key: 'content',
          label: '详情',
          application:['编辑','添加','补充','开发'],
          componentName:'tinymce-editor',
          listType:'',
          dialogStyle:'width:100%;',

        },

        {
          key: 'description',
          label: '描述',
          application:['编辑','添加','补充','开发'],
          componentName:'sls-textarea',
          listType:'',
        },
        {
          key: 'mainImg',
          label: '图片',
          application:['编辑','添加','补充','开发'],
          componentName:'upload',
          listType:'',
          limit:10,
        },
        {
          key: 'file',
          label: '文件',
          application:['编辑','添加','补充','开发'],
          componentName:'upload',
          listType:'',
          limit:10,
        },

        {
          key: 'user_no',
          label: '发布者',
          application:['编辑','添加'],
          customSlot:'user_no',
          componentName:'sls-select',
          optionsName:'userOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'name',
            value: 'user_no',
          },
          placeholder:'请选择发布者',
          width:100,
          isHide:function(self){
            if(self.dialog&&self.$store.getters.getUserinfo.primary_scope!=90){
              return true;
            }else{
              return false;
            }
          },
          header_search:{
            componentName:'sls-select',
            optionsName:'userOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择发布者',
            changeFunc:function(val,self){
              if(val){
                if(val=='test'){
                  self.searchItem.user_no = '';
                }else{
                  self.searchItem.user_no = val;
                };

              }else{
                delete self.searchItem.user_no;
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
                return "api_processUpdate"
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
            type:'info',
            icon:'edit',
            size:'mini',
            position:'list',
            text:function(data){
              return '补充'
            },
            func:{
              apiName:function(self){
                return "api_processUpdate"
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
            type:'info',
            icon:'edit',
            size:'mini',
            position:'list',
            text:function(data){
              return '开发'
            },
            func:{
              apiName:function(self){
                return "api_processUpdate"
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
                return "api_processUpdate"
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
                return "api_processAdd"
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
        step:['in',[1,2,3,4]]
      },
      optionData:{
        labelOptions:[],
        stepOptions:[{
          text: '普通',
          value: 1
        }, {
          text: '待客户确认',
          value: 2
        }, {
          text: '客户确认',
          value: 3
        }, {
          text: '待开发',
          value: 4
        }, {
          text: '开发完成',
          value: 5
        }, {
          text: '待开发确认',
          value: 6
        },{
          text: '完结',
          value: 7
        }],
        function_typeOptions:[{
          text: '功能变更',
          value: 1
        },{
          text: '功能修复',
          value: 2
        },{
          text: '样式变更',
          value: 3
        },{
          text: '样式修复',
          value: 4
        },{
          text: '动态',
          value: 5
        },{
          text: '开发任务',
          value: 6
        },],
        develop_typeOptions:[{
          text: 'cms',
          value: 1
        },{
          text: 'api',
          value: 2
        },{
          text: 'program',
          value: 3
        },{
          text: 'web',
          value: 4
        },{
          text: 'design',
          value: 5
        },{
          text: 'other',
          value: 6
        },],
        process_typeOptions:[{
          text: '内部反馈',
          value: 1
        }, {
          text: '外部反馈',
          value: 2
        }],

        statusOptions:[{
          text: '启用',
          value: 1
        }, {
          text: '禁用',
          value: -1
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
      var res =  await self.$$api_userInfoGet({data: postData});
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
      if(self.$store.getters.getUserinfo.info.passage1=='UI'){
        postData.searchItem.develop_type = 5;
        postData.searchItem.estimated_time = ['neq',0];
      };
      if(self.$store.getters.getUserinfo.info.passage1=='web前端开发'){
        postData.searchItem.develop_type = 4;
        postData.searchItem.estimated_time = ['neq',0];
      };
      if(self.$store.getters.getUserinfo.info.passage1=='前端工程师'){
        postData.searchItem.develop_type = 3;
        postData.searchItem.estimated_time = ['neq',0];
      };



      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };
      postData.order = {
        'create_time':'desc'
      };
      postData.getAfter = {
        UserInfo: {
          condition: "=",
          key: "user_no",
          info: ["name", "user_no"],
          middleKey: "user_no",
          searchItem: {status: 1},
          tableName: "UserInfo",
        },
        Project: {
          condition: "=",
          key: "project_no",
          info: ["name"],
          middleKey: "project_no",
          searchItem: {status: 1},
          tableName: "Project",
        },
      };

      var res =  await self.$$api_processGet({data: postData});
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

      console.log('dialog_fieldChange',Object);
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
