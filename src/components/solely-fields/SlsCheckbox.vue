<template>
  <div>
  666666
    <!-- 普通CheckBox -->
    <el-checkbox-group
      @change="onChange"

      v-model="checkbox_defaultValue">

      <el-checkbox
        v-if="optionsData&&JSON.stringify(optionsData)!='[]'"
        v-for='(item,index) in optionsData'
        :key='index'
        :value="item[field.defaultProps.value]"
        :label="item[field.defaultProps.label]">
      </el-checkbox>

    </el-checkbox-group>
  </div>
</template>

<script>
  import Common from './js/Common'

  var Js = Common('sls-checkbox')
  Js.mixins = [{
    data () {
      return {
        checkbox_defaultValue:[]
      }
    },
    computed: {
      checkbox_group_attrs () {
        return this.Data.checkbox_group_attrs || {}
      },
      checkbox_attrs () {
        return this.Data.checkbox_attrs || {}
      }
    },
    methods: {
      onChange (v) {
        /*if (Array.isArray(v)) {
          this.submit_info[this.data.key] = []
          v.forEach((item) => {
            this.submit_info[this.data.key].push(this.temp_field_obj[this.data.key][item])
          })
        }
        this.events.change && this.events.change({value: v, info: this.submit_info[this.data.key]});*/
        this.$emit('onChange', [this.data.key,v]);
      }
    }
  }]
  export default Js
</script>

<style >

</style>
