<template>
  <div class="list">
    <div style="width: 100%;position: relative;margin: 0 auto;height: 10%;overflow: scroll;">
      <div class='field_item' v-for='(field,index) in fields' :key="index"  v-if="field.header_search&&String(field.header_search)!='{}'">
        <component
          :field="field"
          :optionData="field.header_search.optionDataName?optionData[field.header_search.optionDataName]:''"
          :defaultValue="field.header_search.defaultValue?field.header_search.defaultValue:''"
          :is="field.componentName || 'sls-input'"
          :fieldArguments="field.header_search||field.header_search==0?field.header_search:{}"
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
        <!-- <template v-slot:expand="expand">
            {{expand.data}}
        </template> -->
        <template v-slot:mainImg="mainImg">
          <img style="width: 30px;" :src="mainImg.data.mainImg[0]?mainImg.data.mainImg[0]['url']:'../../../assets/logo.png'" />
        </template>
      </solely-table>
    </div>

    <el-dialog :title="btnNow.text&&btnNow.text(orginFormData)?btnNow.text(orginFormData):''" :visible.sync="dialog.dialogFormVisible">
      <div style="overflow:hidden;zoom:1;text-align: left;">

        <template v-for='(field,index) in fields'>
           <div
             v-if="btnName&&field.application&& field.application.indexOf(btnName)>-1"
             :key="index"
             style="float: left;margin-right: 2%;margin-bottom:5%;"
             :style="field.componentName=='upload'?'width:100%':''"
             :label-width="formLabelWidth"
           >
             <div style="display: inline-block;width: 100px;text-align: left;">{{field.label}}：</div>
             <div style="display: inline-block;">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  import adminListsJs from './adminLists.js'
  export default adminListsJs
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
