# AI Assistant Guide

本文件为在本仓库中协助开发的 AI 编程助手提供指引。项目为原生微信小程序，使用 JavaScript、SCSS、TDesign 组件库与 Vue-mini 框架。

## 核心指引（必须遵守）

- **简洁与可维护：** 编写可读、分层清晰的代码。
- **一致性：** 遵循现有命名、目录与代码规范（尤其 `components/`、`pages/`、`utils/`）。
- **组件复用：** 优先使用仓库中的 TDesign 组件（`miniprogram_npm/tdesign-miniprogram`），仅在必要时扩展或新增组件。
- **样式规则：** 使用 SCSS（`.scss`），采用嵌套结构，优先使用现有变量与 mixin，避免引入冲突的全局样式。
- **变更流程：** 重大或破坏性修改前，在 PR 描述中写明变更计划并等待确认。

## 技术栈与上下文

- **平台：** 微信小程序（原生结构）
- **语言：** JavaScript（.js），样式使用 SCSS（.scss）
- **框架：** `Vue-mini`（组合式 API 风格）
- **UI：** TDesign 小程序（位于 `miniprogram_npm/tdesign-miniprogram`）
- **关键目录：** `components/`、`pages/`、`utils/`、`miniprogram_npm/`

## 导入路径与别名

- 仓库在 `app.json` 中通过 `resolveAlias` 配置了别名：`@` 映射到项目根。
- **规则：** 优先使用别名导入以保持路径清晰。示例：
  - 推荐：`import util from '@/utils/util.js'`
  - 避免：`import util from '../../../utils/util.js'`

## 请求封装（Request Utilities）

- **全局方法（在 `app.js` 暴露）：** `wx.$request`、`wx.$get`、`wx.$post`、`wx.$put`、`wx.$del`。
- **核心实现：** 见 `utils/request.js`。

- **`request(options)` 支持：**
  - `url`：与 `baseURL` 拼接的相对路径
  - `method`：`GET | POST | PUT | DELETE`（默认 `GET`）
  - `data`：请求体或查询参数对象
  - `header`：合并后的 Header（会自动注入 `Authorization`，来自 `wx.getStorageSync('token')`）
  - `timeout`：默认 `15000` ms
  - `showLoading`：`boolean | string`（例如 `'加载中'`）
  - `baseURL`：可选，每次调用覆盖默认 baseURL

- **便捷方法：** `get(url, data, options)`、`post(url, data, options)`、`put(url, data, options)`、`del(url, data, options)`。

 - **成功与错误：**
  - 当 HTTP 响应为 2xx 时，Promise 解析并返回解析后的响应体。
  - 非 2xx 响应时，Promise 拒绝（reject），格式为 `{ message, statusCode, data }`，其中 `data` 为服务端返回体。
  - 传输或网络失败时，Promise 拒绝，格式为 `{ message: 'network error', raw }`，`raw` 为底层错误对象。

- **Token 处理：** 将 token（例如 `Bearer_xxx`）存入 `wx.setStorageSync('token', token')`，`utils/request.js` 会自动从 storage 读取并注入到 `Authorization` 头。

- **示例（登录）：**
  - 接口：`/public/login`
  - 调用：`wx.$post('/public/login', { account, password }, { showLoading: '登录中' })`
  - 成功时：持久化 `result.token`（例如 `wx.setStorageSync('token', result.token')`），然后导航到应用主界面。
