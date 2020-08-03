$(function () {
  var layer = layui.layer
  var form = layui.form

  //美化时间的过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }

  var q = {
    pagenum: 1,//页码值
    pagesize: 3,//每页显示几条数据
    cate_id: '',//文章分类的ID
    state: ''//文章的发布状态

  }
  initTable()
  var layer = layui.layer
  function initTable() {
    $.ajax({
      type: 'get',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败')
        }
        layer.msg('获取文章列表成功')
        //使用模板引擎渲染页面数据
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)

        //文章分页
        renderPage(res.total);
      }
    })
  }

  initCate()

  // 初始化文章分类的方法
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取分类数据失败！')
        }
        // 调用模板引擎渲染分类的可选项
        var htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        // 通过 layui 重新渲染表单区域的UI结构
        form.render()
      }
    })
  }


  //为筛选表单绑定submit事件

  $('#form-search').on('submit', function (e) {
    e.preventDefault()
    //获取表单中选中项的值
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()

    //为查询参数对象 q中对应的属性赋值

    q.cate_id = cate_id
    q.state = state

    //根据最新的筛选条件 重新渲染表格的数据
    initTable()
  })

  function renderPage(total) {
    console.log(total)
  }
  var laypage = layui.laypage;
  // 定义渲染分页的方法
  // 定义渲染分页的方法
  function renderPage(total) {
    // 调用 laypage.render() 方法来渲染分页的结构
    laypage.render({
      elem: 'pageBox', // 分页容器的 Id
      count: total, // 总数据条数
      limit: q.pagesize, // 每页显示几条数据
      curr: q.pagenum, // 设置默认被选中的分页
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 4, 5, 6, 7, 8],
      // 分页发生切换的时候，触发 jump 回调
      jump: function (obj, first) {
        console.log(obj.curr)
        // 把最新的页码值，赋值到 q 这个查询参数对象中
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        if (!first) {
          //渲染页面解构
          initTable()
        }
      }
    })
  }

  //通过代理的形式，为删除按钮绑定点击事件

  $('tbody').on('click','.btn-delete',function(){
     var id = $(this).attr('data-id')
      layer.confirm('确定删除？',{icon:3,title:'提示'},function(index){
        $.ajax({
          type:'get',
          url:'/my/article/delete/' + id,
          success:function(res){
            if(res.status !==0){
              return layer.msg('删除文章失败')
            }
            layer.msg('删除文章成功')
            // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
            // 页码值最小必须是 1
            $('.btn-delete').length===1 && p.pagenum>1 && p.pagenum--;
            initTable()
          }
        })
        layer.close(index)
      })
  })

})