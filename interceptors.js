import axios from 'axios'
axios.defaults.timeout = 8000;
axios.interceptors.request.use(
    config => {
      if (localStorage.token) { //判断token是否存在
        console.log("执行");
        config.headers.token = localStorage.token;  //将token设置成请求头
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  export default axios;