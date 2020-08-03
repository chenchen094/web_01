$(function () {

    var layer = layui.layer
    var form = layui.form

    initCate()
    //定义加载文章分类的方法
    // 初始化富文本编辑器
    initEditor()
    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败')
                }

                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 一定要记得调用 form.render() 方法
                form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    //监听coverFile 的chang事件 ，获取用户选择的文件列表

    $('#coverFile').on('change', function (e) {
        var files = e.target.files
        if (files.length === 0) {
            return
        }

        //根据文件创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // var ImgURL = URL.createObjectURL(files[0])

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var sate = '已发布'
    $('#btnsave2').click(function () {
        sate = '草稿'
    })
    $('#form-add').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData(this);
        fd.append('state', sate);

        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                publishArticle(fd);
               
            })
      
    })
           // 6. 发起 ajax 数据请求
           function publishArticle(fd) {
            $.ajax({
              method: 'POST',
              url: '/my/article/add',
              data: fd,
              // 注意：如果向服务器提交的是 FormData 格式的数据，
              // 必须添加以下两个配置项
              contentType: false,
              processData: false,
              success: function(res) {
                  console.log(res);
                if (res.status !== 0) {
                  return layer.msg(res.message)
                }
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = '/article/art_list.html'

                window.parent.document.getElementById('a2').className = 'layui-this';
                window.parent.document.getElementById('a3').className = '';
              }
            })
        }
    
})