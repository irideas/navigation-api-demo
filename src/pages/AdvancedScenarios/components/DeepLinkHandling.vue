<template>
  <section class="section">
    <h2 class="section-title">深度链接处理</h2>
    <div class="deeplink-demo">
      <div class="demo-description">
        <p>演示如何处理深度链接，包括状态恢复、参数解析等。</p>
      </div>
      
      <div class="demo-controls">
        <button @click="generateDeepLink" class="btn btn-primary">生成深度链接</button>
        <button @click="parseCurrentUrl" class="btn btn-info">解析当前 URL</button>
        <button @click="restoreFromUrl" class="btn btn-success">从 URL 恢复状态</button>
      </div>
      
      <div class="deeplink-info">
        <h4>深度链接信息：</h4>
        <div class="info-item">
          <strong>当前 URL：</strong>
          <code>{{ currentUrl }}</code>
        </div>
        <div class="info-item">
          <strong>解析参数：</strong>
          <pre>{{ JSON.stringify(urlParams, null, 2) }}</pre>
        </div>
        <div class="info-item">
          <strong>应用状态：</strong>
          <pre>{{ JSON.stringify(appState, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { deepLinkUtils } from '../utils/deepLinkUtils.js'

export default {
  name: 'DeepLinkHandling',
  data() {
    return {
      currentUrl: '',
      urlParams: {},
      appState: {
        tab: 'home',
        filter: 'all',
        sort: 'date'
      }
    }
  },
  mounted() {
    this.updateCurrentUrl()
    this.parseCurrentUrl()
  },
  methods: {
    generateDeepLink() {
      const params = {
        tab: this.appState.tab,
        filter: this.appState.filter,
        sort: this.appState.sort,
        timestamp: Date.now()
      }
      
      deepLinkUtils.generateDeepLink(params)
      this.updateCurrentUrl()
    },
    
    parseCurrentUrl() {
      this.updateCurrentUrl()
      this.urlParams = deepLinkUtils.parseQueryString()
    },
    
    restoreFromUrl() {
      const params = deepLinkUtils.parseQueryString()
      
      if (params.tab) this.appState.tab = params.tab
      if (params.filter) this.appState.filter = params.filter
      if (params.sort) this.appState.sort = params.sort
      
      alert('状态已从 URL 恢复')
    },
    
    updateCurrentUrl() {
      this.currentUrl = location.href
    }
  }
}
</script>

<style scoped>
.section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  background: #fff;
}

.section-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.demo-description {
  margin-bottom: 20px;
  color: #555;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #667eea;
}

.demo-controls {
  margin-bottom: 20px;
}

.btn {
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-primary { background-color: #3498db; color: white; }
.btn-info { background-color: #17a2b8; color: white; }
.btn-success { background-color: #28a745; color: white; }

.btn:hover { opacity: 0.8; }

.deeplink-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #17a2b8;
}

.deeplink-info h4 {
  margin-top: 0;
  color: #2c3e50;
}

.info-item {
  margin-bottom: 15px;
}

.info-item strong {
  color: #2c3e50;
}

.info-item code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  word-break: break-all;
}

.info-item pre {
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  overflow-x: auto;
  margin-top: 5px;
}
</style>