<template>
  <div class="list">
    <div style="width: 100%;position: relative;margin: 0 auto;overflow: scroll;" :style="headerStyle">
     <div style="font-size: 12px;text-align: left;color:#2d90f9">
       <span  @click="open">{{headerStyle=='height:15%'?'展开':'缩起'}}</span>
     </div>
      <div class='field_item' v-for='(field,index) in fields' :key="index"  v-if="field.header_search&&String(field.header_search)!='{}'&&((field.header_search.isHide&&!field.header_search.isHide(self))||!field.header_search.isHide)">
        <component
          :field="field"
          :optionData="field.header_search.optionsName?optionData[field.header_search.optionsName]:''"
          :defaultValue="field.header_search.defaultValue||field.header_search.defaultValue==0?field.header_search.defaultValue:''"
          :is="field.header_search.componentName"
          :fieldArguments="field.header_search?field.header_search:{}"
          @onChange="header_search_fieldChange"
        >
        </component>
      </div>
      <div style="clear:both"></div>
    </div>

    <div style="height: 90%;">
      <solely-table
        ref='solely-table'
        @onClickBtn="onClickBtn"
        @pageChange="pageChange"
        @filtersChange="filtersChange"
        @onSelectionChange="onSelectionChange"
        @initMainData="initMainData"
        :mainData='mainData'
        :Pagination="paginate"
        :BtnInfo="btn_info"
        :FieldList='fields'
        :optionData='optionData'
        :otherData='otherData'
        :BasicArguments="table_arguments"
      >

        <template v-slot:header_str>
          <span>{{header_str}}</span>
        </template>
        <template v-slot:expand="expand">
          <div style="width:23%;height: auto;display: inline-block;vertical-align: top;padding: 8px 0;">
            <span style="font-weight: bold;">项目信息</span>
            <br>
            <div>
              <div>
                <span style="font-weight: bold;">客户电话：</span>
                {{expand.data.phone}}
                <span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;cms耗时：</span>
                {{(expand.data.cms_time/86400000).toFixed(2)}}--天
              </div>
              <div>
                <span style="font-weight: bold;">功能签订：</span>
                {{self.$$formatDate( new Date(parseInt(expand.data.sign_time)) ,'yyyy-MM-dd')}}
                <span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;项目有效期：</span>
                {{self.$$formatDate( new Date(parseInt(expand.data.vaild_time)) ,'yyyy-MM-dd')}}
              </div>
              <div>
                <span style="font-weight: bold;">配置到期：</span>
                {{self.$$formatDate( new Date(parseInt(expand.data.server_time)) ,'yyyy-MM-dd')}}

              </div>
              <span style="font-weight: bold;">配置文件：</span>
              <div v-html="expand.data.content">
              </div>
            </div>
          </div>
          <div style="display: inline-block;vertical-align: top; width:1px;height: 80px;border: 1px solid #545454;;"></div>
          <div style="width: 25%;height: auto;display: inline-block;vertical-align: top;padding: 8px 0;overflow: hidden;">

            <div style="position: relative;">
              <span style="font-weight: bold;">图片</span>
              <br>
              <div style="float: left;margin-right: 5px;" v-for="(item,index) in expand.data.mainImg" :key="index">
                <el-image
                    style="width: 80px; height: 100px"
                    :src="item.url"
                    :preview-src-list="expand.data.mainImgList">
                  </el-image>
              </div>
              <div style="clear:both"></div>
            </div>

            <div>
              <span style="font-weight: bold;">文件附件</span>
              <br>
              <div style="margin-bottom: 5px;" v-for="(item,index) in expand.data.file" :key="index">
                 <li><a :href="item.url" target="view_window">文件名{{item.title}}</a></li>
              </div>
            </div>
          </div>
          <div style="display: inline-block;vertical-align: top; width:1px;height: 80px;border: 1px solid #545454;;"></div>
          <div style="width: 28%;height: auto;display: inline-block;vertical-align: top;padding: 8px 0;">
            <span style="font-weight: bold;">项目总金额：{{expand.data.total_amount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;累计支付：{{expand.data.Payment.payment}}</span>
            <br>
            <span style="font-weight: bold;">项目付款标准：{{expand.data.pay_standard}}</span>
            <br><br>
            <div v-for="(item,index) in expand.data.Payment" :key="index">
              <div v-if="item.id"  >
                <span style="font-weight: bold;">回款记录：</span>
                {{item.description}}--{{item.money}}
                <span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回款时间：</span>
                --{{item.create_time}}
              </div>
            </div>
          </div>
          <div style="display: inline-block;vertical-align: top; width:1px;height: 80px;border: 1px solid #545454;;"></div>
          <div style="width: 18%;height: auto;display: inline-block;vertical-align: top;padding: 8px; 0">
            <span style="font-weight: bold;">开发耗时统计(天)  &nbsp;&nbsp;&nbsp;项目总工期{{expand.data.period}}天</span>
            <br>
            <div>
              <div>
                <span style="font-weight: bold;">api耗时：</span>
                {{(expand.data.api_time/43200000).toFixed(2)}}
                <span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cms耗时：</span>
                {{(expand.data.cms_time/43200000).toFixed(2)}}
              </div>
              <div>
                <span style="font-weight: bold;">设计耗时：</span>
                {{(expand.data.design_time/43200000).toFixed(2)}}
                <span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页面耗时：</span>
                {{(expand.data.web_time/43200000).toFixed(2)}}
              </div>
              <div>
                <span style="font-weight: bold;">前端耗时：</span>
                {{(expand.data.program_time/43200000).toFixed(2)}}
              </div>
            </div>
          </div>



        </template>
        <template v-slot:mainImg="mainImg">
          <img style="width: 30px;" v-for="(item,index) in mainImg.data.mainImg" :key="index" :src="item['url']" />
        </template>
        <template v-slot:project_manager="project_manager">
          <div>
            项目经理：{{project_manager.data.UserProject.name}}
          </div>
          <div>
            客户经理：{{project_manager.data.UserSales.name}}
          </div>
        </template>
        <template v-slot:pay_standard="pay_standard">
          <div style="text-align: left;">
            <span style="font-weight: bold;color:red">未收回：{{pay_standard.data.total_amount - pay_standard.data.Payment.payment}}</span>
            <br>
            <span >总金额：{{pay_standard.data.total_amount}}</span>
            <br>
            <span >项目付款标准：{{pay_standard.data.pay_standard}}</span>
          </div>

        </template>


        <template v-slot:start_time="start_time">
          <div>
            开始：{{self.$$formatDate( new Date(parseInt(start_time.data.start_time)) ,'yyyy-MM-dd hh:mm')}}
          </div>
          <div>
            截止：
            <span
            v-if="parseInt(start_time.data.end_time)>new Date(new Date().toLocaleDateString()).getTime()&&parseInt(start_time.data.end_time)<new Date(new Date().toLocaleDateString()).getTime()+86400000"
            style="color:green;font-weight: bold;"
            >
              {{self.$$formatDate( new Date(parseInt(start_time.data.end_time)) ,'yyyy-MM-dd')}}
            </span>
            <span
            v-else-if="parseInt(start_time.data.end_time)<new Date(new Date().toLocaleDateString()).getTime()&&parseInt(start_time.data.end_time)>0"
            style="color:red;font-weight: bold;"
            >
              {{self.$$formatDate( new Date(parseInt(start_time.data.end_time)) ,'yyyy-MM-dd')}}
            </span>
            <span
            v-else

            >
              {{self.$$formatDate( new Date(parseInt(start_time.data.end_time)) ,'yyyy-MM-dd')}}
            </span>
          </div>
        </template>
      </solely-table>
    </div>

    <el-dialog
    :title="btnNow.text&&btnNow.text(orginFormData)?btnNow.text(orginFormData):''"
    :visible.sync="dialog.dialogFormVisible"
    :close-on-click-modal = 'false'
    >
      <div style="overflow:hidden;zoom:1;text-align: left;padding: 2%;">

        <template v-for='(field,index) in fields' >
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
                 :fieldArguments="field.dialog?field.dialog:{}"
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
  import projectJs from './project.js'
  export default projectJs
</script>
<style>

  .demo-form-inline {
    display: inline-block;
    float: right;
  }
  .btm-action {
    margin-top: 20px;
    text-align: center;
  }
  .actions-top {
    height: 46px;
  }
  .pagination {
    display: inline-block;
  }
  .field_item {
    float: left;
    padding: 15px;
  }

</style>
