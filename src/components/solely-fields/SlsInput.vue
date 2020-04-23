<template>
  <div>

    <el-input
      v-if="!fieldArguments.suggest"
      :type="fieldArguments.type"
      :style="fieldArguments.style"
      :size="fieldArguments.size?fieldArguments.size:'medium'"
      :clearable="fieldArguments.clearable?fieldArguments.clearable:true"
      v-model="input_defaultValue"
      :placeholder="fieldArguments.placeholder"
      @change="onChange">
    </el-input>
    <el-autocomplete
      v-else
      class="inline-input"
      v-model="input_defaultValue"
      :fetch-suggestions="querySearch"
      :placeholder="fieldArguments.placeholder"
      :trigger-on-focus="false"
      :clearable="fieldArguments.clearable?fieldArguments.clearable:true"
      @select="handleSelectTest"

    ></el-autocomplete>
  </div>
</template>
<script>
  import Common from './js/Common'
  var Js = Common('sls-input')
  Js.mixins = [{
    name: '',
    data () {
      return {
        input_defaultValue:''
      }
    },
    mounted () {
      this.input_defaultValue = this.defaultValue;
    },
    computed: {},
    methods: {
      handleSelectTest(item){
        const self = this;
        if(self.fieldArguments.valueKey){
          this.$emit('onChange', {field:self.field,value:item[self.fieldArguments.valueKey]})
        }else{
          this.$emit('onChange', {field:self.field,value:item[self.field.key]})
        };
        
      },
      querySearch(queryString, cb) {
        const self = this;
        this.$emit('onChange', {field:self.field,value:queryString,func:self.fieldArguments.querySearch,callbak:cb})
      },
    },
    watch: {
      defaultValue () {
        this.input_defaultValue = this.defaultValue
      },
      input_defaultValue(){

        if(this.fieldArguments.suggest&&!this.input_defaultValue){
          this.$emit('onChange', {field:this.field,value:''})
        }

      }
    }
  }]
  export default Js
</script>
