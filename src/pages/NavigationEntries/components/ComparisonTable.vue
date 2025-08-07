<template>
  <div class="comparison-table-section">
    <h3>条目功能对比</h3>
    <table class="comparison-table">
      <thead>
        <tr>
          <th>功能</th>
          <th>Navigation API</th>
          <th>History API</th>
          <th>Polyfill 实现</th>
          <th>限制说明</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feature in entryFeatures" :key="feature.name">
          <td><strong>{{ feature.name }}</strong></td>
          <td>
            <span :class="getSupportClass(feature.navigationAPI)">
              {{ feature.navigationAPI }}
            </span>
          </td>
          <td>
            <span :class="getSupportClass(feature.historyAPI)">
              {{ feature.historyAPI }}
            </span>
          </td>
          <td>
            <span :class="getSupportClass(feature.polyfill)">
              {{ feature.polyfill }}
            </span>
          </td>
          <td>{{ feature.limitation }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { comparisonData } from '../data/comparisonData.js'

export default {
  name: 'ComparisonTable',
  data() {
    return {
      entryFeatures: comparisonData.entryFeatures
    }
  },
  methods: {
    getSupportClass(support) {
      if (support === '完全支持' || support === '原生支持') return 'support-full'
      if (support === '部分支持' || support === '有限支持') return 'support-partial'
      if (support === '不支持') return 'support-none'
      return 'support-unknown'
    }
  }
}
</script>

<style scoped>
.comparison-table-section {
  margin: 2rem 0;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  color: #495057;
}

.comparison-table tr:hover {
  background: #f8f9fa;
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

.support-unknown {
  color: #6c757d;
}
</style>