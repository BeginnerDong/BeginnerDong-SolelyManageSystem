/**
 * Created by wjm on 2020/1/2.
 */

export default function (name) {
  return {
    name: name,
    data () {
      return {
        submit_data:{}
      }
    },
    computed: {

    },
    props:['defaultValue','field','fieldArguments','optionData'],

    methods: {

      onChange (value) {
        const self = this;
        this.$emit('onChange', {field:self.field,value:value})
      },

    },
    created () {
        const self = this;
        
        if(!self.fieldArguments.start_placeholder&&self.field.start_placeholder){
          self.fieldArguments.start_placeholder = self.field.start_placeholder;
        };
        if(!self.fieldArguments.end_placeholder&&self.field.end_placeholder){
          self.fieldArguments.end_placeholder = self.field.end_placeholder;
        };
        if(!self.fieldArguments.placeholder&&self.field.placeholder){
          self.fieldArguments.placeholder = self.field.placeholder;
        };

    },
    mounted () {},
    watch: {


    }
  }
}
