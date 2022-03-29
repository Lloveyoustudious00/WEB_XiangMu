// 注意：每次调用 $.post() 或 $.get() 的时候会先调用 ajaxPerfilter这个函数
// 在这个函数中,可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(res){
    // 在发起真正的 Ajax 请求之前，统一拼接请求的跟路径
    res.url = "http://www.liulongbin.top:3007" + res.url;
    console.log(res.url);
})