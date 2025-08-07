<template>
  <div class="performance-comparison">
    <h3>性能对比测试</h3>
    <div class="performance-tests">
      <div class="test-controls">
        <button @click="runPerformanceTest" class="btn btn-primary">运行性能测试</button>
        <button @click="clearPerformanceResults" class="btn btn-secondary">清除结果</button>
      </div>
      
      <div v-if="performanceResults.length > 0" class="results-section">
        <h4>测试结果</h4>
        <table class="performance-table">
          <thead>
            <tr>
              <th>测试项目</th>
              <th>Navigation API</th>
              <th>History API</th>
              <th>Polyfill</th>
              <th>性能差异</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in performanceResults" :key="result.test">
              <td>{{ result.test }}</td>
              <td>{{ result.navigation }}</td>
              <td>{{ result.history }}</td>
              <td>{{ result.polyfill }}</td>
              <td :class="getPerformanceClass(result.difference)">{{ result.difference }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else class="no-results">
        <p>点击"运行性能测试"开始测试</p>
      </div>
    </div>
  </div>
</template>

<script>
import { performanceTestUtils } from '../utils/performanceTestUtils.js'

export default {
  name: 'PerformanceComparison',
  data() {
    return {
      performanceResults: []
    }
  },
  methods: {
    runPerformanceTest() {
      this.performanceResults = performanceTestUtils.runTests()
    },
    
    clearPerformanceResults() {
      this.performanceResults = []
    },
    
    getPerformanceClass(difference) {
      if (difference.startsWith('+')) {
        return 'performance-worse'
      } else if (difference.startsWith('-')) {
        return 'performance-better'
      }
      return ''
    }
  }
}
</script>

<style scoped>
.performance-comparison {
  margin: 2rem 0;
}

.performance-comparison h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.performance-tests {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.test-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.results-section h4 {
  color: #333;
  margin-bottom: 1rem;
}

.performance-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.performance-table th,
.performance-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.performance-table th {
  background: #f8f9fa;
  font-weight: 600;
}

.performance-better {
  color: #28a745;
  font-weight: 600;
}

.performance-worse {
  color: #dc3545;
  font-weight: 600;
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