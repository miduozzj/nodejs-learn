//zlib模块提供了数据压缩和解压的功能  
//当我们处理http请求和响应时,可能需要用到这个模块

//使用zlib模块压缩HTTP响应体数据的例子
//首先通过request header判断客户端是否支持gzip,并在支持的情况下使用zlib模块返回gzip之后的响应体数据

//服务器响应
var http=require('http');
var zlib=require('zlib');

http.createServer(function(request,response){
    var i=1024,data='';
    while(i--){
        data+='.';
    }
    if((request.headers['accept-encoding']||'').indexOf('gzip')!==-1){
        zlib.gzip(data,function(err,data){
            response.writeHead(200,{
                'Content-Type':'text/plain',
                'Content-Encoding':'gzip'
            });
            response.end(data);
        });
    }else{
        response.writeHead(200,{'Content-Type':'text-plain'});
        response.end(data);
    }
}).listen(3000);


//使用zlib模块解压HTTP响应体数据的例子
//首先通过response header判断服务端响应是否使用gzip压缩,并在压缩的情况下使用zlib模块解压响应体数据

//客户端请求
var http=require('http');
var zlib=require('zlib');
var Buffer=require('Buffer');
var option={
    hostname:'127.0.0.1',
    port:3000,
    path:'/',
    method:'GET',
    headers:{
        'Accept-Encoding':'gzip,deflate'
    }
};

http.request(option,function(response){
    var body=[];
    response.on('data',function(chunk){//返回来的数据是二进制流
        body.push(chunk);
    });
    response.on('end',function(){
        body=Buffer.concat(body);
        if(response.headers['content-encoding']==='gzip'){
            zlib.gunzip(body,function(err,data){
                console.log(data.toString());//data为解压后的数据
            });
        }else{
            console.log(data.toString);
        }
    });
});


//问： 为什么通过headers对象访问到的HTTP请求头或响应头字段不是驼峰的？

//答： 从规范上讲，HTTP请求头和响应头字段都应该是驼峰的。但现实是残酷的，不是每个HTTP服务端或客户端程序都严格遵循规范，所以NodeJS在处理从别的客户端或服务端收到的头字段时，都统一地转换为了小写字母格式，以便开发者能使用统一的方式来访问头字段，例如headers['content-length']。
