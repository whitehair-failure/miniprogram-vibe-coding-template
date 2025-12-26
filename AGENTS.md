# AI Assistant Guide

This file provides guidance to AI coding assistants when working with code in this repository. This project is a **Native WeChat Mini Program** utilizing **JavaScript**, **SCSS**, the **TDesign** component library, and the **Vue-mini** framework.

## Core Directives (Mandatory)

- **Simplicity & Maintainability:** Write code that is readable, layered, and easy to maintain.
- **Consistency:** Strictly adhere to existing naming conventions, directory structures, and patterns (specifically within components/, pages/, and utils/).
- **Component Reuse:** Prioritize using existing TDesign components located in miniprogram_npm/tdesign-miniprogram. Only extend or create new components if strictly necessary.
- **Styling Rules:**Use **SCSS** (.scss) exclusively.Utilize **nested structures** for hierarchy.Prioritize existing CSS variables and mixins.Avoid introducing global styles that conflict with the existing design system.
- **Change Protocol:** Before implementing breaking changes or large-scale refactoring, provide a detailed plan in the PR description or chat context and await user confirmation.

## Technical Stack & Context

- **Platform:** WeChat Mini Program (Native Structure).
- **Languages:** JavaScript (.js), SCSS (.scss).
- **Framework:** `Vue-mini` (Lightweight wrapper implementing Composition API for native pages).
- **UI Library:**  `TDesign Miniprogram`.
- **Key Directories:**components/: Reusable custom components.pages/: Application pages (Standard bundle: .js, .json, .wxml, .scss).utils/: Utility functions.miniprogram_npm/: Third-party dependencies (TDesign, Vue-mini runtime, etc.).

## Import Paths & Aliases

- The project uses resolveAlias in app.json. The @ symbol is mapped to the **project root**.
- **Rule:** Always prioritize **Alias Imports** over relative paths to ensure cleanliness.✅ **Preferred:** import util from '@/utils/util.js'❌ **Avoid:** import util from '../../../utils/util.js'

## Request Utilities

- **Global Methods:** Exposed in [app.js](app.js):
	- `wx.$request | wx.$get | wx.$post | wx.$put | wx.$del`
- **Core API:** See [utils/request.js](utils/request.js)
	- **`request(options)`**
		- **url:** Relative path joined with `baseURL`
		- **method:** `GET | POST | PUT | DELETE` (default `GET`)
		- **data:** Request payload object
		- **header:** Merged headers; auto-injects `Authorization` from `wx.getStorageSync('token')` if present
		- **timeout:** Default `15000ms`
		- **showLoading:** `boolean | string` to show loading (e.g., `'加载中'`)
		- **baseURL:** Optional per-call override
	- **Helpers:** `get(url, data, options)`, `post(url, data, options)`, `put(url, data, options)`, `del(url, data, options)`
- **Success & Errors:**
 	- Resolves for HTTP 2xx responses and returns the parsed response body.
 	- For non-2xx responses the Promise rejects with `{ message, statusCode, data }` where `data` is the server response body.
 	- For transport/network failures the Promise rejects with `{ message: 'network error', raw }` (where `raw` is the original error object).
  
- **Token Handling:** Store token (e.g., `Bearer_xxx`) to `wx.setStorageSync('token', token)`. `utils/request.js` will automatically read it from storage and inject it into the `Authorization` header when present.
- **Usage Example (Login):**
	- Endpoint: `/public/login`
	- Call:
		- `wx.$post('/public/login', { account, password }, { showLoading: '登录中' })`
	- On success: Persist `result.token` and navigate.
