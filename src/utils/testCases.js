// Navigation API 测试用例
export const navigationApiTests = {
  // 基础导航测试
  basicNavigation: {
    async testNavigate(url, options = {}) {
      if (!('navigation' in window)) {
        throw new Error('Navigation API 不支持')
      }
      
      try {
        const result = await navigation.navigate(url, options)
        return {
          success: true,
          committed: result.committed,
          finished: result.finished,
          url: result.url || url
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    async testBack() {
      if (!('navigation' in window)) {
        throw new Error('Navigation API 不支持')
      }
      
      try {
        const result = await navigation.back()
        return {
          success: true,
          result: result
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    async testForward() {
      if (!('navigation' in window)) {
        throw new Error('Navigation API 不支持')
      }
      
      try {
        const result = await navigation.forward()
        return {
          success: true,
          result: result
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    }
  },

  // 导航条目测试
  entries: {
    getCurrentEntry() {
      if (!('navigation' in window)) {
        throw new Error('Navigation API 不支持')
      }
      
      return navigation.currentEntry
    },

    getAllEntries() {
      if (!('navigation' in window)) {
        throw new Error('Navigation API 不支持')
      }
      
      return navigation.entries()
    },

    getEntryInfo(entry) {
      return {
        id: entry.id,
        key: entry.key,
        index: entry.index,
        url: entry.url,
        sameDocument: entry.sameDocument
      }
    }
  },

  // 事件测试
  events: {
    setupNavigateListener(callback) {
      if (!('navigation' in window)) {
        throw new Error('Navigation API 不支持')
      }
      
      const handler = (event) => {
        callback({
          type: 'navigate',
          destination: event.destination,
          canIntercept: event.canIntercept,
          userInitiated: event.userInitiated,
          hashChange: event.hashChange,
          formData: event.formData
        })
      }
      
      navigation.addEventListener('navigate', handler)
      return () => navigation.removeEventListener('navigate', handler)
    },

    setupCurrentEntryChangeListener(callback) {
      if (!('navigation' in window)) {
        throw new Error('Navigation API 不支持')
      }
      
      const handler = (event) => {
        callback({
          type: 'currententrychange',
          from: event.from,
          navigationType: event.navigationType
        })
      }
      
      navigation.addEventListener('currententrychange', handler)
      return () => navigation.removeEventListener('currententrychange', handler)
    }
  }
}

// History API 测试用例
export const historyApiTests = {
  // 基础导航测试
  basicNavigation: {
    testPushState(state, title, url) {
      try {
        history.pushState(state, title, url)
        return {
          success: true,
          url: location.href,
          state: history.state
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    testReplaceState(state, title, url) {
      try {
        history.replaceState(state, title, url)
        return {
          success: true,
          url: location.href,
          state: history.state
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    testBack() {
      try {
        history.back()
        return {
          success: true,
          message: '后退命令已发送'
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    testForward() {
      try {
        history.forward()
        return {
          success: true,
          message: '前进命令已发送'
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    testGo(delta) {
      try {
        history.go(delta)
        return {
          success: true,
          message: `跳转 ${delta} 步的命令已发送`
        }
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    }
  },

  // 事件测试
  events: {
    setupPopstateListener(callback) {
      const handler = (event) => {
        callback({
          type: 'popstate',
          state: event.state,
          url: location.href
        })
      }
      
      window.addEventListener('popstate', handler)
      return () => window.removeEventListener('popstate', handler)
    },

    setupHashchangeListener(callback) {
      const handler = (event) => {
        callback({
          type: 'hashchange',
          oldURL: event.oldURL,
          newURL: event.newURL
        })
      }
      
      window.addEventListener('hashchange', handler)
      return () => window.removeEventListener('hashchange', handler)
    }
  }
}

// 浏览器支持检测
export const browserSupport = {
  checkNavigationAPI() {
    return {
      supported: 'navigation' in window,
      features: {
        navigate: 'navigation' in window && typeof navigation.navigate === 'function',
        entries: 'navigation' in window && typeof navigation.entries === 'function',
        currentEntry: 'navigation' in window && 'currentEntry' in navigation,
        addEventListener: 'navigation' in window && typeof navigation.addEventListener === 'function'
      }
    }
  },

  checkHistoryAPI() {
    return {
      supported: 'history' in window,
      features: {
        pushState: typeof history.pushState === 'function',
        replaceState: typeof history.replaceState === 'function',
        back: typeof history.back === 'function',
        forward: typeof history.forward === 'function',
        go: typeof history.go === 'function',
        state: 'state' in history,
        length: 'length' in history
      }
    }
  },

  getBrowserInfo() {
    const ua = navigator.userAgent
    const browser = {
      name: 'Unknown',
      version: 'Unknown'
    }

    if (ua.includes('Chrome')) {
      browser.name = 'Chrome'
      const match = ua.match(/Chrome\/(\d+)/)
      if (match) browser.version = match[1]
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      browser.name = 'Safari'
      const match = ua.match(/Version\/(\d+)/)
      if (match) browser.version = match[1]
    } else if (ua.includes('Firefox')) {
      browser.name = 'Firefox'
      const match = ua.match(/Firefox\/(\d+)/)
      if (match) browser.version = match[1]
    } else if (ua.includes('Edge')) {
      browser.name = 'Edge'
      const match = ua.match(/Edge\/(\d+)/)
      if (match) browser.version = match[1]
    }

    return browser
  }
}