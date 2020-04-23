/**
 * Created by sailengsi on 2017/7/2.
 */

export default {
  name: '',
  data () {
    return {
      input_defaultValue:''
    }
  },
  computed: {
    attrs () {
      return this.Data.attrs || {}
    },
  },

  methods: {
    onClick (e) {
      this.events.click && this.events.click(e)
    },
    onBlur (e) {
      this.events.blur && this.events.blur(e)
    },
    onFocus (e) {
      this.events.focus && this.events.focus(e)
    },

  },
  
  watch: {
    $route () {
      this.init()
    },
  	submit_info(){
  		console.log('submit_info_change')
  	},
    defaultValue: {
      deep: true,
      handler (v) {
        this.input_defaultValue = v;
        //this.FormData = v;
        //this.submitData = {}
      }
    },
  }
}
