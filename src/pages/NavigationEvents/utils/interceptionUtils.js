export const interceptionUtils = {
  config: null,
  listeners: [],

  setupInterception(config) {
    this.config = config
    this.removeInterception() // 清理之前的监听器
    
    if (!config.enabled) return
    
    // Navigation API 拦截
    if ('navigation' in window) {
      const navigateListener = (event) => {
        if (this.shouldInterceptNavigation(event.destination.url)) {
          if (config.confirmation) {
            const confirmed = confirm(`确定要导航到 ${event.destination.url} 吗？`)
            if (!confirmed) {
              event.preventDefault()
              config.onCancel && config.onCancel(event)
              return
            }
          }
          
          config.onIntercept && config.onIntercept(event)
          
          // 可以在这里添加自定义处理逻辑
          event.intercept({
            handler: () => this.handleCustomNavigation(event)
          })
        } else {
          config.onAllow && config.onAllow(event)
        }
      }
      
      navigation.addEventListener('navigate', navigateListener)
      this.listeners.push({ target: navigation, type: 'navigate', listener: navigateListener })
    }
    
    // History API 拦截（通过拦截 pushState 和 replaceState）
    this.interceptHistoryMethods()
    
    // 拦截页面离开
    const beforeUnloadListener = (event) => {
      if (config.enabled && config.confirmation) {
        const message = '您有未保存的更改，确定要离开吗？'
        event.returnValue = message
        return message
      }
    }
    
    window.addEventListener('beforeunload', beforeUnloadListener)
    this.listeners.push({ target: window, type: 'beforeunload', listener: beforeUnloadListener })
  },

  removeInterception() {
    // 移除所有事件监听器
    this.listeners.forEach(({ target, type, listener }) => {
      target.removeEventListener(type, listener)
    })
    this.listeners = []
    
    // 恢复原始的 history 方法
    this.restoreHistoryMethods()
  },

  interceptHistoryMethods() {
    // 保存原始方法
    if (!this.originalPushState) {
      this.originalPushState = history.pushState
      this.originalReplaceState = history.replaceState
    }
    
    // 拦截 pushState
    history.pushState = (state, title, url) => {
      if (this.config?.enabled && this.shouldInterceptNavigation(url)) {
        if (this.config.confirmation) {
          const confirmed = confirm(`确定要导航到 ${url} 吗？`)
          if (!confirmed) {
            this.config.onCancel && this.config.onCancel({ target: url })
            return
          }
        }
        this.config.onIntercept && this.config.onIntercept({ target: url })
      }
      
      return this.originalPushState.call(history, state, title, url)
    }
    
    // 拦截 replaceState
    history.replaceState = (state, title, url) => {
      if (this.config?.enabled && this.shouldInterceptNavigation(url)) {
        if (this.config.confirmation) {
          const confirmed = confirm(`确定要替换当前状态为 ${url} 吗？`)
          if (!confirmed) {
            this.config.onCancel && this.config.onCancel({ target: url })
            return
          }
        }
        this.config.onIntercept && this.config.onIntercept({ target: url })
      }
      
      return this.originalReplaceState.call(history, state, title, url)
    }
  },

  restoreHistoryMethods() {
    if (this.originalPushState) {
      history.pushState = this.originalPushState
    }
    if (this.originalReplaceState) {
      history.replaceState = this.originalReplaceState
    }
  },

  shouldInterceptNavigation(url) {
    if (!url) return false
    
    // 简单的拦截规则：包含 'test' 参数的 URL
    return url.includes('test=') || url.includes('intercept')
  },

  async handleCustomNavigation(event) {
    // 模拟异步处理
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('自定义导航处理完成:', event.destination.url)
        resolve()
      }, 500)
    })
  }
}