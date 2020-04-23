
<template>
  <div>

    <div >

      <el-button size="mini" type="primary" @click="customButtonClick">上传<i class="el-icon-upload el-icon--right"></i></el-button>

      <input :ref="randomId" type="file"  class="custom-input" @change='upload($event,0)' style='display: none !important;'>
      <span  style="float: right;width: 260px;margin-left: 30px;font-size: 12px;">
        <el-progress :percentage="progress" :color="colors" :width="80"></el-progress>
        剩余时间：{{progress==100?0:resttime}}&nbsp;&nbsp;&nbsp;
        速度：{{progress==100?0:speedUnits}}
      </span>

    </div>
    <div style="margin-top: 10px;">

      <el-input size="mini" placeholder="请输入url" v-model="insertUrl" class="input-with-select">
          <el-button slot="append" size="mini" type="primary" @click="insert">插入</el-button>
      </el-input>




    </div>
    <div style="width:100%;height:30px;"></div>
    <div style="width:100%;">
      <template v-for="(item, index) in uploadImg" >
        <div :key="index" v-if="item.type=='image'" style="margin-bottom:10px;width:150px;height:110px;word-wrap: break-word;word-break: normal;float:left;border-bottom:1px solid gray;position:relative;margin-right:10px;">

          <div style="width:150px;height:80px;object-fit: contain;">
            <img  style="object-fit: contain;width: 100%;height: 100%;" :src="item.url"></img>
          </div>
          <div style="width:150px;height:20px;padding-top: 5px;padding-left: 3px;">
            <i class="el-icon-delete" :data-index="index" @click="removeImg" ></i>
            <a style="font-size: 12px;color:el-icon-document-copy" @click="copyLink(item.url,item.id)" :class="item.id + 'tag'">复制链接</a>
          </div>

        </div>
        <div :key="index" v-if="item.type=='vedio'" style="margin-bottom:10px;width:150px;height:110px;word-wrap: break-word;word-break: normal;float:left;border-bottom:1px solid gray;position:relative;margin-right:10px;">
          <div style="width:150px;height:80px;">
            <video style="object-fit: contain;width: 100%;height: 100%;" :src="item.url" controls="controls">
              您的浏览器不支持 video 标签。
            </video>
          </div>
          <div style="width:150px;height:20px;padding-top: 5px;padding-left: 3px;">
            <i class="el-icon-delete" :data-index="index" @click="removeImg" ></i>
            <a style="font-size: 12px;color:el-icon-document-copy" @click="copyLink(item.url,item.id)" :class="item.id + 'tag'">复制链接</a>
          </div>
        </div>
        <div :key="index" v-if="item.type=='doc'" style="margin-bottom:10px;width:150px;height:110px;word-wrap: break-word;word-break: normal;float:left;border-bottom:1px solid gray;position:relative;margin-right:10px;">
          <div style="width:150px;height:80px;">
              <span>{{item.title}}</span>
          </div>
          <div style="width:150px;height:20px;padding-top: 5px;padding-left: 3px;">
            <i class="el-icon-delete" :data-index="index" @click="removeImg" ></i>
            <a style="font-size: 12px;color:el-icon-document-copy" @click="copyLink(item.url,item.id)" :class="item.id + 'tag'">复制链接</a>
          </div>
        </div>
        <div :key="index" v-if="!item.type" style="margin-bottom:10px;width:150px;height:110px;word-wrap: break-word;word-break: normal;float:left;border-bottom:1px solid gray;position:relative;margin-right:10px;">
          <div style="width:150px;height:80px;">
            <span>{{item.title}}</span>
          </div>
          <div style="width:150px;height:20px;padding-top: 5px;padding-left: 3px;">
            <i class="el-icon-delete" :data-index="index" @click="removeImg" ></i>
            <a style="font-size: 12px;color:el-icon-document-copy" @click="copyLink(item.url,item.id)" :class="item.id + 'tag'">复制链接</a>
          </div>
        </div>
      </template>
    </div>

  </div>
