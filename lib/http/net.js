//net模块可用于创建Socket服务器或Socket客户端。由于Socket在前端领域的使用范围还不是很广，这里先不涉及到WebSocket的介绍，仅仅简单演示一下如何从Socket层面来实现HTTP请求和响应。

//首先我们来看一个使用Socket搭建一个很不严谨的HTTP服务器的例子。这个HTTP服务器不管收到啥请求，都固定返回相同的响应。

var net=require('net');
net.createServer(function (conn) {
    conn.on('data', function (data) {
        conn.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World'
        ].join('\n'));
    });
}).listen(80);


//接着我们来看一个使用Socket发起HTTP客户端请求的例子。这个例子中，Socket客户端在建立连接后发送了一个HTTP GET请求，并通过data事件监听函数来获取服务器响应。

var options = {
        port: 80,
        host: 'www.example.com'
    };

var client = net.connect(options, function () {
        client.write([
            'GET / HTTP/1.1',
            'User-Agent: curl/7.26.0',
            'Host: www.baidu.com',
            'Accept: */*',
            '',
            ''
        ].join('\n'));
    });

client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});