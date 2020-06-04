# solely项目开发文档

### 目录

- 功能概述
- 数据对照表

---

**1\. 功能概述**

&emsp;&emsp;项目主要功能包括：
多商户api，包含权限管理、用户管理、菜单管理、文章管理、商品管理、优惠券管理等基本模块；
支持微信支付、公众号文章获取、公众号菜单编辑、小程序模板消息等微信功能；
支持七牛云在线图片管理；

---
**2\. 数据对照表**

通用字段说明

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| id | int(11)| 主键：该数据ID |
| listorder | int(11) | 自定义排序 |
| img_array | varchar(100) | 图片组 |
| create_time | int(11) | 创建时间 |
| update_time | int(11) | 更新时间 |
| delete_time | bigint(13) | 删除时间 |
| thirdapp_id | int(11) | 关联thirdapp |
| user_no | varchar(255) | 关联user |
| user_type | tinyint(2) | 用户类型0.前端2.cms |
| status | tinyint(2) | 状态:1正常；-1删除 |


### user表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| nickname | varchar(255) | 微信昵称 |
| openid | varchar(255)| 微信openid |
| headImgUrl | varchar(9999) | 微信头像 |
| primary_scope | int(255) | 权限级别：90.平台管理员;60.项目管理员;30.管理员;10.用户 |
| user_type | itinyint(10) | 0,小程序用户;2,cms用户; |
| user_no | varchar(255) | 用户编号 |
| behavior | tinyint(2) | 0.生成工资1.不生成工资 |


### user_info表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| gender | tinyint(2) | 性别:1.男;2.女 |
| phone | varchar(255) | 电话 |
| level | varchar(30) | 员工级别 |
| behavior | tinyint(2) | 1.开发2.销售3.运营4.人事.5、财务 |
| score_ratio | int(2) | 1.正式员工2.实习员工 |

| salary | int(12) | 起步薪资 |


### label表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------  |
| title | varchar(40) | 菜单名称 |
| description| varchar(255) | 描述 |
| parentid| int(11) | 父级菜单ID |
| type | tinyint(2) |  1,menu;2,menu_item; |


### article表

