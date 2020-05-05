export default {
  name: 'dashboard',
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
          key: 'type',
          label: '状态',
          application:['编辑'],
          formatter:function(val,tests){
            var testArray = ['待完成','完成']
            return testArray[val.type];
          },
          componentName:'sls-select',
          optionsName:'typeOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择状态',
          width:100,
          isHide:function(self){
            if(self.dialog&&self.$store.getters.getUserinfo.user_no!=self.formData.publish_user){
              return true;
            }else{
              return false;
            }
          },
          header_search:{
            componentName:'sls-select',
            optionsName:'typeOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择状态',
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
          key: 'content',
          label: '内容',
          application:['写日志','添加任务','编辑'],
          componentName:'sls-textarea',
          listType:'normal',
          dialogStyle:'width:90%'
        },
        {
          key: 'name',
          label: '姓名',
          application:['编辑信息'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'phone',
          label: '手机号',
          application:['编辑信息'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'address',
          label: '地址',
          application:['编辑信息'],
          componentName:'sls-textarea',
          listType:'normal',
        },
        {
          key: 'idCard',
          label: '身份证号',
          application:['编辑信息'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'mainImg',
          label: '头像',
          application:['编辑信息'],
          customSlot:'mainImg',
          componentName:'upload',
          limit:10,
        },
        {
          key: 'response',
          label: '回复',
          application:['编辑'],
          componentName:'sls-textarea',
          listType:'normal',
          dialogStyle:'width:90%'
        },
        {
          key: 'start_time',
          label: '请假开始时间',
          application:['添加'],
          listType:'normal',
          customSlot:'start_time',
          componentName:'sls-datetime',
          placeholder:'请选择请假时间',
          header_search:{
            componentName:'sls-date-time-range',
            style:'width:160px;margin-right:2px;',
            start_placeholder:'请假开始时间',
            end_placeholder:'请假结束时间',
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
          key: 'end_time',
          label: '请假结束时间',
          componentName:'sls-datetime',
          customSlot:'end_time',
          application:['添加'],
          listType:'normal',
          placeholder:'请选择结束时间',
          width:200,
        },
        {
          key: 'dead_time',
          label: '截止时间',
          componentName:'sls-datetime',
          customSlot:'end_time',
          application:['添加任务','编辑'],
          listType:'normal',
          placeholder:'请选择结束时间',
          width:200,
          isHide:function(self){
            if(self.$store.getters.getUserinfo.primary_scope!=90
            &&self.$store.getters.getUserinfo.user_no!=self.formData.publish_user){
              return true;
            }else{
              return false;
            }
          },
        },
        {
          key: 'user_no',
          label: '执行者',
          application:['编辑','添加','添加任务'],
          customSlot:'user_no',
          componentName:'sls-select',
          optionsName:'userOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'name',
            value: 'user_no',
          },
          placeholder:'请选择执行者',
          width:100,
          isHide:function(self){
            if(self.$store.getters.getUserinfo.primary_scope!=90
            &&self.$store.getters.getUserinfo.user_no!=self.formData.publish_user){
              return true;
            }else{
              return false;
            }
          },
          header_search:{
            componentName:'sls-select',
            optionsName:'userOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择执行者',
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
          key: 'create_time',
          label: '创建时间',
          listType:'normal',
          placeholder:'请选择创建时间',
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
                return "api_missionUpdate"
              },
              formData:function(self){
                return self.formData
              },
              postData:function(self){
                var postData = {
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
              },
              callback:function(self){
                self.initMissionData(true)
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
                return "api_routineUpdate"
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
                return "api_routineAdd"
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
                self.submitData.type = 4;
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
              return '写日志'
            },
            func:{
              apiName:function(self){
                return "api_routineAdd"
              },
              formData:function(self){
                var data = {
                  content:'',
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
          {
            type:'info',
            icon:'edit',
            size:'medium',
            position:'header',
            text:function(data){
              return '添加任务'
            },
            func:{
              apiName:function(self){
                return "api_missionAdd"
              },
              formData:function(self){
                var data = {
                  content:'',
                  user_no:self.$store.getters.getUserinfo.user_no,
                  publish_user:self.$store.getters.getUserinfo.user_no,
                  dead_time:new Date().getTime(),
                };
                return data
              },
              postData:function(self){
                var postData = {
                  data:self.submitData
                };
                if(!postData.data.user_no){
                  postData.data.user_no = self.$store.getters.getUserinfo.user_no;
                };
                if(!postData.data.dead_time){
                  postData.data.dead_time = new Date().getTime();
                };
                postData.data.publish_user = self.$store.getters.getUserinfo.user_no;
                return postData;
              },
              callback:function(self){
                self.initMissionData(true)
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
              return '签到'
            },
            func:{
              apiName:function(self){
                return "api_routineAdd"
              },
              postData:function(self){
                var postData = {
                  data:{
                    type:2,
                  }
                };
                return postData;
              },
              callback:function(self){
                self.isSign = !self.isSign;
                self.initMainData(true);
              }
            },
          },
          {
            type:'info',
            icon:'edit',
            size:'mini',
            position:'list',
            text:function(data){
              return '编辑信息'
            },
            func:{
              apiName:function(self){
                return "api_userInfoUpdate"
              },
              formData:function(self){
                return self.user
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
              },
              callback:function(self){
                self.initUserInfoData()
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
      missionPaginate: {
        count: 0,
        currentPage: 1,
        pagesize:10,
        is_page:true,
        page_sizes: [10, 30, 60, 90],
        layout: 'total, sizes, prev, pager, next, jumper',
      },
      searchItem:{
        create_time:['between',[new Date(new Date().toLocaleDateString()).getTime()/1000,new Date(new Date().toLocaleDateString()).getTime()/1000+86400]]
      },
      optionData:{
        labelOptions:[],
        typeOptions:[{
          text: '待完成',
          value: 0
        }, {
          text: '完成',
          value: 1
        }],
        checkBehaviorOptions:[{
          text: '事假',
          value: 1
        }, {
          text: '病假',
          value: 2
        },{
          text: '年假',
          value: 3
        },
        {
          text: '其他',
          value: 4
        }],
        signBehaviorOptions:[{
          text: '正常',
          value: 1
        }, {
          text: '迟到',
          value: 2
        }],
        statusOptions:[{
          text: '启用',
          value: 1
        }, {
          text: '禁用',
          value: -1
        }],
        journalBehaviorOptions:[{
          text: '正常',
          value: 1
        }, {
          text: '延期',
          value: -1
        }],
        statusOptions:[{
          text: '启用',
          value: 1
        }, {
          text: '禁用',
          value: -1
        }],
        outdoorsBehaviorOptions:[{
          text: '正常',
          value: 1
        }, {
          text: '异常',
          value: 2
        }],
        disciplineBehaviorOptions:[{
          text: '绩效扣除',
          value: 1
        }, {
          text: '绩效奖励',
          value: 2
        },{
          text: '金额扣除',
          value: 3
        },
        {
          text: '金额奖励',
          value: 4
        },{
          text: '全额扣除',
          value: 5
        },
        {
          text: '全额奖励',
          value: 6
        }],
      },
      otherData:{},
      UserInfo:{
        tableName:'UserInfo',
        searchItem:{},
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
      user:{},
      isSign:false,
      missionData:[],
      leftMissionData:[],
      rightMissionData:[],


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
      this.initGetCode();
      this.initUserInfoData();
      this.initMainData();
      this.initUserData();
      this.initMissionData();

    },


    /**
     * 获取登录二维码
     */
    async initGetCode(isNew) {

      const self = this;
      const postData = {};
      postData.token = self.$store.getters.getToken;

      var res = await self.$$api_getLoginCode({data: postData});
      if(res.info){
        self.qrcode = res.info;
        console.log('qrcode',self.qrcode);
      };

    },


    /**
     *
     */
    async initUserInfoData(isNew) {

      const self = this;
      const postData  = {};
      postData.token = self.$store.getters.getToken;

      var res = await self.$$api_userInfoGet({data: postData});
      if(res.info.data.length>0){
        self.user = res.info.data[0];
      };

    },

     /**
     *
     */
    async initUserData(isNew) {

      const self = this;
      const postData = {};

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


    },


    /**
     * 列表主函数
     */
    async initMainData(isNew) {

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

      };
      var res = await self.$$api_routineGet({data: postData});
      self.mainData = res.info.data;
      var lastSign = '';
      for(var i=0;i<self.mainData.length;i++){
        self.mainData[i]['coordinate'] = {
          latitude:self.mainData[i]['latitude'],
          longtitude:self.mainData[i]['longtitude'],
        };
        if(!lastSign&&self.mainData[i]['type']==2){
          lastSign = self.mainData[i];
        };
      };
      console.log('lastSign',lastSign)
      if(lastSign['num']==0){
        self.isSign = true;
      }else{
        self.isSign = false;
      };
      self.paginate.count = res.info.total;

    },

    /**
     * 列表主函数
     */
    async initMissionData (isNew) {

      const self = this;
      const postData  = {};
      if(isNew){
        self.missionPaginate.currentPage = 1;
        self.missionData = [];
      };

      postData.token = self.$store.getters.getToken;
      postData.searchItem = {
        type:0,
        user_no:self.$store.getters.getUserinfo.user_no
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
        Punlisher: {
          condition: "=",
          key: "user_no",
          info: ["name", "user_no"],
          middleKey: "publish_user",
          searchItem: {status: 1},
          tableName: "UserInfo",
        },

      };

      var res =  await self.$$api_missionGet({data: postData});
      self.missionData = res.info.data;
      var left = 0;
      var right = 0;
      self.leftMissionData = [];
      self.rightMissionData = [];
      for(var i=0;i<self.missionData.length;i++){
        if(left>right){
          self.rightMissionData.push(self.missionData[i]);
          right = right + self.missionData[i].content.length + 80;

        }else{
          self.leftMissionData.push(self.missionData[i]);
          left = left + self.missionData[i].content.length + 80;


        };
      };
      console.log('self.rightMissionData',self.rightMissionData)
      self.missionPaginate.count = res.info.total;

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
        console.log('val',val)
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
