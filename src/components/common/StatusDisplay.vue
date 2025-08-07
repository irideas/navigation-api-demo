<template>
  <div class="status-display" :class="getStatusClass(type)">
    <div class="status-header" v-if="title">
      <h5>{{ title }}</h5>
      <span v-if="timestamp" class="timestamp">{{ formatTime(timestamp) }}</span>
    </div>
    <div class="status-content">
      <pre v-if="typeof content === 'string'">{{ content }}</pre>
      <div v-else>
        <div v-for="(item, key) in content" :key="key" class="status-item">
          <strong>{{ key }}:</strong> {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusDisplay',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: [String, Object],
      required: true
    },
    type: {
      type: String,
      default: 'info', // info, success, warning, error
      validator: value => ['info', 'success', 'warning', 'error'].includes(value)
    },
    timestamp: {
      type: Date,
      default: null
    }
  },
  methods: {
    getStatusClass(type) {
      return `status-${type}`
    },
    formatTime(date) {
      if (!date) return ''
      return date.toLocaleTimeString()
    }
  }
}
</script>

<style scoped>
.status-display {
  border-radius: 6px;
  padding: 1rem;
  margin: 1rem 0;
  border-left: 4px solid;
}

.status-info {
  background: #e7f3ff;
  border-left-color: #0066cc;
  color: #004499;
}

.status-success {
  background: #e8f5e8;
  border-left-color: #28a745;
  color: #155724;
}

.status-warning {
  background: #fff8e1;
  border-left-color: #ffc107;
  color: #856404;
}

.status-error {
  background: #ffeaea;
  border-left-color: #dc3545;
  color: #721c24;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.status-header h5 {
  margin: 0;
  font-weight: 600;
}

.timestamp {
  font-size: 0.8rem;
  opacity: 0.7;
}

.status-content pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
}

.status-item {
  margin-bottom: 0.5rem;
}

.status-item:last-child {
  margin-bottom: 0;
}
</style>