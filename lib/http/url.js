//处理HTTP请求时url模块使用率超高，因为该模块允许解析URL、生成URL，以及拼接URL。
var url=require('url');
url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');

//传给.parse方法的不一定要是一个完整的URL，例如在HTTP服务器回调函数中，request.url不包含协议头和域名，但同样可以用.parse方法解析。
//.parse方法还支持第二个和第三个布尔类型可选参数。第二个参数等于true时，该方法返回的URL对象中，query字段不再是一个字符串，而是一个经过querystring模块转换后的参数对象。第三个参数等于true时，该方法可以正确解析不带协议头的URL，例如//www.example.com/foo/bar。

url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash',true);

//format方法允许将一个URL对象转换为URL字符串，示例如下。

url.format({
    protocol: 'http:',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
});
/* =>
'http://www.example.com/p/a/t/h?query=string'
*/
//另外，.resolve方法可以用于拼接URL，示例如下。

url.resolve('http://www.example.com/foo/bar', '../baz');
/* =>
http://www.example.com/baz
*/