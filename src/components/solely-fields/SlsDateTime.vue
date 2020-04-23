<template>
  <div>


    <el-date-picker
      @change="onChange"
      v-model="date_defaultValue"
      value-format="timestamp"
      :type="fieldArguments.dateType?fieldArguments.dateType:'datetime'"
      :placeholder="fieldArguments.placeholder?fieldArguments.placeholder:field.placeholder">
    </el-date-picker>

  </div>
</template>
<script>
  import Common from './js/Common'

  var Js = Common('sls-date-time')
  Js.mixins = [{
    data () {
      return {
        date_defaultValue:0,
      }
    },

    computed: {

    },
    created () {
      const self = this;
      if(isNaN(this.defaultValue)&&!isNaN(Date.parse(this.defaultValue))){
      　　self.date_defaultValue =  Date.parse(this.defaultValue);
      }else if(parseInt(this.defaultValue)<10000000000&&parseInt(this.defaultValue)){
        self.date_defaultValue =  parseInt(this.defaultValue)*1000;
      }else{
        self.date_defaultValue =  parseInt(this.defaultValue);
      }

    },
    watch:{
      optionData(){

      },
      defaultValue(){

        if(isNaN(this.defaultValue)&&!isNaN(Date.parse(this.defaultValue))){
        　　this.date_defaultValue =  Date.parse(this.defaultValue);
        }else if(parseInt(this.defaultValue)<10000000000&&parseInt(this.defaultValue)){
          this.date_defaultValue =  parseInt(this.defaultValue)*1000;
        }else{
          this.date_defaultValue =  parseInt(this.defaultValue);
        };

      },

    },
    methods: {
      onChange (v) {

        //this.$emit('onChange', [this.data.key,v]);
        //this.events.change && this.events.change(v)
      }
    }
  }]
  export default Js
</script>
