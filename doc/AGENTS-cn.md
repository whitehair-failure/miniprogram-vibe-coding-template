# AI Assistant Guide — toLinkIoT

本文件为在本仓库（原生微信小程序，使用 JavaScript + SCSS、TDesign 组件库与 Vue-mini 框架）中协助开发的 AI 编程助手提供指导。

## 核心指导（必须遵守）

- 保持简洁与可维护性：编写易读、分层清晰的代码。
- 遵循现有项目风格：复用已有命名、目录与组件约定（尤其是 `components/`、`pages/`、`utils/` 等目录）。
- 优先使用项目现有组件：TDesign 小程序组件已存在于 `miniprogram_npm/tdesign-miniprogram`，新功能应尽量复用或按需扩展。
- 样式规则：本项目使用 SCSS（.scss 文件），使用层次分明的嵌套式结构写法来完成样式功能，优先遵循现有样式变量与混入；避免引入与现有风格冲突的大量全局样式。
- 变更前说明：在进行破坏性或范围较大的修改前，先在 PR 描述中写明变更计划并等待合并/确认。

## 项目技术栈（当前仓库）

- 运行环境：微信小程序（原生小程序结构）
- 语言：JavaScript（.js） + SCSS（.scss）
- 框架：Vue-mini（组合式 API 风格的轻量封装）
- UI 组件：TDesign 小程序（位于 `miniprogram_npm/tdesign-miniprogram`）
- 目录示例（仓库主要目录）
  - `components/`：可复用组件
  - `pages/`：页面目录（每页通常包含 .js/.json/.wxml/.scss）
  - `utils/`：工具函数
  - `miniprogram_npm/`：第三方和组件包（TDesign、vue-mini runtime 等）

## 路径与别名

- 仓库已在`app.json`中通过参数`resolveAlias`配置了路径别名（'@/*'映射到项目根目录 '/*'），优先使用别名导入以保持引用简洁；例如：
  - 正确：`import util from '@/utils/util.js'`（如果 `@` 被配置为项目根或 `src`）
  - 避免：`import util from '../../../utils/util.js'`

## 相关文档
- [Vue-mini](https://vuemini.org) - 框架文档
- [TDesign](https://tdesign.tencent.com/miniprogram/) - 组件框架
- [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/) - 平台文档
