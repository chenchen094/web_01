$(function(){
    //调用函数渲染文章分类列表
    initArtCateList()


  //通过代理的形式，为form-add表单绑定submit事件
  var index = null;
  $('body').on('submit', '#boxAddCate', function(e) {
    e.preventDefault()
     $.ajax({
         type:'post',
         url:'/my/article/addcates',
         data:$(this).serialize(),
         success:function(res){
             if(res.status !==0){
                 
                 return layer.msg('添加失败')
             }
             //调用函数渲染文章分类列表
             initArtCateList()

             layui.layer.msg('添加成功')

             //根据索引，关闭对应的弹出层
          layui.layer.close(index)

             
         }
     }) 
  })


     //渲染模板字符串
    function initArtCateList(){
        //发送ajax请求，获取数据库数据
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                //渲染获取到的data 数据
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var layer = layui.layer
    var form = layui.form
    //为添加按钮绑定点击事件

    $('#btnAddCate').on('click',function(){
        index=layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
          })
    })
    
   //通过代理的形式，为btn-edit按钮绑定点击事件
   var indexEdit=null

   $('tbody').on('click','.btn-edit',function(){
    indexEdit=layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#dialog-edit').html()
      })


      //点击编辑将id获取到的内容填入表单中
      var id = $(this).attr('data-id')
      $.ajax({
          type:'get',
          url:'/my/article/cates/'+id,
          success:function(res){
            //   console.log(res);
             form.val('form-edit',res.data)
          }
      })
   })


  //修改文章分类请求，通过代理方式，为表单绑定submit提交事件
  $('body').on('submit','#form-edit',function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更新分类失败！')
            }
            layer.msg('更新分类成功！')
            layer.close(indexEdit)
            initArtCateList() //重新调用，刷新页面
        }
    })
})


$('tbody').on('click', '.btn-delete', function() {
    var id = $(this).attr('data-id')
    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index)
          initArtCateList()
        }
      })
    })
})

    

})