chocolate-api
================
## 介绍
基于Koa2二次开发，封装了开发API的常用功能。

### 文档
[参考实例代码：chocolate-api](https://github.com/rehellinen/chocolate-api)


### 安装方法
`npm install --save-dev chocolate-api-core`
> 框架所有内置方法、类都通过 `chocolate-api-core` 包获取

### 内置功能
1. 控制器中使用装饰器进行权限验证、参数校验
2. 功能强大的验证器
3. 全局异常处理
4. 基于jwt的权限系统
5. 基于sequelize封装的模型
6. 文件上传

### 框架目录：
~~~
|-- class           核心类
|-- decorator       装饰器
|-- exception       异常
|-- middleware      中间件
|-- model           内置模型
|-- router          路由函数
|-- utils           工具
~~~
