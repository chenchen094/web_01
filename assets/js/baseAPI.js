//配置一个公共ajax请求参数地址

$.ajaxPrefilter(function(options){
    
    options.url='http://ajax.frontend.itheima.net'+options.url
    // console.log(options.url);
})