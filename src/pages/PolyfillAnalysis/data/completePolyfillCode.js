export const completePolyfillCode = `// Navigation API Polyfill 完整实现
(function() {
  'use strict';
  
  // 检查是否已有原生支持
  if ('navigation' in window) {
    return;
  }
  
  // NavigationEntry 类
  class NavigationEntry {
    constructor(url, state, key, id, index) {
      this.url = url;
      this.state = state;
      this.key = key || generateKey();
      this.id = id || generateId();
      this.index = index;
    }
    
    getState() {
      return this.state;
    }
  }
  
  // NavigateEvent 类
  class NavigateEvent extends Event {
    constructor(type, eventInitDict = {}) {
      super(type, eventInitDict);
      this.canIntercept = eventInitDict.canIntercept || false;
      this.destination = eventInitDict.destination || null;
      this.downloadRequest = eventInitDict.downloadRequest || null;
      this.formData = eventInitDict.formData || null;
      this.hashChange = eventInitDict.hashChange || false;
      this.info = eventInitDict.info || undefined;
      this.navigationType = eventInitDict.navigationType || 'push';
      this.signal = eventInitDict.signal || null;
      this.userInitiated = eventInitDict.userInitiated || false;
      
      this._interceptHandlers = [];
    }
    
    intercept(options = {}) {
      if (!this.canIntercept) {
        throw new DOMException('Cannot intercept this navigation', 'InvalidStateError');
      }
      
      const handler = options.handler;
      if (typeof handler === 'function') {
        this._interceptHandlers.push(handler);
      }
    }
    
    async _executeInterceptHandlers() {
      for (const handler of this._interceptHandlers) {
        try {
          await handler();
        } catch (error) {
          console.error('Navigation intercept handler failed:', error);
        }
      }
    }
  }
  
  // NavigationPolyfill 主类
  class NavigationPolyfill extends EventTarget {
    constructor() {
      super();
      this._entries = [];
      this._currentIndex = -1;
      this._interceptors = [];
      
      this._initialize();
    }
    
    _initialize() {
      // 创建初始条目
      this._addEntry(location.href, history.state);
      
      // 设置事件监听
      this._setupEventListeners();
    }
    
    _setupEventListeners() {
      // 监听 popstate
      window.addEventListener('popstate', (event) => {
        this._handlePopState(event);
      });
      
      // 拦截 History API 方法
      this._interceptHistoryMethods();
      
      // 监听链接点击
      document.addEventListener('click', (event) => {
        this._handleLinkClick(event);
      });
      
      // 监听表单提交
      document.addEventListener('submit', (event) => {
        this._handleFormSubmit(event);
      });
    }
    
    _interceptHistoryMethods() {
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;
      
      history.pushState = (state, title, url) => {
        this._handleHistoryChange('push', state, url);
        return originalPushState.call(history, state, title, url);
      };
      
      history.replaceState = (state, title, url) => {
        this._handleHistoryChange('replace', state, url);
        return originalReplaceState.call(history, state, title, url);
      };
    }
    
    async _handleHistoryChange(type, state, url) {
      const event = new NavigateEvent('navigate', {
        canIntercept: true,
        navigationType: type,
        destination: { url: url || location.href }
      });
      
      this.dispatchEvent(event);
      
      if (!event.defaultPrevented) {
        await event._executeInterceptHandlers();
        
        if (type === 'push') {
          this._addEntry(url || location.href, state);
        } else {
          this._updateCurrentEntry(url || location.href, state);
        }
      }
    }
    
    _addEntry(url, state) {
      // 如果不在历史末尾，截断后续历史
      if (this._currentIndex < this._entries.length - 1) {
        this._entries = this._entries.slice(0, this._currentIndex + 1);
      }
      
      const entry = new NavigationEntry(
        url, 
        state, 
        null, 
        null, 
        this._entries.length
      );
      
      this._entries.push(entry);
      this._currentIndex = this._entries.length - 1;
      
      return entry;
    }
    
    _updateCurrentEntry(url, state) {
      if (this._currentIndex >= 0 && this._currentIndex < this._entries.length) {
        const current = this._entries[this._currentIndex];
        current.url = url;
        current.state = state;
      }
    }
    
    // Public API
    get currentEntry() {
      return this._entries[this._currentIndex] || null;
    }
    
    entries() {
      return [...this._entries];
    }
    
    async navigate(url, options = {}) {
      const event = new NavigateEvent('navigate', {
        canIntercept: true,
        navigationType: options.replace ? 'replace' : 'push',
        destination: { url: url },
        info: options.info
      });
      
      this.dispatchEvent(event);
      
      if (!event.defaultPrevented) {
        await event._executeInterceptHandlers();
        
        if (options.replace) {
          history.replaceState(options.state, '', url);
        } else {
          history.pushState(options.state, '', url);
        }
        
        return { committed: Promise.resolve(), finished: Promise.resolve() };
      }
      
      return { committed: Promise.reject(), finished: Promise.reject() };
    }
    
    reload(options = {}) {
      location.reload();
    }
    
    traverseTo(key) {
      const targetIndex = this._entries.findIndex(entry => entry.key === key);
      if (targetIndex !== -1) {
        const delta = targetIndex - this._currentIndex;
        history.go(delta);
      }
    }
    
    back() {
      history.back();
    }
    
    forward() {
      history.forward();
    }
    
    updateCurrentEntry(options = {}) {
      if (this.currentEntry && options.state !== undefined) {
        history.replaceState(options.state, '', location.href);
        this.currentEntry.state = options.state;
      }
    }
  }
  
  // 工具函数
  function generateKey() {
    return Math.random().toString(36).substr(2, 9);
  }
  
  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
  
  // 创建全局 navigation 对象
  window.navigation = new NavigationPolyfill();
  window.NavigateEvent = NavigateEvent;
  window.NavigationEntry = NavigationEntry;
  
})();`