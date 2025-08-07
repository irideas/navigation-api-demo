// API对比测试工具函数
export const apiComparisonUtils = {
  // 测试导航性能对比
  async testNavigationPerformance() {
    const iterations = 100
    
    // 测试 Navigation API
    const navigationApiTime = await this.measureNavigationApi(iterations)
    
    // 测试 History API
    const historyApiTime = await this.measureHistoryApi(iterations)
    
    return {
      navigationApi: navigationApiTime,
      historyApi: historyApiTime
    }
  },

  // 测量 Navigation API 性能
  async measureNavigationApi(iterations) {
    if (!window.navigation) {
      return 0 // 不支持时返回0
    }
    
    const startTime = performance.now()
    
    try {
      for (let i = 0; i < iterations; i++) {
        const url = `${window.location.origin}${window.location.pathname}?nav-test=${i}`
        await window.navigation.navigate(url, { 
          history: 'replace',
          state: { test: i }
        }).finished
      }
    } catch (error) {
      console.warn('Navigation API 测试失败:', error)
    }
    
    const endTime = performance.now()
    return Math.round(endTime - startTime)
  },

  // 测量 History API 性能
  async measureHistoryApi(iterations) {
    const startTime = performance.now()
    
    try {
      for (let i = 0; i < iterations; i++) {
        const url = `${window.location.origin}${window.location.pathname}?hist-test=${i}`
        window.history.replaceState({ test: i }, '', url)
        
        // 模拟异步操作
        await new Promise(resolve => setTimeout(resolve, 0))
      }
    } catch (error) {
      console.warn('History API 测试失败:', error)
    }
    
    const endTime = performance.now()
    return Math.round(endTime - startTime)
  },

  // 测试状态管理性能
  async testStateManagement() {
    const stateSize = 1000
    const complexState = this.generateComplexState(stateSize)
    
    // 测试 Navigation API 状态管理
    const navigationApiTime = await this.measureNavigationApiState(complexState)
    
    // 测试 History API 状态管理
    const historyApiTime = await this.measureHistoryApiState(complexState)
    
    return {
      navigationApi: navigationApiTime,
      historyApi: historyApiTime
    }
  },

  // 生成复杂状态对象
  generateComplexState(size) {
    const state = {
      id: Date.now(),
      data: [],
      metadata: {
        created: new Date().toISOString(),
        version: '1.0.0',
        tags: ['test', 'performance', 'state']
      }
    }
    
    for (let i = 0; i < size; i++) {
      state.data.push({
        id: i,
        value: Math.random(),
        text: `Item ${i}`,
        nested: {
          level1: {
            level2: {
              value: i * 2
            }
          }
        }
      })
    }
    
    return state
  },

  // 测量 Navigation API 状态管理性能
  async measureNavigationApiState(state) {
    if (!window.navigation) {
      return 0
    }
    
    const startTime = performance.now()
    
    try {
      const url = `${window.location.origin}${window.location.pathname}?state-test=${Date.now()}`
      await window.navigation.navigate(url, {
        history: 'replace',
        state: state
      }).finished
      
      // 读取状态
      const currentState = window.navigation.currentEntry?.getState?.()
      if (currentState) {
        // 模拟状态处理
        JSON.stringify(currentState)
      }
    } catch (error) {
      console.warn('Navigation API 状态测试失败:', error)
    }
    
    const endTime = performance.now()
    return Math.round(endTime - startTime)
  },

  // 测量 History API 状态管理性能
  async measureHistoryApiState(state) {
    const startTime = performance.now()
    
    try {
      const url = `${window.location.origin}${window.location.pathname}?state-test=${Date.now()}`
      window.history.replaceState(state, '', url)
      
      // 读取状态
      const currentState = window.history.state
      if (currentState) {
        // 模拟状态处理
        JSON.stringify(currentState)
      }
    } catch (error) {
      console.warn('History API 状态测试失败:', error)
    }
    
    const endTime = performance.now()
    return Math.round(endTime - startTime)
  },

  // 测试事件处理性能
  async testEventHandling() {
    const eventCount = 50
    
    // 测试 Navigation API 事件处理
    const navigationApiTime = await this.measureNavigationApiEvents(eventCount)
    
    // 测试 History API 事件处理
    const historyApiTime = await this.measureHistoryApiEvents(eventCount)
    
    return {
      navigationApi: navigationApiTime,
      historyApi: historyApiTime
    }
  },

  // 测量 Navigation API 事件处理性能
  async measureNavigationApiEvents(eventCount) {
    if (!window.navigation) {
      return 0
    }
    
    const startTime = performance.now()
    let processedEvents = 0
    
    const handleNavigate = (event) => {
      processedEvents++
      // 模拟事件处理
      const data = {
        url: event.destination?.url,
        timestamp: Date.now(),
        processed: true
      }
      JSON.stringify(data)
    }
    
    try {
      window.navigation.addEventListener('navigate', handleNavigate)
      
      for (let i = 0; i < eventCount; i++) {
        const url = `${window.location.origin}${window.location.pathname}?event=${i}`
        await window.navigation.navigate(url, { history: 'replace' }).finished
      }
      
      window.navigation.removeEventListener('navigate', handleNavigate)
    } catch (error) {
      console.warn('Navigation API 事件测试失败:', error)
    }
    
    const endTime = performance.now()
    return Math.round(endTime - startTime)
  },

  // 测量 History API 事件处理性能
  async measureHistoryApiEvents(eventCount) {
    const startTime = performance.now()
    let processedEvents = 0
    
    const handlePopState = (event) => {
      processedEvents++
      // 模拟事件处理
      const data = {
        state: event.state,
        timestamp: Date.now(),
        processed: true
      }
      JSON.stringify(data)
    }
    
    try {
      window.addEventListener('popstate', handlePopState)
      
      for (let i = 0; i < eventCount; i++) {
        const url = `${window.location.origin}${window.location.pathname}?event=${i}`
        window.history.replaceState({ event: i }, '', url)
        
        // 模拟 popstate 事件
        const popStateEvent = new PopStateEvent('popstate', {
          state: { event: i }
        })
        window.dispatchEvent(popStateEvent)
        
        await new Promise(resolve => setTimeout(resolve, 1))
      }
      
      window.removeEventListener('popstate', handlePopState)
    } catch (error) {
      console.warn('History API 事件测试失败:', error)
    }
    
    const endTime = performance.now()
    return Math.round(endTime - startTime)
  },

  // 测试内存使用
  async testMemoryUsage() {
    // 这是一个简化的内存测试，实际内存使用很难精确测量
    const iterations = 100
    
    // 测试 Navigation API 内存使用
    const navigationApiTime = await this.measureNavigationApiMemory(iterations)
    
    // 测试 History API 内存使用
    const historyApiTime = await this.measureHistoryApiMemory(iterations)
    
    return {
      navigationApi: navigationApiTime,
      historyApi: historyApiTime
    }
  },

  // 测量 Navigation API 内存相关性能
  async measureNavigationApiMemory(iterations) {
    if (!window.navigation) {
      return 0
    }
    
    const startTime = performance.now()
    const states = []
    
    try {
      for (let i = 0; i < iterations; i++) {
        const largeState = {
          id: i,
          data: new Array(1000).fill(0).map((_, idx) => ({
            index: idx,
            value: Math.random(),
            text: `Large data item ${idx} for iteration ${i}`
          }))
        }
        
        states.push(largeState)
        
        const url = `${window.location.origin}${window.location.pathname}?memory=${i}`
        await window.navigation.navigate(url, {
          history: 'replace',
          state: largeState
        }).finished
      }
      
      // 清理
      states.length = 0
    } catch (error) {
      console.warn('Navigation API 内存测试失败:', error)
    }
    
    const endTime = performance.now()
    return Math.round(endTime - startTime)
  },

  // 测量 History API 内存相关性能
  async measureHistoryApiMemory(iterations) {
    const startTime = performance.now()
    const states = []
    
    try {
      for (let i = 0; i < iterations; i++) {
        const largeState = {
          id: i,
          data: new Array(1000).fill(0).map((_, idx) => ({
            index: idx,
            value: Math.random(),
            text: `Large data item ${idx} for iteration ${i}`
          }))
        }
        
        states.push(largeState)
        
        const url = `${window.location.origin}${window.location.pathname}?memory=${i}`
        window.history.replaceState(largeState, '', url)
        
        await new Promise(resolve => setTimeout(resolve, 1))
      }
      
      // 清理
      states.length = 0
    } catch (error) {
      console.warn('History API 内存测试失败:', error)
    }
    
    const endTime = performance.now()
    return Math.round(endTime - startTime)
  }
}