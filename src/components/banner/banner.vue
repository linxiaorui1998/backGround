<template>
  <div class="table">
      <div style="margin-bottom:10px">
            <el-button type="primary" @click="add()">新增轮播图</el-button>
      </div>
     <el-table :data="list" border >
        <el-table-column prop="name" label="名字" width="180" align='center'> </el-table-column>
         <el-table-column label="图片"  width="180">
          <template slot-scope="scope">  
              <img :src="scope.row.url" alt="图片" style="height:40px">
          </template>
        </el-table-column>
       
        <el-table-column label="操作"  width="180">
          <template slot-scope="scope">  
             <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
             <el-button type="success" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
     </el-table>
     
     <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
       <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名字">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                  <el-upload
                    action="/api/backGround/uploadFile/upload2"
                    list-type="picture-card"
                    :on-success="uploadImageSuccess"
                    :limit=1
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
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
        list:[],
        dialogVisible:false,
        form:{},
        uploadBaseUrl:'https://upload-image1998.oss-cn-guangzhou.aliyuncs.com/',
        type:'add'
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function () {
      axios({
        method: "GET", //请求方式
        url: "/api/backGround/banner", //请求地址
      }).then((res) => {
        if (res.status === 200) {
          this.list = res.data;
          console.log(this.list, "列表");
        }
      });
    },
    add:function(){
      this.type = 'add'
       this.dialogVisible = true
  },
  uploadImageSuccess:function(res){
        this.form.url = this.uploadBaseUrl + res.imageUrl
        this.imageUrl = res.imageUrl
    },
  del:function(data){
     axios({
        method: "POST", //请求方式
        url: "/api/backGround/banner/del" , //请求地址
        data:{
          _id:data._id
        }
      }).then((res) => {
        if (res.status === 200) {
            this.$message({
              type:'success',
              message:'删除成功'
            })
            this.dialogVisible = false
            this.init()
        }
      });
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
    edit:function(data){
      this.type = 'edit'
      this.form = data
      this.dialogVisible = true
    },
    save:function(){
       axios({
        method: "POST", //请求方式
        url: this.type == 'add' ? "/api/backGround/banner/add" :"/api/backGround/banner/edit" , //请求地址
        data:this.form
      }).then((res) => {
        if (res.status === 200) {
            this.$message({
              type:'success',
              message:'操作成功'
            })
            this.dialogVisible = false
            this.init()
        }
      });
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