| 字段 | 类型 | 说明 |
| ------ |  :------:  | ------  |
| title | varchar(100) | 文章标题 |
| menu_id | int(11) | 关联label表 |
| description | varchar((255) | 描述 |
| content | text | 文章内容 |
| mainImg | varchar(9999) | 文章主图，一般在列表渲染 |



### message表-留言(type=1)

| 字段 | 类型 | 说明 |
| ------ |  :------:  | ------  |
| title | varchar(255) | 标题 |
| description | varchar(255) | 描述 |
| content | text | 内容 |
| mainImg | varchar(999) | 主图，一般在列表渲染 |



### log表

| 字段 | 类型 | 说明 |
| ------ |  :------:  | ------  |
| type | int(11) | 类别:3.签到 |
| behavior | tinyint(2) | 1.合格2.迟到3.早退 |



### pay_log表

| 字段 | 类型 | 说明 |
| ------ |  :------:  | ------  |
| title | varchar(255) | 标题 |
| result | varchar(255) | 结果描述 |
| content | text | 详情 |
| type | int(11) | 类别:1.微信支付 |
| order_no | varchar(100) | 关联order |
| pay_no | varchar(255) | 关联flowLog |
| transaction_id | varchar(255) | 微信流水 |
| behavior | int(11) | 预留 |
| pay_info | varchar(999) | 支付信息 |
| prepay_id | varchar(255) | 订单微信支付的预订单id(用于发送模板消息) |
| wx_prepay_info | varchar(999) | 储存微信预支付信息，再次调起支付使用 |



### coupon表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| coupon_no | varchar(255) | 优惠券编号 |
| title | varchar(255) | 标题 |
| description | varchar(255) | 描述 |
| content | text | 详情 |
| mainImg | text | 主图 |
| bannerImg | text | 轮播图 |
| price | decimal(10,2) | 价格 |
| score | int(11) | 最高可使用积分 |
| value | int(11) | 价值，可抵扣金额 |
| discount | int(11) | 折扣百分比，默认100，即无折扣 |
| condition | int(11) | 使用条件，满减要求 |
| stock | int(11) | 库存 |
| sale_count | int(11) | 销量 |
| type | int(11) | 1.抵扣券2.折扣券 |



### user_coupon表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| type | tinyint(2) | 1.抵扣券2.折扣券 |
| use_step | tinyint(2) | 1.未使用2.已使用-1.已过期 |



## 项目管理相关表

### project表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| project_no | varchar(255) | 项目编号 |
| name | varchar(200) | 项目名称 |
| client | varchar(200) | 客户名称 |
| phone | varchar(200) | 客户电话 |
| description | varchar(255) | 项目描述 |
| project_status | varchar(200) | 项目状态 |
| pay_standard | varchar(200) | 项目付款说明 |
| content | text | 项目详情 |
| period | varchar(200) | 项目工期 |
| strat_time | bigint(13) | 开始开发时间 |
| end_time | bigint(13) | 开发完成时间 |
| total_amount | decimal(10,2) | 项目总金额 |
| project_manager | varchar(255) | 业务经理user_no |
| sales_manager | varchar(255) | 销售经理user_no |
| client_no | varchar(255) | 客户user_no |
| vaild_time | bigint(13) | 项目有效期 |
| design_time | bigint(13) | 设计用时 |
| web_time | bigint(13) | 页面用时 |
| program_time | bigint(13) | 前端用时 |
| cms_time | bigint(13) | cms用时 |
| api_time | bigint(13) | api用时 |
| server_time | bigint(13) | 服务器到期时间 |
| domain_name_time_time | bigint(13) | 域名到期时间 |
| mainImg | text | 主图 |
| file | text | 文件上传 |
| sign_time | bigint(13) | 签订功能时间 |
| sign_status | tinyint(2) | 0.未签订1.已签订 |



### process表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| name | varchar(255) | 标题 |
| process_type | tinyint(2) | 1.内部反馈2.外部反馈 |
| develop_type | tinyint(2) | 1.cms,2.api,3.program,4.web,5.design,6.other |
| function_type | tinyint(2) | 1.功能变更,2.功能修复,3.样式变更,4.样式修复,5.动态,6.开发任务 |
| step | tinyint(2) | 1.普通,2.待客户确认,3.客户确认,4.待开发,5.开发完成,6.待开发确认 |
| strat_time | bigint(13) | 开始开发时间 |
| end_time | bigint(13) | 开发完成时间 |
| estimated_time | bigint(13) | 预计完成时间 |
| content | text | 详情 |
| description | varchar(255) | 描述 |
| mainImg | text | 主图 |
| file | text | 文件上传 |
| project_no | varchar(255) | 关联project表 |



### payment表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| money | decimal(10,2) | 金额 |
| description | varchar(255) | 说明 |
| channel | varchar(255) | 支付渠道 |
| confirm | varchar(255) | 是否确认，1未确认，0已确认 |
| project_no | varchar(255) | 关联project表 |



### client客户表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| name | varchar(255) | 客户姓名 |
| phone | varchar(50) | 电话 |
| address | varchar(255) | 地址 |
| mainImg | text | 主图 |
| description | varchar(255) | 需求简介 |
| step | tinyint(2) | 1.待联系，2.沟通中，3.已面访，4.同行，5.签单 |
| origin | tinyint(2) | 来源：1、'58',2、'百度',3、'猪八戒快车',4、'转介绍',5、'其他',6、'58财务'7、猪八戒投标8、猪八戒商机9、猪八戒列表刷新10、猪八戒自然流量 |
| plan_time | bigint(13) | 计划回访时间 |
| sales_manager | varchar(255) | 销售经理user_no（public表明公共客户） |
| remark | varchar(255) | 搜索词 |
| cause | varchar(255) | 1、客户失联2、客户放弃3、报价高4、技术不符5、区域不符6、选择自身相关资源7、其他原因选择其他公司 |



### conversation客户沟通表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| client_id | int(11) | 关联client表 |
| description | varchar(255) | 沟通内容 |



### operation渠道客户表(有效客户自动保存到客户表)

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| name | varchar(255) | 客户姓名 |
| phone | varchar(50) | 电话 |
| address | varchar(255) | 地址 |
| mainImg | text | 主图 |
| description | varchar(255) | 需求简介 |
| step | tinyint(2) | 1.有效,2.无效 |
| origin | tinyint(2) | 来源：1.58,2.百度,3.猪八戒,4.解放号,5.汇桔网 |
| sales_manager | varchar(255) | 销售经理user_no |
| day_time | varchar(50) | 日期 |
| remark | varchar(255) | 备注 |



### salesphone电话数据表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| name | varchar(255) | 客户姓名 |
| phone | varchar(255) | 客户电话 |
| address | varchar(255) | address |
| step | tinyint(2) | 状态：1.待联系，2.有意向，3.无意向，4.未接通/无效 |
| message | varchar(255) | 备注信息 |



### salary工资条表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| title | varchar(255) | 标题 |
| relation_user | varchar(255) | 关联user表 |
| position | varchar(255) | 职位 |
| base | decimal(10,2) | 底薪 |
| performance | decimal(10,2) | 绩效 |
| basic_salary | decimal(10,2) | 基本薪资 |
| reward | decimal(10,2) | 奖励金额 |
| punish | decimal(10,2) | 扣除金额 |
| per_reward | decimal(10,2) | 绩效奖励 |
| per_punish | decimal(10,2) | 绩效扣除 |
| leave | decimal(10,2) | 请假（天） |
| absenteeism | decimal(10,2) | 旷工（天） |
| attendance | decimal(10,2) | 实际出勤 |
| total | decimal(10,2) | 总计 |
| other | varchar(255)  | 其他 |



### salary_flow工资流水

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| type | tinyint(2) | 1.奖励，2.扣款，3.绩效奖励，4.绩效扣除 |
| score | int(11) | 绩效分 |
| money | decimal(10,2) | 金额 |
| description | varchar(255) | 说明 |
| relation_id | int(11) | 关联salary |
| relation_user | varchar(255) | 关联user表 |
| record_time | int(11) | 记录时间 |



### resume简历表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| title | varchar(255) | 姓名 |
| gender | tinyint(2) | 性别:1.男;2.女 |
| relation_id | int(11) | 应聘职位，关联 article |
| mainImg | text | 头像 |
| content | text | 工作经历 |
| college | varchar(255) | 毕业院校以及专业 |
| education | varchar(100) | 学历 |
| passage_array | varchar(255) | 出生年月 |
| phone | varchar(255) | 联系电话 |
| origin | tinyint(2) | 1.智联2.公司要约3.boss直聘 |
| behavior | tinyint(2) | 状态：1.待面试，2.已面试，3.已入职，4.未通过 |
| remark | varchar(255) | 备注说明 |



### statistics表-运营数据(type=1)

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| total_num | int(11) | 咨询客户 |
| valid_num | int(11) | 有效客户 |
| invalid_num | int(11) | 无效客户 |
| cost | decimal(10,2) | 花费 |
| day_time | varchar(50) | 日期 |
| origin | tinyint(2) | 来源：1.58，2.百度，3.猪八戒，4.解放号，5.汇桔网 |



### statistics表-HR数据(type=2)

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| total_num | int(11) | 邀约总数 |
| valid_num | int(11) | 有效邀约 |
| deal_num | int(11) | 面试人数 |
| origin | tinyint(2) | 来源：1.智联,2.公司邀约,3.BOSS直聘 |



### daily表-日志-new

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| type | tinyint(2) | 1.日期2.内容 |
| day_time | int(11) | 记录日期 |
| content | varchar(500) | 内容 |
| behavior | tinyint(2) | 1.合格2.超时 |



### ip_log表

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| ip | varchar(50) | ip记录 |
| origin | varchar(50) | 访问来源 |
| content | varchar(500) | 访客记录 |
| type | tinyint(2) | 1.标签2.记录 |
| count | int(11) | 计数 |



### message表-外出记录(type=4)

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| passage1 | varchar(255) | 经度 |
| passage2 | varchar(255) | 纬度 |
| keywords | varchar(255) | 详细地址 |
| description | varchar(255) | 缘由 |
| mainImg | text | 照片 |
| relation_id | varchar(255) | 关联client表 |



### message表-请假(type=5)

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| keywords | varchar(255) | 时长 |
| description | varchar(255) | 请假事由 |
| class | tinyint(2) | 请假类型：1.病假,2.事假,3.调休,4.年假,5.婚假,6.丧假,7.产假 |
| behavior | tinyint(2) | 审核状态：1.申请中,2.部门审核,3.人事审核,4.公司审核 |
| passage1 | text | HR审核天数 |




### message表-咨询管理(type=11)

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |
| phone | varchar(255) | 咨询人手机 |
| title | varchar(255) | 被咨询名片名字 |
| relation_id | int(11) | 被咨询名片id |





### routine表-日常

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |

| type | tinyint(2) | 1\日志 |
| behavior | tinyint(2) | 0、正常 1、延期 |

| type | tinyint(2) | 2、签到 |
| behavior | tinyint(2) | 0、'正常'1、'迟到'2、'早退'|
| num | int(12) | 0、'签到'1、'签退'|
| end_time | int(12) | 当天签到签退时间差 |



| type | tinyint(2) | 3、外出 |
| behavior | tinyint(2) | 0、'正常'1、'异常'|
| start_time | int(12) | 出发时间|
| arrive_time | int(12) | 到达时间|
| back_time | int(12) | 返程时间|
| end_time | int(12) | 结束时间|

| type | tinyint(2) | 4、请假 |
| behavior | tinyint(2) | 0、'事假'1、'病假'2、'年假'3、'其他'|
| num | int(12) | 0、'未审核'1、'已审核'2、'拒绝'|
| start_time | int(12) | 请假开始时间|
| end_time | int(12) | 请假结束时间|


| type | tinyint(2) | 5、其他奖惩 |
| behavior | tinyint(2) | 0、'绩效扣除'1、'绩效奖励'2、'金额扣除'3、'金额奖励'4、'全额扣除'5、'全额奖励'|
| num | int(12) | 比例或金额 |


### mission表-任务

| 字段 | 类型 | 说明 |
| ------ | ------  | ------ |

| type | tinyint(2) | 0、'待完成'1、'完成' |
| behavior | tinyint(2) | 0、'正常' 1、'超时'|
| content | text | 内容 |
| response | text | 回复 |
| dead_time | bigInt(13) | 截止时间|
| publish_user | varchar(255) | 发布者 |


### salaryFlow表


| type | tinyint(2) | 0、'绩效扣除'1、'绩效奖励'2、'金额扣除'3、'金额奖励'4、'全额扣除'5、'全额奖励'6、'基本工资'、7、'基础绩效'|
---
