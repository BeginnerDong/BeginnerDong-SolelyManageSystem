export default {
  name: 'salary',
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
          key: 'description',
          label: '描述',
          application:['编辑','添加流水'],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入描述',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            isHide:function(self){

              if(self.$store.getters.getUserinfo.primary_scope==60||self.$store.getters.getUserinfo.behavior==3){
                return false;
              }else{
                return true;
              }
            },
            changeFunc:function(val,self){
              if(val){
                self.searchItem.title = val;
              }else{
                delete self.searchItem.title;
              };
              self.initMainData();
            },

          },
        },
        {
          key: 'relation_user',
          label: '员工姓名',
          application:['编辑','添加流水'],
          customSlot:'relation_user',
          componentName:'sls-select',
          optionsName:'userOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'name',
            value: 'user_no',
          },
          placeholder:'请选择员工姓名',
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
            placeholder:'请选择员工',
            changeFunc:function(val,self){
              if(val){
                if(val=='test'){
                  self.searchItem.relation_user = '';
                }else{
                  self.searchItem.relation_user = val;
                };

              }else{
                delete self.searchItem.relation_user;
              };
              self.initMainData(true);
            },
            isHide:function(self){

              if(self.$store.getters.getUserinfo.primary_scope==60||self.$store.getters.getUserinfo.behavior==3){
                return false;
              }else{
                return true;
              }
            },
          }
        },
        {
          key: 'money',
          label: '金额',
          application:['编辑','添加流水'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'year',
          label: '年份',
          application:['生成工资','添加流水'],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入年份',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            isHide:function(self){

              if(self.$store.getters.getUserinfo.primary_scope==60||self.$store.getters.getUserinfo.behavior==3){
                return false;
              }else{
                return true;
              }
            },
            changeFunc:function(val,self){
              if(val){
                self.searchItem.year = val;
              }else{
                delete self.searchItem.year;
              };
              self.initMainData();
            },

          },
        },
        {
          key: 'month',
          label: '月份',
          application:['生成工资','添加流水'],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入月份',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            isHide:function(self){

              if(self.$store.getters.getUserinfo.primary_scope==60||self.$store.getters.getUserinfo.behavior==3){
                return false;
              }else{
                return true;
              }
            },
            changeFunc:function(val,self){
              if(val){
                self.searchItem.month = val;
              }else{
                delete self.searchItem.month;
              };
              self.initMainData();
            },

          },
        },
        {
          key: 'workday',
          label: '工作日',
          application:['生成工资'],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'holiday',
          label: '法定假日',
          application:['生成工资'],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'base',
          label: '基础工资',
          application:['生成工资'],
          componentName:'sls-input',
          listType:'',
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
            isHide:function(self){

              if(self.$store.getters.getUserinfo.primary_scope==60||self.$store.getters.getUserinfo.behavior==3){
                return false;
              }else{
                return true;
              }
            },
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
                return "api_salaryFlowUpdate"
              },
              formData:function(self){
                return self.formData
              },
              postData:function(self){
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
                return "api_salaryFlowUpdate"
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
              return '添加流水'
            },
            func:{
              apiName:function(self){
                return "api_salaryFlowAdd"
              },
              formData:function(self){
                var data = {
                  relation_user:'',
                  money:'',
                  record_time:'',
                  description:'',
                };
                return data
              },
              postData:function(self){

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
              size:'medium',
              position:'header',
              text:function(data){
                return '生成工资'
              },
              func:{
                apiName:function(self){
                  return "api_createSalary"
                },
                formData:function(self){
                  var data = {
                    base:'',
                    holiday:'',
                    workday:'',
                    year:'',
                    month:''
                  };
                  return data
                },
                postData:function(self){

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
      totalMoney:0

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



    /**
     *
     */
    async initUserData (isNew) {

      const self = this;
      const postData  = {};

      postData.token = self.$store.getters.getToken;
      if (self.searchItem) {
        postData.searchItem = {
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
      self.totalMoney = 0;
      const postData  = {};
      if(isNew){
        self.paginate.currentPage = 1;
      };

      postData.token = self.$store.getters.getToken;
      if (self.searchItem) {
        postData.searchItem = self.$$cloneForm(self.searchItem)
      };
      if(!self.searchItem.year&&!self.searchItem.month){
        postData.searchItem.year = new Date().getFullYear(); //获取完整的年份(4位)
        postData.searchItem.month = new Date().getMonth(); //获取当前月份(0-11,0代表1月)
      };

      if(!postData.searchItem.relation_user&&self.$store.getters.getUserinfo.primary_scope<60&&self.$store.getters.getUserinfo.info.behavior!=4){
        postData.searchItem.relation_user = self.$store.getters.getUserinfo.user_no;
        user_type:1
      };

      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };


      postData.getAfter = {
        UserInfo: {
          tableName: "UserInfo",
          middleKey: "relation_user",
          key: "user_no",
          condition: "=",
          searchItem: {status: 1},
          info: ["id", "name"],
        },
      };

      var res =  await self.$$api_salaryFlowGet({data: postData});
      self.mainData = res.info.data;
      for(var i=0;i<self.mainData.length;i++){
        self.totalMoney = self.totalMoney + parseFloat(self.mainData[i]['money']);
      };

      self.header_str = postData.searchItem.year + '年' + postData.searchItem.month + '月' + '；共计金额'+self.totalMoney.toFixed(2)+'元'
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
