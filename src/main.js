import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import css from "./assets/css/app.css"
import axios from '../interceptors'

import VueQuillEditor  from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
Vue.use(VueQuillEditor);

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
