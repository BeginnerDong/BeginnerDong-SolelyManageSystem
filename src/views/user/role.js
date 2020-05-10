export default {
  name: 'role',
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
          label: 'ID',
          application:[],
          componentName:'sls-input',
          listType:'normal'
        },
        {
          key: 'name',
          label: '角色名称',
          application:['添加','编辑'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: "status",
          label: '状态',
          application:[],
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
            componentName:'sls-date-time-range',
            style:'width:160px;margin-right:2px;',
            start_placeholder:'创建开始时间',
            end_placeholder:'创建结束时间',
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.create_time;
              }else{
                self.searchItem.create_time = ['between',value = value.map(function(e){return e/1000;})]
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
              return '编辑';
            },
            func:{
              apiName:function(self){
                return "api_roleUpdate"
              },
              formData:function(self){
                return data
              },
              postData:function(self){
                var postData = {
                  searchItem:{
                    id:self.orginFormData.id,
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
            funcType:'func',
            func:{
              func:function(self){
                self.$router.push({
                  path:'/home/access',
                  name:'权限管理',
                  params:{
                    role:self.orginFormData.id,
                    path:'/home/role',
                  }
                });
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
                return "api_roleUpdate"
              },
              postData:function(self){
                var deleteArray = [];
                for (var i = 0; i < self.selectionArray.length; i++) {
                  deleteArray.push(self.selectionArray[i].id);
                };
                var postData = {
                  searchItem:{
                    id:['in',deleteArray],
                    user_type:2
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
                return "api_roleAdd"
              },
              formData:function(self){
                var data = {
                  name:'',
                };
                return data
              },
              postData:function(self){
                var postData = {
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
        user_type:2
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
      },
      otherData:{
      },
      UserInfo:{
        tableName:'UserInfo',
        searchItem:{
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
    init() {
      this.initMainData()
    },

    /**
     * 列表主函数
     */
    async initMainData(isNew) {

      const self = this;
      const postData = {};
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

      var res = await self.$$api_roleGet({data: postData});
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
      Object.field.header_search['changeFunc'](Object.value,self);
    },

    pageChange(val){
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
