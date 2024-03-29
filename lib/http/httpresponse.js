//HTTP请求在发送给服务器时，可以认为是按照从头到尾的顺序一个字节一个字节地以数据流方式发送的。而http模块创建的HTTP服务器在接收到完整的请求头后，就会调用回调函数。在回调函数中，除了可以使用request对象访问请求头数据外，还能把request对象当作一个只读数据流来访问请求体数据。

//HTTP响应本质上也是一个数据流，同样由响应头（headers）和响应体（body）组成。在回调函数中，除了可以使用response对象来写入响应头数据外，还能把response对象当作一个只写数据流来写入响应体数据。


var http=require('http');
http.createServer(function (request, response) {
    var body=[];
    // console.log('request',request);
    // console.log('method',request.method);
    // console.log('headers',request.headers);
    console.log('headers',request.body);
    request.on('data',function(chunk){
        console.log('111111111111111111',chunk);
        // console.log('11111111111111111111',body);
        body.push(chunk);
    });
    request.on('end',function(){
        body=Buffer.concat(body);
        //得到请求头  请求体数据
        console.log('222222222222222',body.toString('utf-8'));
        //console.log('body',body.toString('utf-8'));
        // console.log('body',body.toString());
    });
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('hello')

    //服务端原样将客户端请求的请求体数据返回给客户端。
    // response.writeHead(200, { 'Content-Type': 'text/plain' });

    // request.on('data', function (chunk) {
    //     response.write(chunk);
    // });

    // request.on('end', function () {
    //     response.end();
    // });
}).listen(3000);

//问： 为什么http模块创建的HTTP服务器返回的响应是chunked传输方式的？

//答： 因为默认情况下，使用.writeHead方法写入响应头后，允许使用.write方法写入任意长度的响应体数据，并使用.end方法结束一个响应。由于响应体数据长度不确定，因此NodeJS自动在响应头里添加了Transfer-Encoding: chunked字段，并采用chunked传输方式。但是当响应体数据长度确定时，可使用.writeHead方法在响应头里加上Content-Length字段，这样做之后NodeJS就不会自动添加Transfer-Encoding字段和使用chunked传输方式。