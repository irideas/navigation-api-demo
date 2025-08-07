<template>
  <div class="feature-support-matrix">
    <h3>功能支持矩阵</h3>
    <div class="matrix-container">
      <table class="support-matrix">
        <thead>
          <tr>
            <th>功能特性</th>
            <th>Chrome</th>
            <th>Firefox</th>
            <th>Safari</th>
            <th>Edge</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feature in features" :key="feature.name">
            <td class="feature-name">{{ feature.name }}</td>
            <td :class="getSupportClass(feature.chrome)">{{ getSupportText(feature.chrome) }}</td>
            <td :class="getSupportClass(feature.firefox)">{{ getSupportText(feature.firefox) }}</td>
            <td :class="getSupportClass(feature.safari)">{{ getSupportText(feature.safari) }}</td>
            <td :class="getSupportClass(feature.edge)">{{ getSupportText(feature.edge) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { featureSupportData } from '../data/browserSupportData.js'

export default {
  name: 'FeatureSupportMatrix',
  data() {
    return {
      features: featureSupportData.features
    }
  },
  methods: {
    getSupportClass(support) {
      if (support === 'full') return 'support-full'
      if (support === 'partial') return 'support-partial'
      return 'support-none'
    },
    
    getSupportText(support) {
      if (support === 'full') return '✓ 完全支持'
      if (support === 'partial') return '◐ 部分支持'
      return '✗ 不支持'
    }
  }
}
</script>

<style scoped>
.feature-support-matrix {
  margin: 2rem 0;
}

.feature-support-matrix h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.matrix-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.support-matrix {
  width: 100%;
  border-collapse: collapse;
}

.support-matrix th,
.support-matrix td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.support-matrix th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.feature-name {
  font-weight: 500;
  color: #333;
}

.support-full {
  color: #28a745;
  font-weight: 600;
}

.support-partial {
  color: #ffc107;
  font-weight: 600;
}

.support-none {
  color: #dc3545;
  font-weight: 600;
}
</style>