<template>
  <div class="non-polyfillable">
    <h3>无法 Polyfill 的功能</h3>
    <div class="limitation-list">
      <div v-for="limitation in limitations" :key="limitation.id" class="limitation-item">
        <h4>{{ limitation.title }}</h4>
        <p>{{ limitation.description }}</p>
        <div class="limitation-details">
          <div class="detail-section">
            <h5>技术限制</h5>
            <p>{{ limitation.technicalLimit }}</p>
          </div>
          <div class="detail-section">
            <h5>替代方案</h5>
            <p>{{ limitation.alternative }}</p>
          </div>
        </div>
        <div class="demo-section">
          <button @click="demonstrateLimitation(limitation.id)" class="btn btn-warning">
            演示限制
          </button>
          <div v-if="limitationResults[limitation.id]" class="result-display">
            <pre>{{ limitationResults[limitation.id] }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { limitationsData } from '../data/limitationsData.js'
import { demonstrateLimitationUtils } from '../utils/demonstrateLimitationUtils.js'

export default {
  name: 'NonPolyfillable',
  data() {
    return {
      limitations: limitationsData,
      limitationResults: {}
    }
  },
  methods: {
    demonstrateLimitation(limitationId) {
      try {
        const result = demonstrateLimitationUtils.demonstrate(limitationId)
        this.$set(this.limitationResults, limitationId, result)
      } catch (error) {
        this.$set(this.limitationResults, limitationId, `演示失败: ${error.message}`)
      }
    }
  }
}
</script>

<style scoped>
.non-polyfillable {
  margin: 2rem 0;
}

.non-polyfillable h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.limitation-list {
  display: grid;
  gap: 2rem;
  margin-top: 1rem;
}

.limitation-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  border-left: 4px solid #dc3545;
}

.limitation-item h4 {
  color: #dc3545;
  margin-bottom: 1rem;
}

.limitation-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.detail-section {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
}

.detail-section h5 {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9em;
}

.demo-section {
  margin-top: 1rem;
}

.result-display {
  margin-top: 1rem;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.result-display pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9em;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.btn-warning {
  background: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background: #e0a800;
}
</style>