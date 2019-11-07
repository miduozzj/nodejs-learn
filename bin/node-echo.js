var argv=require('argv');
//把命令行参数原样打印出来  执行命令行参数解析
var echo=require('../lib/echo');

console.log(echo(argv.run().targets.join(' ')));