export const entriesUtils = {
  // 获取 Navigation API 条目
  getNavigationEntries() {
    try {
      if ('navigation' in window && navigation.entries) {
        const entries = navigation.entries()
        const currentEntry = navigation.currentEntry
        return {
          entries: entries.map((entry, index) => ({
            id: entry.id,
            key: entry.key,
            index: index,
            url: entry.url,
            state: entry.getState ? entry.getState() : null
          })),
          currentId: currentEntry ? currentEntry.id : null
        }
      }
    } catch (error) {
      console.warn('Navigation API entries not available:', error)
    }
    
    return {
      entries: [],
      currentId: null
    }
  },

  // 获取 History API 信息
  getHistoryInfo() {
    return {
      length: history.length,
      state: history.state,
      url: location.href
    }
  },

  // 添加 Navigation API 条目
  addNavigationEntry() {
    try {
      const newUrl = `${location.pathname}?nav_test=${Date.now()}`
      
      if ('navigation' in window && navigation.navigate) {
        navigation.navigate(newUrl, {
          state: { timestamp: Date.now(), type: 'navigation_test' }
        })
      } else {
        // 回退到 History API
        history.pushState(
          { timestamp: Date.now(), type: 'navigation_test' },
          '',
          newUrl
        )
      }
    } catch (error) {
      console.error('Failed to add navigation entry:', error)
    }
  },

  // 添加 History API 条目
  addHistoryEntry() {
    try {
      const newUrl = `${location.pathname}?history_test=${Date.now()}`
      history.pushState(
        { timestamp: Date.now(), type: 'history_test' },
        '',
        newUrl
      )
    } catch (error) {
      console.error('Failed to add history entry:', error)
    }
  },

  // 跳转到指定条目
  navigateToEntry(entry) {
    try {
      if ('navigation' in window && navigation.traverseTo) {
        navigation.traverseTo(entry.key)
        return { success: true, message: `正在跳转到条目: ${entry.url}` }
      } else {
        return { success: false, message: 'Navigation API 不支持 traverseTo 方法' }
      }
    } catch (error) {
      return { success: false, message: `跳转失败: ${error.message}` }
    }
  },

  // 测试遍历功能
  testTraversal() {
    try {
      if ('navigation' in window && navigation.entries) {
        const entries = navigation.entries()
        return {
          success: true,
          message: `遍历测试完成，共找到 ${entries.length} 个条目`
        }
      } else {
        // 使用 History API 的替代方案
        return {
          success: true,
          message: `History API 遍历测试：当前历史长度 ${history.length}`
        }
      }
    } catch (error) {
      return {
        success: false,
        message: `遍历测试失败: ${error.message}`
      }
    }
  },

  // 测试获取当前条目
  testCurrentEntry() {
    try {
      if ('navigation' in window && navigation.currentEntry) {
        const current = navigation.currentEntry
        return {
          success: true,
          message: `当前条目: ${current.url} (索引: ${current.index})`
        }
      } else {
        return {
          success: true,
          message: `当前 URL: ${location.href} (History 长度: ${history.length})`
        }
      }
    } catch (error) {
      return {
        success: false,
        message: `获取当前条目失败: ${error.message}`
      }
    }
  },

  // 测试更新条目状态
  testEntryUpdate() {
    try {
      if ('navigation' in window && navigation.updateCurrentEntry) {
        navigation.updateCurrentEntry({ 
          state: { updated: Date.now(), test: true }
        })
        return {
          success: true,
          message: '已更新当前条目状态'
        }
      } else {
        history.replaceState(
          { updated: Date.now(), test: true },
          '',
          location.href
        )
        return {
          success: true,
          message: '已使用 History API 更新当前状态'
        }
      }
    } catch (error) {
      return {
        success: false,
        message: `更新条目状态失败: ${error.message}`
      }
    }
  }
}