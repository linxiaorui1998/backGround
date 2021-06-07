<template>
  <div class="stock">
      <div class="title">我是库存管理</div>
       <el-table :data="tableData" border >
        <el-table-column prop="goodsName" label="名称" width="160" align='center'> </el-table-column>
        <el-table-column prop="goodsPrice" label="价格" width="140" align='center'> </el-table-column>
        <el-table-column prop="reason" label="退款原因" width="140" align='center'> </el-table-column>
        <el-table-column prop="time" label="申请时间" width="160" align='center'> </el-table-column>
        <el-table-column prop="descript" label="退款描述" width="100" align='center'> </el-table-column>
       <el-table-column label="图片描述"  width="180" align='center'>
          <template slot-scope="scope">  
             <img :src="item.url" alt="" 
             v-for="(item,index) in scope.row.fileList" :key="index" style="width:80px;height:80px;">
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="180" align='center'>
          <template slot-scope="scope">  
             <el-button type="primary" @click="agree(scope.row)" v-if="scope.row.status == 1">同意</el-button>
             <el-button type="danger" @click="adopt(scope.row)" v-if="scope.row.status == 1">拒绝</el-button>
             <el-button type="primary"  v-if="scope.row.status == 2" disabled>已同意</el-button>
             <el-button type="danger"  v-if="scope.row.status == 3" disabled>已拒绝</el-button>
          </template>
        </el-table-column>
     </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
      return {
          tableData:[],
      }
  },
  methods:{
      init:function(){
           axios({
              method: "GET", //请求方式
              url: `/api/refund/refundList?id=${localStorage._id}`, //请求地址
            }).then((res) => {
              if (res.status === 200) {
                this.tableData = res.data;
                console.log(this.tableData, "表格列表");
              }
            });
      },
      agree:function(data){
          axios({
              method: "GET", //请求方式
              url: `/api/refund/agree?orderID=${data.orderID}&restaurantId=${data.restaurantId}`, //请求地址
            }).then(() => {
              this.$message({
                  type:'success',
                  message:'已同意'
              })
             this.init()
            });
           
      },
      adopt:function(data){
           axios({
              method: "GET", //请求方式
              url: `/api/refund/adopt?restaurantId=${data.restaurantId}`, //请求地址
            }).then(() => {
               this.$message({
                  type:'success',
                  message:'已拒绝'
              })
               this.init()
            });
      },
      del:function(data){
          console.log(data);
      },
      save:function(){
           
      }
  },
  mounted(){
      this.init()
  }
};
</script>
<style lang="less" scoped>
.stock {
    padding: 0 20px;
    box-sizing: border-box;
}
.title {
    margin-top: 30px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
}

</style>
