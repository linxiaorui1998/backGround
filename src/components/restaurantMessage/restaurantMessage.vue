<template>
  <div class="box">
      <h1 class="title">店铺信息</h1>
      <el-row v-for="(item,index) in message" :key="index" style="margin-bottom:10px">
          <el-col :span="4">{{item.name}}</el-col>
          <el-col :span="18">
              <el-input v-model="item.value" placeholder="请输入内容"
               v-if="isChange && item.title !='image'" @blur="blur(index)"></el-input>
              <span v-if="!isChange && index != 8">{{item.value}}</span>
              <img :src="item.value" alt="tupian " v-if="!isChange && index == 8" class="image">
          </el-col>
          <el-col :span="18" v-if="item.title =='image' && isChange">
              <el-upload
                action="/api/backGround/uploadFile/upload2"
                :on-preview="handlePictureCardPreview"
                list-type="picture-card"
                :on-success="uploadImageSuccess"
                :limit=1
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
             </el-upload>
          </el-col>
      </el-row>
      <el-row style="margin:20px 0">
          <el-col>
               <el-button  type="success" class="fr" style="margin-left:20px" @click="save()">保存</el-button>
               <el-button @click="edit()" type="primary" class="fr">编辑</el-button>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
      return {
          input:'565465456',
          isChange: false,
          message: [
              {name:'店铺名称：',value: null,title:'name'},
              {name:'店铺评分：',value: null,title:'score'},
              {name:'人均消费：',value: null,title:'average'},
              {name:'菜品类型：',value: null,title:'type'},
              {name:'城市：',value: null,title:'city'},
              {name:'店铺地址：',value: null,title:'addressGuide'},
              {name:'店铺经度：',value: null,title:'longitude'},
              {name:'店铺纬度：',value: null,title:'latitude'},
              {name:'店铺图片：',value: null,title:'image'},
              {name:'导购语：',value: null,title:'guide'},
              {name:'特色菜：',value: null,title:'specialty'},
              {name:'开始时间：',value: null,title:'beginTime'},
              {name:'关门时间：',value: null,title:'endTime'},
              {name:'背景色：',value: null,title:'backGroundColor'},
          ],
          uploadBaseUrl:'https://upload-image1998.oss-cn-guangzhou.aliyuncs.com/',
          imageUrl:null
      }
  },
  methods:{
      edit:function(){
          this.isChange === true ? this.isChange = false : this.isChange = true
      },
      handlePictureCardPreview:function(){

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
      uploadImageSuccess:function(res){
          this.message[8].value = this.uploadBaseUrl + res.imageUrl
          this.imageUrl = res.imageUrl
      },
      blur:function(index){
          if(index === 5) {
            axios({
                method: "GET", //请求方式
                url: `/api/city/selCity?address=${this.message[5].value}`, //请求地址
            }).then((res) => {
                console.log(res,"地址");
                 let res1 = res.data
                 if(res1.status == 200) {
                     console.log('嘿嘿');
                    this.message[6].value = res1.message.split(',')[0]
                    this.message[7].value = res1.message.split(',')[1]
                }else if(res1.status == 403){
                    this.$message.error('地址填写有误')
                    this.message[6].value = ''
                    this.message[7].value = ''
                }
               
                  
                })
            }
      },
      save:function(){
          let obj = {}
         this.message.forEach(item=>{
             obj[item.title] = item.value
         })
           axios({
            method: "POST", //请求方式
            url: "/api/backGround/restaurant/setMessage", //请求地址
            data: obj
          }).then((res) => {
             if(res.status === 200) {
                 this.$message({
                     type:'success',
                     message:'保存成功'
                 })
                 this.isChange = false
             }
            //   console.log(this.message);
            })
      },
      initMessage:function(){
          axios({
            method: "GET", //请求方式
            url: "/api/backGround/restaurant/message", //请求地址
          }).then((res) => {
              let res1 = res.data[0]
              this.message.forEach(element => {
                  element.value = res1[element.title]
              });
            //   console.log(this.message);
            })
      }
  },
  mounted(){
      this.initMessage()
  }
};
</script>
<style lang="less" scoped>
.box {
    padding: 0 300px;
    box-sizing: border-box;
}
.title {
    text-align: center;
    margin-top: 30px;
}
.image {
     width: 178px;
    height: 178px;
}
</style>
