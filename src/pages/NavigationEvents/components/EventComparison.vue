<template>
  <div class="comparison-section">
    <div class="api-comparison">
      <div class="api-panel">
        <h3>Navigation API - 事件处理</h3>
        <div class="demo-section">
          <div class="demo-controls">
            <button @click="testNavigateEvent" class="btn btn-primary">触发 navigate 事件</button>
            <button @click="testInterceptNavigation" class="btn btn-secondary">测试导航拦截</button>
            <button @click="testCancelNavigation" class="btn btn-secondary">测试取消导航</button>
          </div>
          
          <div class="code-block">
            <pre>{{ navigationEventsCode }}</pre>
          </div>
          
          <div class="status-display">{{ navigationEventsStatus }}</div>
        </div>
      </div>
      
      <div class="api-panel">
        <h3>History API - 事件处理</h3>
        <div class="demo-section">
          <div class="demo-controls">
            <button @click="testPopstateEvent" class="btn btn-primary">触发 popstate 事件</button>
            <button @click="testHistoryChange" class="btn btn-secondary">测试历史变化</button>
            <button @click="testBeforeUnload" class="btn btn-secondary">测试页面离开</button>
          </div>
          
          <div class="code-block">
            <pre>{{ historyEventsCode }}</pre>
          </div>
          
          <div class="status-display">{{ historyEventsStatus }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventTestUtils } from '../utils/eventTestUtils.js'
import { codeExamples } from '../data/codeExamples.js'

export default {
  name: 'EventComparison',
  data() {
    return {
      navigationEventsStatus: '等待操作...',
      historyEventsStatus: '等待操作...',
      navigationEventsCode: codeExamples.navigationEvents,
      historyEventsCode: codeExamples.historyEvents
    }
  },
  methods: {
    testNavigateEvent() {
      const result = eventTestUtils.testNavigateEvent()
      this.navigationEventsStatus = result.message
    },
    
    testInterceptNavigation() {
      const result = eventTestUtils.testInterceptNavigation()
      this.navigationEventsStatus = result.message
    },
    
    testCancelNavigation() {
      const result = eventTestUtils.testCancelNavigation()
      this.navigationEventsStatus = result.message
    },
    
    testPopstateEvent() {
      const result = eventTestUtils.testPopstateEvent()
      this.historyEventsStatus = result.message
    },
    
    testHistoryChange() {
      const result = eventTestUtils.testHistoryChange()
      this.historyEventsStatus = result.message
    },
    
    testBeforeUnload() {
      const result = eventTestUtils.testBeforeUnload()
      this.historyEventsStatus = result.message
    }
  }
}
</script>

<style scoped>
.comparison-section {
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

.demo-section {
  margin-top: 1rem;
}

.demo-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
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

.status-display {
  padding: 1rem;
  background: #f8f9fa;
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

.btn-secondary {
  background: #6c757d;
  color: white;
}

@media (max-width: 768px) {
  .api-comparison {
    grid-template-columns: 1fr;
  }
}
</style>