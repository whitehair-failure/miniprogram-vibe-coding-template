# AGENTS.md

This file defines **mandatory project rules for AI coding agents**
(e.g. GitHub Copilot Chat, Copilot Workspace, Cursor, Aider).

AI agents MUST follow the instructions below when working in this repository.

---

## Core Principles (Must Follow)

- Always keep changes **small, readable, and layered**.
- Optimize for **long-term maintainability**, not short-term convenience.
- Follow existing patterns instead of introducing new global abstractions.

> 中文速记：  
> 保持简洁可维护；分层清晰；不要为了“顺手”做破坏性改动。

---

## Project Context

This repository is a **WeChat Mini Program** project.

- Platform: WeChat Mini Program (native structure)
- Language: **JavaScript** (not TypeScript)
- Styling: **SCSS**
- Framework: **Vue-mini** (Composition-style API)
- UI Library: **TDesign Mini Program**

> 中文说明：  
> 这是原生微信小程序项目，不是 Web Vue / Vite / SPA。

---

## Directory & Structure Rules

- Always follow the existing directory structure and naming conventions.
- Do NOT restructure folders unless explicitly instructed.

Key directories include:

- `components/` – reusable UI components
- `pages/` – page entries (typically `.js / .json / .wxml / .scss`)
- `models/` – business logic and device / protocol models
- `utils/` – utility helpers (e.g. BLE, data processing)
- `miniprogram_npm/` – third-party and UI component packages

> 中文说明：  
> 严格遵循现有目录结构，不要擅自重构。

---

## UI & Component Rules

- Always reuse **TDesign Mini Program** components before creating new UI.
- TDesign components are located in:
  `miniprogram_npm/tdesign-miniprogram`
- Extend existing components only when necessary.

> 中文说明：  
> 优先复用 TDesign 组件，不要重复造轮子。

---

## Styling Rules

- Always write styles in **SCSS** (`.scss` files).
- Follow existing variables, mixins, and nesting conventions.
- Avoid introducing large or conflicting global styles.

> 中文说明：  
> 样式用 SCSS，嵌套清晰，避免污染全局。

---

## Import & Alias Rules

- The project configures path aliases via `app.json` (`resolveAlias`).
- Prefer alias-based imports over relative paths.

Examples:

- ✅ `import util from '@/utils/util.js'`
- ❌ `import util from '../../../utils/util.js'`

> 中文说明：  
> 使用 `@` 别名，避免相对路径地狱。

---

## Development & Build Constraints

- Do NOT introduce new build tools or frameworks without approval.
- Always respect existing build and runtime configuration.
- Avoid adding new global patterns when a local solution is sufficient.

> 中文说明：  
> 不要私自引入新工具或全局方案。

---

## Testing & Verification

- Always verify new pages or components in **WeChat DevTools**.
- Do NOT merge changes if core flows regress or console errors appear.
- Never remove tests or checks just to make things “pass”.

> 中文说明：  
> 新功能必须在微信开发者工具中验证，禁止为了通过而删检查。

---

## Pull Request & Change Scope Rules

- Always describe **breaking or wide-impact changes** clearly in PR notes.
- Do NOT mix unrelated changes in a single PR.
- Wait for confirmation before applying destructive refactors.

> 中文说明：  
> 大改动必须提前说明并等待确认，不要偷偷重构。

---

## What NOT To Do

- Do NOT refactor unrelated code.
- Do NOT introduce new libraries casually.
- Do NOT change public or shared APIs without instruction.
- Do NOT guess requirements — explain assumptions if unclear.

> 中文说明：  
> 不要“顺手优化”，不确定就先说明。

---

## Reference Documentation

Use the following official references when needed:

- Vue-mini: https://vuemini.org
- TDesign Mini Program: https://tdesign.tencent.com/miniprogram/
- WeChat Mini Program Docs:  
  https://developers.weixin.qq.com/miniprogram/dev/framework/

---

## Final Reminder

This project values:

- Predictability
- Clarity of intent
- Maintainable structure over clever tricks

AI agents should behave as a **careful, conservative contributor**, not an experimental one.

> 中文总结：  
> 稳定、可维护、可预期，永远优先于炫技。
