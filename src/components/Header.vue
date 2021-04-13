<template>
        <div class="header">
            <div class="title">
                <span class="icon iconfont icon-outdent" v-if="extend" @click="change()"></span>
                <span class="icon iconfont icon-indent" v-if="!extend" @click="change()"></span>
                探周边管理系统
            </div>
            <div class="operation">
                <span class="icon iconfont icon-kuozhan" @click="fullScreen()" style="margin-right:20px"></span>
                <!-- <el-badge is-dot="noadopt" class="item">
                     <span class="icon iconfont icon-menling-"></span>
                </el-badge> -->
                <el-badge :value="noadopt" class="item" v-if="noadopt !== 0">
                   <span class="icon iconfont icon-menling-"  @click="toPage()"></span>
                </el-badge>
                <span class="icon iconfont icon-menling-" v-else style="margin-right:20px" @click="toPage()"></span>

                <el-dropdown class="drop" trigger="click">
                    <span class="el-dropdown-link" style="color:#fff">
                        {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item @click.native="signout">退出登录</el-dropdown-item>
                        <el-dropdown-item @click.native="changPwd">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

              <!-- 编辑密码 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
       <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="原密码">
                <el-input v-model="form.oldPwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="form.newPwd"></el-input>
            </el-form-item>
            <el-form-item label="再次输入新密码">
                <el-input v-model="form.newPwd1"></el-input>
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
import screenfull from 'screenfull'
import axios from 'axios'
export default {
    data(){
        return {
              fullscreen: false,
              extend:false,
              user:null,
              dialogVisible:false,
              form:{
                  oldPwd:'',
                  newPwd:'',
                  newPwd1:'',
              },
              noadopt: 0,
              type:null
        }
    },
    mounted(){
        this.user = localStorage.getItem('username')
        this.type = localStorage.getItem('type')
        this.$EventBus.$on('noadopt',function(data){
            this.noadopt = data
            console.log("出发了",data);
        })
         axios({
                method: "GET", //请求方式
                url: "/api/backGround/coupon/noadopt", //请求地址
                }).then((res) => {
                    if(res.data[0].length > 0) {
                        this.noadopt = res.data[0].length
                    }
                });
    },
    methods:{
        //实现全屏
        fullScreen:function() {
            if (!screenfull.isEnabled) {
                this.$message({
                message: 'you browser can not work',
                type: 'warning'
                })
                return false
            }
            screenfull.toggle()
      },
      change:function(){
          this.extend == true ? this.extend = false : this.extend = true
          this.$EventBus.$emit('extend',this.extend)
      },
      signout:function(){
          this.$router.push('/')
          console.log(1);
      },
      changPwd:function(){
          this.dialogVisible = true 
      },
      toPage:function(){
          if(this.type === '管理员') {
               this.noadopt = 0
               this.$router.push({name:'Adopt'})
          }
         
      },
      save:function(){
          if(this.form.newPwd !== this.form.newPwd1 ) {
              this.$message.error("两次密码不相等")
          }else {
                axios({
                method: "POST", //请求方式
                url: "/api/backGround/login/changePwd", //请求地址
                data:this.form
                }).then((res) => {
                if (res.status === 200) {
                    this.dialogVisible = false
                    this.$message({
                        type:'success',
                        message:"修改成功"
                    })
                    this.form = {
                         oldPwd:'',
                         newPwd:'',
                         newPwd1:'',
                       }
                    }else {
                        this.$message.error("修改有误")
                        
                    }
                });
          }
      }

    }
}
</script>>
<style lang="less" scoped>
.header {
    background-color: #242f42;
    .title {
        display:flex;
        height: 100%;
        float: left;
        font-size: 24px;
        color: #fff;
        margin-left: 30px;
        justify-content: center;
        align-items: center;
        span {
            margin-right: 20px;
        }
    }
    .operation {
        display:flex;
        float: right;
        // width: 40%;
        height: 100%;
        color: #fff;
        // background-color: #fff;
         justify-content: center;
         align-items: center;
        span {
         flex-direction: row;
         font-size: 20px;
    }
    }
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }
}
</style>