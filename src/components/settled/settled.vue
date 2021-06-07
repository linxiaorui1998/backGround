<template>
  <div class="box">
       <el-table :data="list" border >
        <el-table-column prop="name" label="名字" width="130" align='center'> </el-table-column>
        <el-table-column prop="sex" label="性别" width="130" align='center'> </el-table-column>
        <el-table-column prop="phone" label="联系方式" width="130" align='center'> </el-table-column>
        <el-table-column prop="restaurantName" label="店铺名称" width="130" align='center'> </el-table-column>
        <el-table-column prop="address" label="店铺地址" width="130" align='center'> </el-table-column>
        <el-table-column label="营业执照"  width="130">
          <template slot-scope="scope">  
             <img :src="i.url" alt="" v-for="(i,index) in scope.row.fileList" :key="index" style="height:80px;width:80px">
          </template>
    </el-table-column>
        <!-- <el-table-column label="操作"  width="180">
          <template slot-scope="scope">  
             <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
             <el-button type="success" @click="del(scope.row)">删除</el-button>
          </template>
    </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
      return {
         list:[]
      }
  },
  methods:{
    init:function(){
         axios({
            method: "GET", //请求方式
            url: "/api/settled/settledList", //请求地址
          }).then(res => {
              this.list = res.data
              console.log(res.data,'chenggong1')
          })
    }
  },
  mounted(){
     this.init()
  }
};
</script>
<style lang="less" scoped>
.box {
    padding: 30px;
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
