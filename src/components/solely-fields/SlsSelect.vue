<template>
  <div>
    
    <el-select
      v-model="selelct_defaultValue"
      @change="onChange"
      :multiple='fieldArguments.multiple ? true : false'
      :collapse-tags='fieldArguments.collapse_tags ? true : false'
      :placeholder="fieldArguments.placeholder"
      :clearable="fieldArguments.clearable?fieldArguments.clearable:true"
      >
        <el-option
          v-if="optionsData&&JSON.stringify(optionsData)!='[]'"
          v-for='(item,index) in optionsData'
          :key='index'
          :value="item[field.defaultProps.value]"
          :label="item[field.defaultProps.label]">
        </el-option>
    </el-select>
  </div>
</template>

<script>
  import Common from './js/Common'

  var Js = Common('sls-select')
  Js.mixins = [{
    data () {
      return {
        selelct_defaultValue:''
      }
    },
    created () {

      this.selelct_defaultValue = this.defaultValue;
    },
    computed: {
      select_attrs () {
        return this.fieldArguments.select_attrs || {}
      },

      optionsData () {
        return this.optionData
      }
    },
    watch:{
      optionData(){

      },
      defaultValue(){

        this.selelct_defaultValue = this.defaultValue;
      },

    },
    methods: {

      onVisibleChange () {
        this.events['visible-change'] && this.events['visible-change']()
      },
      onRemoveTag () {
        this.events['remove-tag'] && this.events['remove-tag']()
      },
      onClear () {
        this.events.clear && this.events.clear()
      }
    },

  }]
  export default Js
</script>
