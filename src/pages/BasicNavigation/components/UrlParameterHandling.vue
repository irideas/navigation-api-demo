<template>
  <div class="url-parameter-handling">
    <h3>URL 参数处理</h3>
    <div class="parameter-container">
      <div class="parameter-controls">
        <div class="input-group">
          <label>参数名:</label>
          <input v-model="paramName" placeholder="例如: tab" />
        </div>
        <div class="input-group">
          <label>参数值:</label>
          <input v-model="paramValue" placeholder="例如: settings" />
        </div>
        <div class="button-group">
          <button @click="setParameter" class="btn btn-primary">设置参数</button>
          <button @click="removeParameter" class="btn btn-secondary">移除参数</button>
          <button @click="clearAllParameters" class="btn btn-outline">清除所有</button>
        </div>
      </div>
      
      <div class="current-parameters">
        <h4>当前 URL 参数</h4>
        <div class="parameters-display">
          <div v-if="Object.keys(currentParams).length > 0" class="params-list">
            <div v-for="(value, key) in currentParams" :key="key" class="param-item">
              <span class="param-key">{{ key }}</span>
              <span class="param-separator">=</span>
              <span class="param-value">{{ value }}</span>
              <button @click="removeParameter(key)" class="remove-btn">×</button>
            </div>
          </div>
          <div v-else class="no-params">
            <p>当前没有 URL 参数</p>
          </div>
        </div>
      </div>
      
      <div class="url-display">
        <h4>当前完整 URL</h4>
        <div class="url-content">
          <code>{{ currentUrl }}</code>
          <button @click="copyUrl" class="copy-btn">复制</button>
        </div>
      </div>
      
      <div class="api-comparison">
        <h4>API 对比演示</h4>
        <div class="comparison-grid">
          <div class="api-section">
            <h5>Navigation API</h5>
            <div v-if="navigationSupported" class="api-content">
              <p>✅ 支持</p>
              <button @click="navigateWithParams('navigation')" class="btn btn-small">
                使用 Navigation API 导航
              </button>
            </div>
            <div v-else class="api-content">
              <p>❌ 不支持</p>
            </div>
          </div>
          
          <div class="api-section">
            <h5>History API</h5>
            <div class="api-content">
              <p>✅ 支持</p>
              <button @click="navigateWithParams('history')" class="btn btn-small">
                使用 History API 导航
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UrlParameterHandling',
  data() {
    return {
      paramName: 'tab',
      paramValue: 'settings',
      currentParams: {},
      currentUrl: '',
      navigationSupported: false
    }
  },
  mounted() {
    this.navigationSupported = 'navigation' in window
    this.updateCurrentState()
    
    // 监听 URL 变化
    window.addEventListener('popstate', this.updateCurrentState)
    
    if (this.navigationSupported) {
      navigation.addEventListener('navigate', this.updateCurrentState)
    }
  },
  beforeUnmount() {
    window.removeEventListener('popstate', this.updateCurrentState)
    
    if (this.navigationSupported) {
      navigation.removeEventListener('navigate', this.updateCurrentState)
    }
  },
  methods: {
    setParameter() {
      if (!this.paramName.trim()) {
        alert('请输入参数名')
        return
      }
      
      const url = new URL(window.location)
      url.searchParams.set(this.paramName, this.paramValue)
      
      if (this.navigationSupported && navigation.navigate) {
        navigation.navigate(url.toString())
      } else {
        history.pushState(null, '', url.toString())
      }
      
      this.updateCurrentState()
    },
    
    removeParameter(paramName = null) {
      const nameToRemove = paramName || this.paramName
      if (!nameToRemove) return
      
      const url = new URL(window.location)
      url.searchParams.delete(nameToRemove)
      
      if (this.navigationSupported && navigation.navigate) {
        navigation.navigate(url.toString())
      } else {
        history.pushState(null, '', url.toString())
      }
      
      this.updateCurrentState()
    },
    
    clearAllParameters() {
      const url = new URL(window.location)
      url.search = ''
      
      if (this.navigationSupported && navigation.navigate) {
        navigation.navigate(url.toString())
      } else {
        history.pushState(null, '', url.toString())
      }
      
      this.updateCurrentState()
    },
    
    navigateWithParams(apiType) {
      const url = new URL(window.location)
      url.searchParams.set('demo', apiType)
      url.searchParams.set('timestamp', Date.now())
      
      if (apiType === 'navigation' && this.navigationSupported) {
        navigation.navigate(url.toString())
      } else {
        history.pushState(null, '', url.toString())
      }
      
      this.updateCurrentState()
    },
    
    updateCurrentState() {
      this.currentUrl = window.location.href
      
      const urlParams = new URLSearchParams(window.location.search)
      this.currentParams = {}
      
      for (const [key, value] of urlParams.entries()) {
        this.currentParams[key] = value
      }
    },
    
    copyUrl() {
      navigator.clipboard.writeText(this.currentUrl).then(() => {
        alert('URL 已复制到剪贴板')
      }).catch(() => {
        alert('复制失败')
      })
    }
  }
}
</script>

<style scoped>
.url-parameter-handling {
  margin: 2rem 0;
}

.url-parameter-handling h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.parameter-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.parameter-controls {
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

.input-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9em;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.current-parameters h4,
.url-display h4,
.api-comparison h4 {
  color: #333;
  margin-bottom: 1rem;
}

.parameters-display {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  margin-bottom: 2rem;
}

.params-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.param-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.param-key {
  font-weight: 500;
  color: #007bff;
}

.param-separator {
  color: #666;
}

.param-value {
  color: #333;
  font-family: monospace;
}

.remove-btn {
  margin-left: auto;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 12px;
}

.no-params {
  color: #666;
  font-style: italic;
  text-align: center;
}

.url-display {
  margin-bottom: 2rem;
}

.url-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.url-content code {
  flex: 1;
  font-family: monospace;
  font-size: 0.9em;
  color: #333;
  word-break: break-all;
}

.copy-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8em;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.api-section {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.api-section h5 {
  margin-bottom: 0.5rem;
  color: #333;
}

.api-content p {
  margin-bottom: 0.5rem;
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

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-outline {
  background: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.btn-small {
  padding: 0.25rem 0.5rem;
  font-size: 0.8em;
}

.btn:hover {
  opacity: 0.9;
}
</style>