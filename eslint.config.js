import js from '@eslint/js';
import globals from 'globals';

export default [
  // 1. 继承 ESLint 官方推荐的规则
  js.configs.recommended,
  {
    // 2. 指定需要校验的文件范围（排除 miniprogram_npm 等第三方库）
    ignores: [
      '**/miniprogram_npm/**',
      '**/node_modules/**',
      'project.config.json',
    ],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // 3. 核心：注入浏览器环境以及小程序专属的全局变量
      globals: {
        ...globals.browser,
        ...globals.node,
        // 微信小程序特有全局变量 ✅
        wx: 'readonly',
        App: 'readonly',
        Page: 'readonly',
        Component: 'readonly',
        Behavior: 'readonly',
        getApp: 'readonly',
        getCurrentPages: 'readonly',
        requirePlugin: 'readonly',
        requireMiniProgram: 'readonly',
      },
    },
    // 4. 在这里定制你的团队代码规范
    rules: {
      'no-unused-vars': 'warn', // 允许声明了但没使用的变量只报警告，不报红
      'no-empty': 'warn', // 允许空的 block 只报警告，不报红
      'no-console': 'off', // 允许在小程序里用 console.log 调试
      semi: ['error', 'always'], // 强制分号（可根据喜好修改）
      quotes: ['error', 'single'], // 强制单引号
    },
  },
];
