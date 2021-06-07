<template>
  <div class="table">
      <div style="margin-bottom:10px">
            <el-button type="primary" @click="dialogVisible1 = true,form = {},type='add'">手动添加</el-button>
            <el-button type="primary" @click="dialogVisible = true">文件导入</el-button>
      </div>
     <el-table :data="list" border >
        <el-table-column prop="name" label="店名" width="120" align='center'> </el-table-column>
           <el-table-column label="店铺头像"  width="100">
          <template slot-scope="scope">  
              <img :src="scope.row.image" alt="头像" class="image">
          </template>
        </el-table-column>
        <el-table-column prop="addressGuide" label="位置" width="160" align='center'> </el-table-column>
        <el-table-column prop="city" label="城市" width="70" align='center'> </el-table-column>
        <el-table-column prop="cuisine" label="菜系" width="70" align='center'> </el-table-column>
        <el-table-column prop="score" label="平均得分" width="70" align='center'> </el-table-column>
        <el-table-column prop="average" label="人均消费" width="70" align='center'> </el-table-column>
        <el-table-column prop="type" label="菜品类型" width="120" align='center'> </el-table-column>
        <el-table-column prop="specialty" label="招牌菜" width="120" align='center'> </el-table-column>
        <el-table-column label="操作"  width="180">
          <template slot-scope="scope">  
             <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
             <el-button type="success" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
     </el-table>

     <!-- 上传文件 -->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <el-button type="primary" icon="el-icon-download" style="margin-bottom:10px" @click="dowload">下载模板</el-button>
        <el-upload
            class="upload-demo"
            drag
            action="/api/backGround/uploadFile/upload_excel"
            :on-success='uploadSuccess'
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div style="overflow:hidden">
             <el-button type="success" class="button" @click="excel()">保存</el-button>
             <el-button type="warning" class="button" @click="dialogVisible = false">取消</el-button>
        </div>
    </el-dialog>
        <!-- 编辑信息 -->
       <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%" >
       <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="点名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="位置">
                <el-input v-model="form.addressGuide"></el-input>
            </el-form-item>
             <el-form-item label="城市">
                <el-input v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="菜系">
                <el-input v-model="form.cuisine"></el-input>
            </el-form-item>
             <el-form-item label="平均得分">
                <el-input v-model="form.score"></el-input>
            </el-form-item>
            <el-form-item label="人均消费">
                <el-input v-model="form.average"></el-input>
            </el-form-item>
             <el-form-item label="菜品类型">
                <el-input v-model="form.type"></el-input>
            </el-form-item>
            <el-form-item label="招牌菜">
                <el-input v-model="form.specialty"></el-input>
            </el-form-item>
             <el-form-item label="店铺头像"  width="180">
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
                <el-button  @click="cancel()">取消</el-button>
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
        uploadArr:null,
        dialogVisible:false,
        dialogVisible1:false,
        form:{
            longitude:'116.31803',
            latitude:'23.4282',
            name:'',
            addressGuide:'',
            city:"",
            cuisine:'',
            score:'',
            average:'',
            type:'',
            specialty:''
        },
        type:'add',
        uploadBaseUrl:'https://upload-image1998.oss-cn-guangzhou.aliyuncs.com/',
        imageUrl:null,
    };
  },
  mounted() {
      this.init()
  },
  methods: {
    init(){
         axios({
            method: "GET", //请求方式
            url: "/api/backGround/restaurant/allRestaurant", //请求地址
          }).then((res) => {
             if(res.status === 200) {
               this.list = res.data
             }
        })
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
          this.form.image = this.uploadBaseUrl + res.imageUrl
          this.imageUrl = res.imageUrl
      },
    cancel:function(){
        this.dialogVisible1 = false
    },
    dowload(){
         axios({
            method: "GET", //请求方式
            url: "/api/backGround/uploadFile/dowload_excel", //请求地址
            responseType: 'blob'
          }).then((res) => {
                let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
                let objectUrl = URL.createObjectURL(blob) // 创建URL
                location.href = objectUrl;
                URL.revokeObjectURL(objectUrl); // 释放内存
        })
    },
    del(data){
        axios({
            method: "POST", //请求方式
            url: "/api/backGround/restaurant/delRestaurant", //请求地址
            data:{
                id:data._id
            }
          }).then((res) => {
             if(res.status === 200) {
                 this.$message({
                    type:'success',
                    message:'修改成功'
                })
                this.init()
             }
        })
    },
    save(){
        if(this.type == 'add') {
            this.form.longitude = '116.31803',
            this.form.latitude = '23.4282',
            console.log(this.form);
            axios({
                method: "POST", //请求方式
                url: "/api/backGround/restaurant/addRestaurants", //请求地址
                data:{
                    arr:[this.form]
                }
            }).then((res) => {
                if(res.status === 200) {
                    this.dialogVisible1 = false 
                    this.$message({
                        type:'success',
                        message:'添加成功'
                    })
                }
            })
        }else {
             axios({
                method: "POST", //请求方式
                url: "/api/backGround/restaurant/setRestaurantMessage", //请求地址
                data:this.form
            }).then((res) => {
                if(res.status === 200) {
                    this.dialogVisible1 = false 
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    })
                    this.form = {}
                    this.init()
                }
            })
        }
         
    },
    edit(data){
        this.type = 'edit'
        this.dialogVisible1 = true
        console.log(data);
        this.form = data
    },
    excel(){
        if(this.uploadArr === null) {
            this.$message.error('请选择上传的文件')
        }else {
            axios({
            method: "POST", //请求方式
            url: "/api/backGround/restaurant/addRestaurants", //请求地址
            data:{
                arr:this.uploadArr
            }
          }).then((res) => {
             if(res.status === 200) {
                this.dialogVisible = false
                this.$message({
                    type:'success',
                    message:"导入成功"
                })
             }
        })
        }
    },
    uploadSuccess(res){
        this.uploadArr = res
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
.button{
    margin: 10px;
    float: right;
}
.image {
    width: 70px;
    height: 70px;
}
</style>
