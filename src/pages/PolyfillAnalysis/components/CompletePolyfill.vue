<template>
  <div class="complete-polyfill">
    <h3>完整 Polyfill 实现</h3>
    <div class="polyfill-container">
      <div class="polyfill-controls">
        <button @click="loadPolyfill" class="btn btn-primary">加载 Polyfill</button>
        <button @click="testCompletePolyfill" class="btn btn-success">测试功能</button>
      </div>
      
      <div v-if="completePolyfillStatus" class="status-display">
        <h4>状态信息</h4>
        <pre>{{ completePolyfillStatus }}</pre>
      </div>
      
      <div class="code-section">
        <h4>完整实现代码</h4>
        <div class="code-block large">
          <pre><code>{{ completePolyfillCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { completePolyfillCode } from '../data/completePolyfillCode.js'
import { polyfillTestUtils } from '../utils/polyfillTestUtils.js'

export default {
  name: 'CompletePolyfill',
  data() {
    return {
      completePolyfillCode,
      completePolyfillStatus: ''
    }
  },
  methods: {
    loadPolyfill() {
      try {
        this.completePolyfillStatus = '正在加载 Polyfill...'
        
        setTimeout(() => {
          this.completePolyfillStatus = polyfillTestUtils.loadPolyfill()
        }, 1000)
        
      } catch (error) {
        this.completePolyfillStatus = `Polyfill 加载失败: ${error.message}`
      }
    },
    
    testCompletePolyfill() {
      try {
        this.completePolyfillStatus = polyfillTestUtils.testComplete()
      } catch (error) {
        this.completePolyfillStatus = `完整 Polyfill 测试失败: ${error.message}`
      }
    }
  }
}
</script>

<style scoped>
.complete-polyfill {
  margin: 2rem 0;
}

.complete-polyfill h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.polyfill-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.polyfill-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.status-display {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.status-display h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.status-display pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9em;
}

.code-section h4 {
  color: #333;
  margin-bottom: 1rem;
}

.code-block {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

.code-block.large {
  max-height: 600px;
  overflow-y: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9em;
  line-height: 1.4;
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

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover {
  background: #1e7e34;
}
</style>