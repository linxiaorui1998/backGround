<template>
  <div class="order">
       <el-table :data="tableData" border >
        <el-table-column prop="_id" label="订单ID" width="160" align='center'> </el-table-column>
        <el-table-column prop="time" label="时间" width="180" align='center'> </el-table-column>
        <el-table-column label="类型"  width="120" align='center'>
            <template slot-scope="scope">  
                <p>{{scope.row.buy_type == 'coupons' ? '套餐' :'菜品'}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="buy_id" label="商品ID" width="120" align='center'> </el-table-column>
        <el-table-column prop="buy_price" label="购买价格" width="100" align='center'> </el-table-column>
        <el-table-column prop="restaurantID" label="店铺" width="100" align='center'> </el-table-column>
         <el-table-column label="状态"  width="120" align='center'>
            <template slot-scope="scope">  
                <p>{{scope.row.status == '1' ? '已付款' :'已使用'}}</p>
            </template>
        </el-table-column>
        <!-- <el-table-column label="操作"  width="180" align='center'>
          <template slot-scope="scope">  
             <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
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
      tableData:[]
    }
  },
  mounted(){
    this.init()
  },
  methods:{
      init:function(){
        let type = localStorage.type
        let _id = localStorage._id
         axios({
            method: "GET", //请求方式
            url: `/api/order/orderList?type=${type}&_id=${_id}`, //请求地址
          }).then((res) => {
             if(res.status === 200) {
               this.tableData = res.data
             }
        })
      }
  }
};
</script>
<style lang="less" scoped>
.order {
  padding: 20px;
  box-sizing: border-box;
}
</style>
