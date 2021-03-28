<template>
  <div>
     我是菜单管理
     <button @click="btn()">菜单管理</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data:function(){
      return {

      }
    },
    methods:{
      btn:function(){
        axios({
                method: "GET",    //请求方式
                url: '/api/backGround/login/test',    //请求地址
            }).then(res => {
                //请求成功
                console.log(res,'chenggong')
            }).catch(() => {
                //请求失败
                this.$message.error("用户名或密码错误")
            })
      }
    }
};
</script>
<style lang="less" scoped>


</style>
