<template>
  <div>
    <el-menu
      default-active="MenuManage"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#324157"
      active-text-color="#ffd04b"
      text-color="#fff"
    >
    <el-submenu  v-for="(item,index) in menusChild" :key="'info' + index" :index="item.name">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-for="(item1,index1) in item.child" :key="'info1' + index1" :index="item1.name" @click="toPage(item1.name)">
            <i :class="item1.icon"></i>
            <span slot="title">{{item1.title}}</span>
        </el-menu-item>
    </el-submenu>

      <el-menu-item  v-for="(item,index) in menus" :index="item.name" :key="'info2' + index" @click="toPage(item.name)">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
        isCollapse: false,
        menus:[],
        menusChild:[]
    };
  },
  mounted(){
      this.$EventBus.$on('extend',(msg)=>{
          this.isCollapse = msg
      })
      this.initMessage()
  },
   methods: {
     initMessage(){
         axios({
              method: "GET",    //请求方式
              url: '/api/backGround/login/menu',    //请求地址
          }).then(res => {
              //请求成功
              console.log(res,'chenggong')
              this.menus = res.data.menus
              this.menusChild = res.data.menusChild
          })
     },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toPage(name){
        console.log(name);
          this.$router.push({name:name})
      },
      
    }
};
</script>>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>