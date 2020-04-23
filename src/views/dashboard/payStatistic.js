export default {
    name: 'payStatistic',
    components: {},
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        clientData:[],
        clientOptions:{},
        moneyOptions:{},
        signMoneyOptions:{},
        fields: [
          {
            key: 'create_time',
            label: '起止时间',
            application:['编辑','添加'],
            listType:'normal',
            componentName:'sls-datetime',
            placeholder:'请选择起止时间',
            header_search:{
              componentName:'sls-date-time-range',
              style:'width:160px;margin-right:2px;',
              start_placeholder:'开始时间',
              end_placeholder:'结束时间',
              changeFunc:function(value,self){
                if(!value){
                  self.dateBetween = [(new Date()).getTime()/1000-30*86400,(new Date()).getTime()/1000];
                }else{
                  self.dateBetween = value.map(function(e){return e/1000;});
                  //self.searchItem.create_time = ['between',value = value.map(function(e){return e/1000;})];
                };
                self.initSignProjectData();
                self.initPaymentData();
              },
            },
            width:170,
          },
        ],
        dateArray:[],
        dateBetween:[],
        duringTotalMoney:0,
        duringTotalNum:0,
        saleser:{
          '蔺文娟':{
            totalMoney:0,
            hasPay:0,
            totalClients:0
          },
          '武点点':{
            totalMoney:0,
            hasPay:0,
            totalClients:0
          }
        },
        totalIncome:0,
        totalPay:0,
      }
    },
    mounted(){
      //this.init();
      this.initProjectData();
      this.initSignProjectData();
      this.initPaymentData();

    },
    methods: {


      async initPaymentData (isNew) {

        const self = this;
        const postData  = {};
        postData.searchItem = {
          'create_time':['between',self.dateBetween],
          
        };
        postData.order = {
          'create_time':'desc'
        };

        var res =  await self.$$api_paymentGet({data: postData});
        var totalIncome = 0;
        var totalPay = 0;
        for(var i=0;i<res.info.data.length;i++){
          if(res.info.data[i]['type']==0){
            totalIncome += parseInt(res.info.data[i]['money']);
          }else{
            totalPay += parseInt(res.info.data[i]['money']);
          };
        };
        self.totalIncome = totalIncome;
        self.totalPay = totalPay;

      },


      async initProjectData (isNew) {

        const self = this;

        const postData  = {};
        postData.token = self.$store.getters.getToken;
        postData.order = {
          'create_time':'desc'
        };
        postData.searchItem = {
          'sign_status':['<',4]
        };
        postData.getAfter = {
          Payment:{
            compute: {payment: ["sum", "money", {status: 1}]},
            condition: "=",
            key: "project_no",
            middleKey: "project_no",
            searchItem: {status: 1},
            tableName: "Payment",
          }
        };
        var res =  await self.$$api_projectGet({data: postData});
        var moneyOptions = {
          title: {
            text:'未完成项目金额统计',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data:['未完成项目']
          },
          series: [{
            name: '未完成项目',
            type: 'pie',
            radius: '55%',
            // center: ['50%', '60%'],
            data: [
              {value: 0, name: '已收款'},
              {value: 0, name: '未收款'},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
        self.projectData = res.info.data;
        var totalMoney = 0;
        var hasPay = 0;
        for(var i=0;i<self.projectData.length;i++){
          totalMoney = totalMoney + parseInt(self.projectData[i]['total_amount']);
          hasPay = hasPay + self.projectData[i]['Payment']['payment'];
        };
        console.log('totalMoney',totalMoney);
        console.log('hasPay',hasPay);
        moneyOptions.series[0]['data'][0]['value'] = hasPay;
        moneyOptions.series[0]['data'][1]['value'] = totalMoney - hasPay;
        moneyOptions.title.subtext = '项目金额共计' + totalMoney + '元';
        self.moneyOptions = moneyOptions;

      },


      async initSignProjectData (isNew) {

        const self = this;

        const postData  = {};
        postData.token = self.$store.getters.getToken;
        postData.order = {
          'create_time':'desc'
        };

        if(self.dateBetween.length==0){
          var data=new Date();
          data.setDate(1);
          data.setHours(0);
          data.setSeconds(0);
          data.setMinutes(0);
          self.dateBetween = [data.getTime()/1000,(new Date()).getTime()/1000];
        };
        postData.searchItem = {
          'create_time':['between',self.dateBetween]
        };
        postData.getAfter = {
          Payment:{
            compute: {payment: ["sum", "money", {status: 1}]},
            condition: "=",
            key: "project_no",
            middleKey: "project_no",
            searchItem: {status: 1},
            tableName: "Payment",
          },
          User:{
            condition: "=",
            key: "user_no",
            middleKey: "sales_manager",
            info:['name'],
            searchItem: {status: 1},
            tableName: "UserInfo",
          }
        };
        var res =  await self.$$api_projectGet({data: postData});
        var moneyOptions = {
          title: {
            text:'签单项目金额统计',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data:['签单项目']
          },
          series: [{
            name: '签单项目',
            type: 'pie',
            radius: '55%',
            // center: ['50%', '60%'],
            data: [
              {value: 0, name: '已收款'},
              {value: 0, name: '未收款'},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
        self.projectData = res.info.data;
        var totalMoney = 0;
        var hasPay = 0;

        self.saleser = {
          '蔺文娟':{
            totalMoney:0,
            hasPay:0,
            totalClients:0
          },
          '武点点':{
            totalMoney:0,
            hasPay:0,
            totalClients:0
          }
        };

        for(var i=0;i<self.projectData.length;i++){
          if(self.projectData[i]['User']['name']){
            self.saleser[self.projectData[i]['User']['name']]['totalMoney'] += parseInt(self.projectData[i]['total_amount']);
            self.saleser[self.projectData[i]['User']['name']]['hasPay'] += self.projectData[i]['Payment']['payment'];
          };

          totalMoney = totalMoney + parseInt(self.projectData[i]['total_amount']);
          hasPay = hasPay + self.projectData[i]['Payment']['payment'];
        };
        console.log('totalMoney',totalMoney);
        console.log('hasPay',hasPay);
        moneyOptions.series[0]['data'][0]['value'] = hasPay;
        moneyOptions.series[0]['data'][1]['value'] = totalMoney - hasPay;
        moneyOptions.title.subtext = '项目金额共计' + totalMoney + '元';
        self.signMoneyOptions = moneyOptions;

      },



      async header_search_fieldChange(Object){

        const self = this;
        console.log('field',Object);
        Object.field.header_search['changeFunc'](Object.value,self);

      },

    },




}
