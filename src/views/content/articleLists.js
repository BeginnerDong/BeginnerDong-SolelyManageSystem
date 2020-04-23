export default {
  name: 'articleLists',
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
          label: '文章ID',
          application:[],
          componentName:'sls-input',
          listType:'normal',
          width:50
        },
        {
          key: 'title',
          label: '文章名称',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入文章名称',
            clearable:true,
            defaultValue:'',
            optionsName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.title = val;
              }else{
                delete self.searchItem.title;
              };
              self.initMainData(true);
            },
          },
        },
        {
          key: 'small_title',
          label: '副标题',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入副标题',
            clearable:true,
            defaultValue:'',
            optionsName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.small_title = val;
              }else{
                delete self.searchItem.small_title;
              };
              self.initMainData(true);
            },
          },
        },
        {
          key: 'description',
          label: '文章描述',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
          placeholder:'请输入文章描述',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入文章描述',
            changeFunc:function(e,self){
              if(e.target._value){
                self.searchItem.description = ['LIKE',['%'+e.target._value+'%']];
              }else{
                delete self.searchItem.description;
              };
              self.initMainData(true);
            },
          }
        },
        {
          key: 'menu_id',
          label: '文章菜单',
          application:['编辑','添加'],
          formatter:function(val,tests){
            return  val.label[val.menu_id]['title'];
          },
          componentName:'sls-cascader',
          optionsName:'labelOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            children: 'children',
            label: 'title',
            value: 'id',
          },
          placeholder:'请选择菜单',
          header_search:{
            componentName:'sls-cascader',
            optionsName:'labelOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择菜单',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.menu_id = val;
              }else{
                delete self.searchItem.menu_id;
              };
              self.initMainData(true);
            },
          }
        },
        {
          key: 'content',
          label: '文章内容',
          application:['编辑','添加'],
          componentName:'tinymce-editor',
          listType:'',
          dialogStyle:'width:100%;',
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
            componentName:'sls-datetime',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择创建时间',
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.create_time;
              }else{
                self.searchItem.create_time = ['between',value = value.map(function(e){return e/1000;})]
              };
              self.initMainData(true);
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
              return '编辑'
            },


            func:{
              apiName:function(self){
                return "api_articleUpdate"
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
                return "api_articleUpdate"
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
                return "api_articleAdd"
              },
              formData:function(self){
                var data = {
                  title:'',
                  description:'',
                  mainImg:[],
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

        thirdapp_id:this.$store.getters.getUserinfo.thirdapp_id
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
      this.initMainData();
      this.initMenuData();
    },


    async initMenuData(){
      const self =this;
      const postData = {};
      postData.searchItem ={
        type:['=',1],
      };
      postData.token = self.$store.getters.getToken;
      postData.order ={
        listorder:'desc'
      };

      try{
        var res = await self.$$api_labelGet({data: postData});
      }catch(err){
        console.log(err);
        self.$notify('网络故障','error');
      };

      if(res){
        self.optionData.labelOptions = res.info.data;
      };
      console.log('self.optionData',self.optionData)

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
      var res =  await self.$$api_articleGet({data: postData});
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
      self.formData[Object.field.key] = Object.value;
      self.submitData[Object.field.key] = Object.value;
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
