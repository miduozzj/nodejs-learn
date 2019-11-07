
var http=require('http');

//为了发起一个客户端HTTP请求，我们需要指定目标服务器的位置并发送请求头和请求体，
var options={
    hostname:'127.0.0.1',
    port:3000,
    method:'POST',
    headers:{
        "Content-Type":'application/x-www-form-urlencoded'
    }
};


var request=http.request(options,function(response){
    var body = [];

    console.log('111',response.statusCode);
    console.log('222',response.headers);

    response.on('data', function (chunk) {//访问响应体数据
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);
        console.log('333',body.toString());
    });
});
request.write('1222');
request.end();


//.request方法创建了一个客户端，并指定请求目标和请求头数据。之后，就可以把request对象当作一个只写数据流来写入请求体数据和结束请求。另外，由于HTTP请求中GET请求是最常见的一种，并且不需要请求体，因此http模块也提供了以下便捷API。

//http.get('http://www.example.com/', function (response) {});
//当客户端发送请求并接收到完整的服务端响应头时，就会调用回调函数。在回调函数中，除了可以使用response对象访问响应头数据外，还能把response对象当作一个只读数据流来访问响应体数据。