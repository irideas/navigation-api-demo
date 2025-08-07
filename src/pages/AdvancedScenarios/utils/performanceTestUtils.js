// 性能测试工具函数
export const performanceTestUtils = {
  // 测试基础导航性能
  async testBasicNavigation() {
    const startTime = performance.now()
    
    try {
      // 模拟多次导航操作
      for (let i = 0; i < 100; i++) {
        if (window.navigation) {
          // 使用 Navigation API
          const url = `${window.location.origin}${window.location.pathname}?test=${i}`
          await window.navigation.navigate(url, { history: 'replace' }).finished
        } else {
          // 回退到 History API
          const url = `${window.location.origin}${window.location.pathname}?test=${i}`
          window.history.replaceState({ test: i }, '', url)
        }
      }
      
      const endTime = performance.now()
      const duration = Math.round(endTime - startTime)
      
      return {
        duration,
        details: `完成100次导航操作，平均每次${(duration/100).toFixed(2)}ms`
      }
    } catch (error) {
      const endTime = performance.now()
      return {
        duration: Math.round(endTime - startTime),
        details: `测试失败: ${error.message}`
      }
    }
  },

  // 测试状态管理性能
  async testStateManagement() {
    const startTime = performance.now()
    
    try {
      const states = []
      
      // 创建大量状态对象
      for (let i = 0; i < 1000; i++) {
        const state = {
          id: i,
          data: `test-data-${i}`,
          timestamp: Date.now(),
          nested: {
            value: Math.random(),
            array: new Array(10).fill(i)
          }
        }
        states.push(state)
        
        if (window.navigation) {
          const url = `${window.location.origin}${window.location.pathname}?state=${i}`
          await window.navigation.navigate(url, { 
            state,
            history: 'replace'
          }).finished
        } else {
          const url = `${window.location.origin}${window.location.pathname}?state=${i}`
          window.history.replaceState(state, '', url)
        }
      }
      
      const endTime = performance.now()
      const duration = Math.round(endTime - startTime)
      
      return {
        duration,
        details: `处理1000个状态对象，平均每个${(duration/1000).toFixed(2)}ms`
      }
    } catch (error) {
      const endTime = performance.now()
      return {
        duration: Math.round(endTime - startTime),
        details: `测试失败: ${error.message}`
      }
    }
  },

  // 测试事件处理性能
  async testEventHandling() {
    const startTime = performance.now()
    
    try {
      let eventCount = 0
      const events = []
      
      // 创建事件监听器
      const handleNavigate = (event) => {
        eventCount++
        events.push({
          type: event.type,
          timestamp: Date.now(),
          url: event.destination?.url
        })
      }
      
      if (window.navigation) {
        window.navigation.addEventListener('navigate', handleNavigate)
        
        // 触发多个导航事件
        for (let i = 0; i < 50; i++) {
          const url = `${window.location.origin}${window.location.pathname}?event=${i}`
          await window.navigation.navigate(url, { history: 'replace' }).finished
        }
        
        window.navigation.removeEventListener('navigate', handleNavigate)
      } else {
        // 模拟事件处理
        for (let i = 0; i < 50; i++) {
          handleNavigate({
            type: 'navigate',
            destination: { url: `${window.location.origin}${window.location.pathname}?event=${i}` }
          })
        }
      }
      
      const endTime = performance.now()
      const duration = Math.round(endTime - startTime)
      
      return {
        duration,
        details: `处理${eventCount}个导航事件，平均每个${(duration/eventCount).toFixed(2)}ms`
      }
    } catch (error) {
      const endTime = performance.now()
      return {
        duration: Math.round(endTime - startTime),
        details: `测试失败: ${error.message}`
      }
    }
  },

  // 测试路由预加载
  async preloadRoutes() {
    const startTime = performance.now()
    
    try {
      const routes = [
        '/home',
        '/basic-navigation',
        '/navigation-entries',
        '/navigation-events',
        '/polyfill-analysis',
        '/browser-support'
      ]
      
      const preloadPromises = routes.map(async (route) => {
        // 模拟预加载操作
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              route,
              loaded: true,
              timestamp: Date.now()
            })
          }, Math.random() * 100)
        })
      })
      
      const results = await Promise.all(preloadPromises)
      
      const endTime = performance.now()
      const duration = Math.round(endTime - startTime)
      
      return {
        duration,
        details: `预加载${results.length}个路由，成功${results.filter(r => r.loaded).length}个`
      }
    } catch (error) {
      const endTime = performance.now()
      return {
        duration: Math.round(endTime - startTime),
        details: `测试失败: ${error.message}`
      }
    }
  },

  // 测试缓存清理
  async clearCache() {
    const startTime = performance.now()
    
    try {
      // 模拟缓存操作
      const cache = new Map()
      
      // 填充缓存
      for (let i = 0; i < 10000; i++) {
        cache.set(`key-${i}`, {
          data: `value-${i}`,
          timestamp: Date.now(),
          size: Math.random() * 1000
        })
      }
      
      // 清理缓存
      const initialSize = cache.size
      cache.clear()
      
      // 强制垃圾回收（如果支持）
      if (window.gc) {
        window.gc()
      }
      
      const endTime = performance.now()
      const duration = Math.round(endTime - startTime)
      
      return {
        duration,
        details: `清理${initialSize}个缓存项，释放内存`
      }
    } catch (error) {
      const endTime = performance.now()
      return {
        duration: Math.round(endTime - startTime),
        details: `测试失败: ${error.message}`
      }
    }
  }
}