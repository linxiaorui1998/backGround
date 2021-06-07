<template>
  <div class="content">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="套餐名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="套餐价格">
            <el-input v-model="form.price"></el-input>
        </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="划线价">
            <el-input v-model="form.lineactionPrice"></el-input>
        </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="已售">
            <el-input v-model="form.sold"></el-input>
        </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="总数">
            <el-input v-model="form.total"></el-input>
        </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="套餐图片">
           <el-upload
            action="/api/backGround/uploadFile/upload2"
            list-type="picture-card"
            :on-success="uploadImageSuccess"
            :limit=1
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="购买须知">
             <quill-editor
                class="editor"
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
                ></quill-editor>
                <el-upload
                    id="upload"
                    action="/api/backGround/uploadFile/upload2"
                    list-type="picture-card"
                    :on-success="uploadImageSuccess1"
                    v-show="false"
                    :on-remove="handleRemove1">
                    <i class="el-icon-plus"></i>
                </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save()">保存</el-button>
          <el-button @click="cancle()">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { quillEditor,Quill } from 'vue-quill-editor' // 调用富文本编辑器
import { ImageExtend } from 'quill-image-extend-module'
import ImageResize from 'quill-image-resize-module' 
Quill.register('modules/imageResize', ImageExtend);
Quill.register('modules/imageResize', ImageResize);
const toolbar =[
      ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
      ["blockquote", "code-block"], //引用，代码块
      [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
      [{ list: "ordered" }, { list: "bullet" }], //列表
      [{ script: "sub" }, { script: "super" }], // 上下标
      [{ indent: "-1" }, { indent: "+1" }], // 缩进
      [{ direction: "rtl" }], // 文本方向
      [{ size: ["small", false, "large", "huge"] }], // 字体大小
      [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
      [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
      [{ font: [] }], //字体
      [{ align: [] }], //对齐方式
      ["clean"], //清除字体样式
      ["image","video"] //上传图片、上传视频
    ]
export default {
  data(){
      return {
        form: {
            restaurantID: localStorage.getItem("_id"),
            isadopt: false,
        },
        imageUrl:'',
        imageUrl1:'',
        uploadBaseUrl:'https://upload-image1998.oss-cn-guangzhou.aliyuncs.com/',
        content:'',
            editorOption: {
              placeholder: '请输入套餐简介',
              theme: 'snow',
              modules: {
                 toolbar: {
                   container:toolbar,
                   handlers:{
                     image:function(){
                        document.getElementsByClassName('el-upload__input')[1].click()
                     }
                   }
                 },
                imageResize:{ // 图片缩放比例
                    displayStyles:{
                        backgroundColor:'black',
                        border:'none',
                        color:'white'
                },
                modules:['Resize','DisplaySize', 'Toolbar']
              }
		   }
       }
    }
  },
  components: {
      quillEditor
    },
  methods:{
    onEditorChange(e) {
          //内容改变事件
          this.form.notice = e.html
          console.log(e.html);
      },
    uploadImageSuccess:function(res){
          this.form.image = this.uploadBaseUrl + res.imageUrl
          this.imageUrl1 = res.imageUrl1
      },
     save: function () {
      axios({
        method: "POST", //请求方式
        url: "/api/backGround/coupon/add", //请求地址
        data: {
          obj: this.form,
        },
      }).then((res) => {
        if (res.status === 200) {
          this.dialogVisible = false;
          this.$message({
            type: "success",
            message: "申请成功，等待管理员审核",
          });
          this.$router.go(-1)
        }
      });
    },
     cancle:function(){
      console.log('触发');
      this.$router.go(-1)
    },
    uploadImageSuccess1:function(res){
       console.log("触发上传");
          this.image = 'https://upload-image1998.oss-cn-guangzhou.aliyuncs.com/' + res.imageUrl
          this.imageUrl = res.imageUrl
          let quill = this.$refs.myQuillEditor.quill
          let length = quill.getSelection().index
          quill.insertEmbed(length,'image',`${this.image}`)
          quill.setSelection(length+1)
      },
    handleRemove:function(){
        axios({
        method: "POST", //请求方式
        url: "/api/backGround/uploadFile/delImage", //请求地址
        data: {
            url:this.imageUrl
        }
      })
      },
    handleRemove1:function(){
            axios({
            method: "POST", //请求方式
            url: "/api/backGround/uploadFile/delImage", //请求地址
            data: {
                url:this.imageUrl
            }
          })
      },
  }
};
</script>
<style lang="less" scoped>
.content{
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
}

</style>
