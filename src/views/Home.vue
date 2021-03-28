<template>
  <div class="home">
      <Header class="header"></Header>
      <div class="middle">
         <div class="menu">
            <Menus></Menus>
         </div>
         <div class="content">
            <Content></Content>
         </div>
      </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Menus from '../components/menus/menu'
import Content from '../components/content/content'
export default {
  components:{
    Header,
    Menus,
    Content
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  // background-color: pink;
  .header {
    height: 12%;
    // background-color: red;
  }
  .middle {
    height: 88%;
    width: 100%;
    // background-color: red;
    display: flex;
    .menu {
      flex: 0 0 1;
      background-color: #324157;
    }
    .content {
      flex: auto;
      // background-color: purple;
    }
  }
}
</style>
