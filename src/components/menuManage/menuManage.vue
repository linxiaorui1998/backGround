<template>
  <div class="stock">
      <!-- <div class="title">我是菜单管理</div> -->
       <el-button type="primary" @click="dialogVisible = true" style="margin:10px 0">新增菜品</el-button>
       <el-table :data="tableData" border >
        <el-table-column prop="name" label="菜名" width="160" align='center'> </el-table-column>
        <el-table-column prop="price" label="价格" width="110" align='center'> </el-table-column>
        <el-table-column prop="introduce" label="介绍" width="160" align='center'> </el-table-column>
        <el-table-column prop="sold" label="已售" width="110" align='center'> </el-table-column>
        <el-table-column prop="guide" label="导购语" width="160" align='center'> </el-table-column>
        <!-- <el-table-column prop="stock" label="库存" width="110" align='center'> </el-table-column> -->
        <el-table-column prop="company" label="单位" width="100" align='center'> </el-table-column>
        <el-table-column label="操作"  width="180" align='center'>
          <template slot-scope="scope">  
             <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
             <el-button type="success" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
     </el-table>

   <!-- 编辑库存 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" >
       <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="菜品名">
                <el-input v-model="form.name" ></el-input>
            </el-form-item>
            <el-form-item label="菜品介绍">
                <el-input v-model="form.introduce" ></el-input>
            </el-form-item>
            <el-form-item label="导购语">
                <el-input v-model="form.guide" ></el-input>
            </el-form-item>
             <el-form-item label="价格">
                <el-input v-model="form.price" ></el-input>
            </el-form-item>
            <!-- <el-form-item label="库存">
                <el-input v-model="form.stock"></el-input>
            </el-form-item> -->
            <el-form-item label="单位">
                <el-input v-model="form.company" ></el-input>
            </el-form-item>
            <el-form-item label="已卖出" v-if="this.type == 'edit'">
                <el-input v-model="form.sold"></el-input>
            </el-form-item>
            <el-form-item label="点赞数" v-if="this.type == 'edit'">
                <el-input v-model="form.support"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save()">保存</el-button>
                <el-button  @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
     </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
      return {
          tableData:[],
          form:{
              // image:'',
              // name:'',
              // introduce:'',//说明
              // guide:'',
              // price:'',
              // sold: 0,//已卖出
              // support: 0,//点赞数
              // stock: '',//库存
              // company: '',//单位
          },
          dialogVisible:false,
          type:'add'
      }
  },
  methods:{
      init:function(){
           axios({
              method: "GET", //请求方式
              url: "/api/backGround/menus/menusList", //请求地址
            }).then((res) => {
              if (res.status === 200) {
                this.tableData = res.data;
                console.log(this.tableData, "表格列表");
              }
            });
      },
      edit:function(data){
        this.dialogVisible = true
         this.form = data
         this.type = 'edit'
      },
      del:function(data){
          axios({
              method: "POST", //请求方式
              url: "/api/backGround/menus/delMenus", //请求地址
              data: {
                _id:data._id
              }
            }).then((res) => {
              if (res.status === 200) {
                  this.init()
                  this.$message({
                      type:'success',
                      message:'删除成功'
                  })
              }
            });
      },
      save:function(){
        if(this.type == 'add') {
           axios({
              method: "POST", //请求方式
              url: "/api/backGround/menus/addMenus", //请求地址
              data: this.form
            }).then((res) => {
              if (res.status === 200) {
                  this.dialogVisible = false
                  this.init()
                  this.$message({
                      type:'success',
                      message:'添加成功'
                  })
                  this.form = {}
              }
            });
        }
        else {
           axios({
              method: "POST", //请求方式
              url: "/api/backGround/menus/editMenus", //请求地址
              data: this.form
            }).then((res) => {
              if (res.status === 200) {
                  this.dialogVisible = false
                  this.init()
                  this.$message({
                      type:'success',
                      message:'修改成功'
                  })
                  this.form = {}
              }
            });
      }
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
