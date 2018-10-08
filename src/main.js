// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'

FastClick.attach(document.body);
// rem转化
import 'lib-flexible/flexible'
//vuex
import store from './store'
// 全局vux组件
import { ConfigPlugin } from 'vux'
// 防止模态框出现页面可以滚动
// Vue.use(ConfigPlugin, {
//   $layout: 'VIEW_BOX'
// })
import {
  ConfirmPlugin,
  ToastPlugin,
  LoadingPlugin,
  AlertPlugin
} from 'vux'
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
// mint-ui
import 'mint-ui/lib/style.css'
import {
  InfiniteScroll
} from "mint-ui";
Vue.use(InfiniteScroll);
// ***剪切板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.prototype.$http = instance;
// ***切换滚至页面顶部
// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0);
// });
// axios
import axios from 'axios'
const host = process.env.NODE_ENV === 'development' ? '/' : 'http://sjsl.bjfable.com' // 根据 process.env.NODE_ENV 的值判断当前是什么环境
const instance = axios.create({
  baseURL: host,
  timeout: 10000,
  withCredentials: true,
})
Vue.prototype.$http = instance;
// 全局函数


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
