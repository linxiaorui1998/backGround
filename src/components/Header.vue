<template>
        <div class="header">
            <div class="title">
                <span class="icon iconfont icon-outdent" v-if="extend" @click="change()"></span>
                <span class="icon iconfont icon-indent" v-if="!extend" @click="change()"></span>
                探周边管理系统
            </div>
            <div class="operation">
                <span class="icon iconfont icon-kuozhan" @click="fullScreen()"></span>
                <span class="icon iconfont icon-menling-"></span>
                <!-- <span></span> -->
                <el-dropdown class="drop" trigger="click">
                    <span class="el-dropdown-link" style="color:#fff">
                        {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item @click.native="signout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
    data(){
        return {
              fullscreen: false,
              extend:false,
              user:null
        }
    },
    mounted(){
        this.user = localStorage.getItem('username')
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
         margin-right: 20px;
    }
    }
}
</style>