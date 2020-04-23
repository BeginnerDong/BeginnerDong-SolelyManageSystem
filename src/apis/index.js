
export default [

  //user
  {
    name: '登录',
    method: 'login',
    path: '/Func/Common/loginByUp',
    tokenFlag:'false',
    type: 'post'
  },

  {
    name: '获取用户',
    method: 'userGet',
    path: '/Base/User/get',
    type: 'post'
  },
  {
    name: '删除用户',
    method: 'userDelete',
    path: '/Base/User/delete',
    type: 'post'
  },
  {
    name: '更新用户',
    method: 'userUpdate',
    path: '/Base/User/update',
    type: 'post'
  },
  {
    name: '新增用户',
    method: 'userAdd',
    path: '/Base/User/add',
    type: 'post'
  },

  {
    name: '更新权限',
    method: 'updateAuth',
    path: '/Project/Solely/setAuth',
    type: 'post'
  },
  {
    name: '更新用户信息',
    method: 'userInfoUpdate',
    path: '/Common/UserInfo/update',
    type: 'post'
  },

  {
    name: '新增用户信息',
    method: 'userInfoAdd',
    path: '/Common/UserInfo/add',
    type: 'post'
  },

  {
    name: '上传图片',
    method: 'uploadImg',
    path: '/Base/FtpFile/upload',
    type: 'post'
  },


  {
    name: '获取文章列表',
    method: 'articleGet',
    path: '/Common/Article/get',
    type: 'post'
  },
  {
    name: '添加文章',
    method: 'articleAdd',
    path: '/Common/Article/add',
    type: 'post'
  },
  {
    name: '编辑文章',
    method: 'articleUpdate',
    path: '/Common/Article/update',
    type: 'post'
  },

  {
    name: '删除文章',
    method: 'articleDelete',
    path: '/Common/Article/delete',
    type: 'post'
  },




  {
    name: '获取label信息',
    method: 'labelGet',
    path: '/Common/Label/get',
    type: 'post',

  },
  {
    name: '新增label信息',
    method: 'labelAdd',
    path: '/Common/Label/add',
    type: 'post',

  },
  {
    name: '删除label信息',
    method: 'labelDelete',
    path: '/Common/Label/delete',
    type: 'post',

  },
  {
    name: '更新label信息',
    method: 'labelUpdate',
    path: '/Common/Label/update',
    type: 'post',

  },


  {
    name: '获取thirdApp信息',
    method: 'thirdAppGet',
    path: 'Base/ThirdApp/get',
    type: 'post',
  },
  {
    name: '增加thirdApp信息',
    method: 'thirdAppAdd',
    path: 'Base/ThirdApp/add',
    type: 'post',
  },
  {
    name: '更新thirdApp信息',
    method: 'thirdAppUpdate',
    path: 'Base/ThirdApp/update',
    type: 'post',
  },
  {
    name: '删除thirdApp信息',
    method: 'thirdAppDelete',
    path: 'Base/ThirdApp/delete',
    type: 'post',
  },


  {
    name: '获取article信息',
    method: 'articleGet',
    path: 'Common/Article/get',
    type: 'post',
  },
  {
    name: '增加article信息',
    method: 'articleAdd',
    path: 'Common/Article/add',
    type: 'post',
  },
  {
    name: '更新article信息',
    method: 'articleUpdate',
    path: 'Common/Article/update',
    type: 'post',
  },
  {
    name: '删除article信息',
    method: 'articleDelete',
    path: 'Common/Article/delete',
    type: 'post',
  },

  {
    name: '获取routine信息',
    method: 'routineGet',
    path: 'Common/Routine/get',
    type: 'post',
  },
  {
    name: '增加routine信息',
    method: 'routineAdd',
    path: 'Common/Routine/add',
    type: 'post',
  },
  {
    name: '更新routine信息',
    method: 'routineUpdate',
    path: 'Common/Routine/update',
    type: 'post',
  },
  {
    name: '删除routine信息',
    method: 'routineDelete',
    path: 'Common/Routine/delete',
    type: 'post',
  },



  {
    name: '获取userInfo信息',
    method: 'userInfoGet',
    path: 'Common/UserInfo/get',
    type: 'post',
  },





  {
    name: '获取client信息',
    method: 'clientGet',
    path: 'Common/Client/get',
    type: 'post',
  },
  {
    name: '增加client信息',
    method: 'clientAdd',
    path: 'Common/Client/add',
    type: 'post',
  },
  {
    name: '更新client信息',
    method: 'clientUpdate',
    path: 'Common/Client/update',
    type: 'post',
  },
  {
    name: '删除client信息',
    method: 'clientDelete',
    path: 'Common/Client/delete',
    type: 'post',
  },



  {
    name: '获取conversation信息',
    method: 'conversationGet',
    path: 'Common/Conversation/get',
    type: 'post',
  },
  {
    name: '增加conversation信息',
    method: 'conversationAdd',
    path: 'Common/Conversation/add',
    type: 'post',
  },
  {
    name: '更新conversation信息',
    method: 'conversationUpdate',
    path: 'Common/Conversation/update',
    type: 'post',
  },
  {
    name: '删除conversation信息',
    method: 'conversationDelete',
    path: 'Common/Conversation/delete',
    type: 'post',
  },


  {
    name: '获取statistics信息',
    method: 'statisticsGet',
    path: 'Common/Statistics/get',
    type: 'post',
  },
  {
    name: '增加statistics信息',
    method: 'statisticsAdd',
    path: 'Common/Statistics/add',
    type: 'post',
  },
  {
    name: '更新statistics信息',
    method: 'statisticsUpdate',
    path: 'Common/Statistics/update',
    type: 'post',
  },
  {
    name: '删除statistics信息',
    method: 'statisticsDelete',
    path: 'Common/Statistics/delete',
    type: 'post',
  },


  {
    name: '获取project信息',
    method: 'projectGet',
    path: 'Common/Project/get',
    type: 'post',
  },
  {
    name: '增加project信息',
    method: 'projectAdd',
    path: 'Common/Project/add',
    type: 'post',
  },
  {
    name: '更新project信息',
    method: 'projectUpdate',
    path: 'Common/Project/update',
    type: 'post',
  },
  {
    name: '删除project信息',
    method: 'projectDelete',
    path: 'Common/Project/delete',
    type: 'post',
  },


  {
    name: '获取process信息',
    method: 'processGet',
    path: 'Common/Process/get',
    type: 'post',
  },
  {
    name: '增加process信息',
    method: 'processAdd',
    path: 'Common/Process/add',
    type: 'post',
  },
  {
    name: '更新process信息',
    method: 'processUpdate',
    path: 'Common/Process/update',
    type: 'post',
  },
  {
    name: '删除process信息',
    method: 'processDelete',
    path: 'Common/Process/delete',
    type: 'post',
  },


  {
    name: '获取salary信息',
    method: 'salaryGet',
    path: 'Common/Salary/get',
    type: 'post',
  },
  {
    name: '增加salary信息',
    method: 'salaryAdd',
    path: 'Common/Salary/add',
    type: 'post',
  },
  {
    name: '更新salary信息',
    method: 'salaryUpdate',
    path: 'Common/Salary/update',
    type: 'post',
  },
  {
    name: '删除salary信息',
    method: 'salaryDelete',
    path: 'Common/Salary/delete',
    type: 'post',
  },

  {
    name: '获取salaryFlow信息',
    method: 'salaryFlowGet',
    path: 'Common/SalaryFlow/get',
    type: 'post',
  },
  {
    name: '增加salaryFlow信息',
    method: 'salaryFlowAdd',
    path: 'Common/SalaryFlow/add',
    type: 'post',
  },
  {
    name: '更新salaryFlow信息',
    method: 'salaryFlowUpdate',
    path: 'Common/SalaryFlow/update',
    type: 'post',
  },
  {
    name: '删除salaryFlow信息',
    method: 'salaryFlowDelete',
    path: 'Common/SalaryFlow/delete',
    type: 'post',
  },


  {
    name: '获取resume信息',
    method: 'resumeGet',
    path: 'Common/Resume/get',
    type: 'post',
  },
  {
    name: '增加resume信息',
    method: 'resumeAdd',
    path: 'Common/Resume/add',
    type: 'post',
  },
  {
    name: '更新resume信息',
    method: 'resumeUpdate',
    path: 'Common/Resume/update',
    type: 'post',
  },
  {
    name: '删除resume信息',
    method: 'resumeDelete',
    path: 'Common/Resume/delete',
    type: 'post',
  },

  {
    name: '获取payment信息',
    method: 'paymentGet',
    path: 'Common/Payment/get',
    type: 'post',
  },
  {
    name: '增加payment信息',
    method: 'paymentAdd',
    path: 'Common/Payment/add',
    type: 'post',
  },
  {
    name: '更新payment信息',
    method: 'paymentUpdate',
    path: 'Common/Payment/update',
    type: 'post',
  },
  {
    name: '删除payment信息',
    method: 'paymentDelete',
    path: 'Common/Payment/delete',
    type: 'post',
  },


  {
    name: '获取mission信息',
    method: 'missionGet',
    path: 'Common/Mission/get',
    type: 'post',
  },
  {
    name: '增加mission信息',
    method: 'missionAdd',
    path: 'Common/Mission/add',
    type: 'post',
  },
  {
    name: '更新mission信息',
    method: 'missionUpdate',
    path: 'Common/Mission/update',
    type: 'post',
  },
  {
    name: '删除mission信息',
    method: 'missionDelete',
    path: 'Common/Mission/delete',
    type: 'post',
  },


  {
    name: '获取ipLog信息',
    method: 'ipLogGet',
    path: 'Common/IpLog/get',
    type: 'post',
  },
  {
    name: '增加ipLog信息',
    method: 'ipLogAdd',
    path: 'Common/IpLog/add',
    type: 'post',
  },
  {
    name: '更新ipLog信息',
    method: 'ipLogUpdate',
    path: 'Common/IpLog/update',
    type: 'post',
  },
  {
    name: '删除ipLog信息',
    method: 'ipLogDelete',
    path: 'Common/IpLog/delete',
    type: 'post',
  },
  
  
  {
    name: '添加ip信息',
    method: 'newAddIpLog',
    path: 'Project/Solely/newAddIpLog',
    type: 'post',
  },
  
  {
    name: '生成工资',
    method: 'createSalary',
    path: 'Project/Solely/createSalary',
    type: 'post',
  },


]
