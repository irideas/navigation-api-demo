// 浏览器检测工具
export const browserDetectionUtils = {
  detectBrowser() {
    const userAgent = navigator.userAgent
    let browserName = 'Unknown'
    let browserVersion = 'Unknown'
    let browserEngine = 'Unknown'
    
    // Chrome
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      browserName = 'Chrome'
      const match = userAgent.match(/Chrome\/(\d+)/)
      if (match) browserVersion = match[1]
      browserEngine = 'Blink'
    }
    // Firefox
    else if (userAgent.includes('Firefox')) {
      browserName = 'Firefox'
      const match = userAgent.match(/Firefox\/(\d+)/)
      if (match) browserVersion = match[1]
      browserEngine = 'Gecko'
    }
    // Safari
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      browserName = 'Safari'
      const match = userAgent.match(/Version\/(\d+)/)
      if (match) browserVersion = match[1]
      browserEngine = 'WebKit'
    }
    // Edge
    else if (userAgent.includes('Edg')) {
      browserName = 'Edge'
      const match = userAgent.match(/Edg\/(\d+)/)
      if (match) browserVersion = match[1]
      browserEngine = 'Blink'
    }
    
    return {
      name: browserName,
      version: browserVersion,
      engine: browserEngine,
      platform: navigator.platform,
      userAgent: userAgent
    }
  },

  // 添加缺失的方法别名
  getBrowserInfo() {
    return this.detectBrowser()
  },

  detectNavigationSupport() {
    const hasNavigation = 'navigation' in window
    const hasNavigate = hasNavigation && typeof navigation.navigate === 'function'
    const hasEntries = hasNavigation && typeof navigation.entries === 'function'
    const hasCurrentEntry = hasNavigation && 'currentEntry' in navigation
    
    // 测试事件支持
    let hasNavigateEvent = false
    if (hasNavigation) {
      try {
        const testListener = () => {}
        navigation.addEventListener('navigate', testListener)
        navigation.removeEventListener('navigate', testListener)
        hasNavigateEvent = true
      } catch (error) {
        hasNavigateEvent = false
      }
    }

    return {
      hasNavigation,
      hasNavigate,
      hasEntries,
      hasCurrentEntry,
      hasNavigateEvent
    }
  },
  
  testNavigationApiSupport() {
    const features = []
    
    // 基础对象检测
    features.push({
      name: 'navigation 对象',
      supported: 'navigation' in window,
      description: '全局 navigation 对象是否存在'
    })
    
    if ('navigation' in window) {
      // 属性检测
      features.push({
        name: 'currentEntry',
        supported: 'currentEntry' in navigation,
        description: '当前导航条目属性'
      })
      
      // 方法检测
      const methods = ['navigate', 'back', 'forward', 'traverseTo', 'updateCurrentEntry', 'reload', 'entries']
      methods.forEach(method => {
        features.push({
          name: `${method}()`,
          supported: typeof navigation[method] === 'function',
          description: `${method} 方法是否可用`
        })
      })
      
      // 事件支持检测
      try {
        const testListener = () => {}
        navigation.addEventListener('navigate', testListener)
        navigation.removeEventListener('navigate', testListener)
        features.push({
          name: 'navigate 事件',
          supported: true,
          description: '导航事件监听支持'
        })
      } catch (error) {
        features.push({
          name: 'navigate 事件',
          supported: false,
          description: '导航事件监听不支持'
        })
      }
    } else {
      // Navigation API 不支持时的默认值
      const unsupportedFeatures = [
        'currentEntry', 'navigate()', 'back()', 'forward()', 
        'traverseTo()', 'updateCurrentEntry()', 'reload()', 
        'entries()', 'navigate 事件'
      ]
      
      unsupportedFeatures.forEach(feature => {
        features.push({
          name: feature,
          supported: false,
          description: `${feature} 不支持 - Navigation API 未实现`
        })
      })
    }
    
    return features
  }
}

export const compatibilityTestUtils = {
  runTests() {
    const results = []
    
    // 基础支持测试
    results.push({
      test: 'Navigation API 基础支持',
      status: 'navigation' in window ? '通过' : '失败',
      description: 'navigation' in window ? 
        'Navigation API 已支持' : 
        'Navigation API 不支持，需要使用 Polyfill 或降级方案',
      details: `检测结果: ${'navigation' in window ? '支持' : '不支持'}`
    })
    
    // 事件支持测试
    if ('navigation' in window) {
      try {
        const testListener = () => {}
        navigation.addEventListener('navigate', testListener)
        navigation.removeEventListener('navigate', testListener)
        results.push({
          test: '事件监听支持',
          status: '通过',
          description: 'navigate 事件监听正常工作',
          details: '事件监听器注册和移除成功'
        })
      } catch (error) {
        results.push({
          test: '事件监听支持',
          status: '失败',
          description: 'navigate 事件监听异常',
          details: `错误信息: ${error.message}`
        })
      }
      
      // 方法可用性测试
      const methods = ['navigate', 'back', 'forward', 'entries']
      methods.forEach(method => {
        const available = typeof navigation[method] === 'function'
        results.push({
          test: `${method} 方法`,
          status: available ? '通过' : '失败',
          description: available ? 
            `${method} 方法可用` : 
            `${method} 方法不可用`,
          details: `类型检测: ${typeof navigation[method]}`
        })
      })
      
      // 属性访问测试
      try {
        const currentEntry = navigation.currentEntry
        results.push({
          test: 'currentEntry 属性',
          status: currentEntry !== undefined ? '通过' : '警告',
          description: currentEntry !== undefined ? 
            'currentEntry 属性可访问' : 
            'currentEntry 属性为 undefined',
          details: `当前值: ${currentEntry ? '有值' : '无值'}`
        })
      } catch (error) {
        results.push({
          test: 'currentEntry 属性',
          status: '失败',
          description: 'currentEntry 属性访问异常',
          details: `错误信息: ${error.message}`
        })
      }
    } else {
      results.push({
        test: 'History API 降级支持',
        status: 'history' in window ? '通过' : '失败',
        description: 'history' in window ? 
          'History API 可用作降级方案' : 
          'History API 也不可用',
        details: `History API 支持: ${'history' in window ? '是' : '否'}`
      })
    }
    
    return results
  }
}