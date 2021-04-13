<template>
  <div class="coupon">
    <el-button
      type="primary"
      style="margin: 10px 0"
      @click="dialogVisible = true"
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
          <p
            :class="
              scope.row.isadopt == 0 || scope.row.isadopt == 2 ? 'color' : ''
            "
          >
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
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="success" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加优惠套餐 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="套餐名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="套餐价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="划线价">
          <el-input v-model="form.lineactionPrice"></el-input>
        </el-form-item>
        <el-form-item label="已售">
          <el-input v-model="form.sold"></el-input>
        </el-form-item>
        <el-form-item label="总数">
          <el-input v-model="form.total"></el-input>
        </el-form-item>
        <el-form-item label="购买须知">
          <el-input v-model="form.notice"></el-input>
        </el-form-item>
        <el-form-item label="套餐图片">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save()">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
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
      tableData: [],
      dialogVisible: false,
      form: {
        restaurantID: localStorage.getItem("_id"),
        isadopt: false,
      },
      imageUrl:''
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