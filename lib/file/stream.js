//当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，我们就需要用到数据流。

var rs = fs.createReadStream(src);//只读数据流
var ws = fs.createWriteStream(dst);//只写数据流

//如果写入速度跟不上读取速度的话，只写数据流内部的缓存会爆仓。我们可以根据
//.write方法的返回值来判断传入的数据是写入目标了，还是临时放在了缓存了，并根据drain事件来判断什么时候只写数据流已经将缓存中的数据写入目标，可以传入下一个待写数据了。
//data事件会源源不断地被触发
rs.on('data', function (chunk) {
    //读到的数据先放到只写数据流内部的缓存
    if (ws.write(chunk) === false) {
        rs.pause();//暂停数据读取
    }
});

rs.on('end', function () {
    ws.end();
});

ws.on('drain', function () {
    rs.resume();//继续数据读取
});