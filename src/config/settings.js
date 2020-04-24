var gbs = {
  //host: '/slsAdminApi', // 接口根地址。本地代理到slsadmin.api.sls.com,线上使用的是Nginx代理
  host: 'https://www.solelycloud.com/apinew/public/index.php/api/v1/',
  db_prefix: 'solely', // 本地存储的key
  // 状态码字段
  api_status_key_field: 'solely_code',
  // 状态码value
  api_status_value_field: 100000,
  // 存放数据的字段
  api_data_field: '',
  api_custom: {
    404: function (res) {
      this.$store.dispatch('remove_userinfo').then(() => {
        this.$alert(res.status + ',' + res.msg + '！', '登录错误', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/login')
          }
        })
      })
    }
  },
  menu:[
    {
      id:'0',
      name:'控制面板',
      router:'/home/dashboard',
      button:['添加','添加任务','编辑任务'],
      hasButton:[],
      isShow:true
    },
    {
      id:'7',
      name:'统计分析',
      icon: 'inbox',
      isShow:true,
      children:[
        {
          id:'70',
          name:'渠道统计',
          router:'/home/statistic',
          button:['添加','添加任务','编辑任务'],
          hasButton:[],
          isShow:true
        },
        {
          id:'71',
          name:'收支统计',
          router:'/home/payStatistic',
          button:['添加','添加任务','编辑任务'],
          hasButton:[],
          isShow:true
        },
      ],
    },

    {
      id:'1',
      name:'用户管理',
      icon: 'inbox',
      isShow:true,
      children:[
        {
          id:'10',
          name:'管理员列表',
          router:'/home/adminLists',
          icon: 'reorder',
          isShow:true,
          button:['编辑账号','管理权限','添加账号','删除选中','编辑信息','添加信息'],
          hasButton:[]
        },
        {
          id:'11',
          name:'权限管理',
          router:'/home/access',
          icon: 'reorder',
          isShow:false,
          button:['返回','权限全选','更新权限'],
          hasButton:[]
        },
        {
          id:'12',
          name:'员工管理',
          router:'/home/staff',
          icon: 'reorder',
          isShow:true,
          button:['编辑账号','管理权限','添加账号','删除选中','编辑信息','添加信息'],
          hasButton:[]
        },
        {
          id:'13',
          name:'配置列表',
          router:'/home/thirdApp',
          icon: 'reorder',
          isShow:true,
          button:['编辑','添加','删除选中'],
          hasButton:[]
        },
      ]
    },
    {
      id:'2',
      name:'内容管理',
      icon: 'inbox',
      isShow:true,
      children:[
        {
          id:'21',
          name:'文章菜单管理',
          router:'/home/articleLabel',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'22',
          name:'文章管理',
          router:'/home/article',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'23',
          name:'案例库',
          router:'/home/caseList',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'24',
          name:'学习资料',
          router:'/home/eduList',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        }
      ]
    },

    {
      id:'3',
      name:'工作台',
      icon: 'inbox',
      isShow:true,
      children:[
        {
          id:'31',
          name:'日志',
          router:'/home/journal',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'32',
          name:'请假',
          router:'/home/check',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'33',
          name:'签到',
          router:'/home/sign',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'34',
          name:'外出记录',
          router:'/home/outdoors',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'36',
          name:'任务列表',
          router:'/home/mission',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'35',
          name:'其他',
          router:'/home/discipline',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },

      ]
    },

    {
      id:'4',
      name:'渠道运营',
      icon: 'inbox',
      isShow:true,
      children:[
        {
          id:'41',
          name:'客户',
          router:'/home/clients',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加','添加沟通记录','签单','设置回访时间'],
          hasButton:[]
        },
        {
          id:'42',
          name:'渠道统计',
          router:'/home/statistics',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'43',
          name:'收支统计',
          router:'/home/payStatistic',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'43',
          name:'ip统计',
          router:'/home/ip',
          icon: 'reorder',
          isShow:true,
          button:[],
          hasButton:[]
        },
      ]
    },
    {
      id:'5',
      name:'项目开发',
      icon: 'inbox',
      isShow:true,
      children:[
        {
          id:'51',
          name:'项目管理',
          router:'/home/project',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'52',
          name:'项目动态',
          router:'/home/projectNews',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加','补充','开发'],
          hasButton:[]
        },
        {
          id:'53',
          name:'项目回款',
          router:'/home/payment',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
      ]
    },
    {
      id:'6',
      name:'HR管理',
      icon: 'inbox',
      isShow:true,
      children:[
        {
          id:'61',
          name:'薪资管理',
          router:'/home/salary',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加流水','生成工资'],
          hasButton:[]
        },
        {
          id:'62',
          name:'简历管理',
          router:'/home/resume',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除','添加'],
          hasButton:[]
        },
        {
          id:'63',
          name:'hr统计',
          router:'/home/hrStatistics',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除','添加'],
          hasButton:[]
        },
        {
          id:'64',
          name:'公司支出',
          router:'/home/paymentOut',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
      ]
    }
  ]
}

var cbs = {
  /**
   * ajax请求成功，返回的状态码不是200时调用
   * @param  {object} err 返回的对象，包含错误码和错误信息
   */
  statusError (err) {
    console.log('err')
    if (err.status !== 404) {
      this.$message({
        showClose: true,
        message: '返回错误：' + err.msg,
        type: 'error'
      })
    } else {
      this.$store.dispatch('remove_userinfo').then(() => {
        this.$alert(err.status + ',' + err.msg + '！', '登录错误', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/login')
          }
        })
      })
    }
  },

  /**
   * ajax请求网络出错时调用
   */
  requestError (err) {
    this.$message({
      showClose: true,
      message: '请求错误：' + (err.response ? err.response.status : '') + ',' + (err.response ? err.response.statusText : ''),
      type: 'error'
    })
  }
}

export {
  gbs,
  cbs
}
