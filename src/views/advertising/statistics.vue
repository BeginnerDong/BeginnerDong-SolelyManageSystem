<template>
  <div class="list">
    <div style="width: 100%;position: relative;margin: 0 auto;height: 15%;overflow: scroll;">
      <div class='field_item' v-for='(field,index) in fields' :key="index"  v-if="field.header_search&&String(field.header_search)!='{}'&&((field.header_search.isHide&&!field.header_search.isHide(self))||!field.header_search.isHide)">
        <component
          :field="field"
          :optionData="field.header_search.optionsName?optionData[field.header_search.optionsName]:''"
          :defaultValue="field.header_search.defaultValue?field.header_search.defaultValue:''"
          :is="field.header_search.componentName"
          :fieldArguments="field.header_search?field.header_search:'{}'"
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
        <template v-slot:expand="expand">

            <div v-for="(item,index) in expand.data.Conversation" :key="index">
              <span style="font-weight: bold;">沟通记录：</span>
              {{item.description}}
              <span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;沟通时间：</span>
              --{{item.create_time}}
            </div>
        </template>
        <template v-slot:mainImg="mainImg">
          <img style="width: 30px;" v-for="(item,index) in mainImg.data.mainImg" :key="index" :src="item['url']" />
        </template>
        <template v-slot:user_no="user_no">
          {{user_no.data.User.login_name}}
        </template>
         <template v-slot:sales_manager="sales_manager">
          {{sales_manager.data.UserSales.name}}
        </template>
        <template v-slot:plan_time="plan_time">
          <span
          v-if="parseInt(plan_time.data.plan_time)>new Date(new Date().toLocaleDateString()).getTime()&&parseInt(plan_time.data.plan_time)<new Date(new Date().toLocaleDateString()).getTime()+86400000"
          style="color:green;font-weight: bold;"
          >
            {{self.$$formatDate( new Date(parseInt(plan_time.data.plan_time)) ,'yyyy-MM-dd hh:mm')}}
          </span>
          <span
          v-else-if="parseInt(plan_time.data.plan_time)<new Date(new Date().toLocaleDateString()).getTime()"
          style="color:red;font-weight: bold;"
          >
            {{self.$$formatDate( new Date(parseInt(plan_time.data.plan_time)) ,'yyyy-MM-dd hh:mm')}}
          </span>
          <span
          v-else

          >
            {{self.$$formatDate( new Date(parseInt(plan_time.data.plan_time)) ,'yyyy-MM-dd hh:mm')}}
          </span>

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
             <div style="display: inline-block;min-width: 225px;min-height: 50px;width: 100%;">
               <component
                 :field="field"
                 :optionData="optionData[field.optionsName]"
                 :defaultValue="formData[field.key]?formData[field.key]:''"
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
  import statisticsJs from './statistics.js'
  export default statisticsJs
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
