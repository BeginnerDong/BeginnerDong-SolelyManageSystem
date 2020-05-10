
import HelloWorld from '@/components/HelloWorld'
import { Login,User,Content,Work,Advertising,Develope,Hr,Dashboard } from '../views/'
import { Home } from '../layout/'


export default [
  {
    path: '/',
    name: 'cms',
    redirect: '/login'


  },
  {
    path: '/login',
    name: '登录',
    hidden: true,
    meta: {
      noRequireAuth: true,
      application:['notInTab','notInAuth']
    },
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{},
    children: [
      {
        path: 'dashboard',
        name: '控制面板',
        component: Dashboard.Dashboard
      },
      {
        path: 'adminLists',
        name: '管理员列表',
        component: User.AdminLists
      },
      {
        path: 'access',
        name: '权限管理',
        component: User.Access
      },
      {
        path: 'staff',
        name: '员工管理',
        component: User.Staff
      },
      {
        path: 'role',
        name: '角色管理',
        component: User.Role
      },
      {
        path: 'access',
        name: '权限管理',
        component: User.Access
      },
      {
        path: 'articleLabel',
        name: '文章菜单',
        component: Content.Articlelabel
      },
      {
        path: 'caseList',
        name: '案例库',
        component: Content.CaseList
      },
      {
        path: 'eduList',
        name: '资料库',
        component: Content.EduList
      },
      {
        path: 'thirdApp',
        name: '配置列表',
        component: User.ThirdApp
      },
      {
        path: 'Article',
        name: '文章列表',
        component: Content.ArticleLists
      },
      {
        path: 'Journal',
        name: '日志管理',
        component: Work.Journal
      },
      {
        path: 'check',
        name: '考勤管理',
        component: Work.Check
      },
      {
        path: 'sign',
        name: '签到',
        component: Work.Sign
      },
      {
        path: 'mission',
        name: '任务',
        component: Work.Mission
      },
      {
        path: 'outdoors',
        name: '外出记录',
        component: Work.Outdoors
      },
      {
        path: 'discipline',
        name: '其他扣除或收入',
        component: Work.Discipline
      },
      {
        path: 'clients',
        name: '客户',
        component: Advertising.Clients
      },
      {
        path: 'statistics',
        name: '渠道统计',
        component: Advertising.Statistics
      },
      {
        path: 'project',
        name: '项目管理',
        component: Develope.Project
      },
      {
        path: 'projectNews',
        name: '项目动态',
        component: Develope.ProjectNews
      },
      {
        path: 'salary',
        name: '薪酬管理',
        component: Hr.Salary
      },
      {
        path: 'resume',
        name: '简历管理',
        component: Hr.Resume
      },
      {
        path: 'payment',
        name: '项目回款',
        component: Develope.Payment
      },
      {
        path: 'paymentOut',
        name: '公司支出',
        component: Hr.PaymentOut
      },
      {
        path: 'hrStatistics',
        name: 'hr统计',
        component: Hr.Statistics
      },
      {
        path: 'ip',
        name: 'ip统计',
        component: Advertising.Ip
      },
      {
        path: 'statistic',
        name: '渠道统计',
        component:Dashboard.Statistic
      },
      {
        path: 'payStatistic',
        name: '收支统计',
        component:Dashboard.PayStatistic
      },

    ]
  }
]
