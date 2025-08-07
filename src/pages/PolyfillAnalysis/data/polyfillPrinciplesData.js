export const polyfillPrinciplesData = [
  {
    id: 'event-interception',
    title: '事件拦截机制',
    description: '通过重写 History API 方法和监听 DOM 事件来拦截导航行为',
    code: `// 拦截 History API 方法
const originalPushState = history.pushState;
history.pushState = function(state, title, url) {
  // 触发自定义 navigate 事件
  const event = new NavigateEvent('navigate', {
    canIntercept: true,
    navigationType: 'push'
  });
  navigation.dispatchEvent(event);
  
  if (!event.defaultPrevented) {
    return originalPushState.call(this, state, title, url);
  }
};`
  },
  {
    id: 'state-tracking',
    title: '状态跟踪系统',
    description: '维护一个内部状态管理器来跟踪导航历史和当前状态',
    code: `class NavigationPolyfill {
  constructor() {
    this._entries = [];
    this._currentIndex = -1;
    this._initialize();
  }
  
  _addEntry(url, state) {
    const entry = new NavigationEntry(url, state);
    this._entries.push(entry);
    this._currentIndex = this._entries.length - 1;
    return entry;
  }
}`
  },
  {
    id: 'event-simulation',
    title: '事件模拟',
    description: '创建符合 Navigation API 规范的事件对象和事件流',
    code: `class NavigateEvent extends Event {
  constructor(type, eventInitDict = {}) {
    super(type, eventInitDict);
    this.canIntercept = eventInitDict.canIntercept || false;
    this.destination = eventInitDict.destination || null;
    this.navigationType = eventInitDict.navigationType || 'push';
  }
  
  intercept(options = {}) {
    if (!this.canIntercept) {
      throw new DOMException('Cannot intercept');
    }
    // 处理拦截逻辑
  }
}`
  },
  {
    id: 'dom-monitoring',
    title: 'DOM 监听策略',
    description: '监听页面上的链接点击和表单提交来捕获导航意图',
    code: `// 监听链接点击
document.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link && link.href) {
    const navigateEvent = new NavigateEvent('navigate', {
      canIntercept: true,
      destination: { url: link.href }
    });
    
    navigation.dispatchEvent(navigateEvent);
    
    if (navigateEvent.defaultPrevented) {
      event.preventDefault();
    }
  }
});`
  }
]