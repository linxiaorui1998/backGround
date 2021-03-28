<template>
    <div class="content">
            <div class="top">
               <el-breadcrumb separator="/">
                    <el-breadcrumb-item  v-for="item in crumbData" :key="item.path"
                     :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="router">
                <router-view></router-view>
            </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
           crumbData:[{name:'Home',title:'首页',path:'/'}]
        }
    },
    watch:{
         $route() {
         // [{name: 'home'}, {name:'list'}] 这个是路由里面一个对象配置
         this.crumbData = this.$route.matched.map(m => {
             let obj = {
                  name: m.name,
                  title: m.meta.title,
                  path:m.path
             }
            return obj
         })
      }
    }
}
</script>>
<style lang="less" scoped>
.content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    background-color: #f0f0f0;
    .top {
        flex: 0 0 30px;
        background-color: #fff;
        .el-breadcrumb {
            height: 100%;
            line-height: 30px;
            margin-left: 20px;
        }
    }
    .router {
        flex: auto;
        width: 100%;
        margin: 10px;
        margin-bottom: 0px;
        background-color: #fff;
    }
}
</style>