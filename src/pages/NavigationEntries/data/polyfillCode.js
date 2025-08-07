export const polyfillCode = {
  entriesPolyfill: `// Navigation API 条目管理 Polyfill
class NavigationEntriesPolyfill {
  constructor() {
    this.entries = [];
    this.currentIndex = -1;
    this.init();
  }
  
  init() {
    // 监听 popstate 事件来跟踪导航变化
    window.addEventListener('popstate', (event) => {
      this.updateCurrentEntry(event.state);
    });
    
    // 初始化当前条目
    this.addEntry(location.href, history.state);
  }
  
  addEntry(url, state = null) {
    const entry = {
      id: this.generateId(),
      key: this.generateKey(),
      index: this.entries.length,
      url: url,
      state: state,
      timestamp: Date.now()
    };
    
    this.entries.push(entry);
    this.currentIndex = this.entries.length - 1;
    return entry;
  }
  
  getCurrentEntry() {
    return this.entries[this.currentIndex] || null;
  }
  
  getEntries() {
    return [...this.entries];
  }
  
  navigateToEntry(targetEntry) {
    const targetIndex = this.entries.findIndex(e => e.id === targetEntry.id);
    if (targetIndex !== -1) {
      const delta = targetIndex - this.currentIndex;
      history.go(delta);
    }
  }
  
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
  
  generateKey() {
    return Math.random().toString(36).substr(2, 6);
  }
  
  updateCurrentEntry(state) {
    if (this.entries[this.currentIndex]) {
      this.entries[this.currentIndex].state = state;
    }
  }
}

// 使用示例
const entriesPolyfill = new NavigationEntriesPolyfill();

// 模拟 navigation.entries()
window.navigation = window.navigation || {};
window.navigation.entries = () => entriesPolyfill.getEntries();
window.navigation.currentEntry = entriesPolyfill.getCurrentEntry();`
}