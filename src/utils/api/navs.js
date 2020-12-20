export default [{
    id:1,
    title:'首页管理',
    path: '/home',
    icon:'el-icon-location',
    componentName: 'Index',
    children:[{
        id:1001,
        title:'统计',
        path: '/home/statistics',
        icon:'el-icon-location',
        componentName: 'statistics',
    }]
},
{
    id:2,
    title:'系统管理',
    path: '/setting',
    icon:'el-icon-location',
    componentName: 'BannerList',
    children:[{
        id:2001,
        title:'用户管理',
        path: '/setting/user',
        icon:'el-icon-location',
        componentName: 'home',
    },{
        id:2002,
        title:'菜单管理',
        path: '/setting/menu',
        icon:'el-icon-location',
        componentName: 'home',
    },{
        id:2003,
        title:'权限管理',
        path: '/setting/power',
        icon:'el-icon-location',
        componentName: 'home',
    },{
        id:2004,
        title:'Banner管理',
        path: '/setting/banner',
        icon:'el-icon-location',
        componentName: 'BannerList',
    }]

},
{
    id:3,
    title:'商品管理',
    path: '/good',
    icon:'el-icon-location',
    componentName: 'GoodList',
    children:[{
        id:3001,
        title:'商品列表',
        path: '/good/list',
        icon:'el-icon-location',
        componentName: 'GoodList',
    }]
}];
