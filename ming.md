> 开发建议(后台)：

1：先给出定义好的接口再开发(披萨里面)，这样有利于前端可以提前调试 mock 数据

2：后台去掉跨域问题，前端可以直接调用接口而不是采用代理的方式

3：前端需要有至少两个环境（开发环境，测试环境），并且要稳定，不能老挂掉

4：接口尽量统一，例如数据格式，错误提示等等

> 前端开发：

后台项目开发：

react 全家桶 （不推荐用 Vue）

代码规范：

模块命名：组价首字母大写，用驼峰命名法 如：BoxContainer
js:暂时依据架构配置的 eslint 规范 （es6）
css:使用 sass，命名使用横杠隔开如 .box-container

项目：

秋实链app
易楼app
投管云
资管云
oss后台
官网