// 表单导航拦截工具函数
export const formInterceptionUtils = {
  // 启用导航阻止
  enableNavigationBlocking() {
    if (window.navigation) {
      // 使用 Navigation API
      window.navigation.addEventListener('navigate', this.handleNavigateEvent)
    }
    
    // 同时监听 beforeunload 事件作为后备
    window.addEventListener('beforeunload', this.handleBeforeUnload)
    
    return {
      success: true,
      method: window.navigation ? 'Navigation API' : 'beforeunload'
    }
  },

  // 禁用导航阻止
  disableNavigationBlocking() {
    if (window.navigation) {
      window.navigation.removeEventListener('navigate', this.handleNavigateEvent)
    }
    
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
    
    return {
      success: true,
      message: '导航阻止已禁用'
    }
  },

  // 添加缺失的方法别名
  setupNavigationInterception() {
    return this.enableNavigationBlocking()
  },

  cleanupNavigationInterception() {
    return this.disableNavigationBlocking()
  },

  enableBlocking(checkFunction) {
    // 存储检查函数
    this._checkFunction = checkFunction
    return this.enableNavigationBlocking()
  },

  disableBlocking() {
    this._checkFunction = null
    return this.disableNavigationBlocking()
  },

  // 处理 navigate 事件
  handleNavigateEvent(event) {
    // 检查是否有未保存的表单数据
    let hasUnsavedData = false
    
    if (formInterceptionUtils._checkFunction) {
      hasUnsavedData = formInterceptionUtils._checkFunction()
    } else {
      hasUnsavedData = formInterceptionUtils.checkUnsavedData()
    }
    
    if (hasUnsavedData) {
      // 阻止导航
      event.preventDefault()
      
      // 显示确认对话框
      const shouldContinue = confirm('您有未保存的更改，确定要离开吗？')
      
      if (shouldContinue) {
        // 用户确认离开，清除未保存标记并重新导航
        formInterceptionUtils.clearUnsavedData()
        
        // 重新触发导航（不会被拦截）
        if (event.destination?.url) {
          window.location.href = event.destination.url
        }
      }
    }
  },

  // 处理 beforeunload 事件
  handleBeforeUnload(event) {
    let hasUnsavedData = false
    
    if (formInterceptionUtils._checkFunction) {
      hasUnsavedData = formInterceptionUtils._checkFunction()
    } else {
      hasUnsavedData = formInterceptionUtils.checkUnsavedData()
    }
    
    if (hasUnsavedData) {
      // 标准的 beforeunload 处理
      const message = '您有未保存的更改，确定要离开吗？'
      event.returnValue = message
      return message
    }
  },

  // 检查是否有未保存的数据
  checkUnsavedData() {
    // 检查 sessionStorage 中的未保存标记
    return sessionStorage.getItem('hasUnsavedFormData') === 'true'
  },

  // 标记有未保存的数据
  markUnsavedData() {
    sessionStorage.setItem('hasUnsavedFormData', 'true')
  },

  // 清除未保存数据标记
  clearUnsavedData() {
    sessionStorage.removeItem('hasUnsavedFormData')
  },

  // 设置表单监听
  setupFormListeners(formElement) {
    if (!formElement) return
    
    const inputs = formElement.querySelectorAll('input, textarea, select')
    
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this.markUnsavedData()
      })
      
      input.addEventListener('change', () => {
        this.markUnsavedData()
      })
    })
    
    // 表单提交时清除未保存标记
    formElement.addEventListener('submit', () => {
      this.clearUnsavedData()
    })
    
    return {
      success: true,
      listenersCount: inputs.length
    }
  },

  // 移除表单监听
  removeFormListeners(formElement) {
    if (!formElement) return
    
    const inputs = formElement.querySelectorAll('input, textarea, select')
    
    inputs.forEach(input => {
      // 移除所有相关监听器
      input.removeEventListener('input', this.markUnsavedData)
      input.removeEventListener('change', this.markUnsavedData)
    })
    
    formElement.removeEventListener('submit', this.clearUnsavedData)
    
    return {
      success: true,
      message: '表单监听器已移除'
    }
  },

  // 获取表单状态
  getFormStatus() {
    return {
      hasUnsavedData: this.checkUnsavedData(),
      navigationBlocked: window.navigation ? 
        'Navigation API 可用' : 
        '使用 beforeunload 后备方案',
      timestamp: new Date().toISOString()
    }
  }
}