//异步引入home组件
const Home = () => import('@/pages/Home.vue');
//异步引入login组件
const Login = () => import('@/pages/Login.vue');


const GoodList = () => import('@/pages/GoodList.vue');
const Index = () => import('@/pages/Index.vue');
const BannerList = () => import('@/pages/BannerList.vue');
export default {
    Home,
    Login,
    GoodList,
    Index,
    BannerList
}