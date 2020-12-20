import Vue from 'vue'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

Vue.use(ElementUI);



//引入路由
import router from './router'

Vue.config.productionTip = false


//引入api,将api挂载到vue原型,方便调用
import http from '@/utils/apis'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
