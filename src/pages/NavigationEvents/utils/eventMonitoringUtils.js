export const eventMonitoringUtils = {
  listeners: [],
  logCallback: null,
  isMonitoring: false,

  setupListeners(callback) {
    this.logCallback = callback
  },

  startMonitoring() {
    if (this.isMonitoring) return
    
    this.isMonitoring = true
    
    // Navigation API 事件监听
    if ('navigation' in window) {
      const navigateListener = (event) => {
        this.log('navigate', `导航到: ${event.destination?.url || 'unknown'}`, 'info')
      }
      
      const navigateSuccessListener = (event) => {
        this.log('navigatesuccess', `导航成功: ${event.destination?.url || 'unknown'}`, 'success')
      }
      
      const navigateErrorListener = (event) => {
        this.log('navigateerror', `导航失败: ${event.error?.message || 'unknown error'}`, 'error')
      }
      
      navigation.addEventListener('navigate', navigateListener)
      navigation.addEventListener('navigatesuccess', navigateSuccessListener)
      navigation.addEventListener('navigateerror', navigateErrorListener)
      
      this.listeners.push(
        { target: navigation, type: 'navigate', listener: navigateListener },
        { target: navigation, type: 'navigatesuccess', listener: navigateSuccessListener },
        { target: navigation, type: 'navigateerror', listener: navigateErrorListener }
      )
    }
    
    // History API 事件监听
    const popstateListener = (event) => {
      this.log('popstate', `历史状态变化: ${JSON.stringify(event.state)}`, 'info')
    }
    
    const beforeUnloadListener = (event) => {
      this.log('beforeunload', '页面即将离开', 'warning')
    }
    
    window.addEventListener('popstate', popstateListener)
    window.addEventListener('beforeunload', beforeUnloadListener)
    
    this.listeners.push(
      { target: window, type: 'popstate', listener: popstateListener },
      { target: window, type: 'beforeunload', listener: beforeUnloadListener }
    )
    
    // 监听 pushState 和 replaceState
    this.interceptHistoryMethods()
  },

  stopMonitoring() {
    if (!this.isMonitoring) return
    
    this.isMonitoring = false
    
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
    this.originalPushState = history.pushState
    this.originalReplaceState = history.replaceState
    
    // 拦截 pushState
    history.pushState = (state, title, url) => {
      this.log('pushState', `推送状态: ${url}`, 'info')
      return this.originalPushState.call(history, state, title, url)
    }
    
    // 拦截 replaceState
    history.replaceState = (state, title, url) => {
      this.log('replaceState', `替换状态: ${url}`, 'info')
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

  log(eventType, details, type = 'info') {
    if (this.logCallback && this.isMonitoring) {
      this.logCallback({
        eventType,
        details,
        type,
        timestamp: new Date().toLocaleTimeString()
      })
    }
  }
}