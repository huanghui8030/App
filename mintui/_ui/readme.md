# 指导教师网前端开发说明文档

## 说明
- 暂时只使用了gulp，并未使用webpack。
- ui框架用的是element-ui
- 兼容性说明，IE10+，IE9部分兼容即可。
- 前台页面需要做移动端适配，后台页面不需要

## 如何使用
- 初次使用，终端执行：cnpm install --save-dev
- 启动时：gulp
- 发布时：gulp build
- 其中 _ui/node_modules和_ui/assets  不要提交到svn，本地生产即可