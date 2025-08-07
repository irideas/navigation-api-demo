<template>
  <div class="event-monitoring">
    <h3>事件监控面板</h3>
    <div class="monitoring-controls">
      <button @click="clearEventLog" class="btn btn-secondary">清空日志</button>
      <button @click="toggleEventMonitoring" class="btn btn-primary">
        {{ eventMonitoring ? '停止监控' : '开始监控' }}
      </button>
    </div>
    
    <div class="event-log">
      <div class="log-entry" 
           v-for="(log, index) in eventLogs" 
           :key="index"
           :class="log.type">
        <span class="timestamp">{{ log.timestamp }}</span>
        <span class="event-type">{{ log.eventType }}</span>
        <span class="event-details">{{ log.details }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { eventMonitoringUtils } from '../utils/eventMonitoringUtils.js'

export default {
  name: 'EventMonitoring',
  data() {
    return {
      eventMonitoring: false,
      eventLogs: []
    }
  },
  mounted() {
    this.setupEventListeners()
  },
  beforeUnmount() {
    this.stopEventMonitoring()
  },
  methods: {
    setupEventListeners() {
      eventMonitoringUtils.setupListeners((log) => {
        this.addEventLog(log)
      })
    },
    
    toggleEventMonitoring() {
      if (this.eventMonitoring) {
        this.stopEventMonitoring()
      } else {
        this.startEventMonitoring()
      }
    },
    
    startEventMonitoring() {
      this.eventMonitoring = true
      eventMonitoringUtils.startMonitoring()
      this.addEventLog({
        type: 'info',
        eventType: 'SYSTEM',
        details: '事件监控已启动',
        timestamp: new Date().toLocaleTimeString()
      })
    },
    
    stopEventMonitoring() {
      this.eventMonitoring = false
      eventMonitoringUtils.stopMonitoring()
      this.addEventLog({
        type: 'info',
        eventType: 'SYSTEM',
        details: '事件监控已停止',
        timestamp: new Date().toLocaleTimeString()
      })
    },
    
    addEventLog(log) {
      this.eventLogs.unshift({
        ...log,
        timestamp: log.timestamp || new Date().toLocaleTimeString()
      })
      
      // 限制日志数量
      if (this.eventLogs.length > 100) {
        this.eventLogs = this.eventLogs.slice(0, 100)
      }
    },
    
    clearEventLog() {
      this.eventLogs = []
    }
  }
}
</script>

<style scoped>
.event-monitoring {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.monitoring-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.event-log {
  max-height: 400px;
  overflow-y: auto;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 1rem;
}

.log-entry {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
}

.log-entry.info {
  background: #e8f4fd;
  border-left: 4px solid #0066cc;
}

.log-entry.success {
  background: #e8f5e8;
  border-left: 4px solid #28a745;
}

.log-entry.warning {
  background: #fff3cd;
  border-left: 4px solid #ffc107;
}

.log-entry.error {
  background: #f8d7da;
  border-left: 4px solid #dc3545;
}

.timestamp {
  color: #666;
  min-width: 80px;
}

.event-type {
  font-weight: bold;
  min-width: 100px;
}

.event-details {
  flex: 1;
  word-break: break-word;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}
</style>