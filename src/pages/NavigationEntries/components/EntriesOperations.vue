<template>
  <div class="entries-operations">
    <h3>条目操作测试</h3>
    <div class="operation-controls">
      <button @click="testTraversal" class="btn btn-primary">测试遍历</button>
      <button @click="testCurrentEntry" class="btn btn-secondary">获取当前条目</button>
      <button @click="testEntryUpdate" class="btn btn-secondary">更新条目状态</button>
    </div>
    <div class="status-display">{{ operationStatus }}</div>
  </div>
</template>

<script>
import { entriesUtils } from '../utils/entriesUtils.js'

export default {
  name: 'EntriesOperations',
  data() {
    return {
      operationStatus: '等待操作...'
    }
  },
  methods: {
    testTraversal() {
      const result = entriesUtils.testTraversal()
      this.operationStatus = result.message
    },
    
    testCurrentEntry() {
      const result = entriesUtils.testCurrentEntry()
      this.operationStatus = result.message
    },
    
    testEntryUpdate() {
      const result = entriesUtils.testEntryUpdate()
      this.operationStatus = result.message
    }
  }
}
</script>

<style scoped>
.entries-operations {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.operation-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
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

.btn-secondary {
  background: #6c757d;
  color: white;
}
</style>