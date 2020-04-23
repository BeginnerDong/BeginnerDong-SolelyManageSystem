<template>
  <div ref="testMap">

    <div style="width: 10px;height: 10px;"></div>
    <div v-show="!fieldArguments.textHide" id="r-result">地址：<input  type="text" id="suggestId" size="20" v-model="text" style="width:150px;" @change="search"/></div>
    <div style="width: 10px;height: 10px;"></div>
    <div  :id="randomId" :style="fieldArguments.style?fieldArguments.style:'width:95%;height:350px;'"></div>
  </div>
</template>
<script>
  import Common from './js/Common'
  import plugins from '../../register/plugin.js'
  import store from 'store/'
  var Js = Common('baidu-map')
  Js.mixins = [{
    data () {
      return {
        defaultProps: {
          children: 'child',
          label: 'title',
          value: 'id',
        },
        text:'',
        map:'',
        city:'西安',
        baidumap_defaultValue:{},
        randomId:''
      }
    },

    created () {
      const self = this;
      self.randomId = Math.ceil(Math.random()*10000)+'map';
    },

    mounted () {

      const self = this;

      self.baidumap_defaultValue = self.defaultValue;
      this.map = new BMap.Map(self.randomId);
      if(this.baidumap_defaultValue.longtitude&&this.baidumap_defaultValue.latitude){
        var point = new BMap.Point(parseFloat(this.baidumap_defaultValue.longtitude),parseFloat(this.baidumap_defaultValue.latitude));
        this.map.centerAndZoom(point, 35);
        var marker = new BMap.Marker(point);
        this.map.addOverlay(marker);
      }else{
        this.map.centerAndZoom('西安', 35);
      };
      this.map.addControl(new BMap.MapTypeControl({
        mapTypes:[
          BMAP_NORMAL_MAP,
          BMAP_HYBRID_MAP
        ]})
      );
      this.map.enableScrollWheelZoom(true);
      this.map.addEventListener("click", this.showInfo);
      this.local = new BMap.LocalSearch(this.map, {
        renderOptions:{map: this.map}
      });

    },
    computed: {

      cascader_attrs () {
        return this.Data.cascader_attrs || {}
      },
      uploadImg () {
        if(this.isArrayFn(this.submit_data[this.data.key])){
          return this.submit_data[this.data.key];
        }else{
          return [];
        }
      }

    },
    watch: {

        defaultValue: {
          deep: true,
          handler (v) {
            const self = this;
            if(v.longtitude&&v.latitude){
              self.baidumap_defaultValue = self.defaultValue;
              this.map.clearOverlays();
              var point = new BMap.Point(parseFloat(self.baidumap_defaultValue.longtitude),parseFloat(self.baidumap_defaultValue.latitude));
              this.map.centerAndZoom(point, 35);
              var marker = new BMap.Marker(point);
              this.map.addOverlay(marker);
            }else{
              this.map.centerAndZoom('西安', 35);
            };
          }
        },

    },
    methods: {

      search(){
        console.log('this.text',this.text)
        this.local.search(this.text);
      },

      showInfo(e){
          const self = this;
          this.map.clearOverlays();
          var point = new BMap.Point(e.point.lng, e.point.lat);
          var marker = new BMap.Marker(point);  // 创建标注
          marker.enableDragging();
          this.map.addOverlay(marker);
          this.$emit('onChange', {field:self.field,value:e.point});
      },

      Convert_BD09_To_GCJ02(lat,lng){
          var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
          var x = lng - 0.0065;
          var y = lat - 0.006;
          var z = sqrt(x * x + y * y) - 0.00002 * sin(y * x_pi);
          var theta = atan2(y, x) - 0.000003 * cos(x * x_pi);
          lng = z * cos(theta);
          lat = z * sin(theta);
          return {'lng':lng,'lat':lat}
      },

      Convert_GCJ02_To_BD09(lat,lng){
          var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
          var x = lng;
          var y = lat;
          var z =sqrt(x * x + y * y) + 0.00002 * sin(y * x_pi);
          var theta = atan2(y, x) + 0.000003 * cos(x * x_pi);
          lng = z * cos(theta) + 0.0065;
          lat = z * sin(theta) + 0.006;
          return {'lng':lng,'lat':lat}
      }

    },

  }]
  export default Js
</script>
