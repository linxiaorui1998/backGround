import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta:{
      title:'登录'
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta:{
      title:'首页'
    },
    children:[
      {
        path: "/home/header",
        name: "Header",
        component: () =>
          import("../components/Header.vue"),
      },
      {
        path: "/home/coupon",
        name: "Coupon",
        component: () =>
          import("../components/coupon/coupon"),
          meta:{
            title:'优惠套餐'
          },
      },
      {
        path: "/home/adopt",
        name: "Adopt",
        component: () =>
          import("../components/adopt/adopt"),
          meta:{
            title:'信息审核'
          },
      },
      {
        path: "/home/restaurant",
        name: "Restaurant",
        component: () =>
          import("../components/restaurant/restaurant"),
          meta:{
            title:'店铺管理'
          },
      },
      {
        path: "/home/banner",
        name: "Banner",
        component: () =>
          import("../components/banner/banner"),
          meta:{
            title:'轮播图管理'
          },
      },
      {
        path: "/home/menu",
        name: "Menu",
        component: () =>
          import("../components/menus/menu.vue")
      },
      {
        path: "/home/content",
        name: "Content",
        component: () =>
          import("../components/content/content.vue")
      },
      {
        path: "/home/menuManage",
        name: "MenuManage",
        component: () =>
          import("../components/menuManage/menuManage.vue"),
        meta:{
            title:'菜单管理'
          },
      },
      {
        path: "/home/user",
        name: "User",
        component: () =>
          import("../components/user/user.vue"),
          meta:{
            title:'用户管理'
          }
      },
      {
        path: "/home/userList",
        name: "UserList",
        component: () =>
          import("../components/user/userList.vue"),
        meta:{
            title:'用户列表'
          },
      },
      {
        path: "/home/userManage",
        name: "UserManage",
        component: () =>
          import("../components/user/userManage.vue"),
        meta:{
            title:'用户的管理'
          },
      },
      {
        path: "/home/order",
        name: "Order",
        component: () =>
          import("../components/order/order.vue"),
          meta:{
            title:'订单信息'
          },
      },
      {
        path: "/home/stock",
        name: "Stock",
        component: () =>
          import("../components/stock/stock.vue"),
          meta:{
            title:'库存管理'
          },
      },
      {
        path: "/home/restaurantMessage",
        name: "RestaurantMessage",
        component: () =>
          import("../components/restaurantMessage/restaurantMessage.vue"),
          meta:{
            title:'店铺信息'
          },
      },
      {
        path: "/home/income",
        name: "Income",
        component: () =>
          import("../components/income/income.vue"),
          meta:{
            title:'收入信息'
          },
      },
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
