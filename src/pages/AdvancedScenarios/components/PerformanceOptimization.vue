<template>
  <div class="performance-section">
    <h3>性能优化测试</h3>
    <p>测试Navigation API在不同场景下的性能表现</p>
    
    <div class="demo-controls">
      <button @click="startPerformanceTest" :disabled="isTestRunning" class="btn btn-primary">
        {{ isTestRunning ? '测试进行中...' : '开始性能测试' }}
      </button>
      <button @click="clearResults" class="btn btn-secondary">清除结果</button>
    </div>
    
    <div class="performance-results" v-if="performanceResults.length > 0">
      <h4>测试结果</h4>
      <div class="results-list">
        <div v-for="result in performanceResults" :key="result.id" class="result-item">
          <div class="result-header">
            <strong>{{ result.test }}</strong>
            <span class="result-time">{{ result.duration }}ms</span>
          </div>
          <div class="result-details">{{ result.details }}</div>
        </div>
      </div>
    </div>
    
    <div v-else class="no-results">
      暂无测试结果
    </div>
  </div>
</template>

<script>
import { performanceTestUtils } from '../utils/performanceTestUtils.js'

export default {
  name: 'PerformanceOptimization',
  data() {
    return {
      performanceResults: [],
      isTestRunning: false
    }
  },
  methods: {
    async startPerformanceTest() {
      this.isTestRunning = true
      
      try {
        // 基础导航测试
        const basicResult = await performanceTestUtils.testBasicNavigation()
        this.addPerformanceResult('基础导航', basicResult.duration, basicResult.details)
        
        // 状态管理测试
        const stateResult = await performanceTestUtils.testStateManagement()
        this.addPerformanceResult('状态管理', stateResult.duration, stateResult.details)
        
        // 事件处理测试
        const eventResult = await performanceTestUtils.testEventHandling()
        this.addPerformanceResult('事件处理', eventResult.duration, eventResult.details)
        
        // 路由预加载测试
        const preloadResult = await performanceTestUtils.preloadRoutes()
        this.addPerformanceResult('路由预加载', preloadResult.duration, preloadResult.details)
        
        // 缓存清理测试
        const cacheResult = await performanceTestUtils.clearCache()
        this.addPerformanceResult('缓存清理', cacheResult.duration, cacheResult.details)
        
      } catch (error) {
        console.error('性能测试失败:', error)
        this.addPerformanceResult('测试失败', 0, error.message)
      } finally {
        this.isTestRunning = false
      }
    },
    
    addPerformanceResult(test, duration, details) {
      this.performanceResults.push({
        id: Date.now() + Math.random(),
        test,
        duration,
        details,
        timestamp: new Date().toLocaleTimeString()
      })
    },
    
    clearResults() {
      this.performanceResults = []
    }
  }
}
</script>

<style scoped>
.performance-section {
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

.btn-primary:hover:not(:disabled) {
  background: #5a6fd8;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.performance-results {
  margin-top: 2rem;
}

.no-results {
  text-align: center;
  color: #6c757d;
  padding: 2rem;
  font-style: italic;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-item {
  padding: 1rem;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 6px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.result-time {
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.result-details {
  color: #6c757d;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .demo-controls {
    flex-direction: column;
  }
}
</style>