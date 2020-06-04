<template>
    <div style="height: 100%;">
      <div style="height: 10%;">
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
      </div>
      <div style="width:100%;height: 90%;overflow: hidden;">
        <div style="float: left;height:90%;width:48%;overflow: hidden;">

            <div style="width: 100%;height: 60%;">
              <solely-echarts :options="clientOptions"></solely-echarts>
              <div style="width: 100%;height: 100px;">
                <div style="float: left;margin-right: 20px;" v-for="(item,index) in  clientOptions.series" :key="index">
                  {{item.name}}累计：{{item.total}}
                </div>


              </div>
              <div>
                <div v-for="(item,key) in saleser" :key="index">
                  {{key}}:{{item}}
                </div>
              </div>

            </div>

        </div>
        <div style="float: left;height:90%;width:48%;overflow: hidden;">

            <div style="width: 100%;height: 60%;">
              <solely-echarts :options="barOptions"></solely-echarts>
              <div>
                <div  v-for="(item,index) in  barOptions.series" :key="index">
                  {{item.name}}累计：{{item.total}}
                </div>

              </div>
            </div>

        </div>

        <!-- <el-card shadow="hover" class="mgb20" style="float: left;height:40%;width:45%;" body-style="height:90%">
          <solely-echarts :options="averageOptions"></solely-echarts>
        </el-card>
        <el-card shadow="hover" class="mgb20" style="float: left;height:40%;width:35%;" body-style="height:100%">
          <solely-echarts :options="moneyOptions"></solely-echarts>
        </el-card> -->

      </div>
    </div>

</template>

<script>
  import statisticJs from './statistic.js'
  export default statisticJs
</script>

<style scoped>

    .el-col {
      border-radius: 4px;
    }
    .basicBox {
      margin-top:20px;
      margin-left:50px;
      min-height:350px;
      background:#fdfdfd;
      border:2px solid #edf3fb;
      border-radius:2%;
    }
    .chartBox {
      width:500px;
      height:300px;
      margin:0 auto;
      margin-top:30px!important;
    }


</style>
