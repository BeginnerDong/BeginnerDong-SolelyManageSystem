<template>
  <div class="list">
    <el-header style="padding-top: 25px;text-align: left;height: 13%;">
      <el-button
        v-for='(btn,index) in newBtn'
        v-if="btn.position=='header'"
        :key='index'
        :type="btn.type || 'info'"
        :icon="btn.icon || 'view'"
        :size="btn.size || 'mini'"
        @click='onBtnEvent({data:{},btnIndex:index,btn:btn})'>
          {{
            typeof btn.text === 'string' ? btn.text : (typeof btn.text === 'function' ? btn.text({
            data     : {},
            btnIndex : index,
            btn      : btn
             }) : '')
          }}
      </el-button>
      <span style="margin-left: 10px;">
        <slot name="header_str"></slot>
      </span>

    </el-header>



    <el-table
      border
      v-loading="BasicArguments.loading"
      :height="BasicArguments.height"
      :row-style="BasicArguments.row_style"
      :cell-style="BasicArguments.cell_style"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      align='center'
      :data="list"
      :stripe="BasicArguments.stripe?BasicArguments.stripe:true"
      :row-key="BasicArguments.row_key"
      @filter-change="filter_change"
      @selection-change="handleSelectionChange"
      class="spHeight"
    >
      <el-table-column v-if="BasicArguments.expand" type="expand">
        <template slot-scope="scope">
          <slot name="expand" :data="scope.row" :index="scope.$index"></slot>
        </template>
      </el-table-column>

      <el-table-column v-if='BasicArguments.selection' type="selection" align="center" width="55">
      </el-table-column>

      <template v-for='(field,index) in fields'>
        <el-table-column
          v-if='field.listType&&field.listType!="deal"&&!field.customSlot&&((field.isHide&&!field.isHide(self))||!field.isHide)'
          :prop="field.key"
          :column-key="field.key"
          :label="field.label"
          :align="field.align || 'center'"
          :sortable="field.sort || false"
          :formatter='field.formatter'
          :filters='field.select_list'
          :filter-method="field.filter_method"
          :filter-multiple="field.filter_multiple"
          :style='field.style'
          :width='field.width'>
        </el-table-column>
        <el-table-column
          v-if='field.listType&&field.listType!="deal"&&field.customSlot&&((field.isHide&&!field.isHide(self))||!field.isHide)'
          :prop="field.key"
          :column-key="field.key"
          :label="field.label"
          :align="field.align || 'center'"
          :sortable="field.sort || false"
          :formatter='field.formatter'
          :filters='field.select_list'
          :filter-method="field.filter_method"
          :filter-multiple="field.filter_multiple"
          :style='field.style'
          :width='field.width'
          >
            <template v-if="field.customSlot"  slot-scope='scope'  >
              <slot :name="field.customSlot"  :field="field" :data="scope.row"></slot>
            </template>
        </el-table-column>

        <el-table-column
          v-if='field.listType=="deal"'
          :label="field.label || '操作'"
          :width="field.width || 160"
          :fixed="field.fixed || 'right'"
        >
          <template slot-scope='scope'>
            <template v-for='(btn,index) in newBtn'>
              <div style="float:left;margin-bottom: 2px;margin-right: 2px;">
                <el-button

                  v-if="btn.position=='list'&&(!btn.isHide||(btn.isHide&&!btn.isHide(scope.row,self)))"
                  style="background-color: #4b5d79"
                  :key='index'
                  :type="btn.type || 'info'"
                  :icon="btn.icon || 'view'"
                  :size="btn.size || 'mini'"
                  @click='onBtnEvent({list:list,data:scope.row,dataIndex:scope.$index,btnIndex:index,btn:btn})'>
                    {{
                      typeof btn.text === 'string' ? btn.text : (typeof btn.text === 'function' ? btn.text({
                      list     : list,
                      data     : scope.row,
                      dataIndex: scope.$index,
                      btnIndex : index,
                      btn      : btn
                       }) : '')
                    }}
                </el-button>
              </div>
            </template>
          </template>
        </el-table-column>
      </template>

      <el-table-column type="expand"
                       :context="_self"
                       v-if='expand && expand.show && expand.show===true && expand.position && expand.position==="right"'>
        <template slot-scope="scope">
          <slot name="expand"
                :data="scope.row"
                :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class='btm-action'>
      <el-pagination
        v-if='paginate'
        class='pagination'
        :page-sizes="paginate.page_sizes"
        :page-size="paginate.pagesize"
        :page-count="paginate['page-count']"
        :layout="paginate.layout"
        :total="paginate.count"
        :current-page='paginate.current_page'
        @current-change='onChangeCurrentPage'
        @size-change='onChangePageSize'>
      </el-pagination>
    </el-col>

  </div>
</template>

<script>
  import solelyTableJs from './solely-table.js'
  export default solelyTableJs
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
    /*line-height : 46px;*/
  }

  .pagination {
    display: inline-block;
  }

  .list img {
    max-width: 100%;
    height: auto;
  }

  .list{
    height: 100%;
  }

  .spHeight td .cell{
    max-height: 300px;
    overflow: hidden;
  }

</style>
