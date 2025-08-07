<template>
  <div class="test-case">
    <div class="test-header">
      <h4>{{ title }}</h4>
      <span v-if="status" :class="getStatusClass(status)">{{ status }}</span>
    </div>
    <div class="test-description">
      <p>{{ description }}</p>
    </div>
    <div class="test-controls">
      <button 
        v-for="action in actions" 
        :key="action.name"
        @click="action.handler"
        :class="['btn', action.type || 'btn-primary']"
      >
        {{ action.label }}
      </button>
    </div>
    <div v-if="result" class="test-result">
      <h5>测试结果：</h5>
      <pre>{{ result }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestCase',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    actions: {
      type: Array,
      default: () => []
    },
    result: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    }
  },
  methods: {
    getStatusClass(status) {
      const statusMap = {
        'success': 'status-success',
        'error': 'status-error',
        'warning': 'status-warning',
        'info': 'status-info'
      }
      return statusMap[status] || 'status-default'
    }
  }
}
</script>

<style scoped>
.test-case {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.test-header h4 {
  margin: 0;
  color: #495057;
}

.test-description {
  margin-bottom: 1rem;
  color: #6c757d;
}

.test-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.test-result {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
}

.test-result h5 {
  margin: 0 0 0.5rem 0;
  color: #495057;
}

.test-result pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.status-success {
  color: #28a745;
  font-weight: bold;
}

.status-error {
  color: #dc3545;
  font-weight: bold;
}

.status-warning {
  color: #ffc107;
  font-weight: bold;
}

.status-info {
  color: #17a2b8;
  font-weight: bold;
}

.status-default {
  color: #6c757d;
  font-weight: bold;
}
</style>