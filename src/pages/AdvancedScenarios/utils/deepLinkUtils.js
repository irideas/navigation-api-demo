// 深度链接处理工具函数
export const deepLinkUtils = {
  // 生成深度链接
  generateDeepLink(params = {}) {
    const baseUrl = `${window.location.origin}${window.location.pathname}`
    const searchParams = new URLSearchParams()
    
    // 添加参数到 URL
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.set(key, String(value))
      }
    })
    
    const queryString = searchParams.toString()
    const deepLink = queryString ? `${baseUrl}?${queryString}` : baseUrl
    
    return {
      url: deepLink,
      params: params,
      timestamp: Date.now()
    }
  },

  // 解析当前 URL
  parseCurrentUrl() {
    const url = new URL(window.location.href)
    const params = {}
    
    // 解析查询参数
    url.searchParams.forEach((value, key) => {
      params[key] = this.parseValue(value)
    })
    
    // 解析 hash 参数（如果有）
    if (url.hash) {
      const hashParams = this.parseHashParams(url.hash)
      Object.assign(params, hashParams)
    }
    
    return {
      fullUrl: url.href,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      params: params,
      parsedAt: new Date().toISOString()
    }
  },

  // 从 URL 恢复应用状态
  restoreFromUrl() {
    const urlData = this.parseCurrentUrl()
    const state = {}
    
    // 根据 URL 参数恢复不同的状态
    if (urlData.params.view) {
      state.currentView = urlData.params.view
    }
    
    if (urlData.params.tab) {
      state.activeTab = urlData.params.tab
    }
    
    if (urlData.params.id) {
      state.selectedId = urlData.params.id
    }
    
    if (urlData.params.filter) {
      state.currentFilter = urlData.params.filter
    }
    
    if (urlData.params.sort) {
      state.sortOrder = urlData.params.sort
    }
    
    if (urlData.params.page) {
      state.currentPage = parseInt(urlData.params.page, 10) || 1
    }
    
    if (urlData.params.search) {
      state.searchQuery = urlData.params.search
    }
    
    // 恢复复杂对象（JSON 编码的参数）
    if (urlData.params.data) {
      try {
        state.complexData = JSON.parse(decodeURIComponent(urlData.params.data))
      } catch (error) {
        console.warn('无法解析复杂数据参数:', error)
      }
    }
    
    return {
      state: state,
      urlData: urlData,
      restoredAt: new Date().toISOString()
    }
  },

  // 更新当前 URL
  updateCurrentUrl(params = {}, options = {}) {
    const currentUrl = new URL(window.location.href)
    
    // 更新查询参数
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        currentUrl.searchParams.delete(key)
      } else {
        currentUrl.searchParams.set(key, String(value))
      }
    })
    
    const newUrl = currentUrl.toString()
    
    try {
      if (window.navigation && !options.useHistoryApi) {
        // 使用 Navigation API
        return window.navigation.navigate(newUrl, {
          history: options.replace ? 'replace' : 'push',
          state: options.state || null
        })
      } else {
        // 使用 History API
        const method = options.replace ? 'replaceState' : 'pushState'
        window.history[method](options.state || null, '', newUrl)
        
        return Promise.resolve({
          success: true,
          url: newUrl,
          method: 'History API'
        })
      }
    } catch (error) {
      console.error('URL 更新失败:', error)
      return Promise.reject(error)
    }
  },

  // 解析 URL 参数
  parseUrlParams(url) {
    try {
      const urlObj = new URL(url)
      const params = {}
      
      urlObj.searchParams.forEach((value, key) => {
        params[key] = this.parseValue(value)
      })
      
      return params
    } catch (error) {
      console.error('URL 解析失败:', error)
      return {}
    }
  },

  // 解析查询字符串
  parseQueryString(queryString) {
    const params = {}
    
    if (!queryString) return params
    
    // 移除开头的 '?' 或 '#'
    const cleanQuery = queryString.replace(/^[?#]/, '')
    
    if (!cleanQuery) return params
    
    cleanQuery.split('&').forEach(pair => {
      const [key, value] = pair.split('=').map(decodeURIComponent)
      if (key) {
        params[key] = this.parseValue(value || '')
      }
    })
    
    return params
  },

  // 解析 hash 参数
  parseHashParams(hash) {
    if (!hash || hash === '#') return {}
    
    // 检查是否是查询字符串格式的 hash
    if (hash.includes('=')) {
      return this.parseQueryString(hash)
    }
    
    // 简单的 hash 值
    return {
      hash: hash.replace('#', '')
    }
  },

  // 解析值（尝试转换为适当的类型）
  parseValue(value) {
    if (value === '') return ''
    if (value === 'true') return true
    if (value === 'false') return false
    if (value === 'null') return null
    if (value === 'undefined') return undefined
    
    // 尝试解析为数字
    const numValue = Number(value)
    if (!isNaN(numValue) && isFinite(numValue)) {
      return numValue
    }
    
    // 尝试解析为 JSON
    if ((value.startsWith('{') && value.endsWith('}')) || 
        (value.startsWith('[') && value.endsWith(']'))) {
      try {
        return JSON.parse(value)
      } catch {
        // 如果解析失败，返回原始字符串
      }
    }
    
    return value
  },

  // 构建查询字符串
  buildQueryString(params) {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (typeof value === 'object') {
          searchParams.set(key, JSON.stringify(value))
        } else {
          searchParams.set(key, String(value))
        }
      }
    })
    
    return searchParams.toString()
  },

  // 获取当前深度链接信息
  getCurrentDeepLinkInfo() {
    const urlData = this.parseCurrentUrl()
    const state = this.restoreFromUrl()
    
    return {
      url: urlData.fullUrl,
      params: urlData.params,
      state: state.state,
      isDeepLink: Object.keys(urlData.params).length > 0,
      paramCount: Object.keys(urlData.params).length,
      generatedAt: new Date().toISOString()
    }
  }
}