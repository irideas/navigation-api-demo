export const limitationsData = [
  {
    id: 'crossOriginNavigation',
    title: '跨域导航限制',
    description: '浏览器安全策略阻止 JavaScript 控制跨域导航，Polyfill 无法完全模拟这种行为',
    technicalLimit: '同源策略限制，无法拦截跨域链接的点击行为',
    alternative: '使用 beforeunload 事件提示用户，或通过服务端重定向'
  },
  {
    id: 'navigationTiming',
    title: '导航时机精确性',
    description: 'Navigation API 的事件在导航开始前触发，而 History API 只能在导航后响应',
    technicalLimit: 'History API 的 popstate 事件天然滞后于实际导航',
    alternative: '通过拦截用户交互事件来提前触发，但无法覆盖所有场景'
  },
  {
    id: 'navigationMetadata',
    title: '导航元数据完整性',
    description: 'Navigation API 提供丰富的导航信息，History API 信息有限',
    technicalLimit: 'History API 只提供 state 和 length，缺少详细的导航上下文',
    alternative: '自行维护导航历史栈，但信息可能不够准确'
  },
  {
    id: 'formSubmissionIntercept',
    title: '表单提交拦截',
    description: '某些表单提交场景无法被 JavaScript 完全拦截',
    technicalLimit: '浏览器直接处理的表单提交可能绕过 JavaScript 监听',
    alternative: '监听 submit 事件，但覆盖率不是 100%'
  }
]