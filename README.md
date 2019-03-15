# 手把手完成一个简单的前端的脚手架

默认您已经配置好开发环境

## 初始化 npm

```shell
npm init [-y]
```

## 所需工具库

```shell
npm i -S chalk cli-table commander inquirer ora [--registry=https://registry.npm.taobao.org]
```

## 目录结构

```shell
.
├── bin
├── commands
├── images
├── node_modules
├── package.json
├── README.md
└── templates
```

# 全局使用自定义的命令 ly

需要在 package.json 中配置

```shell
"bin": {
  "ly": "./bin/ly"
},
```

# 本地调试

本地调试的时候，在根目录下执行

```shell
npm link
```

这样就可直接使用 ly 命令了

PS: window 上可以使用，Ubuntu 有问题，使用不了全局的命令 ly, （还请麻烦 [issues 一下][1] ^\_^ 摸摸大）

此时使用

```shell
node ./bin/ly [命令选项]（add，delete, list, init）
```

[1]: https://github.com/lyios8859-1/lyauto/issues
