<template>
  <div class="comparison-table-wrapper">
    <div class="table-container">
      <table class="comparison-table">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              <span v-if="cellIndex > 0 && isSupportCell(cell)" :class="getSupportClass(cell)">
                {{ cell }}
              </span>
              <span v-else>{{ cell }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComparisonTable',
  props: {
    headers: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    isSupportCell(cell) {
      return typeof cell === 'string' && (
        cell.includes('支持') || 
        cell.includes('不支持') || 
        cell.includes('部分') ||
        cell.includes('✓') ||
        cell.includes('✗') ||
        cell.includes('◐')
      )
    },
    getSupportClass(cell) {
      if (cell.includes('不支持') || cell.includes('✗')) return 'support-no'
      if (cell.includes('部分') || cell.includes('◐')) return 'support-partial'
      if (cell.includes('支持') || cell.includes('✓')) return 'support-yes'
      return ''
    }
  }
}
</script>

<style scoped>
.comparison-table-wrapper {
  margin: 1rem 0;
}

.table-container {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.comparison-table th,
.comparison-table td {
  border: 1px solid #e9ecef;
  padding: 0.75rem;
  text-align: left;
}

.comparison-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.comparison-table tr:nth-child(even) {
  background: #f8f9fa;
}

.support-yes {
  color: #28a745;
  font-weight: bold;
}

.support-no {
  color: #dc3545;
  font-weight: bold;
}

.support-partial {
  color: #ffc107;
  font-weight: bold;
}
</style>