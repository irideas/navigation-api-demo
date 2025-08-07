<template>
  <div class="url-manipulation">
    <h3>URL 操作</h3>
    <div class="manipulation-container">
      <div class="url-controls">
        <div class="input-group">
          <label>目标 URL:</label>
          <input v-model="targetUrl" type="text" placeholder="输入要导航到的 URL">
        </div>
        
        <div class="input-group">
          <label>查询参数:</label>
          <div class="param-inputs">
            <input v-model="paramKey" type="text" placeholder="参数名">
            <input v-model="paramValue" type="text" placeholder="参数值">
            <button @click="addParam" class="btn btn-sm">添加</button>
          </div>
        </div>
        
        <div class="input-group">
          <label>Hash 片段:</label>
          <input v-model="hashFragment" type="text" placeholder="输入 hash 值 (不含 #)">
        </div>
        
        <div class="button-group">
          <button @click="navigateToUrl" class="btn btn-primary">导航到 URL</button>
          <button @click="replaceUrl" class="btn btn-secondary">替换当前 URL</button>
          <button @click="updateParams" class="btn btn-outline">更新参数</button>
          <button @click="clearParams" class="btn btn-outline">清除参数</button>
        </div>
      </div>
      
      <div class="current-url-info">
        <h4>当前 URL 信息</h4>
        <div class="url-breakdown">
          <div class="url-part">
            <label>完整 URL:</label>
            <span class="url-value">{{ currentUrl }}</span>
          </div>
          <div class="url-part">
            <label>协议:</label>
            <span class="url-value">{{ urlParts.protocol }}</span>
          </div>
          <div class="url-part">
            <label>主机:</label>
            <span class="url-value">{{ urlParts.host }}</span>
          </div>
          <div class="url-part">
            <label>路径:</label>
            <span class="url-value">{{ urlParts.pathname }}</span>
          </div>
          <div class="url-part">
            <label>查询参数:</label>
            <span class="url-value">{{ urlParts.search || '无' }}</span>
          </div>
          <div class="url-part">
            <label>Hash:</label>
            <span class="url-value">{{ urlParts.hash || '无' }}</span>
          </div>
        </div>
      </div>
      
      <div class="params-display">
        <h4>查询参数列表</h4>
        <div v-if="queryParams.length > 0" class="params-list">
          <div v-for="(param, index) in queryParams" :key="index" class="param-item">
            <span class="param-key">{{ param.key }}</span>
            <span class="param-value">{{ param.value }}</span>
            <button @click="removeParam(index)" class="btn btn-sm btn-danger">删除</button>
          </div>
        </div>
        <div v-else class="no-params">
          <p>当前没有查询参数</p>
        </div>
      </div>
      
      <div class="api-comparison">
        <h4>API 对比</h4>
        <div class="comparison-grid">
          <div class="api-section">
            <h5>Navigation API</h5>
            <div class="api-status">
              <span :class="['status', navigationSupported ? 'supported' : 'not-supported']">
                {{ navigationSupported ? '支持' : '不支持' }}
              </span>
            </div>
            <div class="api-features">
              <ul>
                <li>navigation.navigate(url)</li>
                <li>更好的 URL 处理</li>
                <li>内置状态管理</li>
                <li>事件监听</li>
              </ul>
            </div>
          </div>
          
          <div class="api-section">
            <h5>History API</h5>
            <div class="api-status">
              <span class="status supported">支持</span>
            </div>
            <div class="api-features">
              <ul>
                <li>history.pushState()</li>
                <li>history.replaceState()</li>
                <li>手动 URL 解析</li>
                <li>popstate 事件</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UrlManipulation',
  data() {
    return {
      targetUrl: '',
      paramKey: '',
      paramValue: '',
      hashFragment: '',
      currentUrl: '',
      urlParts: {},
      queryParams: [],
      navigationSupported: false
    }
  },
  mounted() {
    this.navigationSupported = 'navigation' in window
    this.updateUrlInfo()
    
    // 监听 URL 变化
    window.addEventListener('popstate', this.updateUrlInfo)
    
    if (this.navigationSupported) {
      navigation.addEventListener('navigate', this.updateUrlInfo)
    }
  },
  beforeUnmount() {
    window.removeEventListener('popstate', this.updateUrlInfo)
    
    if (this.navigationSupported) {
      navigation.removeEventListener('navigate', this.updateUrlInfo)
    }
  },
  methods: {
    navigateToUrl() {
      if (!this.targetUrl) {
        alert('请输入目标 URL')
        return
      }
      
      try {
        if (this.navigationSupported) {
          navigation.navigate(this.targetUrl)
        } else {
          history.pushState(null, '', this.targetUrl)
          this.updateUrlInfo()
        }
      } catch (error) {
        alert('导航失败: ' + error.message)
      }
    },
    
    replaceUrl() {
      if (!this.targetUrl) {
        alert('请输入目标 URL')
        return
      }
      
      try {
        if (this.navigationSupported && navigation.updateCurrentEntry) {
          navigation.updateCurrentEntry({ url: this.targetUrl })
        } else {
          history.replaceState(null, '', this.targetUrl)
          this.updateUrlInfo()
        }
      } catch (error) {
        alert('替换失败: ' + error.message)
      }
    },
    
    addParam() {
      if (!this.paramKey || !this.paramValue) {
        alert('请输入参数名和参数值')
        return
      }
      
      this.queryParams.push({
        key: this.paramKey,
        value: this.paramValue
      })
      
      this.paramKey = ''
      this.paramValue = ''
    },
    
    removeParam(index) {
      this.queryParams.splice(index, 1)
    },
    
    updateParams() {
      const url = new URL(window.location.href)
      
      // 清除现有参数
      url.search = ''
      
      // 添加新参数
      this.queryParams.forEach(param => {
        url.searchParams.set(param.key, param.value)
      })
      
      // 添加 hash
      if (this.hashFragment) {
        url.hash = this.hashFragment
      }
      
      try {
        if (this.navigationSupported) {
          navigation.navigate(url.toString())
        } else {
          history.pushState(null, '', url.toString())
          this.updateUrlInfo()
        }
      } catch (error) {
        alert('更新参数失败: ' + error.message)
      }
    },
    
    clearParams() {
      const url = new URL(window.location.href)
      url.search = ''
      url.hash = ''
      
      try {
        if (this.navigationSupported) {
          navigation.navigate(url.toString())
        } else {
          history.pushState(null, '', url.toString())
          this.updateUrlInfo()
        }
      } catch (error) {
        alert('清除参数失败: ' + error.message)
      }
    },
    
    updateUrlInfo() {
      this.currentUrl = window.location.href
      
      const url = new URL(this.currentUrl)
      this.urlParts = {
        protocol: url.protocol,
        host: url.host,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      }
      
      // 更新查询参数列表
      this.queryParams = []
      url.searchParams.forEach((value, key) => {
        this.queryParams.push({ key, value })
      })
      
      // 更新 hash 片段
      this.hashFragment = url.hash.substring(1)
    }
  }
}
</script>

