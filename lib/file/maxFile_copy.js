var fs=require('fs');
//一次性把所有文件内容都读取到内存中后再一次性写入磁盘的方式不适合拷贝大文件，内存会爆仓。对于大文件，我们只能读一点写一点，直到完成拷贝。
function copy(src,dst){
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv){
    console.log('111',argv);
    copy(argv[0],argv[1]);
}
// process是一个全局变量，可通过process.argv获得命令行参数array。由于argv[0]固定等于NodeJS执行程序的绝对路径，argv[1]固定等于主模块的绝对路径，因此第一个命令行参数从argv[2]这个位置开始。
console.log('2222',process.argv);
main(process.argv.slice(2));
//以上程序使用fs.createReadStream创建了一个源文件的只读数据流，并使用fs.createWriteStream创建了一个目标文件的只写数据流，并且用pipe方法把两个数据流连接了起来。连接起来后发生的事情，说得抽象点的话，水顺着水管从一个桶流到了另一个桶。