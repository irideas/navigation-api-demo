export const eventTestUtils = {
  testNavigateEvent() {
    try {
      if ('navigation' in window && navigation.navigate) {
        const testUrl = `${location.pathname}?navigate_test=${Date.now()}`
        navigation.navigate(testUrl, {
          state: { test: 'navigate_event', timestamp: Date.now() }
        })
        return {
          success: true,
          message: `Navigation API 导航测试成功\n目标URL: ${testUrl}\n状态: 已触发 navigate 事件`
        }
      } else {
        return {
          success: false,
          message: 'Navigation API 不可用\n无法测试 navigate 事件'
        }
      }
    } catch (error) {
      return {
        success: false,
        message: `Navigation API 测试失败: ${error.message}`
      }
    }
  },

  testInterceptNavigation() {
    try {
      if ('navigation' in window) {
        // 设置一个临时的导航拦截器
        const interceptor = (event) => {
          event.intercept({
            handler: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  console.log('导航拦截处理完成')
                  resolve()
                }, 1000)
              })
            }
          })
        }
        
        navigation.addEventListener('navigate', interceptor)
        
        // 触发导航
        const testUrl = `${location.pathname}?intercept_test=${Date.now()}`
        navigation.navigate(testUrl)
        
        // 清理监听器
        setTimeout(() => {
          navigation.removeEventListener('navigate', interceptor)
        }, 2000)
        
        return {
          success: true,
          message: `导航拦截测试成功\n已设置拦截器，导航将被延迟1秒处理\n目标URL: ${testUrl}`
        }
      } else {
        return {
          success: false,
          message: 'Navigation API 不可用\n无法测试导航拦截功能'
        }
      }
    } catch (error) {
      return {
        success: false,
        message: `导航拦截测试失败: ${error.message}`
      }
    }
  },

  testCancelNavigation() {
    try {
      if ('navigation' in window) {
        // 设置一个取消导航的拦截器
        const cancelInterceptor = (event) => {
          event.preventDefault()
          console.log('导航已被取消')
        }
        
        navigation.addEventListener('navigate', cancelInterceptor)
        
        // 尝试触发导航
        const testUrl = `${location.pathname}?cancel_test=${Date.now()}`
        navigation.navigate(testUrl)
        
        // 清理监听器
        setTimeout(() => {
          navigation.removeEventListener('navigate', cancelInterceptor)
        }, 1000)
        
        return {
          success: true,
          message: `导航取消测试成功\n导航已被拦截器取消\n原目标URL: ${testUrl}`
        }
      } else {
        return {
          success: false,
          message: 'Navigation API 不可用\n无法测试导航取消功能'
        }
      }
    } catch (error) {
      return {
        success: false,
        message: `导航取消测试失败: ${error.message}`
      }
    }
  },

  testPopstateEvent() {
    try {
      // 添加一个临时的 popstate 监听器
      const popstateHandler = (event) => {
        console.log('Popstate event triggered:', event.state)
      }
      
      window.addEventListener('popstate', popstateHandler)
      
      // 推送一个新状态
      const testState = { test: 'popstate', timestamp: Date.now() }
      const testUrl = `${location.pathname}?popstate_test=${Date.now()}`
      history.pushState(testState, '', testUrl)
      
      // 触发 popstate（通过后退）
      setTimeout(() => {
        history.back()
        setTimeout(() => {
          window.removeEventListener('popstate', popstateHandler)
        }, 500)
      }, 100)
      
      return {
        success: true,
        message: `Popstate 事件测试成功\n已推送新状态并触发后退\n测试状态: ${JSON.stringify(testState)}`
      }
    } catch (error) {
      return {
        success: false,
        message: `Popstate 事件测试失败: ${error.message}`
      }
    }
  },

  testHistoryChange() {
    try {
      const originalUrl = location.href
      const testUrl = `${location.pathname}?history_change=${Date.now()}`
      const testState = { test: 'history_change', timestamp: Date.now() }
      
      // 使用 pushState 改变历史
      history.pushState(testState, '', testUrl)
      
      return {
        success: true,
        message: `历史变化测试成功\n原URL: ${originalUrl}\n新URL: ${testUrl}\n状态: ${JSON.stringify(testState)}`
      }
    } catch (error) {
      return {
        success: false,
        message: `历史变化测试失败: ${error.message}`
      }
    }
  },

  testBeforeUnload() {
    try {
      // 添加一个临时的 beforeunload 监听器
      const beforeUnloadHandler = (event) => {
        const message = '确定要离开此页面吗？'
        event.returnValue = message
        return message
      }
      
      window.addEventListener('beforeunload', beforeUnloadHandler)
      
      // 5秒后移除监听器
      setTimeout(() => {
        window.removeEventListener('beforeunload', beforeUnloadHandler)
      }, 5000)
      
      return {
        success: true,
        message: `BeforeUnload 事件测试成功\n已设置页面离开确认\n监听器将在5秒后自动移除\n尝试刷新页面或关闭标签页来测试`
      }
    } catch (error) {
      return {
        success: false,
        message: `BeforeUnload 事件测试失败: ${error.message}`
      }
    }
  }
}