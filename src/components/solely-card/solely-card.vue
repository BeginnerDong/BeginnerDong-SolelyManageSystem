<template>
  <div class="list">
    <el-header style="padding-top: 25px;text-align: left;height: 13%;">
      <el-button
        v-for='(btn,index) in btn_info'
        v-if="btn.position=='header'&&hasAuth(btn)"
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
    </el-header>
    <div style="width: 100%;height: 70%;overflow: auto" v-loading="BasicArguments.loading">
      <template v-for="item in list">
        <el-card  :style="BasicArguments.style" :key="item.id" >
            <slot name="solelyCard"  :data="item"></slot>
          <div style="margin: 20px 0px;">
            <div class="bottom clearfix">
              <template v-for='(btn,index) in btn_info'>
                <div style="float:right;margin-bottom: 2px;margin-right: 2px;" :key="index">
                  <el-button
                    v-if="btn.position=='list'&&hasAuth(btn,item)"
                    style="background-color: #4b5d79"
                    :key='index'
                    :type="btn.type || 'info'"
                    :icon="btn.icon || 'view'"
                    :size="btn.size || 'mini'"
                    @click='onBtnEvent({list:list,data:item,dataIndex:index,btnIndex:index,btn:btn})'>
                      {{
                        typeof btn.text === 'string' ? btn.text : (typeof btn.text === 'function' ? btn.text({
                        list     : list,
                        data     : item,
                        dataIndex: index,
                        btnIndex : index,
                        btn      : btn
                         }) : '')
                      }}
                  </el-button>
                </div>
              </template>
              <div >
                <el-checkbox @change="deleteEvent(item.id)" v-model="item.delete">备选项</el-checkbox>

              </div>
            </div>
          </div>
        </el-card>
      </template>








    </div>
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
  import solelyCardJs from './solely-card.js'
  export default solelyCardJs
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
