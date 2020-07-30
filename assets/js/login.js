$(function () {
    //输入账号
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    });
    //注册
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    });

    //从layui获取form对象
    var form = layui.form
    var layer = layui.layer
    //自定义校验规则  
    form.verify({
        //自定义一个叫做pwd校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致的规则
        repwd: function (value) {
            if ($('#reg-pwd').val() !== value) {
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单提交时间
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    // return alert(res.message)
                    return layer.msg(res.message)
                }
                //注册成功提示
                layer.msg('注册成功,请登陆')
                $('#link_login').click()
                //清空表单
                $('#form_reg')[0].reset()
            }
        })
    })

    //监听登陆表单提交时间
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/login',
            data: $(this).serialize(),
            success:function(res){
                if(res.status !==0){
                  return  layer.msg(res.message)
                    
                }
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = '/index.html'
                
            }
        })
    })
})
