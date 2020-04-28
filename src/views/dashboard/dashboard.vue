<template>
    <div style="height: 100%;">

        <el-row :gutter="20" style="height: 100%;">
            <el-col :span="12" style="height: 100%;">
                <el-row style="height: 100%;">
                    <el-col style="height: 100%;">
                        <el-card shadow="hover" class="mgb20" style="height:30%;" body-style="height:100%">
                            <div style="height: 70%;display: flex;">
                                <div style="width: 18%;">
                                  <img :src="user.mainImg&&user.mainImg.length>0?user.mainImg[0]['url']:'../../assets/logo.png'" class="user-avator" />
                                  <img style="width: 80px;" :src="qrcode"/>
                                </div>
                                <div class="user-info-cont">
                                    <div>{{user.name}}</div>
                                    <div style="margin-top: 20px;text-align: left;">电话：{{user.phone}}</div>
                                    <div style="text-align: left;">薪级：{{user.level}}</div>
                                </div>
                                <div style="text-align: center;width: 50%;">
                                  <div>
                                    <el-button type="primary" plain style="margin-bottom:5px;" size="small" @click="onClickBtn(['编辑信息',{},btn_info[6]])">编辑信息</el-button>

                                    <el-button type="primary" plain style="margin-bottom:5px;" size="small" @click="onClickBtn(['写日志',{},btn_info[3]])">写日志</el-button>
                                  </div>
                                  <div>
                                    <el-button type="primary" plain style="margin-bottom:5px;" size="small" @click="onClickBtn(['签到',{},btn_info[5]])">{{isSign?'签退':'签到'}}</el-button>
                                    <el-button type="primary" plain style="margin-bottom:5px;" size="small" @click="onClickBtn(['添加任务',{},btn_info[4]])">添加任务</el-button>
                                  </div>
                                </div>
                            </div>
                            <div class="user-info-list">上次登录时间：<span>{{self.$$formatDate( new Date(parseInt(self.$store.getters.getUserinfo.lastlogintime*1000)) ,'yyyy-MM-dd hh:mm')}}</span></div>
                        </el-card>
                        <el-card shadow="hover" style="height:50%;padding-bottom: 15%;overflow: hidden;" body-style="height:100%">
                            <div slot="header" class="clearfix">
                                <span>任务列表<span style="font-size: 14px;">&nbsp;&nbsp;(--{{missionData.length}}--项待完成)</span></span>
                            </div>
                            <div style="height:100%;overflow: auto;">
                              <div style="width:49%;float:left;margin-right: 0.5%;break-inside: avoid;">
                                <template v-for="(item,index) in leftMissionData">
                                  <el-card :key="index"  shadow="hover" style="width:99%;margin-bottom: 10px;">
                                    <div style="text-align: left;margin-bottom: 10px;font-size:14px;font-weight: bold;color:#f56c6c">发布者&nbsp;&nbsp;&nbsp;--&nbsp;{{item.Punlisher.name}}</div>
                                    <div style="margin-bottom: 30px;word-wrap: break-word;word-break: normal;">{{item.content}}</div>
                                    <div style="text-align: left;font-size: 14px;margin-bottom: 10px;"><span style="font-weight: bold;">截止时间：</span><span>
                                    {{self.$$formatDate( new Date(parseInt(item.dead_time)) ,'yyyy-MM-dd hh:mm')}}
                                    </span></div>
                                    <div class="user-info-list">{{item.create_time}}</div>
                                    <div style="text-align: left;">
                                      <el-button @click="onClickBtn(['编辑',item,btn_info[0]])" type="small" icon="el-icon-edit" circle></el-button>
                                      &nbsp;&nbsp;&nbsp;
                                      <span v-if="parseInt(item.dead_time)>new Date().getTime()" style="font-size:14px">正常</span>
                                      <span v-else style="font-size:14px;color:red">已延期</span>
                                    </div>
                                  </el-card>
                                </template>
                              </div>
                              <div style="width:49%;float:left;margin-right: 0.5%;break-inside: avoid;">
                                <template v-for="(item,index) in rightMissionData">
                                  <el-card :key="index"  shadow="hover" style="width:99%;margin-bottom: 10px;">
                                    <div style="text-align: left;margin-bottom: 10px;font-size:14px;font-weight: bold;color:#f56c6c">发布者&nbsp;&nbsp;&nbsp;--&nbsp;{{item.Punlisher.name}}</div>
                                    <div style="margin-bottom: 30px;word-wrap: break-word;word-break: normal;">{{item.content}}</div>
                                    <div style="text-align: left;font-size: 14px;margin-bottom: 10px;"><span style="font-weight: bold;">截止时间：</span><span>
                                    {{self.$$formatDate( new Date(parseInt(item.dead_time)) ,'yyyy-MM-dd hh:mm')}}
                                    </span></div>
                                    <div class="user-info-list">{{item.create_time}}</div>
                                    <div style="text-align: left;">
                                      <el-button @click="onClickBtn(['编辑',item,btn_info[0]])" type="small" icon="el-icon-edit" circle></el-button>
                                      &nbsp;&nbsp;&nbsp;
                                      <span v-if="parseInt(item.dead_time)>new Date().getTime()" style="font-size:14px">正常</span>
                                      <span v-else style="font-size:14px;color:red">已延期</span>
                                    </div>
                                  </el-card>
                                </template>
                              </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12" style="height: 100%;">
                <el-card shadow="hover"  style="overflow:auto;height:95%">
                    <div slot="header" class="clearfix">
                        <span>主面板</span>
                    </div>
                    <template>
                        <el-main>
                          <template v-for="(item,index) in mainData">
                            <el-card :key="index" v-if="item.type==1" shadow="hover" class="mgb20">
                              <div style="text-align: left;margin-bottom: 10px;font-weight: bold;color:#30b7f4">日志&nbsp;&nbsp;&nbsp;--&nbsp;{{item.behavior=='1'?'延期':'正常'}}</div>
                              <div style="margin-bottom: 30px;">{{item.content}}</div>
                              <div class="user-info-list">{{item.create_time}}</div>
                            </el-card>
                            <el-card :key="index" v-if="item.type==5" shadow="hover" class="mgb20">
                              <div style="text-align: left;margin-bottom: 10px;font-weight: bold;color:#f1e05a">其他&nbsp;&nbsp;&nbsp;--&nbsp;{{optionData.disciplineBehaviorOptions[item.behavior]['text']}}</div>
                              <div style="margin-bottom: 30px;">{{item.content}}</div>
                              <div style="text-align: left;font-size: 14px;margin-bottom: 10px;">
                                <span style="font-weight: bold;">金额或比例：</span>
                                <span>
                                  {{item.num}}
                                </span>
                                </div>
                              <div class="user-info-list">{{item.create_time}}</div>
                            </el-card>
                            <el-card :key="index" v-if="item.type==2" shadow="hover" class="mgb20">
                              <div style="text-align: left;margin-bottom: 10px;font-weight: bold;color:#30b7f4">{{item.num==0?'签到':'签退'}}&nbsp;&nbsp;&nbsp;--&nbsp;{{item.behavior=='0'?'正常':(item.num==0?'迟到':'早退')}}</div>
                              <div class="user-info-list">{{item.create_time}}</div>
                            </el-card>
                            <el-card :key="index" v-if="item.type==4" shadow="hover" class="mgb20">
                              <div style="text-align: left;margin-bottom: 10px;font-weight: bold;color:#f56c6c">请假&nbsp;&nbsp;&nbsp;--&nbsp;{{optionData.checkBehaviorOptions[item.behavior]['text']}}</div>
                              <div style="margin-bottom: 30px;">{{item.content}}</div>
                              <div style="text-align: left;font-size: 14px;margin-bottom: 10px;"><span style="font-weight: bold;">请假时间：</span><span>
                              {{self.$$formatDate( new Date(parseInt(item.start_time)) ,'yyyy-MM-dd hh:mm')}}
                              --
                              {{self.$$formatDate( new Date(parseInt(item.end_time)) ,'yyyy-MM-dd hh:mm')}}
                              </span></div>
                              <div class="user-info-list">{{item.create_time}}</div>
                            </el-card>
                            <el-card :key="index" v-if="item.type==3" shadow="hover" class="mgb20">
                              <div style="text-align: left;margin-bottom: 10px;font-weight: bold;color:#30b7f4">外出&nbsp;&nbsp;&nbsp;--&nbsp;{{optionData.outdoorsBehaviorOptions[item.behavior]['text']}}</div>
                              <div style="margin-bottom: 30px;">
                              <component
                               :defaultValue="item.coordinate"
                               :is="'baidu-map'"
                               :fieldArguments="{textHide:true,style:'width:100%;height:200px'}"
                               >
                              </component></div>
                              <div style="text-align: left;font-size: 14px;margin-bottom: 10px;"><span style="font-weight: bold;">出发到达时间：</span><span>
                              {{self.$$formatDate( new Date(parseInt(item.start_time)) ,'yyyy-MM-dd hh:mm')}}
                              --
                              {{self.$$formatDate( new Date(parseInt(item.arrive_time)) ,'yyyy-MM-dd hh:mm')}}
                              </span></div>
                              <div style="text-align: left;font-size: 14px;margin-bottom: 10px;"><span style="font-weight: bold;">返程结束时间：</span><span>
                              {{self.$$formatDate( new Date(parseInt(item.back_time)) ,'yyyy-MM-dd hh:mm')}}
                              --
                              {{self.$$formatDate( new Date(parseInt(item.end_time)) ,'yyyy-MM-dd hh:mm')}}
                              </span></div>
                              <div class="user-info-list">{{item.create_time}}</div>
                            </el-card>
                          </template>
                        </el-main>
                    </template>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog
        :title="btnNow.text&&btnNow.text(orginFormData)?btnNow.text(orginFormData):''"
        :visible.sync="dialog.dialogFormVisible"
        :close-on-click-modal = 'false'
        >
          <div style="overflow:hidden;zoom:1;text-align: left;padding: 2%;">
            <template v-for='(field,index) in fields'>
               <div
                :key="index"
                 v-if="btnName&&field.application&& field.application.indexOf(btnName)>-1&&((field.isHide&&!field.isHide(self))||!field.isHide)"
                 style="float: left;margin-right: 2%;margin-bottom:5%;padding-left: 1%;"
                 :style="field.dialogStyle?field.dialogStyle:'width:47%'"
                 :label-width="formLabelWidth"
               >
                 <div style="display: inline-block;width: 100px;text-align: left;font-weight: bold;vertical-align: top;">{{field.label}}：</div>
                 <div style="display: inline-block;min-width: 225px;min-height: 50px;">
                   <component
                     :field="field"
                     :optionData="optionData[field.optionsName]"
                     :defaultValue="formData[field.key]||formData[field.key]==0?formData[field.key]:''"
                     :is="field.componentName || 'sls-input'"
                     :fieldArguments="field.dialog?field.dialog:'{}'"
                     @onChange="dialog_fieldChange"
                   >
                   </component>
                 </div>
               </div>
            </template>

          </div>
          <div slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button @click="dialog.dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
  import dashboardJs from './dashboard.js'
  export default dashboardJs
</script>


<style scoped>

    .el-row {
        margin-bottom: 20px;
    }
    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    .user-info-cont {
        width: 30%;
        margin-left: 10px;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
        text-align: center;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
        border-top: 1px solid #e6e2e2;

    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

</style>
