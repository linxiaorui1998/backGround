<template>
  <div class="coupon">
    <el-tabs type="border-card">
        <el-tab-pane label="待审批">
            <div v-for="(i,index) in tableData" :key="index" class="message">
                {{i.restaurantName}} 店发布 {{i.name}}，价格是{{i.price}}元 ，
                划线价是{{i.lineactionPrice}}元，总数量是{{i.total}}
                <el-button type="danger" style="float:right" @click="fail(index)">不通过</el-button>
                <el-button type="success" style="float:right;margin-right:20px" @click="pass(index)">通过</el-button>  
            </div>
        </el-tab-pane>
        <el-tab-pane label="已通过">
             <div v-for="(i,index) in tableData1" :key="index" class="message">
                {{i.restaurantName}} 店发布 {{i.name}}，价格是{{i.price}}元 ，
                划线价是{{i.lineactionPrice}}元，总数量是{{i.total}}
            </div>
        </el-tab-pane>
        <el-tab-pane label="已拒绝">
             <div v-for="(i,index) in tableData2" :key="index" class="message">
                {{i.restaurantName}} 店发布 {{i.name}}，价格是{{i.price}}元 ，
                划线价是{{i.lineactionPrice}}元，总数量是{{i.total}} 
            </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableData:[],
      tableData1:[],
      tableData2:[],
      dialogVisible:false,
    };
  },
  mounted(){
      this.init()
  },
  methods:{
      init:function(){
          axios({
              method: "GET", //请求方式
              url: "/api/backGround/coupon/noadopt", //请求地址
            }).then((res) => {
              if (res.status === 200) {
                  this.tableData = res.data[0]
                  this.tableData1 = res.data[1]
                  this.tableData2 = res.data[2]
                  console.log(res.data);
              }
            });
      },
      fail(index){
        axios({
              method: "POST", //请求方式
              url: "/api/backGround/coupon/fail", //请求地址
              data:{
                _id:this.tableData[index]._id
              }
            }).then((res) => {
              if (res.status === 200) {
                  this.init()
              }
            });
      },
      pass(index){
         axios({
              method: "POST", //请求方式
              url: "/api/backGround/coupon/pass", //请求地址
              data:{
                  _id:this.tableData[index]._id
              }
            }).then((res) => {
              if (res.status === 200) {
                  this.init()
                  this.$EventBus.$emit('noadopt',this.tableData.length-1)
              }
            });
      }
  }
};
</script>>
<style lang="less" scoped>
.coupon {
    padding:  20px;
    box-sizing: border-box;
}
.color {
    color: red;
}
.message {
    font-size: 14px;
    color: #409eff;
    padding: 20px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #f5f7fa;
}
</style>