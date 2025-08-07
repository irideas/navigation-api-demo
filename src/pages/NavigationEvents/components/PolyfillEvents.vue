<template>
  <div class="polyfill-events">
    <h3>事件系统 Polyfill 实现</h3>
    <p>以下展示如何使用传统事件模拟 Navigation API 的事件功能：</p>
    
    <div class="code-block">
      <pre>{{ eventsPolyfillCode }}</pre>
    </div>
    
    <div class="demo-controls">
      <button @click="testEventsPolyfill" class="btn btn-primary">测试事件 Polyfill</button>
    </div>
    <div class="status-display">{{ eventsPolyfillStatus }}</div>
  </div>
</template>

<script>
import { codeExamples } from '../data/codeExamples.js'
import { polyfillTestUtils } from '../utils/polyfillTestUtils.js'

export default {
  name: 'PolyfillEvents',
  data() {
    return {
      eventsPolyfillStatus: '等待测试...',
      eventsPolyfillCode: codeExamples.eventsPolyfill
    }
  },
  methods: {
    testEventsPolyfill() {
      const result = polyfillTestUtils.testEventsPolyfill()
      this.eventsPolyfillStatus = result.message
    }
  }
}
</script>

<style scoped>
.polyfill-events {
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
  font-size: 0.8rem;
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
  min-height: 60px;
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