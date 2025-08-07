<template>
  <div class="compatibility-testing">
    <h3>兼容性测试</h3>
    <div class="testing-container">
      <div class="test-controls">
        <button @click="runCompatibilityTests" class="btn btn-primary">运行兼容性测试</button>
        <button @click="clearResults" class="btn btn-secondary">清除结果</button>
      </div>
      
      <div v-if="testResults.length > 0" class="test-results">
        <h4>测试结果</h4>
        <div class="results-grid">
          <div v-for="result in testResults" :key="result.test" class="result-item">
            <div class="result-header">
              <h5>{{ result.test }}</h5>
              <span :class="getResultClass(result.status)">{{ result.status }}</span>
            </div>
            <p class="result-description">{{ result.description }}</p>
            <div v-if="result.details" class="result-details">
              <pre>{{ result.details }}</pre>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="no-results">
        <p>点击"运行兼容性测试"开始测试</p>
      </div>
    </div>
  </div>
</template>

<script>
import { compatibilityTestUtils } from '../utils/browserDetectionUtils.js'

export default {
  name: 'CompatibilityTesting',
  data() {
    return {
      testResults: []
    }
  },
  methods: {
    runCompatibilityTests() {
      this.testResults = compatibilityTestUtils.runTests()
    },
    
    clearResults() {
      this.testResults = []
    },
    
    getResultClass(status) {
      if (status === '通过') return 'status-pass'
      if (status === '警告') return 'status-warning'
      return 'status-fail'
    }
  }
}
</script>

<style scoped>
.compatibility-testing {
  margin: 2rem 0;
}

.compatibility-testing h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.testing-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.test-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.test-results h4 {
  color: #333;
  margin-bottom: 1rem;
}

.results-grid {
  display: grid;
  gap: 1rem;
}

.result-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.result-header h5 {
  color: #333;
  margin: 0;
}

.status-pass {
  color: #28a745;
  font-weight: 600;
}

.status-warning {
  color: #ffc107;
  font-weight: 600;
}

.status-fail {
  color: #dc3545;
  font-weight: 600;
}

.result-description {
  color: #666;
  margin-bottom: 0.5rem;
}

.result-details {
  background: white;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.result-details pre {
  margin: 0;
  font-size: 0.9em;
  color: #333;
}

.no-results {
  text-align: center;
  color: #666;
  padding: 2rem;
  font-style: italic;
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

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}
</style>