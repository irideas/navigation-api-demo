// SPA 路由管理工具函数
export const spaRouteUtils = {
  // 模拟路由变化
  async simulateRouteChange() {
    const routes = ['/home', '/about', '/contact', '/products']
    const randomRoute = routes[Math.floor(Math.random() * routes.length)]
    
    if ('navigation' in window) {
      await navigation.navigate(randomRoute, {
        state: { timestamp: Date.now(), source: 'simulation' }
      })
    } else {
      history.pushState(
        { timestamp: Date.now(), source: 'simulation' },
        '',
        randomRoute
      )
    }
    
    return { success: true, route: randomRoute }
  },

  // 模拟受保护路由
  async simulateProtectedRoute() {
    const isAuthenticated = Math.random() > 0.5
    
    if (!isAuthenticated) {
      alert('访问被拒绝：需要登录')
      return { success: false, reason: 'unauthorized' }
    }
    
    if ('navigation' in window) {
      await navigation.navigate('/admin', {
        state: { protected: true, user: 'demo-user' }
      })
    } else {
      history.pushState(
        { protected: true, user: 'demo-user' },
        '',
        '/admin'
      )
    }
    
    return { success: true, route: '/admin' }
  },

  // 模拟异步路由加载
  async simulateAsyncRoute() {
    const loadingStart = performance.now()
    
    // 模拟异步加载延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const loadingEnd = performance.now()
    const duration = Math.round(loadingEnd - loadingStart)
    
    if ('navigation' in window) {
      await navigation.navigate('/async-loaded', {
        state: { loadTime: duration, loaded: true }
      })
    } else {
      history.pushState(
        { loadTime: duration, loaded: true },
        '',
        '/async-loaded'
      )
    }
    
    return { success: true, duration, route: '/async-loaded' }
  },

  // 获取当前路由状态
  getCurrentRouteStatus() {
    return {
      current: location.pathname,
      params: this.parseUrlParams(),
      query: this.parseQueryString(),
      meta: history.state || {}
    }
  },

  // 解析 URL 参数
  parseUrlParams() {
    const params = {}
    const pathParts = location.pathname.split('/').filter(Boolean)
    
    pathParts.forEach((part, index) => {
      if (part.includes(':')) {
        const [key, value] = part.split(':')
        params[key] = value
      }
    })
    
    return params
  },

  // 解析查询字符串
  parseQueryString() {
    const params = {}
    const searchParams = new URLSearchParams(location.search)
    
    for (const [key, value] of searchParams) {
      params[key] = value
    }
    
    return params
  }
}