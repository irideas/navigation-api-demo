<template>
  <div class="programmatic-navigation">
    <h3>程序化导航</h3>
    <div class="navigation-container">
      <div class="navigation-controls">
        <div class="input-group">
          <label>目标 URL:</label>
          <input v-model="targetUrl" type="text" placeholder="输入要导航的 URL">
        </div>
        
        <div class="button-group">
          <button @click="navigateWithPush" class="btn btn-primary">Push 导航</button>
          <button @click="navigateWithReplace" class="btn btn-secondary">Replace 导航</button>
          <button @click="goBack" class="btn btn-outline">返回</button>
          <button @click="goForward" class="btn btn-outline">前进</button>
        </div>
      </div>
      
      <div class="navigation-results">
        <h4>导航结果</h4>
        <div v-if="navigationResults.length > 0" class="results-list">
          <div v-for="result in navigationResults" :key="result.id" class="result-item">
            <div class="result-header">
              <span class="result-time">{{ result.timestamp }}</span>
              <span :class="getResultClass(result.api)">{{ result.api }}</span>
            </div>
            <div class="result-details">
              <p><strong>操作:</strong> {{ result.action }}</p>
              <p><strong>URL:</strong> {{ result.url }}</p>
              <p v-if="result.state"><strong>状态:</strong> {{ JSON.stringify(result.state) }}</p>
            </div>
          </div>
        </div>
        <div v-else class="no-results">
          <p>暂无导航记录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgrammaticNavigation',
  data() {
    return {
      targetUrl: '/basic-navigation?test=programmatic',
      navigationResults: []
    }
  },
  methods: {
    navigateWithPush() {
      const timestamp = new Date().toLocaleTimeString()
      const state = { timestamp, action: 'push' }
      
      if ('navigation' in window) {
        navigation.navigate(this.targetUrl, { 
          state,
          info: { type: 'programmatic', method: 'push' }
        }).then(() => {
          this.addResult('Navigation API', 'Push 导航', this.targetUrl, state, timestamp)
        }).catch(error => {
          console.error('Navigation failed:', error)
        })
      } else {
        history.pushState(state, '', this.targetUrl)
        this.addResult('History API', 'Push 导航', this.targetUrl, state, timestamp)
      }
    },
    
    navigateWithReplace() {
      const timestamp = new Date().toLocaleTimeString()
      const state = { timestamp, action: 'replace' }
      
      if ('navigation' in window) {
        navigation.navigate(this.targetUrl, { 
          state,
          replace: true,
          info: { type: 'programmatic', method: 'replace' }
        }).then(() => {
          this.addResult('Navigation API', 'Replace 导航', this.targetUrl, state, timestamp)
        }).catch(error => {
          console.error('Navigation failed:', error)
        })
      } else {
        history.replaceState(state, '', this.targetUrl)
        this.addResult('History API', 'Replace 导航', this.targetUrl, state, timestamp)
      }
    },
    
    goBack() {
      const timestamp = new Date().toLocaleTimeString()
      
      if ('navigation' in window && navigation.back) {
        navigation.back()
        this.addResult('Navigation API', '返回', '上一页', null, timestamp)
      } else {
        history.back()
        this.addResult('History API', '返回', '上一页', null, timestamp)
      }
    },
    
    goForward() {
      const timestamp = new Date().toLocaleTimeString()
      
      if ('navigation' in window && navigation.forward) {
        navigation.forward()
        this.addResult('Navigation API', '前进', '下一页', null, timestamp)
      } else {
        history.forward()
        this.addResult('History API', '前进', '下一页', null, timestamp)
      }
    },
    
    addResult(api, action, url, state, timestamp) {
      this.navigationResults.unshift({
        id: Date.now(),
        api,
        action,
        url,
        state,
        timestamp
      })
      
      // 限制结果数量
      if (this.navigationResults.length > 10) {
        this.navigationResults = this.navigationResults.slice(0, 10)
      }
    },
    
    getResultClass(api) {
      return api === 'Navigation API' ? 'api-navigation' : 'api-history'
    }
  }
}
</script>

<style scoped>
.programmatic-navigation {
  margin: 2rem 0;
}

.programmatic-navigation h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.navigation-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.navigation-controls {
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

.navigation-results h4 {
  color: #333;
  margin-bottom: 1rem;
}

.results-list {
  display: grid;
  gap: 1rem;
}

.result-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.result-time {
  font-size: 0.8em;
  color: #666;
}

.api-navigation {
  background: #28a745;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 600;
}

.api-history {
  background: #6c757d;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 600;
}

.result-details p {
  margin: 0.25rem 0;
  font-size: 0.9em;
  color: #333;
}

.no-results {
  text-align: center;
  color: #666;
  padding: 2rem;
  font-style: italic;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.2s;
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