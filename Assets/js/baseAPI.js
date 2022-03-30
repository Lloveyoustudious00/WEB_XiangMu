// 注意：每次调用 $.post() 或 $.get() 的时候会先调用 ajaxPerfilter这个函数
// 在这个函数中,可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (res) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的跟路径
    res.url = "http://www.liulongbin.top:3007" + res.url;
    console.log(res.url);
    // 统一为有权限的接口,设置 headers 请求头
    if (res.url.indexOf('/my/') !== -1) {
        res.headers = { Authorization: localStorage.getItem("token") || '' }
    }
    // 全局统一挂载 comlpete 回调函数
    res.complete = function (ter) {
        // 在 complete 回调函数中,可以使用
        if (ter.responseJSON.status == 1 && ter.responseJSON.message == "身份认证失败！") {
            // 1.强制清空 token
            localStorage.removeItem('token');
            // 2.强制跳转到登录页面
            location.href = '/Web_XiangMu/login.html';
        }
    }
})