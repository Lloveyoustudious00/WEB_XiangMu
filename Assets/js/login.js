$(function(){
    $(".link-ZhuChe").on("click", function(){
        $(this).hide();
        $(".link-DengLu").show();
        $(".DengLu-box").hide();
        $(".ZhuChe-box").show();
    });
    $(".link-DengLu").on("click", function(){
        $(this).hide();
        $(".link-ZhuChe").show();
        $(".DengLu-box").show();
        $(".ZhuChe-box").hide();
    });
    // 从layui中获取form对象
    var form = layui.form;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个 pws 的校验规则
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value){
            // 通过形参拿到的是确认框中的内容
            // 还需要拿到密码框中的内容然后进行一次等于的判断
            // 如果判断失败,就return一个提示消息即可
            var pwd = $('.ZhuChe-box [name=password]').val();
            if(pwd !== value)
            {
                return '两次密码不一致';
            }
        }
    });
    // 监听注册表单的提交事件
    $("#Ster_ZhuCe").on("submit", function(res){
        // 1.阻止默认的提交行为
        res.preventDefault();
        // 2.发起Ajax的POST请求
        $.post("/api/reguser",{username: $(".ZhuChe-box [name=usname]").val(),password: $(".ZhuChe-box [name=password]").val()}, function(ter){
            var layer = layui.layer;
            if(ter.status !== 0)
            {
                return layer.msg(ter.message);
            }
            layer.msg("注册成功 请登录");
            // 模拟人的点击行为(跳转到登录面板)
            $(".link-DengLu").click();
        })
    });
    $("#Ster_DengLu").on("submit", function(res){
        // 1.阻止默认的提交行为
        res.preventDefault();
        // 2.发起Ajax的POST请求
        $.post("/api/login",{username: $("#Ster_DengLu [name=usname]").val(),password: $("#Ster_DengLu [name=password]").val()}, function(ter){
            var layer = layui.layer;
            if(ter.status !== 0)
            {
                return layer.msg(ter.message);
            }
            layer.msg("登陆成功!");
            // 跳转页面
            setInterval(function(){
                location.href = '/Web_XiangMu/index.html';
            },1000)
            //  将登录成功获取到的 token 字符串 保存到浏览器中
            localStorage.setItem("token", ter.token);
        })
    });
})