import echarts from 'echarts'

export default {
  name: 'solely-echarts',
  data () {
    return {
      chartDom: null,
      data: {
        title: '垂直方向柱状标题',
        subtext: '子标题描述信息'
      },
      randomId:''
    }
  },
  /**
   * 接收参数
   * @type {Object}
   */
  props: {
    options: {
      type: Object,
      required: true,
    },

  },
  created:function(){
    this.randomId = Math.ceil(Math.random()*10000)+'charts';
  },
  mounted: function () {
    this.init();
    this.update();
  },
  methods: {
    init () {
      // 基于准备好的dom，初始化echarts实例
      this.chartDom = echarts.init(document.getElementById(this.randomId))
      return this
    },
    update () {
      if (this.chartDom === null) {
        this.init()
      }
      this.chartDom.setOption(this.options,true);
      this.chartDom.resize()
    }
  },
  watch: {
    options (v) {
      if (v) {
        this.update()
      }
    },

  }
}
