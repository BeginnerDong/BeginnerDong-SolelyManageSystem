<template>
  <div>
    <div class='field_item' v-for='(field,index) in FieldList'>
      <component
        v-if="field[BasicArguments.name]&&String(field[BasicArguments.name])!='{}'"
        :field="field"
        :optionData="optionData"
        :defaultValue="InitialValue[field.key]?InitialValue[field.key]:''"
        :is="components[field.type] || 'SlsInput'"
        :fieldArguments="field[BasicArguments.name]"
        @onChange="onChange"
      >
      </component>
    </div>
  </div>
</template>

<script>

  import SlsInput from './SlsInput.vue'
  import SlsTextarea from './SlsTextarea.vue'
  import SlsCheckbox from './SlsCheckbox.vue'
  import SlsRadio from './SlsRadio.vue'
  import SlsSelect from './SlsSelect.vue'
  import SlsSwitch from './SlsSwitch.vue'
  import SlsCascader from './SlsCascader.vue'
  import SlsDate from './SlsDate.vue'
  import SlsDateRange from './SlsDateRange.vue'
  import SlsDateYear from './SlsDateYear.vue'
  import SlsDateMonth from './SlsDateMonth.vue'
  import SlsDateWeek from './SlsDateWeek.vue'
  import SlsTime from './SlsTime.vue'
  import SlsTimeRange from './SlsTimeRange.vue'
  import SlsTimeFixed from './SlsTimeFixed.vue'
  import SlsTimeFixedRange from './SlsTimeFixedRange.vue'
  import SlsDateTime from './SlsDateTime.vue'
  import SlsDateTimeRange from './SlsDateTimeRange.vue'
  import upload from './upload.vue'
  import VueEditor from './VueEditor.vue'
  import baiduMap from './baiduMap.vue'

  export default {
    components: {
      SlsInput,
      SlsTextarea,
      SlsSelect,
      upload,
      VueEditor
    },
    name: 'solely-fields',
    data () {
      return {
        setting: this.Setting,
        primary_key: this.PrimaryKey,
        fields: this.FieldList,
        components: {
          input: 'SlsInput',
          textarea: 'SlsTextarea',
          select: 'SlsSelect',
          radio: 'SlsRadio',
          switch: 'SlsSwitch',
          cascader: 'SlsCascader',
          checkbox: 'SlsCheckbox',
          date: 'SlsDate',
          daterange: 'SlsDateRange',
          year: 'SlsDateYear',
          month: 'SlsDateMonth',
          week: 'SlsDateWeek',
          time: 'SlsTime',
          timerange: 'SlsTimeRange',
          timefixed: 'SlsTimeFixed',
          timefixedrange: 'SlsTimeFixedRange',
          datetime: 'SlsDateTime',
          datetimerange: 'SlsDateTimeRange',
          editor: 'SlsEditor',
          upload: 'upload',
          vueEditor: 'VueEditor',
          baiduMap: 'baiduMap',
        },
        cur_component: '',
        temp_field_obj: {},
        FormData:this.formData,
        submit_info: {},
        rules: this.Rules || {},
        submitData:{},
        option_Data:this.OptionData

      }
    },

    props: {

      InitialValue:{
        type: Object,
        default () {
          return {}
        }
      },

      BasicArguments:{
        type: Object,
        default () {
          return {}
        }
      },

      optionData:{
        type: Object,
        default () {
          return {}
        }
      },

      FieldList: {
        type: Array,
        required: true,
        default () {
          return []
        }
      },

      OptionData: {
        type: Object,
        default () {
          return {}
        }
      },
      Editor: {
        type: Object,
        default () {
          return {}
        }
      },
      Rules: {
        type: Object,
        default () {
          return {}
        }
      },
      formData: {
        type: Object,
        default () {
          return {}
        }
      },
      Setting: {
        type: Object,
        default () {
          return {}
        }
      },
      PrimaryKey: {
        type: String,
        default: 'id'
      },
      Token: {
        type: Number,
        default:0
      },
    },
    created(){

    },
    methods: {


      onChange(object){

        const self = this;
  			self.$set(self.submitData,object.field.key,object.value);
        if(object.field.key=='img_array'){
          self.$set(self.FormData,'img_array',object.value);
        };
        object.BasicArguments = self.BasicArguments;
        object.submitData = self.submitData;
        this.$emit('fieldChange',object);
      },




      /**
       * 表单提交事件
       */
      onSubmit (ref) {
        var data = {
          data: this.defaultValue,
          info: this.submit_info
        }

        if (this.rules) {
          this.$refs[ref].validate((valid) => {
            if (valid) {
              this.$emit('onSubmit', [this.submitData,this.FormData])
            }
          })
        } else {
          this.$emit('onSubmit', [this.submitData,this.FormData])
        }
      }
    },
    created () {
      console.log('fields',this.fields)
    },
    mounted () {
    },


    /**
     * 监控参数
     * @type {Object}
     */
    watch: {
      FieldList: {
        deep: true,
        handler (v) {
          if (v) {
            this.fields = v
          }
        }
      },
      formData: {
        deep: true,
        handler (v) {
          console.log('formData_v',v)
          this.FormData = v;
          //this.submitData = {}
        }
      },
      Token: {
        deep: true,
        handler (v) {
          this.submitData = {}
        }
      },
      DefaultValue: {
        deep: true,
        handler (v) {
          this.default_value = v
        }
      },
      wangeditor_update (v) {

      },
      Setting (v) {
        this.setting = v
      },
      PrimaryKey (v) {
        this.primary_key = v
      }
    }
  }

</script>

<style>
  .field_item {
    float: left;
    padding: 15px;
  }
</style>
