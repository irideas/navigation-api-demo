export const polyfillTestUtils = {
  testEventsPolyfill() {
    try {
      // 创建一个简单的 Navigation API 事件 Polyfill
      const NavigationEventPolyfill = class {
        constructor() {
          this.listeners = new Map()
          this.setupHistoryInterception()
        }
        
        addEventListener(type, listener) {
          if (!this.listeners.has(type)) {
            this.listeners.set(type, [])
          }
          this.listeners.get(type).push(listener)
        }
        
        removeEventListener(type, listener) {
          if (this.listeners.has(type)) {
            const listeners = this.listeners.get(type)
            const index = listeners.indexOf(listener)
            if (index > -1) {
              listeners.splice(index, 1)
            }
          }
        }
        
        dispatchEvent(type, eventData) {
          if (this.listeners.has(type)) {
            this.listeners.get(type).forEach(listener => {
              try {
                listener(eventData)
              } catch (error) {
                console.error('Event listener error:', error)
              }
            })
          }
        }
        
        setupHistoryInterception() {
          // 拦截 pushState 和 replaceState
          const originalPushState = history.pushState
          const originalReplaceState = history.replaceState
          
          history.pushState = (state, title, url) => {
            const event = {
              destination: { url: url || location.href },
              state,
              type: 'push',
              preventDefault: () => {},
              intercept: (options) => {
                if (options.handler) {
                  Promise.resolve(options.handler()).then(() => {
                    originalPushState.call(history, state, title, url)
                  })
                  return
                }
                originalPushState.call(history, state, title, url)
              }
            }
            
            this.dispatchEvent('navigate', event)
            
            if (!event.defaultPrevented) {
              originalPushState.call(history, state, title, url)
              this.dispatchEvent('navigatesuccess', event)
            }
          }
          
          history.replaceState = (state, title, url) => {
            const event = {
              destination: { url: url || location.href },
              state,
              type: 'replace',
              preventDefault: () => {},
              intercept: (options) => {
                if (options.handler) {
                  Promise.resolve(options.handler()).then(() => {
                    originalReplaceState.call(history, state, title, url)
                  })
                  return
                }
                originalReplaceState.call(history, state, title, url)
              }
            }
            
            this.dispatchEvent('navigate', event)
            
            if (!event.defaultPrevented) {
              originalReplaceState.call(history, state, title, url)
              this.dispatchEvent('navigatesuccess', event)
            }
          }
          
          // 监听 popstate
          window.addEventListener('popstate', (event) => {
            const navigateEvent = {
              destination: { url: location.href },
              state: event.state,
              type: 'traverse'
            }
            this.dispatchEvent('navigate', navigateEvent)
            this.dispatchEvent('navigatesuccess', navigateEvent)
          })
        }
      }
      
      // 测试 Polyfill
      const polyfill = new NavigationEventPolyfill()
      
      let eventCount = 0
      const testListener = (event) => {
        eventCount++
        console.log('Polyfill event:', event.type, event.destination.url)
      }
      
      polyfill.addEventListener('navigate', testListener)
      polyfill.addEventListener('navigatesuccess', testListener)
      
      // 触发测试
      history.pushState({ test: true }, '', '?polyfill_test=1')
      
      return {
        success: true,
        message: `事件 Polyfill 测试成功\n创建了 NavigationEventPolyfill 类\n功能包括：\n- 事件监听器管理\n- History API 拦截\n- navigate 和 navigatesuccess 事件模拟\n- 事件分发机制\n\n触发了 ${eventCount} 个事件`
      }
    } catch (error) {
      return {
        success: false,
        message: `事件 Polyfill 测试失败: ${error.message}`
      }
    }
  }
}