<template>
  <div>


    <el-rate
      v-model="rate_defaultValue"
      :disabled="fieldArguments.disabled?fieldArguments.disabled:false"
      show-score
      :text-color="fieldArguments.text_color?fieldArguments.text_color:'#ff9900'"
      score-template="{value}"
      @change="onChange">
    </el-rate>


  </div>
</template>
<script>
  import Common from './js/Common'
  var Js = Common('rate')
  Js.mixins = [{
    name: '',
    data () {
      return {
        rate_defaultValue:0
      }
    },
    mounted () {
      if(this.defaultValue){
        this.rate_defaultValue = this.defaultValue;
      }

    },
    computed: {},
    methods: {},
    watch: {
      defaultValue () {
        if(this.defaultValue){
          this.rate_defaultValue = this.defaultValue;
        }
      },
    }
  }]
  export default Js
</script>
<style>
  .el-rate {
      overflow: hidden;
  }
</style>
