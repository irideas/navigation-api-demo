<template>
  <div class="history-section">
    <h3>历史管理</h3>
    <p>演示高级历史记录管理功能</p>
    
    <div class="demo-controls">
      <button @click="loadHistoryEntries" class="btn btn-primary">刷新历史</button>
      <button @click="addEntry" class="btn btn-success">添加条目</button>
      <button @click="replaceEntry" class="btn btn-warning">替换条目</button>
      <button @click="clearHistory" class="btn btn-danger">清除历史</button>
      <button @click="exportHistory" class="btn btn-info">导出历史</button>
    </div>
    
    <div class="history-list">
      <div v-if="historyEntries.length === 0" class="no-history">
        暂无历史记录
      </div>
      <div v-else class="history-items">
        <div 
          v-for="entry in historyEntries" 
          :key="entry.id"
          class="history-item"
          :class="{ active: entry.id === currentEntryId }"
        >
          <div class="entry-info">
            <strong>{{ entry.url }}</strong>
            <div class="entry-url">
              状态: {{ entry.state ? JSON.stringify(entry.state) : '无' }}
            </div>
            <div class="entry-url">
              时间: {{ new Date(entry.timestamp).toLocaleString() }}
            </div>
          </div>
          <div class="entry-actions">
            <button @click="navigateToEntry(entry)" class="btn-small">导航</button>
            <button @click="removeEntry(entry.id)" class="btn-small btn-danger">移除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { historyManagementUtils } from '../utils/historyManagementUtils.js'

export default {
  name: 'HistoryManagement',
  data() {
    return {
      historyEntries: [],
      currentEntryId: null
    }
  },
  mounted() {
    this.loadHistoryEntries()
    this.setupEventListeners()
  },
  beforeUnmount() {
    this.cleanupEventListeners()
  },
  methods: {
    loadHistoryEntries() {
      this.historyEntries = historyManagementUtils.loadHistoryEntries()
      this.updateCurrentEntry()
    },
    
    async addEntry() {
      const timestamp = Date.now()
      const url = `${window.location.pathname}?demo=history&t=${timestamp}`
      const state = {
        demo: 'history',
        timestamp,
        action: 'add'
      }
      
      const result = await historyManagementUtils.addHistoryEntry(url, state, `历史演示 - ${timestamp}`)
      
      if (result.success) {
        this.loadHistoryEntries()
        console.log('添加历史条目成功:', result.entry)
      } else {
        console.error('添加历史条目失败:', result.error)
      }
    },
    
    async replaceEntry() {
      const timestamp = Date.now()
      const url = `${window.location.pathname}?demo=history&replaced=${timestamp}`
      const state = {
        demo: 'history',
        timestamp,
        action: 'replace'
      }
      
      const result = await historyManagementUtils.replaceHistoryEntry(url, state, `历史演示 - 替换 - ${timestamp}`)
      
      if (result.success) {
        this.loadHistoryEntries()
        console.log('替换历史条目成功:', result.entry)
      } else {
        console.error('替换历史条目失败:', result.error)
      }
    },
    
    async navigateToEntry(entry) {
      const result = await historyManagementUtils.navigateToEntry(entry)
      
      if (result.success) {
        this.updateCurrentEntry()
        console.log('导航到历史条目成功')
      } else {
        console.error('导航到历史条目失败:', result.error)
      }
    },
    
    clearHistory() {
      const result = historyManagementUtils.clearHistory()
      
      if (result.success) {
        this.loadHistoryEntries()
        console.log(result.message)
      } else {
        console.error('清除历史失败:', result.error)
      }
    },
    
    exportHistory() {
      const result = historyManagementUtils.exportHistory()
      
      if (result.success) {
        console.log(result.message)
      } else {
        console.error('导出历史失败:', result.error)
      }
    },
    
    removeEntry(entryId) {
      const result = historyManagementUtils.removeEntry(entryId)
      
      if (result.success) {
        console.log(result.message)
        // 从本地列表中移除（仅用于演示）
        this.historyEntries = this.historyEntries.filter(entry => entry.id !== entryId)
      } else {
        console.error('移除条目失败:', result.error)
      }
    },
    
    updateCurrentEntry() {
      const currentUrl = window.location.href
      const currentEntry = this.historyEntries.find(entry => entry.url === currentUrl)
      this.currentEntryId = currentEntry ? currentEntry.id : null
    },
    
    setupEventListeners() {
      if (window.navigation) {
        window.navigation.addEventListener('navigate', this.onNavigate)
        window.navigation.addEventListener('navigatesuccess', this.onNavigateSuccess)
      }
      
      window.addEventListener('popstate', this.onPopState)
    },
    
    cleanupEventListeners() {
      if (window.navigation) {
        window.navigation.removeEventListener('navigate', this.onNavigate)
        window.navigation.removeEventListener('navigatesuccess', this.onNavigateSuccess)
      }
      
      window.removeEventListener('popstate', this.onPopState)
    },
    
    onNavigate(event) {
      console.log('导航事件:', event)
    },
    
    onNavigateSuccess(event) {
      console.log('导航成功:', event)
      this.loadHistoryEntries()
    },
    
    onPopState(event) {
      console.log('PopState事件:', event)
      this.loadHistoryEntries()
    }
  }
}
</script>

<style scoped>
.history-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.demo-controls {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a6fd8;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover {
  background: #218838;
}

.btn-warning {
  background: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background: #e0a800;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-info {
  background: #17a2b8;
  color: white;
}

.btn-info:hover {
  background: #138496;
}

.history-list {
  margin-top: 1rem;
}

.no-history {
  text-align: center;
  color: #6c757d;
  padding: 2rem;
  font-style: italic;
}

.history-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.history-item:hover {
  border-color: #667eea;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.1);
}

.history-item.active {
  border-color: #667eea;
  background: #f8f9ff;
}

.entry-info {
  flex: 1;
}

.entry-info strong {
  display: block;
  margin-bottom: 0.25rem;
}

.entry-url {
  color: #6c757d;
  font-size: 0.9rem;
}

.entry-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-small {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #667eea;
  color: white;
  transition: background 0.3s ease;
}

.btn-small:hover {
  background: #5a6fd8;
}

.btn-small.btn-danger {
  background: #dc3545;
}

.btn-small.btn-danger:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .demo-controls {
    flex-direction: column;
  }
  
  .history-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .entry-actions {
    align-self: stretch;
    justify-content: flex-end;
  }
}
</style>