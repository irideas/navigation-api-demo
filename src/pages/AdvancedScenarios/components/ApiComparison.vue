<template>
  <div class="api-comparison-section">
    <h3>API 对比分析</h3>
    <p>对比Navigation API与传统History API的功能和性能差异</p>
    
    <div class="comparison-table-container">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>功能特性</th>
            <th>Navigation API</th>
            <th>History API</th>
            <th>优势对比</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feature in comparisonData" :key="feature.feature">
            <td><strong>{{ feature.feature }}</strong></td>
            <td :class="getSupportClass(feature.navigationApi)">
              {{ feature.navigationApi }}
            </td>
            <td :class="getSupportClass(feature.historyApi)">
              {{ feature.historyApi }}
            </td>
            <td class="support-neutral">{{ feature.advantage }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="demo-controls">
      <button @click="runComparisonTest" class="btn btn-primary">
        运行对比测试
      </button>
      <button @click="clearTestResults" class="btn btn-secondary">
        清除结果
      </button>
    </div>
    
    <div v-if="testResults.length > 0" class="test-results">
      <h4>测试结果</h4>
      <div class="results-grid">
        <div v-for="result in testResults" :key="result.id" class="result-card">
          <h5>{{ result.test }}</h5>
          <div class="result-comparison">
            <div class="api-result">
              <span class="api-label">Navigation API:</span>
              <span class="result-value">{{ result.navigationApi }}ms</span>
            </div>
            <div class="api-result">
              <span class="api-label">History API:</span>
              <span class="result-value">{{ result.historyApi }}ms</span>
            </div>
            <div class="winner" :class="getWinnerClass(result)">
              {{ getWinner(result) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiComparisonUtils } from '../utils/apiComparisonUtils.js'

export default {
  name: 'ApiComparison',
  data() {
    return {
      testResults: [],
      comparisonData: [
        {
          feature: '导航拦截',
          navigationApi: '原生支持',
          historyApi: '需要手动实现',
          advantage: 'Navigation API'
        },
        {
          feature: '异步导航',
          navigationApi: '完整支持',
          historyApi: '有限支持',
          advantage: 'Navigation API'
        },
        {
          feature: '导航事件',
          navigationApi: '丰富的事件系统',
          historyApi: '基础事件',
          advantage: 'Navigation API'
        },
        {
          feature: '状态管理',
          navigationApi: '结构化状态',
          historyApi: '简单状态',
          advantage: 'Navigation API'
        },
        {
          feature: '浏览器兼容性',
          navigationApi: '现代浏览器',
          historyApi: '广泛支持',
          advantage: 'History API'
        },
        {
          feature: '学习成本',
          navigationApi: '中等',
          historyApi: '较低',
          advantage: 'History API'
        },
        {
          feature: '错误处理',
          navigationApi: '完善的错误处理',
          historyApi: '基础错误处理',
          advantage: 'Navigation API'
        },
        {
          feature: '性能优化',
          navigationApi: '内置优化',
          historyApi: '需要手动优化',
          advantage: 'Navigation API'
        }
      ]
    }
  },
  methods: {
    getSupportClass(support) {
      if (support.includes('原生支持') || support.includes('完整支持') || support.includes('丰富') || support.includes('结构化') || support.includes('完善') || support.includes('内置')) {
        return 'support-good'
      } else if (support.includes('需要') || support.includes('手动') || support.includes('基础')) {
        return 'support-manual'
      } else if (support.includes('有限') || support.includes('简单')) {
        return 'support-limited'
      } else if (support.includes('广泛') || support.includes('较低')) {
        return 'support-good'
      } else if (support.includes('现代') || support.includes('中等')) {
        return 'support-limited'
      }
      return 'support-neutral'
    },
    
    async runComparisonTest() {
      try {
        // 导航性能测试
        const navigationTest = await apiComparisonUtils.testNavigationPerformance()
        this.addTestResult('导航性能', navigationTest.navigationApi, navigationTest.historyApi)
        
        // 状态管理测试
        const stateTest = await apiComparisonUtils.testStateManagement()
        this.addTestResult('状态管理', stateTest.navigationApi, stateTest.historyApi)
        
        // 事件处理测试
        const eventTest = await apiComparisonUtils.testEventHandling()
        this.addTestResult('事件处理', eventTest.navigationApi, eventTest.historyApi)
        
        // 内存使用测试
        const memoryTest = await apiComparisonUtils.testMemoryUsage()
        this.addTestResult('内存使用', memoryTest.navigationApi, memoryTest.historyApi)
        
      } catch (error) {
        console.error('对比测试失败:', error)
      }
    },
    
    addTestResult(test, navigationApi, historyApi) {
      this.testResults.push({
        id: Date.now() + Math.random(),
        test,
        navigationApi,
        historyApi,
        timestamp: new Date().toLocaleTimeString()
      })
    },
    
    clearTestResults() {
      this.testResults = []
    },
    
    getWinner(result) {
      if (result.navigationApi < result.historyApi) {
        return 'Navigation API 更快'
      } else if (result.historyApi < result.navigationApi) {
        return 'History API 更快'
      } else {
        return '性能相当'
      }
    },
    
    getWinnerClass(result) {
      if (result.navigationApi < result.historyApi) {
        return 'winner-navigation'
      } else if (result.historyApi < result.navigationApi) {
        return 'winner-history'
      } else {
        return 'winner-tie'
      }
    }
  }
}
</script>

<style scoped>
.api-comparison-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.comparison-table-container {
  overflow-x: auto;
  margin: 1.5rem 0;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.comparison-table th,
.comparison-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.comparison-table th {
  background: #f8f9fa;
  font-weight: 600;
}

.support-good {
  color: #28a745;
  font-weight: bold;
}

.support-manual {
  color: #ffc107;
  font-weight: bold;
}

.support-limited {
  color: #17a2b8;
  font-weight: bold;
}

.support-neutral {
  color: #6c757d;
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

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.test-results {
  margin-top: 2rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.result-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.result-card h5 {
  margin: 0 0 1rem 0;
  color: #333;
}

.result-comparison {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.api-result {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.api-label {
  font-weight: 500;
}

.result-value {
  font-weight: bold;
  color: #667eea;
}

.winner {
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
}

.winner-navigation {
  background: #d4edda;
  color: #155724;
}

.winner-history {
  background: #d1ecf1;
  color: #0c5460;
}

.winner-tie {
  background: #f8f9fa;
  color: #6c757d;
}

@media (max-width: 768px) {
  .demo-controls {
    flex-direction: column;
  }
  
  .comparison-table {
    font-size: 0.9rem;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 0.5rem;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>