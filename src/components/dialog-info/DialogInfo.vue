<template>
  <div class="">
    <el-dialog size="tiny"
               :title="dialog.title"
               v-model="show"
               @close='onClose'>
     <el-form style=""
              label-width="200px"
              ref='form-data'
              :inline="setting.inline"
              :rules='rules'
              :model='FormData'>
     				
       <el-form-item
         class='edit-form'
         v-for='(field,index) in fields'
         v-bind="field.attrs || {}"
         :key='index'
         :label="field.label"
         :prop='field.key'>
         <component
           :Data="field"
           :defaultValue="FormData"
           :SubmitInfo="submit_info"
           :TempFieldObj="temp_field_obj"
           :is="components[field.type] || 'SlsInput'"
           :options="typeof field.options === 'object'?field.options:(typeof option_Data[field.options]=== 'object'?option_Data[field.options]:[])"
           @onChange="onChange"
         >
         </component>
         
       </el-form-item>
       <el-form-item>
     
         <el-button type="primary" @click='onSubmit("form-data")'>提交</el-button>
       </el-form-item>
     </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import DialogInfoJs from './DialogInfo.js'

  export default DialogInfoJs
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
</style>
