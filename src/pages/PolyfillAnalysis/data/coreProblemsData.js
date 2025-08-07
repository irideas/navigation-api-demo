export const coreProblemsData = [
  {
    id: 'event-timing',
    title: '事件时机问题',
    description: 'History API 的 popstate 事件在导航完成后触发，而 Navigation API 的 navigate 事件在导航前触发',
    challenge: '无法在 History API 基础上完美模拟 Navigation API 的事件时机',
    solution: '通过拦截 History API 方法和监听用户交互事件来提前触发自定义事件'
  },
  {
    id: 'state-management',
    title: '状态管理复杂性',
    description: 'Navigation API 提供了丰富的导航状态信息，而 History API 只有基本的 state 和 length',
    challenge: '需要自行维护导航历史栈和相关元数据',
    solution: '创建自定义的历史管理器来跟踪和维护导航状态'
  },
  {
    id: 'intercept-capability',
    title: '拦截能力限制',
    description: 'Navigation API 可以拦截所有类型的导航，包括表单提交、链接点击等',
    challenge: 'History API 无法拦截所有导航场景，特别是跨域导航',
    solution: '通过事件委托和 DOM 监听来尽可能覆盖更多导航场景'
  },
  {
    id: 'browser-compatibility',
    title: '浏览器兼容性',
    description: 'Navigation API 是新标准，旧浏览器不支持，需要 Polyfill 提供兼容性',
    challenge: '在不同浏览器环境下保持一致的行为',
    solution: '特性检测和渐进增强，提供降级方案'
  }
]