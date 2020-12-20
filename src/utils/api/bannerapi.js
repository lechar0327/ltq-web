
import fetch from './fetch'

//获取推荐商品
function queryBanner(params) {
    return fetch({
        method: "Get",
        url: "/api/banner/queryBanner",
        params
    });
}

export default {
    queryBanner,
}