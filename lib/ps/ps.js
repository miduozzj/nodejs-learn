//NodeJS可以感知和控制自身进程的运行环境和状态，也可以创建子进程并与其协同工作，这使得NodeJS可以把多个程序组合在一起共同完成某项工作，并在其中充当胶水和调度器的作用。

//我们已经知道了NodeJS自带的fs模块比较基础，把一个目录里的所有文件和子目录都拷贝到另一个目录里需要写不少代码。另外我们也知道，终端下的cp命令比较好用，一条cp -r source/* target命令就能搞定目录拷贝。那我们首先看看如何使用NodeJS调用终端命令来简化目录拷贝，

var child_process=require('child_process');
var util=require('util');

function copy(source,target,callback){
    child_process.exec
}