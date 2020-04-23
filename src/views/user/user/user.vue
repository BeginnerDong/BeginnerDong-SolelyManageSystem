<template>
  <div class="list">
    
    <el-main>
      <list-data
        ref='list-data'
        @onClickBtn="onClickBtn"
        @pageChange="pageChange"
        @filtersChange="filtersChange"
        @initMainData="initMainData"
        @fieldChange="fieldChange"
        :mainData='mainData'
        :Pagination="paginate"
        :BtnInfo="btn_info"
        :FieldList='fields'
        :pagination='paginate'
        :optionData='optionData'
        :otherData='otherData'
      >
        <template slot="expand" slot-scope="slotProps">
        </template>
      </list-data>
    </el-main>
  </div>
</template>

<script>
  import userJs from './user.js'
  export default userJs
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
