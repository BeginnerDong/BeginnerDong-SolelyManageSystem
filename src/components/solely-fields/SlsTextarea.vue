<template>
  <div>
    <el-input
      type='textarea'
      v-model="textarea_defaultValue"
      :placeholder="fieldArguments.placeholder"
      @change="onChange"
    ></el-input>
  </div>
</template>

<script>
  import Common from './js/Common'
  import InputTextarea from './js/InputTextarea'

  var Js = Common('sls-textarea')

  Js.mixins = [{
    name: '',
    data () {
      return {
        textarea_defaultValue:''
      }
    },
    mounted () {
      this.textarea_defaultValue = this.defaultValue;
    },
    computed: {},
    methods: {},
    watch: {
      defaultValue () {
        this.textarea_defaultValue = this.defaultValue
      },
    }
  }]
  export default Js
</script>
