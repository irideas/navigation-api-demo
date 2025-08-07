export const browserInfo = {
  name: 'Unknown',
  version: 'Unknown',
  engine: 'Unknown',
  platform: 'Unknown'
}

export const navigationApiFeatures = [
  { name: 'navigation 对象', supported: false, description: '全局 navigation 对象' },
  { name: 'navigate 事件', supported: false, description: '导航事件监听' },
  { name: 'currentEntry', supported: false, description: '当前导航条目' },
  { name: 'entries()', supported: false, description: '导航历史条目' },
  { name: 'navigate()', supported: false, description: '程序化导航' },
  { name: 'back()', supported: false, description: '后退导航' },
  { name: 'forward()', supported: false, description: '前进导航' },
  { name: 'traverseTo()', supported: false, description: '遍历到指定条目' },
  { name: 'updateCurrentEntry()', supported: false, description: '更新当前条目' },
  { name: 'reload()', supported: false, description: '重新加载' }
]

export const testResults = []

export const detailedBrowserSupport = [
  {
    browser: 'Chrome',
    version: '102+',
    support: 'full',
    notes: '完全支持 Navigation API',
    features: {
      navigation: true,
      navigate: true,
      entries: true,
      intercept: true
    }
  },
  {
    browser: 'Firefox',
    version: '未支持',
    support: 'none',
    notes: '尚未实现 Navigation API',
    features: {
      navigation: false,
      navigate: false,
      entries: false,
      intercept: false
    }
  },
  {
    browser: 'Safari',
    version: '未支持',
    support: 'none',
    notes: '尚未实现 Navigation API',
    features: {
      navigation: false,
      navigate: false,
      entries: false,
      intercept: false
    }
  },
  {
    browser: 'Edge',
    version: '102+',
    support: 'full',
    notes: '基于 Chromium，完全支持',
    features: {
      navigation: true,
      navigate: true,
      entries: true,
      intercept: true
    }
  }
]

export const featureSupportData = {
  features: [
    {
      name: 'navigation 对象',
      chrome: 'full',
      firefox: 'none',
      safari: 'none',
      edge: 'full'
    },
    {
      name: 'navigate 事件',
      chrome: 'full',
      firefox: 'none',
      safari: 'none',
      edge: 'full'
    },
    {
      name: 'currentEntry',
      chrome: 'full',
      firefox: 'none',
      safari: 'none',
      edge: 'full'
    },
    {
      name: 'entries() 方法',
      chrome: 'full',
      firefox: 'none',
      safari: 'none',
      edge: 'full'
    },
    {
      name: 'navigate() 方法',
      chrome: 'full',
      firefox: 'none',
      safari: 'none',
      edge: 'full'
    },
    {
      name: '导航拦截',
      chrome: 'full',
      firefox: 'none',
      safari: 'none',
      edge: 'full'
    }
  ]
}

export const polyfillRecommendationsData = [
  {
    id: 'official-polyfill',
    title: '官方 Polyfill',
    level: '推荐',
    description: '由 WICG 提供的官方 Navigation API Polyfill，提供最完整的功能覆盖',
    pros: [
      '功能最完整',
      '官方维护',
      '持续更新',
      '文档完善'
    ],
    cons: [
      '体积较大',
      '性能开销',
      '部分功能无法完美模拟'
    ],
    code: `// 安装
npm install @navigation-api/polyfill

// 使用
import '@navigation-api/polyfill'

// 检测并使用
if ('navigation' in window) {
  navigation.addEventListener('navigate', handleNavigate)
}`
  },
  {
    id: 'custom-polyfill',
    title: '自定义 Polyfill',
    level: '可选',
    description: '根据项目需求定制的轻量级 Polyfill，只包含必要功能',
    pros: [
      '体积小',
      '性能好',
      '可定制',
      '无多余功能'
    ],
    cons: [
      '功能有限',
      '需要自行维护',
      '兼容性问题',
      '开发成本高'
    ],
    code: `// 简单的自定义 Polyfill
class SimpleNavigationPolyfill {
  constructor() {
    this.currentEntry = { url: location.href }
  }
  
  navigate(url) {
    history.pushState(null, '', url)
    this.currentEntry = { url }
  }
}

if (!('navigation' in window)) {
  window.navigation = new SimpleNavigationPolyfill()
}`
  },
  {
    id: 'no-polyfill',
    title: '不使用 Polyfill',
    level: '不推荐',
    description: '直接使用 History API 作为降级方案，不引入 Polyfill',
    pros: [
      '无额外依赖',
      '性能最佳',
      '兼容性好'
    ],
    cons: [
      '功能受限',
      '代码复杂',
      '维护困难',
      '用户体验差异大'
    ],
    code: `// 特性检测和降级
function navigate(url) {
  if ('navigation' in window) {
    return navigation.navigate(url)
  } else {
    history.pushState(null, '', url)
    return Promise.resolve()
  }
}`
  }
]

