<template>
  <div class="table">
      <div style="margin-bottom:10px">
            <el-button type="primary" @click="add()">新增用户</el-button>
      </div>
     <el-table :data="list" border >
        <el-table-column prop="userName" label="用户名" width="180" align='center'> </el-table-column>
        <el-table-column prop="Pwd" label="密码" width="180" align='center'> </el-table-column>
        <el-table-column prop="type" label="类型" width="180" align='center'> </el-table-column>
        <el-table-column prop="RestaurantName" label="店铺" width="180" align='center'> </el-table-column>
        <el-table-column label="操作"  width="180">
          <template slot-scope="scope">  
             <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
             <el-button type="success" @click="del(scope.row)">删除</el-button>
          </template>
    </el-table-column>
     </el-table>
     
     <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
       <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.Pwd"></el-input>
            </el-form-item>
             <el-form-item label="类型">
               <el-select
                  v-model="form.type"
                  filterable
                  clearable
                  allow-create
                  default-first-option
                  placeholder="请选择用户类型">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
               </el-select>
                <!-- <el-input v-model="form.type"></el-input> -->
            </el-form-item>
             <el-form-item label="店铺" v-if="form.type == '商家'">
               <el-select
                  v-model="form.RestaurantId"
                  filterable
                  clearable
                  allow-create
                  default-first-option
                  placeholder="请选择店铺名称"
                  @change='rest'>
                  <el-option
                    v-for="item in restaurantMsg"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                  </el-option>
               </el-select>
                <!-- <el-input v-model="form.type"></el-input> -->
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
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      type: 'add',
      dialogVisible:false,
      form:{
          userName:'',
          Pwd:'',
          type:'',
          RestaurantName:'',
          RestaurantId:''
      },
      options:[
        {
          value:'商家',
          lable:'商家',
        },
          {
          value:'管理员',
          lable:'管理员',
        }
      ],
      restaurantMsg:[]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function () {
      axios({
        method: "GET", //请求方式
        url: "/api/backGround/user/list", //请求地址
      }).then((res) => {
        if (res.status === 200) {
          this.list = res.data;
          console.log(this.list, "列表");
        }
      });
      axios({
              method: "GET", //请求方式
              url: "/api/backGround/user/restaurantMsg", //请求地址
            }).then((res) => {
              if (res.status === 200) {
                this.restaurantMsg = res.data;
                console.log(this.restaurantMsg, "列表");
              }
            });
    },
    edit:function(data){
      this.dialogVisible = true
      this.type = 'edit'
      this.form = data
    },
    del:function(data){
      let that = this
      axios({
              method: "POST", //请求方式
              url: "/api/backGround/user/delUser", //请求地址
              data:{
                _id:data._id
              }
            }).then((res) => {
              if (res.status === 200) {
                 that.init()
                 that.$message({
                   type:'success',
                   message:'删除成功'
                 })
              }
            });
    },
    add:function(){
      this.form = {}
        this.dialogVisible = true
    },
    rest:function(){
      this.restaurantMsg.forEach(item => {
        if(item._id === this.form.RestaurantId)
        {
          this.form.RestaurantName = item.name
        }
      })
    },
    save:function(){
      let that = this
      if(this.form.type === '管理员') {
        this.form.RestaurantName = ''
        this.form.RestaurantId = ''
      }
      if(this.type == 'add') {
           axios({
            method: "POST", //请求方式
            url: "/api/backGround/user/addUser", //请求地址
            data:this.form
      }).then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          that.dialogVisible = false
          that.init()
          that.$message({
              type:'success',
              message:'添加成功'
          })
        }
      }).catch(()=>{
         this.$message.error('用户已存在')
      });
      }
      else {
         axios({
          method: "POST", //请求方式
          url: "/api/backGround/user/updateUser", //请求地址
          data:this.form
        }).then((res) => {
          if (res.status === 200) {
            this.dialogVisible = false
            this.init()
            this.$message({
                type:'success',
                message:'编辑成功'
            })
          }
        });
      }
      
    }
  },

};
</script>
<style lang="less" scoped>
.table {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
}
</style>
