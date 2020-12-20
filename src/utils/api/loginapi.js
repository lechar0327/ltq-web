import fetch from './fetch'

//注册接口
function regist(data) {
    return fetch({
        method: "POST",
        url: "/user/regist",
        data
    });
}

//登录接口
function login(data) {
    return fetch({
        method: "POST",
        url: "/user/login",
        data
    });
}

export default {
    regist,
    login
}