<template>
    <div style="width: 100%;">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="height: 15px;">

        </div>
        <div style="width: 100%;">
          <editor  :id='randomId' v-model='content_defaultValue' :init='init'></editor>
        </div>

     </div>

</template>
<script>
  import Common from './js/Common';
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/mobile/theme'
  import 'tinymce/themes/silver/theme'
  import Editor from "@tinymce/tinymce-vue";
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/contextmenu'
  import store from 'store/'

  var Js = Common('tinymce-editor');
  Js.mixins = [{
    data () {
      return {
        tinymceHTML:'hello world',
        init: {
          language_url: '/newcms/static/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/newcms/static/tinymce/skins/ui/oxide',
          height: 430,
          plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu media',
          toolbar:[
            'image bold italic underline strikethrough | fontsizeselect | forecolor backcolor ',
            'alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote',
            'undo redo | link unlink  code | removeformat media'
          ],
          branding: false,
          media_live_embeds: true,
          convert_urls: false,
          images_upload_handler: function (blobInfo, succFun, failFun) {

            var xhr;
            var file = blobInfo.blob();//转化为易于理解的file对象
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST','https://www.solelycloud.com/apinew/public/index.php/api/v1/Base/FtpFile/upload',true);
            xhr.onload = function() {
                var json;
                if (xhr.status != 200) {
                    failFun('HTTP Error: ' + xhr.status);
                    return;
                };
                json = JSON.parse(xhr.responseText);
                if (!json || json.solely_code != 100000) {
                    failFun('Invalid JSON: ' + xhr.responseText);
                    return;
                };
                succFun(json.info.url);
            };
            var obj = file.name.lastIndexOf(".");
            var ext = file.name.substr(obj+1);
            let param = new FormData()  // 创建form对象

            param.append('file', file, file.name)  // 通过append向form对象添加数据
            param.append('token', store.getters.getToken);
            param.append('ext', ext);
            param.append('md5', 'md5');

            param.append('totalSize',file.size);
            param.append('start',0);
            param.append('chunkSize',file.size);
            param.append('originName',file.name);

            xhr.send(param);
          }

       },
        defaultProps: {
          children: 'child',
          label: 'title',
          value: 'id',
        },
        editorOption: {
          modules: {
            toolbar: '#editorAb',
            imageResize: {
               displaySize: true
            },
          },
        },
        content:{},
        image_array:[],
        content_defaultValue:'',
        tinymceHtml: '请输入内容',
        randomId:''

      }
    },
    components: {
        Editor
    },
    computed: {
      editor: {
        get: function () {
          const self = this;
          return self.$refs.myTextEditor.quill;
        },
        set: function (newValue) {
          const self = this;
          self.$refs.myTextEditor.quill = newValue;
        }
      }

    },
    created () {
      this.content_defaultValue = this.defaultValue;
      self.randomId = Math.ceil(Math.random()*10000)+'map';
      this.init.selector = '#' + self.randomId;
    },
    mounted () {
      tinymce.init({})
    },
    watch:{

      content_defaultValue(val) {
        const self = this;
        this.$emit('onChange', {field:this.field,value:this.content_defaultValue})
      },
      defaultValue(val) {
        const self = this;
        self.content_defaultValue = this.defaultValue;
      },

    },
    methods: {

      inittest(){
        const self = this;
        self.content_defaultValue = this.defaultValue;
        console.log('init-self.idArr',self.idArr)
      },

      onEditorChange({quill, html, text ,iamge }) {
        const self = this;
        self.content = html;
        this.$emit('onChange', {field:self.field,value:html})
      },


      getIdArrByHtml(html){
        const self = this;
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var imgIdReg = /id(\S*)\./i;
        var arr = html.match(imgReg);
        if(!arr){
          arr = [];
        };
        var idArr = [];
        for(var i=0;i<arr.length;i++){
          idArr.push(arr[i].match(imgIdReg)[1]);
        };
        return idArr;
      },


      onEditorFocus(editor) {
        const self = this;
        self.editor = editor   //当content获取到焦点的时候就 存储editor
      },

      customButtonClick(){
        const self = this;
        var range
        if (self.editor.getSelection() != null) {
          range = self.editor.getSelection()
          self.length = range.index  //content获取到焦点，计算光标所在位置，目的为了在该位置插入img
        } else {
          self.length = self.content.length  //content没有获取到焦点时候 目的是为了在content末尾插入img
        }
        self.$el.querySelector('.custom-input').click();   //打开file 选择图片
      },


      async upload(e){

        const self = this;
        let file = e.target.files[0];
        var obj = file.name.lastIndexOf(".");
        var ext = file.name.substr(obj+1);
        let param = new FormData()  // 创建form对象

        param.append('file', file, file.name)  // 通过append向form对象添加数据
        param.append('token', store.getters.getToken);
        param.append('ext', ext);
        param.append('md5', 'md5');

        param.append('totalSize',file.size);
        param.append('start',0);
        param.append('chunkSize',file.size);
        param.append('originName',file.name);
        // POST表单数据
        //param.append('chunk', '0') // 添加form表单中其他数据
        //console.log(param.get('file'))  FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        //console.log(param.get('file'));
        var res = await self.$$api_uploadImg({data: param,headers: {'Content-Type': 'multipart/form-data'}});
        if(res.solely_code == 100000){

          self.contentImg = res.info.url ;    //获取到了图片的URL

          //判断文件类型渲染(H5 video标签只支持H264编码的MP4)
          var videoArray = ['mp4'];
          var url = res.info.url;

          var obj = url.lastIndexOf(".");
          var ext = url.substr(obj+1);
          if(videoArray.indexOf(ext)!=-1){
            self.editor.insertEmbed(self.length, 'video', self.contentImg);
          }else{
            self.editor.insertEmbed(self.length, 'image', self.contentImg)
          };
          var jqObj=self.$el.querySelector('.custom-input');
          jqObj.value = "";

        }
      },







      /**
       * 根据数组的长度，来决定需要递归几次，最终取出需要的结果，我曹，没法解释，解释不清的玩意。
       * @param  {array}  areas 地区列表，无线分类结构
       * @param  {array}  temps 一维数组,如果只有一个，代表取顶级;如果两个，取顶级的子级；如果三个，顶级的子级的子级....以此类推
       * @param  {number} k     递归次数，当这个值等于temps的长度时，就代表结束了
       * @return {string}       地区名称
       */
      onDeepGetCityName (list, temps, k) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].id + '' === temps[k] + '') {
            if (k < temps.length - 1) {
              k = k + 1
              this.temp_field_obj[this.data.key].push(list[i].city)
              this.onDeepGetCityName(list[i].children, temps, k)
            } else {
              // console.log(list[i]);
              this.temp_field_obj[this.data.key].push(list[i].city)
              return
            }
          }
        }
      },

      /**
       * 最后一级选择完后触发
       * @param v 选中的值数组，根据这个数组取出对应的文本
       */
      sonChange (v) {
        this.temp_field_obj[this.data.key] = []
        this.onDeepGetCityName(this.data.options, v, 0)
        this.submit_info[this.data.key] = this.temp_field_obj[this.data.key]
        this.$emit('onChange', [this.data.key,value])
        this.events.change && this.events.change({value: v, info: this.submit_info[this.data.key]})
      },
      onChange (val) {

        this.$emit('onChange', [this.data.key,val[val.length-1]])

      },

      /**
       * 每选择一项时就触发这个
       * 场景：当选择的条件不允许继续选择时，可以使用这个事件
       * @param v 选中的值数组，根据这个数组取出对应的文本
       */
      onActiveItemChange (v) {
        this.temp_field_obj[this.data.key] = []
        this.onDeepGetCityName(this.data.options, v, 0)
        this.submit_info[this.data.key] = this.temp_field_obj[this.data.key]
        this.events['active-item-change'] && this.events['active-item-change']({
          value: v,
          info: this.submit_info[this.data.key]
        })
      }
    },


  }]
  export default Js
</script>
<style>
  .tox-tinymce-aux{
    z-index:9999!important
  }
</style>
