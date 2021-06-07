<template>
  <div class="coupon">
    <el-button
      type="primary"
      style="margin: 10px 0"
      @click="toPage()"
      >发布套餐</el-button
    >
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="套餐名" width="160" align="center">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="110" align="center">
      </el-table-column>
      <el-table-column
        prop="lineactionPrice"
        label="划线价"
        width="110"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="sold" label="已售" width="110" align="center">
      </el-table-column>
      <el-table-column prop="total" label="总数" width="110" align="center">
      </el-table-column>
      <el-table-column
        prop="isadopt"
        label="是否审核"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <p :class="scope.row.isadopt == 0 || scope.row.isadopt == 2 ? 'color' : ''">
            {{
              scope.row.isadopt == 0
                ? "未审核"
                : scope.row.isadopt == 1
                ? "已通过"
                : "未通过"
            }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        restaurantID: localStorage.getItem("_id"),
        isadopt: false,
      },
      imageUrl:'',
      uploadBaseUrl:'https://upload-image1998.oss-cn-guangzhou.aliyuncs.com/',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    save: function () {
      axios({
        method: "POST", //请求方式
        url: "/api/backGround/coupon/add", //请求地址
        data: {
          obj: this.form,
        },
      }).then((res) => {
        if (res.status === 200) {
          this.dialogVisible = false;
          this.$message({
            type: "success",
            message: "申请成功，等待管理员审核",
          });
          this.init();
        }
      });
    },
    toPage:function(){
      this.$router.push({
        name:'AddCoupon'
      })
    },
    uploadImageSuccess:function(res){
          this.form.image = this.uploadBaseUrl + res.imageUrl
          this.imageUrl = res.imageUrl
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
    init: function () {
      axios({
        method: "GET", //请求方式
        url: "/api/backGround/coupon", //请求地址
      }).then((res) => {
        if (res.status === 200) {
          this.tableData = res.data;
        }
      });
    },
    del: function (data) {
      console.log('删除',data);
      axios({
        method: "POST", //请求方式
        url: "/api/backGround/coupon/del", //请求地址
        data: {
          _id: data._id,
        },
      }).then((res) => {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.init();
        }
      });
    },
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

         if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
};
</script>>
<style lang="less" scoped>
.coupon {
  padding: 0 20px;
  box-sizing: border-box;
}
.color {
  color: red;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>