export const migrationGuideData = {
  steps: [
    {
      id: 1,
      step: 1,
      title: '特性检测',
      description: '首先检测浏览器是否支持 Navigation API',
      before: `// 直接使用 History API
history.pushState(state, '', url)`,
      after: `// 特性检测
if ('navigation' in window) {
  navigation.navigate(url, { state })
} else {
  history.pushState(state, '', url)
}`,
      notes: [
        '始终进行特性检测',
        '提供降级方案',
        '考虑使用 Polyfill'
      ]
    },
    {
      id: 2,
      step: 2,
      title: '事件监听迁移',
      description: '将 popstate 事件监听迁移到 navigate 事件',
      before: `window.addEventListener('popstate', (event) => {
  // 处理导航
  handleNavigation(event.state)
})`,
      after: `if ('navigation' in window) {
  navigation.addEventListener('navigate', (event) => {
    // 处理导航
    handleNavigation(event.destination.url)
  })
} else {
  window.addEventListener('popstate', (event) => {
    handleNavigation(event.state)
  })
}`,
      notes: [
        'navigate 事件在导航前触发',
        'popstate 事件在导航后触发',
        '注意事件对象结构差异'
      ]
    },
    {
      id: 3,
      step: 3,
      title: '导航拦截',
      description: '使用 Navigation API 的拦截功能',
      before: `// History API 无法拦截导航
window.addEventListener('beforeunload', (event) => {
  event.preventDefault()
  return '确定要离开吗？'
})`,
      after: `if ('navigation' in window) {
  navigation.addEventListener('navigate', (event) => {
    if (shouldIntercept(event.destination.url)) {
      event.intercept({
        handler: () => handleNavigation()
      })
    }
  })
}`,
      notes: [
        '只有 Navigation API 支持真正的导航拦截',
        'beforeunload 只能提示用户',
        '拦截功能需要谨慎使用'
      ]
    }
  ],
  checklist: [
    { id: 1, text: '完成特性检测代码' },
    { id: 2, text: '迁移事件监听器' },
    { id: 3, text: '更新导航方法调用' },
    { id: 4, text: '实现降级方案' },
    { id: 5, text: '测试各浏览器兼容性' },
    { id: 6, text: '更新文档和注释' },
    { id: 7, text: '性能测试和优化' }
  ]
}

// 添加 browserSupportData 对象导出
export const browserSupportData = {
  getBrowserSupport() {
    return [
      {
        name: 'Chrome',
        icon: '🌐',
        minVersion: '102+',
        status: '完全支持',
        coreFeatures: [
          { name: 'navigation 对象', supported: true },
          { name: 'navigate 事件', supported: true },
          { name: 'currentEntry', supported: true },
          { name: 'entries()', supported: true }
        ],
        experimentalFeatures: [
          { name: '导航拦截', supported: true },
          { name: '表单提交拦截', supported: true }
        ],
        notes: '完全支持所有 Navigation API 功能'
      },
      {
        name: 'Firefox',
        icon: '🦊',
        minVersion: '未支持',
        status: '开发中',
        coreFeatures: [
          { name: 'navigation 对象', supported: false },
          { name: 'navigate 事件', supported: false },
          { name: 'currentEntry', supported: false },
          { name: 'entries()', supported: false }
        ],
        experimentalFeatures: [
          { name: '导航拦截', supported: false },
          { name: '表单提交拦截', supported: false }
        ],
        notes: '正在开发中，预计未来版本支持'
      },
      {
        name: 'Safari',
        icon: '🧭',
        minVersion: '未支持',
        status: '未支持',
        coreFeatures: [
          { name: 'navigation 对象', supported: false },
          { name: 'navigate 事件', supported: false },
          { name: 'currentEntry', supported: false },
          { name: 'entries()', supported: false }
        ],
        experimentalFeatures: [
          { name: '导航拦截', supported: false },
          { name: '表单提交拦截', supported: false }
        ],
        notes: '暂无支持计划'
      },
      {
        name: 'Edge',
        icon: '🔷',
        minVersion: '102+',
        status: '完全支持',
        coreFeatures: [
          { name: 'navigation 对象', supported: true },
          { name: 'navigate 事件', supported: true },
          { name: 'currentEntry', supported: true },
          { name: 'entries()', supported: true }
        ],
        experimentalFeatures: [
          { name: '导航拦截', supported: true },
          { name: '表单提交拦截', supported: true }
        ],
        notes: '基于 Chromium，与 Chrome 功能一致'
      }
    ]
  }
}