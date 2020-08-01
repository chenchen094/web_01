//配置一个公共ajax请求参数地址

$.ajaxPrefilter(function (options) {

    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // console.log(options.url);

    //判断请求路径是否包含 /my/
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

      //全局统一挂载complete回调函数
      options.complete=function(res){
            // console.log('执行了complete回调');
            if(res.responseJSON.status === 1&& res.responseJSON.message==='身份认真失败'){
                localStorage.removeItem('token')
                location.href='/login.html'
            }
        }
})