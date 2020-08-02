$(function(){
    var form = layui.form
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })

    initUserInfo()

    function initUserInfo(){
        $.ajax({
            url:'/my/userinfo',
            success:function(res){
                //用户信息校验
                if(res.status !==0){
                    return layer.msg(res.message);
                }
                // console.log(res);
                //展示用户信息
                form.val('formUserInfo',res.data);
            }
        })
    }


    //重置表单的数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        // console.log(e.handleObj);
            
        e.preventDefault()
        //初始化用户信息
        initUserInfo()
        
      })

      //监听表单的提交事件
      $('.layui-form').on('submit',function(e){
        e.preventDefault()

        $.ajax({
            type:'post',
            url:'/my/userinfo',
            //获取this当前表单获取到的数据然后提交
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('更新失败了')
                }
                layer.msg('更新成功')
                //调取--全局--父页面中的方法，重新渲染用户的头像和用户信息
                window.parent.getUserInfo()
            }
        })
      })
})