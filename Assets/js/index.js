$(function () {
    // 调用获取用户信息的函数
    GetHuQu();
    var layer = layui.layer;
    // 点击按钮,实现退出功能
    $('#TueiChu').on("click", function () {
        layer.confirm('确定要退出登录', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清除本地(浏览器)的 token
            localStorage.removeItem("tpken");
            // 2.退出要跳转的页面
            location.href = '/Web_XiangMu/login.html';
            // 关闭 confirm 询问框
            layer.close(index);
        });
    })
})
function GetHuQu() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!');
            }
            // 1.获取用户的名称
            var name = res.data.nickname || res.data.username;
            // 2.设置欢迎的文本
            $('.text-Ster').html('欢迎&nbsp;&nbsp;' + name);
            // 3.渲染用户的头像
            if (res.data.user_pic !== null) {
                // 3.1 渲染用户头像
                $('.layui-nav-img').attr('src', res.data.user_pic).show();
                $('.text-ataver').hide();
            }
            else {
                // 3.2 渲染文本头像
                $('.layui-nav-img').hide();
                var sure = name[0].toUpperCase();
                $('.text-ataver').html(sure).show();
            }
            // 也可以通过调用函数来实现
            // Appsertextster(res.data);
        }
        // 不论成功还是失败,最终都会调用 complete 回调函数
        // complete: function (ter) {
        //     // console.log(ter);
        //     // 在 complete 回调函数中,可以使用
        //     if(ter.responseJSON.status == 1 && ter.responseJSON.message == "身份认证失败！")
        //     {
        //         // 1.强制清空 token
        //         localStorage.removeItem('token');
        //         // 2.强制跳转到登录页面
        //         location.href = '/Web_XiangMu/login.html';
        //     }
        // }
    })
}
function Appsertextster(user) {
    var name = user.nickname || user.username;
    $('.text-Ster').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-ataver').hide();
    }
    else {
        $('.layui-nav-img').hide();
        var sure = name[0].toUpperCase();
        $('.text-ataver').html(sure).show();
    }
}