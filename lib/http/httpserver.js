var http=require('http');

//首先需要使用.createServer方法创建一个服务器，然后调用.listen方法监听端口。之后，每当来了一个客户端请求，创建服务器时传入的回调函数就被调用一次。可以看出，这是一种事件机制。
var server=http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':"text/html"});
    // text/html  浏览器会根据这个类型解析  html
    //text/plain  纯文本
    response.end("<h1>8888</h1>");
});

server.listen(3000);