</template>
<script>
  import Common from './js/Common'
  import plugins from '../../register/plugin.js'
  import store from 'store/'
  import spark  from '../../utils/sparkmd5.js'
  import func from '../../utils/func/func.js'
  import Clipboard from 'clipboard'
  var Js = Common('upload')
  Js.mixins = [{
    data () {
      return {
        defaultProps: {
          children: 'child',
          label: 'title',
          value: 'id',
        },
        uploadImg:[],
        insertUrl:'',
        speedUnits:0,
        progress:0,
        resttime:0,
        finishCount:0,
        colors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ],
        randomId: Math.ceil(Math.random()*10000)+'file',
        insertUrl:''


      }
    },
    created () {
      if (!this.defaultValue || !Array.isArray(this.defaultValue)) {
        this.uploadImg = []
      }else{
        this.uploadImg = this.defaultValue;
      }
    },
    mounted () {

    },
    computed: {
    },
    methods: {


      copyLink (url,id) {
        const self = this;
        let clipboard = new Clipboard('.'+id+'tag', {
          text: function () {
            return url
          }
        })
        clipboard.on('success', e => {
          func.notify('复制成功','success');
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          func.notify('复制失败','warning');
          clipboard.destroy()
        })
      },

      copyUrl(index){
          console.log(index);
          const self = this;
          self.uploadImg[index]['showUrl'] = true;
          self.$set(self.uploadImg,index,self.uploadImg[index]);

      },

      insert(){
        const self = this;
        var url = self.insertUrl;    //获取到了图片的URL


        var lastArray =self.insertUrl.split("/");
        self.orginName = lastArray[lastArray.length-1];
        var obj = self.orginName.lastIndexOf(".");
        self.ext = self.orginName.substr(obj+1);

        //判断文件类型渲染(H5 video标签只支持H264编码的MP4)
        var videoArray = ['mp4'];
        var imageArray = ['image','jpeg','png','PNG','JPEG','jpg','JPG'];
        var docArray = ['doc','xlsx','xls','csv','pdf','txt','ppt'];

        if(videoArray.indexOf(self.ext)!=-1){
          self.uploadImg.push({
            url:url,
            type:'vedio',
          });
        }else if(imageArray.indexOf(self.ext)!=-1){
          self.uploadImg.push({
            url:url,
            type:'image'
          });
        }else if(docArray.indexOf(self.ext)!=-1){
          self.uploadImg.push({
            url:url,
            title:self.orginName,
            type:'doc'
          });
        }else{
           self.uploadImg.push({
             url:url,
             title:self.orginName,
           });
        };
        self.$emit('onChange',{field:self.field,value:self.uploadImg});
        self.insertUrl = "";

      },


      customButtonClick(){
        const self = this;
        self.$refs[self.randomId].click();   //打开file 选择图片
      },


      async upload(e,start){

        const self = this;
        self.chunkSize = 2* 1024 * 1024;

        if(start==0){
          self.finishCount = 0;
          self.progress = 0;
          self.resttime = 0;
          self.lastTime = new Date().getTime();//获取当前时间
        };

        let fileObj = e.target.files[0];

        var obj = fileObj.name.lastIndexOf(".");
        self.ext = fileObj.name.substr(obj+1);
        self.orginName = fileObj.name;
        self.oloaded = 0;


        // 上传完成
        if (start >= fileObj.size) {
            return;
        }
        // 获取文件块的终止字节
        self.end = (start + self.chunkSize > fileObj.size) ? fileObj.size : (start + self.chunkSize);
        // 将文件切块上传
        self.start = start;
        self.totalSize = fileObj.size;
        console.log('self.totalSize',self.totalSize)
        const callback = function(){
          var param = new FormData()  // 创建form对象

          param.append('file',fileObj.slice(start, self.end))  // 通过append向form对象添加数据
          param.append('token', self.$store.getters.getToken);
          param.append('md5',self.md5Res);
          param.append('totalSize',self.totalSize);
          param.append('start',self.start);
          param.append('chunkSize',self.chunkSize);
          param.append('ext',self.ext);
          param.append('originName',self.orginName);
          // POST表单数据
          let xhr = new XMLHttpRequest();
          xhr.open('post', 'https://www.solelycloud.com/apinew/public/index.php/api/v1/Base/FtpFile/upload', true);
          xhr.onload = function() {
              if (this.readyState == 4 && this.status == 200) {
                  // 上传一块完成后修改进度条信息，然后上传下一块
                  var json = JSON.parse(xhr.responseText);
                  console.log('json',json);
                  self.finishCount = json.finishCount;
                  if(json.chunk_start){
                    self.upload(e,json.chunk_start);
                  };
                  if(json.solely_code == 100000){

                    var url = json.info.url ;    //获取到了图片的URL

                    //判断文件类型渲染(H5 video标签只支持H264编码的MP4)
                    var videoArray = ['mp4'];
                    var imageArray = ['image','jpeg','png','PNG','JPEG','jpg','JPG'];
                    var docArray = ['doc','xlsx','xls','csv','pdf','txt','ppt'];

                    if(videoArray.indexOf(self.ext)!=-1){
                      self.uploadImg.push({
                        url:url,
                        type:'vedio',
                      });
                    }else if(imageArray.indexOf(self.ext)!=-1){
                      self.uploadImg.push({
                        url:url,
                        type:'image'
                      });
                    }else if(docArray.indexOf(self.ext)!=-1){
                      self.uploadImg.push({
                        url:url,
                        title:self.orginName,
                        type:'doc'
                      });
                    }else{
                       self.uploadImg.push({
                         url:url,
                         title:self.orginName,
                       });
                    };
                    console.log('self.uploadImg',self.uploadImg)
                    var jqObj = self.$refs[self.randomId];
                    console.log('jqObj',jqObj)
                    jqObj.value = "";
                    self.$emit('onChange',{field:self.field,value:self.uploadImg});

                  }
              }
          };
          xhr.upload.onprogress = function(e){
            self.setProgress(e)
          };
          xhr.send(param);
        };
        if(start==0){
          self.doNormalTest(fileObj.slice(start, self.end),callback);
        }else{
          callback();
        };
      },

      removeImg(e){
        const self = this;
        var index = e.target.dataset.index;
        self.uploadImg.splice(index,1);
        self.$emit('onChange',{field:self.field,value:self.uploadImg});
      },


      // 进度条
      setProgress(event) {
        const self = this;
        // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
        if (event.lengthComputable) {//
            var complete = ((event.loaded + self.finishCount*self.chunkSize) / self.totalSize * 100).toFixed(1);
           console.log('event.loaded',event.loaded);
            console.log('self.finishCount',self.finishCount);
            console.log('self.chunkSize',self.chunkSize);
            console.log('complete',complete);
            if(Math.round(complete)>100){
              self.progress = 100;
            }else{
              self.progress = Math.round(complete);
            };
        };
        var nt = new Date().getTime();//获取当前时间
        var pertime = (nt-self.lastTime)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
        self.lastTime = new Date().getTime(); //重新赋值时间，用于下次计算
        var perload = event.loaded - self.oloaded; //计算该分段上传的文件大小，单位b
        self.oloaded = event.loaded;//重新赋值已上传文件大小，用以下次计算
        //上传速度计算
        var speed = perload/pertime;//单位b/s
        var bspeed = speed;
        var units = 'b/s';//单位名称
        if(speed/1024>1){
            speed = speed/1024;
            units = 'k/s';
        }
        if(speed/1024>1){
            speed = speed/1024;
            units = 'M/s';
        }
        speed = speed.toFixed(1);
        //剩余时间
        self.resttime = ((self.totalSize - event.loaded + self.finishCount*self.chunkSize)/bspeed).toFixed(1) + '-s';
        self.speedUnits = speed + units;

      },

      doNormalTest( fileObj,callback ) {    //这里假设直接将文件选择框的dom引用传入
        const self = this;
        if (self.running) {    // 如果正在计算、不允许开始下一次计算
            return;
        };
        var fileReader = new FileReader();
        fileReader.callback = callback;//创建FileReader实例
        fileReader.onload = function (e,callback) {    //FileReader的load事件，当文件读取完毕时触发
            self.running = false;
            // e.target指向上面的fileReader实例
            if (fileObj.size != e.target.result.length) {    //如果两者不一致说明读取出错
               alert("ERROR:Browser reported success but could not read the file until the end.");
            } else {
              self.md5Res = SparkMD5.hashBinary(e.target.result);
              this.callback();
            }
        };

        fileReader.onerror = function () {    //如果读取文件出错，取消读取状态并弹框报错
            self.running = false;
            alert("ERROR:FileReader onerror was triggered, maybe the browser aborted due to high memory usage.");
        };
        self.running = true;
        fileReader.readAsBinaryString(fileObj);    //通过fileReader读取文件二进制码
      }


    },
    watch: {
      defaultValue () {
        if (!this.defaultValue || !Array.isArray(this.defaultValue)) {
          this.uploadImg = []
        }else{
          this.uploadImg = this.defaultValue;
        }
      },
    }

  }]
  export default Js
</script>
