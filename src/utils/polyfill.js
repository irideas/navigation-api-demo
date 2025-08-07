// Navigation API Polyfill 实现
class NavigationPolyfill {
  constructor() {
    this.entries = []
    this.currentIndex = -1
    this.listeners = new Map()
    
    // 初始化当前条目
    this.addEntry(location.href, history.state)
    
    // 监听 popstate 事件
    window.addEventListener('popstate', this.handlePopstate.bind(this))
  }

  // 创建导航条目
  createEntry(url, state = null, id = null) {
    return {
      id: id || this.generateId(),
      key: this.generateKey(),
      index: this.entries.length,
      url: url,
      sameDocument: this.isSameDocument(url),
      getState: () => state
    }
  }

  // 添加条目
  addEntry(url, state = null) {
    const entry = this.createEntry(url, state)
    this.entries.push(entry)
    this.currentIndex = this.entries.length - 1
    return entry
  }

  // 获取当前条目
  get currentEntry() {
    return this.entries[this.currentIndex] || null
  }

  // 获取所有条目
  entries() {
    return [...this.entries]
  }

  // 导航方法
  async navigate(url, options = {}) {
    const destination = this.createEntry(url, options.state)
    
    // 触发 navigate 事件
    const navigateEvent = new CustomEvent('navigate', {
      detail: {
        destination,
        canIntercept: true,
        userInitiated: false,
        hashChange: this.isHashChange(url),
        formData: options.formData || null
      }
    })

    // 检查是否被拦截
    let intercepted = false
    const intercept = (handler) => {
      intercepted = true
      if (typeof handler === 'function') {
        Promise.resolve(handler()).catch(console.error)
      }
    }

    navigateEvent.detail.intercept = intercept
    this.dispatchEvent('navigate', navigateEvent)

    if (intercepted) {
      throw new Error('Navigation was intercepted')
    }

    // 执行导航
    if (options.history === 'replace') {
      history.replaceState(options.state, '', url)
      this.entries[this.currentIndex] = destination
    } else {
      history.pushState(options.state, '', url)
      this.addEntry(url, options.state)
    }

    // 触发 currententrychange 事件
    this.dispatchEvent('currententrychange', {
      from: this.entries[this.currentIndex - 1] || null,
      navigationType: options.history === 'replace' ? 'replace' : 'push'
    })

    return {
      committed: Promise.resolve(true),
      finished: Promise.resolve(true)
    }
  }

  // 后退
  async back() {
    if (this.currentIndex > 0) {
      history.back()
      return { success: true }
    }
    throw new Error('Cannot go back')
  }

  // 前进
  async forward() {
    if (this.currentIndex < this.entries.length - 1) {
      history.forward()
      return { success: true }
    }
    throw new Error('Cannot go forward')
  }

  // 事件处理
  addEventListener(type, listener) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    this.listeners.get(type).add(listener)
  }

  removeEventListener(type, listener) {
    if (this.listeners.has(type)) {
      this.listeners.get(type).delete(listener)
    }
  }

  dispatchEvent(type, event) {
    if (this.listeners.has(type)) {
      this.listeners.get(type).forEach(listener => {
        try {
          listener(event)
        } catch (error) {
          console.error('Event listener error:', error)
        }
      })
    }
  }

  // 处理 popstate 事件
  handlePopstate(event) {
    // 更新当前索引
    const url = location.href
    const entryIndex = this.entries.findIndex(entry => entry.url === url)
    
    if (entryIndex !== -1) {
      const from = this.entries[this.currentIndex]
      this.currentIndex = entryIndex
      
      this.dispatchEvent('currententrychange', {
        from,
        navigationType: 'traverse'
      })
    }
  }

  // 工具方法
  generateId() {
    return 'entry-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  }

  generateKey() {
    return 'key-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  }

  isSameDocument(url) {
    try {
      const currentOrigin = new URL(location.href).origin
      const targetOrigin = new URL(url, location.href).origin
      return currentOrigin === targetOrigin
    } catch {
      return false
    }
  }

  isHashChange(url) {
    try {
      const current = new URL(location.href)
      const target = new URL(url, location.href)
      return current.origin === target.origin && 
             current.pathname === target.pathname && 
             current.search === target.search &&
             current.hash !== target.hash
    } catch {
      return false
    }
  }
}

// 安装 polyfill
export function installNavigationPolyfill() {
  if (!('navigation' in window)) {
    window.navigation = new NavigationPolyfill()
    console.log('Navigation API polyfill installed')
  }
}

// 检查是否需要 polyfill
export function needsPolyfill() {
  return !('navigation' in window)
}

export default NavigationPolyfill