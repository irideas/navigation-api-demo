// 历史管理工具函数
export const historyManagementUtils = {
  // 加载历史条目
  loadHistoryEntries() {
    const entries = []
    
    if (window.navigation && window.navigation.entries) {
      // 使用 Navigation API 获取历史条目
      window.navigation.entries().forEach((entry, index) => {
        entries.push({
          id: entry.id || `entry-${index}`,
          url: entry.url,
          key: entry.key,
          state: entry.getState ? entry.getState() : null,
          index: index,
          sameDocument: entry.sameDocument,
          timestamp: Date.now() - (entries.length - index) * 1000
        })
      })
    } else {
      // 回退到模拟历史条目
      const currentUrl = window.location.href
      entries.push({
        id: 'current',
        url: currentUrl,
        key: 'current-key',
        state: window.history.state,
        index: 0,
        sameDocument: true,
        timestamp: Date.now()
      })
    }
    
    return entries
  },

  // 添加历史条目
  async addHistoryEntry(url, state = null, title = '') {
    try {
      if (window.navigation) {
        // 使用 Navigation API
        const result = await window.navigation.navigate(url, {
          state,
          history: 'push'
        })
        
        if (title) {
          document.title = title
        }
        
        return {
          success: true,
          entry: {
            url,
            state,
            title,
            timestamp: Date.now()
          }
        }
      } else {
        // 回退到 History API
        window.history.pushState(state, title, url)
        
        if (title) {
          document.title = title
        }
        
        return {
          success: true,
          entry: {
            url,
            state,
            title,
            timestamp: Date.now()
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // 替换历史条目
  async replaceHistoryEntry(url, state = null, title = '') {
    try {
      if (window.navigation) {
        // 使用 Navigation API
        const result = await window.navigation.navigate(url, {
          state,
          history: 'replace'
        })
        
        if (title) {
          document.title = title
        }
        
        return {
          success: true,
          entry: {
            url,
            state,
            title,
            timestamp: Date.now()
          }
        }
      } else {
        // 回退到 History API
        window.history.replaceState(state, title, url)
        
        if (title) {
          document.title = title
        }
        
        return {
          success: true,
          entry: {
            url,
            state,
            title,
            timestamp: Date.now()
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // 导航到指定条目
  async navigateToEntry(entry) {
    try {
      if (window.navigation && entry.key) {
        // 使用 Navigation API 的 traverseTo 方法
        if (window.navigation.traverseTo) {
          await window.navigation.traverseTo(entry.key)
        } else {
          // 如果不支持 traverseTo，使用 navigate
          await window.navigation.navigate(entry.url)
        }
      } else {
        // 回退到 History API
        const currentIndex = window.history.length - 1
        const targetIndex = entry.index || 0
        const delta = targetIndex - currentIndex
        
        if (delta !== 0) {
          window.history.go(delta)
        }
      }
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // 清除历史记录
  clearHistory() {
    try {
      // 注意：无法真正清除浏览器历史记录
      // 这里只是模拟清除操作
      const currentUrl = window.location.href
      const currentState = window.history.state
      
      if (window.navigation) {
        // 使用 Navigation API 替换当前条目
        window.navigation.navigate(currentUrl, {
          state: null,
          history: 'replace'
        })
      } else {
        // 使用 History API 替换当前条目
        window.history.replaceState(null, '', currentUrl)
      }
      
      return {
        success: true,
        message: '已清除当前页面状态（注意：无法清除浏览器历史记录）'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // 导出历史记录
  exportHistory() {
    try {
      const entries = this.loadHistoryEntries()
      const exportData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        currentUrl: window.location.href,
        entries: entries.map(entry => ({
          url: entry.url,
          state: entry.state,
          timestamp: entry.timestamp,
          index: entry.index
        }))
      }
      
      const dataStr = JSON.stringify(exportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `navigation-history-${Date.now()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      return {
        success: true,
        message: '历史记录已导出'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // 移除指定条目（模拟）
  removeEntry(entryId) {
    try {
      // 注意：无法真正从浏览器历史记录中移除条目
      // 这里只是模拟移除操作
      return {
        success: true,
        message: `已标记移除条目 ${entryId}（注意：无法真正从浏览器历史记录中移除）`
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}