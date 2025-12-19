# 原生微信小程序 Vibe Coding 模板（Vue-mini + TDesign）

本项目是一个基于 Vibe Coding 的原生微信小程序模板，采用 JavaScript + SCSS，集成了 [Vue-mini](https://vuemini.org)（轻量级组合式 API）和 [TDesign](https://tdesign.tencent.com/miniprogram/) 小程序组件库。仓库内包含示例页面（`pages/index`），演示计数器及列表的添加与删除功能，便于快速上手开发。

## 快速开始

1. 安装依赖（在项目根目录执行）：

```bash
npm install
```

2. 在微信开发者工具中打开本项目目录 `miniprogram-template`，构建并预览。

## 项目结构

- `components/`：可复用组件
- `pages/`：页面目录
- `utils/`：工具函数

- 项目已在 `app.json` 的 `resolveAlias` 配置（`@/*` 映射到项目根）。

## AGENTS 支持

- 本项目包含 AI 助手指引文件 [AGENTS.md](AGENTS.md)，定义了在本仓库中协助开发时应遵循的约定（样式、组件、导入别名、变更流程等）。

## 相关文档

- [Vue-mini](https://vuemini.org) - 框架文档
- [TDesign](https://tdesign.tencent.com/miniprogram/) - 组件框架
- [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/) - 平台文档
