<template>
  <div class="box">
      <h1 class="title">店铺信息</h1>
      <el-row v-for="(item,index) in message" :key="index" style="margin-bottom:10px">
          <el-col :span="4">{{item.name}}</el-col>
          <el-col :span="18">
              <el-input v-model="item.value" placeholder="请输入内容" v-if="isChange"  ></el-input>
              <span v-if="!isChange">{{item.value}}</span>
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
              {name:'店铺经度：',value: null,title:'longitude'},
              {name:'店铺纬度：',value: null,title:'latitude'},
              {name:'店铺图片：',value: null,title:'image'},
              {name:'导购语：',value: null,title:'guide'},
              {name:'特色菜：',value: null,title:'specialty'},
              {name:'开始时间：',value: null,title:'beginTime'},
              {name:'关门时间：',value: null,title:'endTime'},
              {name:'背景色：',value: null,title:'backGroundColor'},
          ],
      }
  },
  methods:{
      edit:function(){
          this.isChange === true ? this.isChange = false : this.isChange = true
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

</style>
