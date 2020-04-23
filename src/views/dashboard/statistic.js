export default {
    name: 'statistic',
    components: {},
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        clientData:[],
        clientOptions:{},
        averageOptions:{},
        moneyOptions:{},
        barOptions:{},
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
                self.init();
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
            totalClients:0
          },
          '武点点':{
            totalClients:0
          },
          '贾苏皖':{
            totalClients:0
          }
        },
        totalIncome:0
      }
    },
    mounted(){
      this.init();

    },
    methods: {

      init(){
        const self = this;
        if(self.dateBetween.length==0){
          self.dateBetween = [(new Date()).getTime()/1000-30*86400,(new Date()).getTime()/1000];
        };
        var days = Math.ceil((self.dateBetween[1]-self.dateBetween[0])/86400)+1;
        console.log('days',days);
        self.dateArray = [];
        for(var i=0;i<days;i++){
          var timestap = self.dateBetween[1] - i*86400;
          self.dateArray.unshift(self.$$formatDate( new Date(timestap*1000) ,'yyyy-MM-dd'));
        };
        this.initMainData();


      },


      /**
       * 列表主函数
       */
      async initMainData (isNew) {

        const self = this;
        var clientOptions = {
          title: {
            text: '新增客户'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['新增客户','58','百度','猪八戒快车','猪八戒投标','转介绍','其他','58财务']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:'20%',
            height:'60%',
            width:'90%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,

            data: []
          },
           dataZoom: [
              { // 第一个 dataZoom 组件
                  xAxisIndex:0 // 表示这个 dataZoom 组件控制 第一个 和 第三个 xAxis
              },
          ],
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '新增客户',
            type: 'line',
            total:0,
            data: []
          },{
            name: '58',
            type: 'line',
            total:0,
            data: []
          },{
            name: '百度',
            type: 'line',
            total:0,
            data: []
          },{
            name: '猪八戒快车',
            type: 'line',
            total:0,
            data: []
          }
          ,{
            name: '猪八戒投标',
            type: 'line',
            total:0,
            data: []
          },{
            name: '转介绍',
            type: 'line',
            total:0,
            data: []
          },{
            name: '其他',
            type: 'line',
            total:0,
            data: []
          },{
            name: '58财务',
            type: 'line',
            total:0,
            data: []
          },]
        };
        const postData  = {};
        postData.token = self.$store.getters.getToken;
        postData.searchItem = {
          'create_time':['between',self.dateBetween],
          /* 'step':['<',5] */
        };
        postData.order = {
          'create_time':'desc'
        };
        postData.getAfter = {
          User:{
            condition: "=",
            key: "user_no",
            middleKey: "sales_manager",
            info:['name'],
            searchItem: {status: 1},
            tableName: "UserInfo",
          }
        };
        var res =  await self.$$api_clientGet({data: postData});
        self.clientData = res.info.data;
        clientOptions.xAxis.data = self.dateArray;
        for(var i=0;i<self.dateArray.length;i++){
          clientOptions.series[0]['data'].push(0);
          clientOptions.series[1]['data'].push(0);
          clientOptions.series[2]['data'].push(0);
          clientOptions.series[3]['data'].push(0);
          clientOptions.series[4]['data'].push(0);
          clientOptions.series[5]['data'].push(0);
          clientOptions.series[6]['data'].push(0);
          clientOptions.series[7]['data'].push(0);
        };

        self.saleser = {
          '蔺文娟':{
            totalClients:0,
            'detail':[0,0,0,0,0,0,0,0],
          },
          '武点点':{
            totalClients:0,
            'detail':[0,0,0,0,0,0,0,0],
          },
          '贾苏皖':{
            totalClients:0,
            'detail':[0,0,0,0,0,0,0,0],
          }
        };
        for(var i=0;i<self.clientData.length;i++){
          self.saleser[self.clientData[i].User.name]['totalClients']++;
          var dayIndex = clientOptions.xAxis.data.indexOf(self.clientData[i]['create_time'].substring(0,10));
          clientOptions.series[0]['data'][dayIndex]++;
          clientOptions.series[0]['total']++;
          self.saleser[self.clientData[i].User.name]['detail'][0]++;
          if(self.clientData[i]['origin']>2){
            if(self.clientData[i]['origin']==3&&self.clientData[i]['plan']!='投标'){
              clientOptions.series[self.clientData[i]['origin']]['data'][dayIndex]++;
              clientOptions.series[self.clientData[i]['origin']]['total']++;
              self.saleser[self.clientData[i].User.name]['detail'][self.clientData[i]['origin']]++;

            }else{
              clientOptions.series[self.clientData[i]['origin']+1]['data'][dayIndex]++;
              clientOptions.series[self.clientData[i]['origin']+1]['total']++;
              self.saleser[self.clientData[i].User.name]['detail'][self.clientData[i]['origin']+1]++;
            }
          }else{
            clientOptions.series[self.clientData[i]['origin']]['data'][dayIndex]++;
            clientOptions.series[self.clientData[i]['origin']]['total']++;
            self.saleser[self.clientData[i].User.name]['detail'][self.clientData[i]['origin']]++;
          }

        };
        self.clientOptions = clientOptions;
        self.initStatisticData()
        console.log('self.clientOptions',self.clientOptions)

      },




      async initStatisticData (isNew) {

        const self = this;
        const postData  = {};
        postData.token = self.$store.getters.getToken;
        postData.searchItem = {
          'create_time':['between',self.dateBetween],
        };
        postData.order = {
          'create_time':'desc'
        };
        var originOptions = [{
          text: '58',
          value: 1
        }, {
          text: '百度',
          value: 2
        }, {
          text: '猪八戒',
          value: 3
        }];

        var barOptions = {
          title: {
            text: '渠道消费',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['总花费','58','百度','猪八戒快车','猪八戒投标','58财务']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            height:'60%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data:[],
            boundaryGap:false
          },
          yAxis: {
            type: 'value',
            lineHeight:10,
          },
          dataZoom: [
            { // 第一个 dataZoom 组件
              xAxisIndex:0 // 表示这个 dataZoom 组件控制 第一个 和 第三个 xAxis
            },
          ],
          series: [{
            name: '总花费',
            type: 'line',
            total:0,
            data: []
          }, {
            name: '58',
            type: 'line',
            total:0,
            data: []
          },
          {
            name: '百度',
            type: 'line',
            total:0,
            data: []
          }, {
            name: '猪八戒快车',
            type: 'line',
            total:0,
            data: []
          }, {
            name: '猪八戒投标',
            type: 'line',
            total:0,
            data: []
          }, {
            name: '58财务',
            type: 'line',
            total:0,
            data: []
          }]
        }
        var res =  await self.$$api_statisticsGet({data: postData});
        self.statisticData = res.info.data;
        barOptions.xAxis.data = self.dateArray;
        for(var i=0;i<self.dateArray.length;i++){
          barOptions.series[0]['data'].push(0);
          barOptions.series[1]['data'].push(0);
          barOptions.series[2]['data'].push(0);
          barOptions.series[3]['data'].push(0);
          barOptions.series[4]['data'].push(0);
          barOptions.series[5]['data'].push(0);
        };
        for(var i=0;i<self.statisticData.length;i++){

          var dayIndex = barOptions.xAxis.data.indexOf(self.statisticData[i]['create_time'].substring(0,10));
            barOptions.series[0]['total'] +=  parseInt(self.statisticData[i]['cost']);
            barOptions.series[0]['data'][dayIndex] +=  parseInt(self.statisticData[i]['cost']);
            if(self.statisticData[i]['origin']<3||self.statisticData[i]['origin']==3&&self.statisticData[i]['plan']!='投标'){
              barOptions.series[self.statisticData[i]['origin']]['data'][dayIndex] += parseInt(self.statisticData[i]['cost']);
              barOptions.series[self.statisticData[i]['origin']]['total'] += parseInt(self.statisticData[i]['cost']);
            }else if(self.statisticData[i]['origin']==3){
              barOptions.series[4]['data'][dayIndex] += parseInt(self.statisticData[i]['cost']);
              barOptions.series[4]['total'] += parseInt(self.statisticData[i]['cost']);
            }else{
              barOptions.series[5]['data'][dayIndex] += parseInt(self.statisticData[i]['cost']);
              barOptions.series[5]['total'] += parseInt(self.statisticData[i]['cost']);
            };
        };
        self.barOptions = barOptions;

      },






      async header_search_fieldChange(Object){

        const self = this;
        console.log('field',Object);
        Object.field.header_search['changeFunc'](Object.value,self);

      },

    },




}
