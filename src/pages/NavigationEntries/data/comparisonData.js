export const comparisonData = {
  entryFeatures: [
    {
      name: '获取历史条目列表',
      navigationAPI: '完全支持',
      historyAPI: '不支持',
      polyfill: '部分支持',
      limitation: 'Polyfill 只能跟踪当前会话的导航，无法获取浏览器完整历史'
    },
    {
      name: '访问条目详细信息',
      navigationAPI: '完全支持',
      historyAPI: '有限支持',
      polyfill: '部分支持',
      limitation: 'History API 只能访问当前状态，Polyfill 可模拟基本信息'
    },
    {
      name: '跳转到指定条目',
      navigationAPI: '完全支持',
      historyAPI: '有限支持',
      polyfill: '部分支持',
      limitation: 'History API 只能通过 go() 方法相对跳转'
    },
    {
      name: '获取当前条目',
      navigationAPI: '完全支持',
      historyAPI: '部分支持',
      polyfill: '完全支持',
      limitation: 'History API 只能获取当前状态和 URL'
    },
    {
      name: '更新条目状态',
      navigationAPI: '完全支持',
      historyAPI: '有限支持',
      polyfill: '完全支持',
      limitation: 'History API 只能更新当前条目状态'
    },
    {
      name: '条目唯一标识',
      navigationAPI: '完全支持',
      historyAPI: '不支持',
      polyfill: '部分支持',
      limitation: 'Polyfill 生成的 ID 和 key 仅在当前会话有效'
    },
    {
      name: '条目索引访问',
      navigationAPI: '完全支持',
      historyAPI: '不支持',
      polyfill: '部分支持',
      limitation: 'Polyfill 索引基于会话内的相对位置'
    },
    {
      name: '跨域条目访问',
      navigationAPI: '受限支持',
      historyAPI: '不支持',
      polyfill: '不支持',
      limitation: '出于安全考虑，所有方案都无法访问跨域页面信息'
    }
  ]
}