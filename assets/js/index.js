$(function () {

  getUserInfo()


    
    var layer = layui.layer
    //点击按钮实现退出提示
    $('#btnLogout').on('click',function(){
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'
      
            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
  
})

//获取用户基本信息

function getUserInfo(options) {

    //在发起真正的AJAX请求之前，统一拼接请求的根路径

    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        //headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },

        success: function (res) {
            // console.log(res);
            if(res.status !==0){
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        }   
    })
}

function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username

    if (user.user_pic !== null) {
        //渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需渲染用户的头像
   
}