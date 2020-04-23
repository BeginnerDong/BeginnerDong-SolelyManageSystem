<template>
  <div class="list">
    <div style="width: 100%;position: relative;margin: 0 auto;height: 10%;overflow: scroll;">
      <div class='field_item' v-for='(field,index) in fields'  v-if="field.header_search&&String(field.header_search)!='{}'">
        <component
          :field="field"
          :optionData="field.header_search.optionDataName?optionData[field.header_search.optionDataName]:''"
          :defaultValue="field.header_search.defaultValue?field.header_search.defaultValue:''"
          :is="field.componentName || 'sls-input'"
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
        <!-- <template v-slot:expand="expand">
            {{expand.data}}
        </template> -->
        <template v-slot:mainImg="mainImg">
          <img style="width: 30px;" :src="mainImg.data.mainImg[0]?mainImg.data.mainImg[0]['url']:'../../../assets/logo.png'" />
        </template>
        <template v-slot:isShow="isShow">
          <el-checkbox @change="self.isShowChange(isShow)" v-model="isShow.data.isShow" > {{isShow.data.isShow?'显示':'隐藏'}}</el-checkbox>
        </template>
        <template v-slot:hasAuth="hasAuth">
          <el-checkbox @change="self.hasAuthChange(hasAuth)" v-model="hasAuth.data.hasAuth" > {{hasAuth.data.hasAuth?'有':'无'}}</el-checkbox>
        </template>
        <template v-slot:isFirst="isFirst">

          <el-checkbox v-if="self.isFirstTest(isFirst.data.router)" @change="self.isFirstChange(isFirst.data.router)" v-model="isCheck"   >是</el-checkbox>
          <el-checkbox v-else @change="self.isFirstChange(isFirst.data.router)" v-model="isNoCheck"  > 否</el-checkbox>
        </template>
        <template v-slot:button="button">
          <el-checkbox-group v-model="button.data.hasButton" @change="self.buttonChange(button)">
            <el-checkbox v-for="item in button.data.button" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </template>

      </solely-table>
    </div>

    <el-dialog :title="btnNow.text&&btnNow.text(orginFormData)?btnNow.text(orginFormData):''" :visible.sync="dialog.dialogFormVisible">
      <div style="overflow:hidden;zoom:1;text-align: left;">

        <template v-for='(field,index) in fields'>
           <div
             v-if="btnName&&field.application&& field.application.indexOf(btnName)>-1"
             style="float: left;margin-right: 2%;margin-bottom:5%;"
             :style="field.componentName=='upload'?'width:100%':''"
             :label-width="formLabelWidth"
           >
             <div style="display: inline-block;width: 100px;text-align: left;">{{field.label}}：</div>
             <div style="display: inline-block;">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  import accessJs from './access.js'
  export default accessJs
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
