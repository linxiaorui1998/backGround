import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import css from "./assets/css/app.css"
import axios from '../interceptors'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$EventBus = new Vue()

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  css,
  axios,
  render: h => h(App)
}).$mount("#app");
