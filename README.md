# 原生微信小程序 Vibe Coding 模板（Vue-mini + TDesign）

本项目是一个基于 Vibe Coding 的原生微信小程序模板，采用 JavaScript + SCSS，集成了 [Vue-mini](https://vuemini.org)（轻量级组合式 API）和 [TDesign](https://tdesign.tencent.com/miniprogram/) 小程序组件库。仓库内包含示例页面（`pages/index`）， TODO 清单用于展示代码功能，便于快速上手开发。

## AGENTS 支持

- 本项目附带 [AGENTS.md](AGENTS.md) 文件，详细说明了 AI 助手在协助开发时需遵循的规范，包括样式规则、组件复用、导入路径别名以及变更流程等。AGENTS.md 的中文版可在 `doc` 文件夹中找到。

## 快速开始

1. 安装依赖（在项目根目录执行）：

```bash
npm install
```

2. 在微信开发者工具中打开本项目目录 `miniprogram-vibe-coding-template`，构建并预览。

## 项目结构

- `components/`：可复用组件
- `pages/`：页面目录
- `utils/`：工具函数

- 项目已在 `app.json` 的 `resolveAlias` 配置（`@/*` 映射到项目根）。

## 请求封装与全局方法

- 项目在 `app.js` 中将请求封装方法挂载到全局 `wx` 对象，方便在任意上下文调用：`wx.$request`、`wx.$get`、`wx.$post`、`wx.$put`、`wx.$del`。
- 核心实现位于 `utils/request.js`，主要行为：
	- `BASE_URL` 在文件中为占位符 `http://<your-domain>:<your-port>`；可在调用时通过 `baseURL` 覆盖或修改该常量以指向真实后端。
	- 默认超时为 `15000` 毫秒；支持 `showLoading`（`boolean | string`）显示 loading 状态。
	- 自动从 `wx.getStorageSync('token')` 读取 token（若存在）并注入到 `Authorization` 头中。
	- 成功判定：HTTP 响应状态为 2xx 时 Promise 解析并返回解析后的响应体。
	- 错误处理：非 2xx 响应时 Promise 拒绝，结构为 `{ message, statusCode, data }`；传输/网络错误时拒绝为 `{ message: 'network error', raw }`。

- 示例（登录）：

```js
wx.$post('/public/login', { account, password }, { showLoading: '登录中' })
.then(result => {
	wx.setStorageSync('token', result.token);
	// 导航或后续逻辑
})
.catch(err => {
	// 处理错误
});
```

## 依赖更新说明

本仓库已配置 [Dependabot](https://docs.github.com/code-security/dependabot)，每周一 09:00（Asia/Shanghai）自动检查 `main`、`native` 各分支的 npm 依赖，并把可升级项提交为 PR，保持各分支依赖为最新稳定版。

配套自动化策略（`.github/workflows/auto-merge.yml`）：

- **补丁更新（patch）与小版本更新（minor）**：由 Dependabot 机器人发起的 PR 会被自动批准，并在 CI 通过后以 Squash 方式自动合并。
- **大版本更新（major）**：不自动合并，会打上 `semver-major` 标签并留言提醒，需人工审核破坏性变更后再合并。

> 提示：若仓库启用了分支保护规则，需在 Settings → General 中勾选 **Allow auto-merge**，并在分支保护规则中允许 `github-actions[bot]` 的审批，否则自动合并不会生效。

本地手动升级依赖：Clone 项目后，可随时运行以下命令，将 `package.json` 中的依赖直接升级至当天最新的社区版本并重新安装：

```bash
npm run update-deps
```

## 相关文档

- [Vue-mini](https://vuemini.org) - 框架文档
- [TDesign](https://tdesign.tencent.com/miniprogram/) - 组件框架
- [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/) - 平台文档