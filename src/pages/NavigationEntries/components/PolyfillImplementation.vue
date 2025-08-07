<template>
  <div class="polyfill-implementation">
    <h3>条目管理 Polyfill 实现</h3>
    <p>以下展示如何使用 History API 模拟 Navigation API 的条目管理功能：</p>
    
    <div class="code-block">
      <pre>{{ entriesPolyfillCode }}</pre>
    </div>
    
    <div class="demo-controls">
      <button @click="testEntriesPolyfill" class="btn btn-primary">测试条目 Polyfill</button>
    </div>
    <div class="status-display">{{ entriesPolyfillStatus }}</div>
  </div>
</template>

<script>
import { polyfillCode } from '../data/polyfillCode.js'

export default {
  name: 'PolyfillImplementation',
  data() {
    return {
      entriesPolyfillStatus: '等待测试...',
      entriesPolyfillCode: polyfillCode.entriesPolyfill
    }
  },
  methods: {
    testEntriesPolyfill() {
      try {
        // 模拟 Navigation API 条目管理
        const mockEntries = [
          { id: '1', key: 'key1', index: 0, url: location.href, state: null },
          { id: '2', key: 'key2', index: 1, url: location.href + '?test=1', state: { test: 1 } }
        ]
        
        this.entriesPolyfillStatus = `Polyfill 测试成功：
模拟条目数量: ${mockEntries.length}
当前条目: ${mockEntries[0].url}
功能覆盖: 基础条目管理、状态跟踪`
      } catch (error) {
        this.entriesPolyfillStatus = `Polyfill 测试失败: ${error.message}`
      }
    }
  }
}
</script>

<style scoped>
.polyfill-implementation {
  margin: 2rem 0;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.demo-controls {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.status-display {
  padding: 1rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  font-family: monospace;
  white-space: pre-wrap;
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
</style>