<style scoped>
.url-manipulation {
  margin: 2rem 0;
}

.url-manipulation h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.manipulation-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.url-controls {
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

.param-inputs {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.param-inputs input {
  flex: 1;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.current-url-info h4,
.params-display h4,
.api-comparison h4 {
  color: #333;
  margin-bottom: 1rem;
}

.url-breakdown {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  margin-bottom: 2rem;
}

.url-part {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
}

.url-part:last-child {
  border-bottom: none;
}

.url-part label {
  font-weight: 500;
  color: #333;
  min-width: 80px;
}

.url-value {
  color: #666;
  font-family: monospace;
  font-size: 0.9em;
  word-break: break-all;
}

.params-list {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  margin-bottom: 2rem;
}

.param-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  border: 1px solid #e9ecef;
}

.param-item:last-child {
  margin-bottom: 0;
}

.param-key {
  font-weight: 500;
  color: #333;
}

.param-value {
  color: #666;
  font-family: monospace;
  margin: 0 1rem;
}

.no-params {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  margin-bottom: 2rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.api-section {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.api-section h5 {
  color: #333;
  margin-bottom: 1rem;
}

.api-status {
  margin-bottom: 1rem;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 500;
}

.status.supported {
  background: #d4edda;
  color: #155724;
}

.status.not-supported {
  background: #f8d7da;
  color: #721c24;
}

.api-features ul {
  margin: 0;
  padding-left: 1.5rem;
}

.api-features li {
  margin-bottom: 0.5rem;
  color: #666;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.8em;
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

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
  
  .param-inputs {
    flex-direction: column;
  }
  
  .param-inputs input {
    width: 100%;
  }
  
  .button-group {
    flex-direction: column;
  }
}
</style>