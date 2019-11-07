    bin/                          # 存放命令行相关代码
        node-echo
    doc/                          # 存放文档
    lib/                          # 存放API相关代码
        echo.js
    node_modules/                 # 存放三方包
         argv/
    tests/                        # 存放测试用例
    package.json                    # 元数据文件
    README.md                       # 说明文件

    在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象。
    在其它模块里使用包的时候，需要加载包的入口模块
    如果想自定义入口模块的文件名和存放位置，就需要在包目录下包含一个package.json文件，并在其中指定入口模块的路径。
    如此一来，就同样可以使用require('/home/user/lib/cat')的方式加载模块。NodeJS会根据包目录下的package.json找到入口模块所在位置。
