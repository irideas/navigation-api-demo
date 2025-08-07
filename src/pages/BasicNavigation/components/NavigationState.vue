<template>
  <div class="navigation-state">
    <h3>导航状态管理</h3>
    <div class="state-container">
      <div class="state-controls">
        <div class="input-group">
          <label>状态数据 (JSON):</label>
          <textarea v-model="stateInput" placeholder='{"key": "value"}' rows="3"></textarea>
        </div>
        <div class="button-group">
          <button @click="updateState" class="btn btn-primary">更新状态</button>
          <button @click="clearState" class="btn btn-secondary">清除状态</button>
          <button @click="refreshState" class="btn btn-outline">刷新状态</button>
        </div>
      </div>
      
      <div class="current-state">
        <h4>当前导航状态</h4>
        <div class="state-display">
          <div v-if="currentState" class="state-content">
            <pre>{{ JSON.stringify(currentState, null, 2) }}</pre>
          </div>
          <div v-else class="no-state">
            <p>当前没有状态数据</p>
          </div>
        </div>
      </div>
      
      <div class="navigation-info">
        <h4>导航信息</h4>
        <div class="info-grid">
          <div class="info-item">
            <label>当前 URL:</label>
            <span>{{ currentUrl }}</span>
          </div>
          <div class="info-item">
            <label>历史长度:</label>
            <span>{{ historyLength }}</span>
          </div>
          <div v-if="navigationSupported" class="info-item">
            <label>可以后退:</label>
            <span>{{ canGoBack ? '是' : '否' }}</span>
          </div>
          <div v-if="navigationSupported" class="info-item">
            <label>可以前进:</label>
            <span>{{ canGoForward ? '是' : '否' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationState',
  data() {
    return {
      stateInput: '{"timestamp": "' + new Date().toISOString() + '", "page": "navigation-state"}',
      currentState: null,
      currentUrl: '',
      historyLength: 0,
      canGoBack: false,
      canGoForward: false,
      navigationSupported: false
    }
  },
  mounted() {
    this.navigationSupported = 'navigation' in window
    this.refreshState()
    
    // 监听状态变化
    window.addEventListener('popstate', this.refreshState)
    
    if (this.navigationSupported) {
      navigation.addEventListener('navigate', this.refreshState)
    }
  },
  beforeUnmount() {
    window.removeEventListener('popstate', this.refreshState)
    
    if (this.navigationSupported) {
      navigation.removeEventListener('navigate', this.refreshState)
    }
  },
  methods: {
    updateState() {
      try {
        const state = JSON.parse(this.stateInput)
        
        if (this.navigationSupported && navigation.updateCurrentEntry) {
          navigation.updateCurrentEntry({ state })
        } else {
          history.replaceState(state, '', window.location.href)
        }
        
        this.refreshState()
      } catch (error) {
        alert('状态数据格式错误，请输入有效的 JSON')
      }
    },
    
    clearState() {
      if (this.navigationSupported && navigation.updateCurrentEntry) {
        navigation.updateCurrentEntry({ state: null })
      } else {
        history.replaceState(null, '', window.location.href)
      }
      
      this.refreshState()
    },
    
    refreshState() {
      this.currentUrl = window.location.href
      this.historyLength = history.length
      
      if (this.navigationSupported && navigation.currentEntry) {
        this.currentState = navigation.currentEntry.getState()
        this.canGoBack = navigation.canGoBack || false
        this.canGoForward = navigation.canGoForward || false
      } else {
        this.currentState = history.state
        this.canGoBack = this.historyLength > 1
        this.canGoForward = false // History API 无法准确判断
      }
    }
  }
}
</script>

<style scoped>
.navigation-state {
  margin: 2rem 0;
}

.navigation-state h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.state-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.state-controls {
  margin-bottom: 2rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.input-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: monospace;
  resize: vertical;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.current-state h4,
.navigation-info h4 {
  color: #333;
  margin-bottom: 1rem;
}

.state-display {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  margin-bottom: 2rem;
}

.state-content pre {
  margin: 0;
  font-family: monospace;
  font-size: 0.9em;
  color: #333;
  overflow-x: auto;
}

.no-state {
  color: #666;
  font-style: italic;
  text-align: center;
}

.info-grid {
  display: grid;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.info-item label {
  font-weight: 500;
  color: #333;
}

.info-item span {
  color: #666;
  font-family: monospace;
  font-size: 0.9em;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-outline {
  background: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.btn-outline:hover {
  background: #007bff;
  color: white;
}
</style>