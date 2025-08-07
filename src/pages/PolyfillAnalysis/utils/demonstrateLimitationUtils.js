export const demonstrateLimitationUtils = {
  demonstrate(limitationId) {
    switch (limitationId) {
      case 'crossOriginNavigation':
        return this.demonstrateCrossOriginLimitation()
      case 'navigationTiming':
        return this.demonstrateTimingLimitation()
      case 'navigationMetadata':
        return this.demonstrateMetadataLimitation()
      case 'formSubmissionIntercept':
        return this.demonstrateFormLimitation()
      default:
        return '未知的限制类型'
    }
  },
  
  demonstrateCrossOriginLimitation() {
    return `跨域导航限制演示：
- Navigation API: 可以在导航开始前拦截
- History API: 只能通过 beforeunload 提示用户
- 技术限制: 浏览器安全策略阻止 JavaScript 控制跨域导航

示例场景：
1. 点击外部链接 (https://example.com)
2. Navigation API 可以拦截并处理
3. Polyfill 只能在 beforeunload 时提示用户`
  },
  
  demonstrateTimingLimitation() {
    const delay = Math.random() * 10 + 5
    return `导航时机限制演示：
- Navigation API: navigate 事件在导航前触发
- History API: popstate 事件在导航后触发
- 时机差异: 约 ${delay.toFixed(1)}ms 的延迟

影响：
1. 无法在导航前进行异步处理
2. 用户体验可能受到影响
3. 某些拦截场景无法实现`
  },
  
  demonstrateMetadataLimitation() {
    const availableMetadata = {
      historyAPI: ['state', 'length'],
      navigationAPI: ['entries', 'currentEntry', 'canGoBack', 'canGoForward', 'navigationType']
    }
    
    return `元数据限制演示：
- History API 可用信息: ${availableMetadata.historyAPI.join(', ')}
- Navigation API 额外信息: ${availableMetadata.navigationAPI.join(', ')}
- 信息丰富度差异: ${availableMetadata.navigationAPI.length - availableMetadata.historyAPI.length} 倍

缺失信息：
1. 完整的导航历史栈
2. 导航类型和来源
3. 导航的详细上下文`
  },
  
  demonstrateFormLimitation() {
    return `表单提交拦截限制演示：
- Navigation API: 可以拦截表单提交导航
- History API: 只能监听 submit 事件，无法拦截所有情况
- 覆盖率: Navigation API 100%, History API 约 70%

无法拦截的场景：
1. 直接的表单提交 (method="post")
2. 某些浏览器的自动提交
3. 通过 JavaScript 动态创建的表单`
  }
}