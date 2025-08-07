<template>
  <div class="entries-display">
    <h3>当前导航条目</h3>
    <div class="api-comparison">
      <div class="api-panel">
        <h4>Navigation API - entries()</h4>
        <div class="entries-list">
          <div v-if="navigationEntries.length > 0">
            <div v-for="(entry, index) in navigationEntries" 
                 :key="entry.id || index"
                 :class="['entry-item', { 'current': entry.id === currentEntryId }]">
              <div class="entry-info">
                <strong>索引: {{ entry.index }}</strong>
                <span class="entry-url">{{ entry.url }}</span>
                <span class="entry-key">Key: {{ entry.key }}</span>
                <span class="entry-id">ID: {{ entry.id }}</span>
              </div>
              <div class="entry-actions">
                <button @click="navigateToEntry(entry)" class="btn btn-sm">跳转</button>
              </div>
            </div>
          </div>
          <div v-else class="no-entries">
            Navigation API 不可用或无条目
          </div>
        </div>
        
        <div class="demo-controls">
          <button @click="refreshNavigationEntries" class="btn btn-primary">刷新条目</button>
          <button @click="addNavigationEntry" class="btn btn-secondary">添加条目</button>
        </div>
      </div>
      
      <div class="api-panel">
        <h4>History API - 历史信息</h4>
        <div class="history-info">
          <div class="info-item">
            <strong>History Length:</strong> {{ historyLength }}
          </div>
          <div class="info-item">
            <strong>Current State:</strong>
            <pre>{{ JSON.stringify(historyState, null, 2) || 'null' }}</pre>
          </div>
          <div class="info-item">
            <strong>Current URL:</strong> {{ currentUrl }}
          </div>
        </div>
        
        <div class="demo-controls">
          <button @click="refreshHistoryInfo" class="btn btn-primary">刷新信息</button>
          <button @click="addHistoryEntry" class="btn btn-secondary">添加历史条目</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { entriesUtils } from '../utils/entriesUtils.js'

export default {
  name: 'EntriesDisplay',
  data() {
    return {
      navigationEntries: [],
      currentEntryId: null,
      historyLength: 0,
      historyState: null,
      currentUrl: ''
    }
  },
  mounted() {
    this.refreshNavigationEntries()
    this.refreshHistoryInfo()
  },
  methods: {
    refreshNavigationEntries() {
      const result = entriesUtils.getNavigationEntries()
      this.navigationEntries = result.entries
      this.currentEntryId = result.currentId
    },
    
    refreshHistoryInfo() {
      const info = entriesUtils.getHistoryInfo()
      this.historyLength = info.length
      this.historyState = info.state
      this.currentUrl = info.url
    },
    
    addNavigationEntry() {
      entriesUtils.addNavigationEntry()
      this.refreshNavigationEntries()
    },
    
    addHistoryEntry() {
      entriesUtils.addHistoryEntry()
      this.refreshHistoryInfo()
    },
    
    navigateToEntry(entry) {
      entriesUtils.navigateToEntry(entry)
    }
  }
}
</script>

<style scoped>
.entries-display {
  margin: 2rem 0;
}

.api-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1rem;
}

.api-panel {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.entries-list {
  max-height: 400px;
  overflow-y: auto;
  margin: 1rem 0;
}

.entry-item {
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  background: #f8f9fa;
}

.entry-item.current {
  border-color: #667eea;
  background: #e8f0fe;
}

.entry-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.entry-url {
  color: #666;
  font-size: 0.9em;
  word-break: break-all;
}

.entry-key, .entry-id {
  color: #888;
  font-size: 0.8em;
}

.history-info {
  margin: 1rem 0;
}

.info-item {
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.info-item pre {
  margin-top: 0.5rem;
  font-size: 0.8em;
  color: #666;
}

.no-entries {
  text-align: center;
  color: #666;
  padding: 2rem;
  font-style: italic;
}

.demo-controls {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}
</style>