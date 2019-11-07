var fs=require('fs');

function copy(src,dst){
    //一次性把所有文件内容都读取到内存中后再一次性写入磁盘
    console.log('222222',fs.readFileSync(src).toString('utf-8'));//buffer
    fs.writeFileSync(dst,fs.readFileSync(src));
}

function main(argv){
    console.log('111',argv);
    copy(argv[0],argv[1]);
}
console.log('1111',process.argv);
main(process.argv.slice(2));