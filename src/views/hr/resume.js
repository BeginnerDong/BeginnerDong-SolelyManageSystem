export default {
  name: 'resume',
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
        cell_style:{}
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
          key: 'title',
          label: '姓名',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入姓名',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.title = val;
              }else{
                delete self.searchItem.title;
              };
              self.initMainData();
            },
            isHide:function(self){

              if(self.$store.getters.getUserinfo.primary_scope==90||self.$store.getters.getUserinfo.behavior==3){
                return false;
              }else{
                return true;
              }
            },
          },
        },

        {
          key: 'gender',
          label: '性别',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['男','女']
            return testArray[val.gender-1];
          },
          componentName:'sls-select',
          optionsName:'genderOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择性别',
          width:100,
          header_search:{
            componentName:'sls-select',
            optionsName:'genderOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择性别',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.	gender = val;
              }else{
                delete self.searchItem.	gender;
              };
              self.initMainData(true);
            },
          }
        },


        {
          key: 'relation_id',
          label: '应聘职位ID',
          application:['添加','编辑'],
          componentName:'sls-input',
          customSlot:'relation_id',
          listType:'normal',
          dialog:{
            suggest:true,
            valueKey:'id',
            querySearch:function(val,self){
              if(val){
                var postData = {
                  searchItem:{
                    title:['like','%'+val+'%'],
                    status:1,
                    menu_id: 23
                  }
                }
              };
              var res = self.initArticleData(postData);
              return res;
            },
          },
          header_search:{
            componentName:'sls-input',
            placeholder:'请输入应聘职位',
            suggest:true,
            valueKey:'id',
            querySearch:function(val,self){
              console.log('querySearch',val)
              if(val){
                var postData = {
                  searchItem:{
                    title:['like','%'+val+'%'],
                    status:1,
                    menu_id:23
                  }
                };
                var res = self.initArticleData(postData);
                return res;
              }else{
                delete self.searchItem.relation_id;
                self.initMainData(true);
              }


            },
            changeFunc:function(val,self){
              if(val){
                self.searchItem.relation_id = val;
              }else{
                delete self.searchItem.relation_id;
              };
              self.initMainData(true);
            },
          }
        },

        {
          key: 'passage_array',
          label: '出生年月',
          customSlot:'passage_array',
          application:['编辑','添加'],
          componentName:'sls-datetime',
          listType:'normal',
          dialog:{
            dateType:'date'
          }
        },
        {
          key: 'college',
          label: '毕业院校以及专业',
          application:['编辑','添加'],
          componentName:'sls-textarea',
          listType:'',
        },
        {
          key: 'content',
          label: '工作经历',
          application:['编辑','添加'],
          componentName:'vue-editor',
          listType:'',
          dialogStyle:'width:100%;',

        },

        {
          key: 'education',
          label: '学历',
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
          key: 'origin',
          label: '来源',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['智联主动投递','公司邀约','boss直聘']
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
          placeholder:'请选择来源',
          width:100,
          header_search:{
            componentName:'sls-select',
            optionsName:'originOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择来源',
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
          key: 'behavior',
          label: '简历状态',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['待面试','已面试','已入职','未通过']
            return testArray[val.behavior-1];
          },
          componentName:'sls-select',
          optionsName:'behaviorOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择简历状态',
          width:100,
          header_search:{
            componentName:'sls-select',
            optionsName:'behaviorOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择简历状态',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.behavior = val;
              }else{
                delete self.searchItem.behavior;
              };
              self.initMainData(true);
            },
          }
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
          width:200,
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
                return "api_resumeUpdate"
              },
              formData:function(self){
                return self.formData
              },
              postData:function(self){
                var postData={
                  searchItem:{
                    id:self.formData.id,
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
                return "api_resumeUpdate"
              },

              postData:function(self){
                var deleteArray = [];
                for (var i = 0; i < self.selectionArray.length; i++) {
                  deleteArray.push(self.selectionArray[i].id);
                };
                var postData = {
                  searchItem:{
                    id:['in',deleteArray],
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
                return "api_resumeAdd"
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
      },
      optionData:{
        labelOptions:[],
        originOptions:[{
          text: '智联直接投递',
          value: 1
        }, {
          text: '公司邀约',
          value: 2
        }, {
          text: 'boss直聘',
          value: 3
        }],
        genderOptions:[{
          text: '男',
          value: 1
        }, {
          text: '女',
          value: 2
        }],
        behaviorOptions:[{
          text: '待面试',
          value: 1
        }, {
          text: '已面试',
          value: 2
        }, {
          text: '已入职',
          value: 3
        }, {
          text: '未通过',
          value: 4
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


    async initArticleData (postData) {

      const self = this;

      var res =  await self.$$api_articleGet({data: postData});

      if(res.info.data.length>0){
        for(var i=0;i<res.info.data.length;i++){
          res.info.data[i]['value'] = res.info.data[i]['title'];
        };
        return res.info.data;
      }else{
        return [{ "value": "无", "id": "" }];
      };

    },




    /**
     * 列表主函数
     */
    async initMainData (isNew) {

      const self = this;
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

      postData.getAfter = {
        Job: {
          tableName: "Article",
          middleKey: "relation_id",
          key: "id",
          condition: "=",
          searchItem: {status: 1, menu_id: 23},
          info: ["title"],
        }
      };
      var res =  await self.$$api_resumeGet({data: postData});
      self.mainData = res.info.data;
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
        if(!postData){

          return;
        };
        console.log('postData',postData)

        var res = await self['$$'+self.btnNow.func.apiName(self)]({data: postData});
        if(res){
          if(self.$$sCallBack(res)){
            self.dialog.dialogFormVisible = false;
            self.initMainData();
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
