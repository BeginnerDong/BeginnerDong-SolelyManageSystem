

import _ from 'underscore'
import plugins from '../../register/plugin.js'
import func from '../../utils/func/func.js'
import store from 'store/'


export default {
  name: 'solely-table',
  components:{},
  data () {
    return {
      batch_flag: true, // 符合批量删除为true,否则为false
      batch_datas: [],
      batch_ids: [],
      batch: {
        flag: true,
        datas: [],
        ids: []
      },
      list: this.mainData, // 列表数组
      fields: this.FieldList, // 字段数组
      expand: this.Expand, // 折叠
      btn_info: this.BtnInfo, // 按钮信息
      paginate: this.Pagination, // 分页
      search: this.Search,// 搜索
      optiondata: this.optionData,// 搜索
      formData:{},
      submitData:{},
      btn:{},
      dialogFormVisible:false,
      apiName:'',
      form_fields:[],
      token:0,
      self:this,
      components: {
        input: 'SlsInput',
        textarea: 'SlsTextarea',
        select: 'SlsSelect',
        radio: 'SlsRadio',
        switch: 'SlsSwitch',
        cascader: 'SlsCascader',
        checkbox: 'SlsCheckbox',
        date: 'SlsDate',
        daterange: 'SlsDateRange',
        year: 'SlsDateYear',
        month: 'SlsDateMonth',
        week: 'SlsDateWeek',
        time: 'SlsTime',
        timerange: 'SlsTimeRange',
        timefixed: 'SlsTimeFixed',
        timefixedrange: 'SlsTimeFixedRange',
        datetime: 'SlsDateTime',
        datetimerange: 'SlsDateTimeRange',
        editor: 'SlsEditor',
        upload: 'upload',
        vueEditor: 'VueEditor',
        baiduMap: 'baiduMap',
      },
      buttonHasAuth:0,
      newBtn:[],
      deleteArray:[]


    }
  },
  methods: {
    isShowChange(){

    },

    funcTransfer(){
      return func;
    },


    filterButtonAuth(){
      const self = this;


      self.newBtn = [];

      var emptyBtn = [];
      var num = self.btn_info.length;
      for(var i=0;i<self.btn_info.length;i++){

        var res = self.hasAuth(self.btn_info[i]);

        if(res){
          emptyBtn.push(self.btn_info[i]);
        };
        num--;
      };
      if(num==0){
        self.newBtn = emptyBtn;
      };

      if(!self.buttonHasAuth&&self.fields[self.fields.length-1]['listType']=='deal'){

        self.fields.splice(self.fields.length-1,1);
      };

    },


    hasAuth(btn,data){
      const self = this;

      var auth = store.getters.getUserinfo.auth;
      var nowMenu = self.$store.state.tabs.tabs[0];
      var buttonName = btn.text(data);
      var hasAuth = false;
      if(Array.isArray(buttonName)){
        for(var i=0;i<buttonName.length;i++){
          if(nowMenu.hasButton.indexOf(buttonName[i])>-1) hasAuth = true;
        }
      }else{
        if(nowMenu.hasButton.indexOf(buttonName)>-1) hasAuth = true;
      };
      if(hasAuth&&btn.position=='list'){
        self.buttonHasAuth++;
      };
      return hasAuth;
    },

    /**
     * 表格列表触发CheckBox的事件
     * @param  {array} val 当前选中的用户信息数组，每个元素是用户信息对象
     */


    onSearch (opts) {
      this.$emit('onSearch', opts)
    },

    onBatchDelete () {
      this.$emit('onClickBtnBatchDelete', {
        ids: this.batch.ids,
        datas: this.batch.datas
      })
    },

    onBtnEvent (opts) {
      const self = this;
      console.log('opts',opts)
      this.token = Date.parse(new Date())+Math.random()*10;
      this.btn = opts.btn;
      this.btnName = opts.btn.text({data:opts.data},this);
      this.btnData = opts.data;

      this.$emit('onClickBtn', [this.btnName,this.btnData,this.btn]);

    },

    /**
     * 改变当前页码事件
     * @param  {number} page 当前页面
     */
    onChangeCurrentPage (page) {
      this.$emit('pageChange', ['currentPage',page])
    },

    /**
     * 改变每页显示的数量事件
     * @param  {number} page_size 每页显示的数量
     */
    onChangePageSize (pageSize) {
      this.$emit('pageChange', ['pagesize',pageSize])
    },

    filter_change(filters){
      const self = this;
      this.$emit('filtersChange', filters)
    },

    isInArray(array,item){
      return _.indexOf(array,item)>=0?true:false
    },


    fieldChange(val){
      console.log('ListData_fieldChange',this.formData);
      this.$emit('fieldChange', [val,this])
    },

    handleSelectionChange(val) {
      const self = this;

      this.$emit('onSelectionChange', val);
    },
    async deleteUpdate(){
      const self = this;
      if(self.deleteArray&&self.deleteArray.length>0){
        const postData = {
          searchItem:{
            id:['in',self.deleteArray],
            user_type:0
          },
          data:{
            status:-1
          }
        };
        var res = await plugins[this.otherData.deleteApiName]({data: postData});
        if(res){
          if(func.sCallBack(res)){
            self.dialogFormVisible = false;
            this.$emit('initMainData', )
          };
        };

      }else{
        func.notify('请选择选项','warning');
      }

    },

    computeFields(){
      const self = this;
      self.form_fields = [];
      for (var i = 0; i < self.fields.length; i++) {
        if(_.indexOf(self.fields[i].application,self.btnName)>=0){
          self.form_fields.push(self.fields[i])
        };
      };
    }

  },

  mounted () {

    this.store = store;
    this.filterButtonAuth()
  },

  /**
   * 接收参数
   * @type {Object}
   */
  props: {
    mainData: {
      type: Array,
      required: true
    },
    FieldList: {
      type: Array,
      required: true
    },
    BtnInfo: {
      type: Array,
      default () {
        return []
      }
    },
    Selection: {
      type: Boolean,
      default: false
    },
    Expand: {
      type: Object,
      default () {
        return {
          show: false,
          position: 'left'
        }
      }
    },
    Pagination: {
      type: Object,
      default () {
        return {}
      }
    },
    Search: {
      type: Object,
      default () {
        return {}
      }
    },
    optionData: {
      type: Object,
      default () {
        return {}
      }
    },
    otherData: {
      type: Object,
      default () {
        return {}
      }
    },
    BasicArguments: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  /**
   * 监控参数
   * @type {Object}
   */
  watch: {
    mainData (v) {
      if (v) {
        this.list = v
      }
    },
    FieldList (v) {
      if (v) {
        this.fields = v
      }
    },
    Selection (v) {
      this.selection = v
    },
    Expand (v) {
      this.expand = v
    },
    BtnInfo (v) {
      console.log(v)
      this.btn_info = v;
      this.filterButtonAuth();
    },
    Pagination (v) {
      console.log('Pagination',v)
      this.paginate = v
    },
    Search (v) {
      this.search = v
    },
    dialogFormVisible (v) {

    }
  }
}
