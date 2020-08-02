
$(function () {
    var layer=layui.layer
    var form = layui.form
   //密码校验
    form.verify({
        //自定义一个叫做pwd校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        //校验原密码和新密码是否一致
        samepwd: function (value) {

            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }


        },
        //校验两次密码是否一致的规则
        regpwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()

        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            //获取this当前表单获取到的数据然后提交
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功')
                //重置表单
                $('.layui-form')[0].reset()
            }
        })
      })

      
    
})
