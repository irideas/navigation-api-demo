export const comparisonData = {
  eventFeatures: [
    {
      name: '统一导航事件',
      navigationAPI: '完全支持',
      historyAPI: '不支持',
      polyfill: '部分支持',
      limitation: 'History API 需要分别监听多个事件源，Polyfill 可以统一但功能有限'
    },
    {
      name: '导航拦截',
      navigationAPI: '完全支持',
      historyAPI: '不支持',
      polyfill: '部分支持',
      limitation: 'History API 无法拦截 pushState/replaceState，Polyfill 通过方法重写实现'
    },
    {
      name: '导航取消',
      navigationAPI: '完全支持',
      historyAPI: '有限支持',
      polyfill: '部分支持',
      limitation: 'History API 只能在 beforeunload 中取消页面离开'
    },
    {
      name: '异步导航处理',
      navigationAPI: '完全支持',
      historyAPI: '不支持',
      polyfill: '部分支持',
      limitation: 'History API 无异步支持，Polyfill 可模拟但无法真正阻塞导航'
    },
    {
      name: '导航成功事件',
      navigationAPI: '完全支持',
      historyAPI: '不支持',
      polyfill: '部分支持',
      limitation: 'History API 无成功事件，Polyfill 通过 setTimeout 模拟'
    },
    {
      name: '导航错误事件',
      navigationAPI: '完全支持',
      historyAPI: '不支持',
      polyfill: '部分支持',
      limitation: 'History API 无错误事件，Polyfill 通过 try-catch 模拟'
    },
    {
      name: '事件详细信息',
      navigationAPI: '完全支持',
      historyAPI: '有限支持',
      polyfill: '部分支持',
      limitation: 'History API 事件信息有限，Polyfill 可以补充但不完整'
    },
    {
      name: '跨域导航事件',
      navigationAPI: '受限支持',
      historyAPI: '不支持',
      polyfill: '不支持',
      limitation: '出于安全考虑，跨域导航事件都受到限制'
    }
  ]
}