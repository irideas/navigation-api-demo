# Navigation API vs History+Location API 对比测试项目

这是一个全面的 Vue 3 + Vite 项目，用于演示和对比 Navigation API 与传统 History+Location API 的功能差异。

## 🚀 项目特性

- **全面对比**: 详细对比 Navigation API 和 History API 的功能差异
- **实时演示**: 提供交互式演示，直观展示两种 API 的行为
- **浏览器兼容性**: 完整的浏览器支持情况分析
- **Polyfill 实现**: 提供 Navigation API 的 polyfill 实现和分析
- **现代化界面**: 使用 Vue 3 Composition API 和响应式设计

## 📋 功能模块

### 1. 首页 (Home)
- 项目概览和快速导航
- 浏览器支持检测
- 快速测试按钮

### 2. 基础导航 (BasicNavigation)
- 基本导航操作对比
- 编程式导航演示
- URL 参数处理
- 导航状态管理

### 3. 导航条目 (NavigationEntries)
- 导航历史条目管理
- 条目信息展示
- 历史记录操作
- 条目状态对比

### 4. 导航事件 (NavigationEvents)
- 事件监听和处理
- 导航拦截演示
- 事件取消机制
- 自定义事件系统

### 5. Polyfill 分析 (PolyfillAnalysis)
- Polyfill 实现原理
- 核心问题解决方案
- 性能对比测试
- 最佳实践建议

### 6. 浏览器支持 (BrowserSupport)
- 详细的浏览器兼容性表格
- 实时浏览器检测
- 功能支持矩阵
- 版本发展时间线

## 🛠️ 技术栈

- **Vue 3**: 使用 Composition API
- **Vue Router 4**: 现代化路由管理
- **Vite**: 快速构建工具
- **原生 JavaScript**: Navigation API 和 History API

## 📦 安装和运行

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

项目将在 `http://localhost:3000` 启动

### 构建生产版本
```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 预览生产版本
```bash
npm run preview
# 或
yarn preview
# 或
pnpm preview
```

## 🌐 浏览器支持

### Navigation API 支持情况
- ✅ Chrome 102+
- ✅ Edge 102+
- 🧪 Firefox (实验性支持)
- ❌ Safari (暂不支持)

### 项目兼容性
- ✅ 所有现代浏览器
- ✅ 移动端浏览器
- ✅ 自动降级到 History API

## 📚 学习资源

- [MDN - Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)
- [WICG Navigation API 规范](https://github.com/WICG/navigation-api)
- [Web.dev Navigation API 指南](https://web.dev/navigation-api/)