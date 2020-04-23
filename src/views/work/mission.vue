<template>
  <div class="list">
    <div style="width: 100%;position: relative;margin: 0 auto;height: 15%;overflow: scroll;">
      <div class='field_item' v-for='(field,index) in fields'   v-if="field.header_search&&String(field.header_search)!='{}'&&((field.header_search.isHide&&!field.header_search.isHide(self))||!field.header_search.isHide)">
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

            <div style="width:35%;float:left;margin-right:16px;">任务内容：<br>{{expand.data.content}}</div>
            <div style="width:35%;float:left">回复：<br>{{expand.data.response}}</div>
        </template>

        <template v-slot:dead_time="dead_time">
          {{self.$$formatDate( new Date(parseInt(dead_time.data.dead_time)) ,'yyyy-MM-dd hh:mm')}}
        </template>
        <template v-slot:user_no="user_no">
          {{user_no.data.UserInfo.name}}
        </template>
        <template v-slot:publish_user="publish_user">
          {{publish_user.data.Punlisher.name}}
        </template>
        <template v-slot:content="content">

          <div class="wrap">{{content.data.content}}</div>

        </template>
       <template v-slot:response="response">

          <div class="wrap">{{response.data.response}}</div>

        </template>

      </solely-table>
    </div>

    <el-dialog
    :title="btnNow.text&&btnNow.text(orginFormData)?btnNow.text(orginFormData):''"
    :visible.sync="dialog.dialogFormVisible"
    :close-on-click-modal = 'false'
    >
      <div style="overflow:hidden;zoom:1;text-align: left;padding: 2%;">

        <template v-for='(field,index) in fields'>
           <div
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
  import missionJs from './mission.js'
  export default missionJs
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

  .ellipsis::after{
    content: '...';
    display: inline;
  }


  .wrap {
      position: relative;
      /*line-height和height要相互配合，显示多少行就省略，就是line-height多少倍数*/
      line-height: 20px;
      max-height: 60px;
      /*此属性看需求来判断是否设置，因为设置了padding-right，多腾出了点位置，该值一般为padding-right的值的负值*/
      /*margin-left: -1em;*/
      /*此值写死成1em就好，因为省略号大概就是占用1em的空间*/
      padding-right: 10px;
      text-align: justify;
      overflow: hidden;
  }

  .wrap:before {
      position: absolute;
      right: 0;
      bottom: 0;
      content: '...';
  }

  .wrap:after {
      position: absolute;
      right: 0;
      /*宽高写死1em就好，因为省略号大概就是占用1em的空间，用来遮挡住省略号，也基本上跟wrap的padding-right一致*/
      width: 10px;
      /*与wrap的行高实际值保持一致*/
      height: 20px;
      content: '';
      /*要跟所在背景颜色一致才能遮挡住省略号后觉得没异样*/
      background-color: #fff;
  }
</style>
