//引入vue
import Vue from 'vue'
//引入路由
import VueRouter from 'vue-router';
//注册路由
Vue.use(VueRouter);

//异步引入login组件
const Login = () => import('@/pages/Login.vue');
//异步引入login组件
//const Regist = () => import('@/pages/Regist.vue');

//得到路由相关信息
import navs from "@/utils/api/navs";

import routeMap from "@/utils/api/component";

//配置路由规则
var routes = [];


//解析路由需要的数据
navs.map(item => {
    //解析数据,添加进路由规则中
    routes.push({
        path: item.path, component: routeMap[item.componentName]
    });
    //判断是否有子路由
    if (item.children) {
        item.children.map(child => {
            routes.push({
                path: child.path, component: routeMap[item.componentName]
            });
        });
    }
});


//实例化路由
var router = new VueRouter({
    routes: [
        ...routes,
        { path: '/login', components: { login: Login } },
        { path: '/*', redirect: '/home' }
    ]
});

// 暴露路由
export default router;