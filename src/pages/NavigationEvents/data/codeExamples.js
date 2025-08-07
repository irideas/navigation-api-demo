export const codeExamples = {
  navigationEvents: `// Navigation API 事件处理
// 监听 navigate 事件
navigation.addEventListener('navigate', (event) => {
  console.log('导航事件:', event.destination.url);
  
  // 可以拦截导航
  if (shouldInterceptNavigation(event)) {
    event.intercept({
      handler: () => handleNavigation(event)
    });
  }
  
  // 可以取消导航
  if (shouldCancelNavigation(event)) {
    event.preventDefault();
  }
});

// 监听导航完成事件
navigation.addEventListener('navigatesuccess', (event) => {
  console.log('导航成功:', event.destination.url);
});

// 监听导航错误事件
navigation.addEventListener('navigateerror', (event) => {
  console.log('导航失败:', event.error);
});`,

  historyEvents: `// History API 事件处理
// 只能监听 popstate 事件
window.addEventListener('popstate', (event) => {
  console.log('历史状态变化:', event.state);
  console.log('当前URL:', location.href);
});

// 监听页面离开事件
window.addEventListener('beforeunload', (event) => {
  if (hasUnsavedChanges()) {
    event.preventDefault();
    event.returnValue = '确定要离开吗？';
    return '确定要离开吗？';
  }
});

// 无法直接监听 pushState/replaceState
// 需要手动拦截这些方法
const originalPushState = history.pushState;
history.pushState = function(state, title, url) {
  console.log('pushState 调用:', url);
  return originalPushState.apply(this, arguments);
};`,

  eventsPolyfill: `// Navigation API 事件系统 Polyfill
class NavigationEventEmulator {
  constructor() {
    this.listeners = new Map();
    this.setupEventListeners();
  }
  
  addEventListener(type, listener) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(listener);
  }
  
  removeEventListener(type, listener) {
    if (this.listeners.has(type)) {
      const listeners = this.listeners.get(type);
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }
  
  dispatchEvent(type, eventData) {
    if (this.listeners.has(type)) {
      this.listeners.get(type).forEach(listener => {
        listener(eventData);
      });
    }
  }
  
  setupEventListeners() {
    // 监听 popstate（浏览器前进后退）
    window.addEventListener('popstate', (event) => {
      this.emitNavigateEvent('traverse', event.state);
    });
    
    // 拦截 pushState 和 replaceState
    this.interceptHistoryMethods();
    
    // 监听页面加载
    window.addEventListener('load', () => {
      this.emitNavigateEvent('reload', null);
    });
  }
  
  interceptHistoryMethods() {
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = (state, title, url) => {
      this.emitNavigateEvent('push', state, url);
      return originalPushState.call(history, state, title, url);
    };
    
    history.replaceState = (state, title, url) => {
      this.emitNavigateEvent('replace', state, url);
      return originalReplaceState.call(history, state, title, url);
    };
  }
  
  emitNavigateEvent(type, state, url = location.href) {
    const event = {
      destination: { url },
      state,
      type,
      preventDefault: function() { this.defaultPrevented = true; },
      intercept: function(options) {
        if (options.handler) {
          Promise.resolve(options.handler());
        }
      }
    };
    
    this.dispatchEvent('navigate', event);
    
    if (!event.defaultPrevented) {
      setTimeout(() => {
        this.dispatchEvent('navigatesuccess', event);
      }, 0);
    }
  }
}

// 使用示例
const navigationEmulator = new NavigationEventEmulator();
navigationEmulator.addEventListener('navigate', (event) => {
  console.log('模拟导航事件:', event.destination.url);
});`
}