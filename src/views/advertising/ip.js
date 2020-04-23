export default {
  name: 'ip',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      loading:false,
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
          key: 'origin',
          label: 'ip来源',
          application:['编辑','添加'],
          componentName:'sls-select',
          optionsName:'originOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择ip来源',
          width:100,
          header_search:{
            componentName:'sls-select',
            optionsName:'originOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择ip来源',
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
          key: 'type',
          label: '数据类型',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['标签','记录']
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
          placeholder:'请选择数据类型',
          width:100,
          header_search:{
            componentName:'sls-select',
            optionsName:'typeOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择数据类型',
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
          key: 'count',
          label: '次数',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
          width:100
        },
        {
          key: 'ip',
          label: 'IP地址',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'create_time',
          label: '创建开始时间',
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
                return "api_statisticsUpdate"
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
                return "api_statisticsUpdate"
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
                return "api_statisticsAdd"
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
        type:2,
        create_time:['between',[new Date(new Date().toLocaleDateString()).getTime()/1000,new Date(new Date().toLocaleDateString()).getTime()/1000+86400]],
      },
      optionData:{
        labelOptions:[],

        originOptions:[{
          text: '58',
          value: '58'
        }, {
          text: '百度',
          value: '百度'
        }, {
          text: '猪八戒',
          value:'猪八戒'
        }],

        typeOptions:[{
          text: '标签',
          value: 1
        }, {
          text: '记录',
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
      origin:'58',
      ipArray:'',
      retrunIpArray:[],
      todayAddNum:0

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

    async addIp(){
      const self = this;
      self.loading = true;
      self.ipArray = self.ipArray.replace(/[\uff0c]/g, ",");
      var newArray = self.ipArray.split(',');
      var postData = {
        token:self.$store.getters.getToken,
        ipArray:newArray,
        origin:self.origin
      };
      var res =  await self.$$api_newAddIpLog({data: postData});
      self.retrunIpArray = res.info;
      self.ipArray = "";
      self.loading = false;


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

      var res =  await self.$$api_ipLogGet({data: postData});

      self.mainData = res.info.data;
      var standard = ['between',[new Date(new Date().toLocaleDateString()).getTime()/1000,new Date(new Date().toLocaleDateString()).getTime()/1000+86400]];
      if(postData.searchItem.type==2
      &&postData.searchItem.create_time
      &&postData.searchItem.create_time.sort().toString()==standard.sort().toString()){
        self.todayAddNum = res.info.total;
      };
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
        if(!postData){

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
