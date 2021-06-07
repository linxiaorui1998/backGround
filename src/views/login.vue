<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">探周边后台管理系统</div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <el-button
              slot="prepend"
              icon="icon iconfont icon-touxiang"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button
              slot="prepend"
              icon="icon iconfont icon-iconfront-"
            ></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn" v-if="param.username != ''">
          <el-button style="background-color:#e8e8e8" @click="submit()">验证</el-button>
        </div>
        <Vcode :show="isShow" @success="success" @close="close" />
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vcode from "vue-puzzle-vcode";
export default {
  components: {
    Vcode,
  },
  data: function () {
    return {
      param: {
        username: "",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      isShow: false,
      valid:false
    };
  },
  methods: {
    success() {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      this.valid = true; // 通过验证后，需要手动隐藏模态框
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },
    submit() {
      this.isShow = true;
    },
    submitForm() {
        if(this.valid === false) {
            this.$message.error('验证不通过')
            return
        }
      this.$refs.login.validate((valid) => {
        if (valid) {
          axios({
            method: "POST", //请求方式
            url: "/api/backGround/login", //请求地址
            data: {
              username: this.param.username,
              password: this.param.password,
            }, //请求数据
          })
            .then((res) => {
              //请求成功
              console.log(res, "chenggong");
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("_id", res.data._id);
              localStorage.setItem("type", res.data.type);
              this.$router.push("/home");
              this.$message({
                type: "success",
                message: "登陆成功",
              });
              localStorage.setItem("username", this.param.username);
            })
            .catch(() => {
              //请求失败
              this.$message.error("用户名或密码错误");
            });
        } else {
          this.$message.error("请输入账号和密码");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: black;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>