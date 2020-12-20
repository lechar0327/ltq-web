
import fetch from './fetch'

//获取推荐商品
function getHotGoodList(data) {
    return fetch({
        method: "Get",
        url: "/api/good/queryGoodsList",
        params: data
    });
}



//获取商品详情
function getGoodDetail(params) {
    return fetch({
        url: "/api/good/queryGoodDetails",
        method: "GET",
        params
    });
}

//获取所有品类
function getCates(params) {
    return fetch({
        url: '/jd/getAllCates',
        method: 'GET',
        params
    })
}

//图片上传接口
function uploadImgReq(data) {
    return fetch({
        url: '/api/upload',
        method: 'POST',
        data
    })

}


export default {
    getHotGoodList,
    getGoodDetail,
    getCates,
    uploadImgReq
}