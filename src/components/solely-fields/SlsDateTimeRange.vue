<template>
  <div>
    <el-date-picker
      @change="onChange"
      v-model="dtrange_defaultValue"
      type="datetimerange"
      range-separator="至"
      :start-placeholder="fieldArguments.start_placeholder"
      :end-placeholder="fieldArguments.end_placeholder">
    </el-date-picker>
  </div>
</template>
<script>
  import Common from './js/Common'

  var Js = Common('sls-date-time-range')
  Js.mixins = [{
    data () {
      return {
        dtrange_defaultValue:[]
      }
    },
    mounted () {
      this.dtrange_defaultValue = this.defaultValue;
    },
    computed: {
      date_time_attrs () {
        return this.Data.date_time_attrs || {}
      }
    },
    methods: {

    },
    watch: {
      defaultValue () {
        
        this.dtrange_defaultValue = this.defaultValue
      },
    }
  }]
  export default Js
</script>
