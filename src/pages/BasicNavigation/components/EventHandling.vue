<template>
  <div class="event-handling">
    <h3>导航事件处理</h3>
    <div class="event-container">
      <div class="event-controls">
        <div class="button-group">
          <button @click="startEventMonitoring" :disabled="isMonitoring" class="btn btn-primary">
            开始监听事件
          </button>
          <button @click="stopEventMonitoring" :disabled="!isMonitoring" class="btn btn-secondary">
            停止监听
          </button>
          <button @click="clearEventLog" class="btn btn-outline">清除日志</button>
          <button @click="triggerTestNavigation" class="btn btn-success">触发测试导航</button>
        </div>
        
        <div class="monitoring-status">
          <span :class="['status-indicator', { active: isMonitoring }]"></span>
          <span>{{ isMonitoring ? '正在监听事件' : '事件监听已停止' }}</span>
        </div>
      </div>
      
      <div class="event-log">
        <h4>事件日志</h4>
        <div class="log-container">
          <div v-if="eventLog.length > 0" class="log-entries">
            <div v-for="(event, index) in eventLog" :key="index" class="log-entry">
              <div class="log-header">
                <span class="event-type">{{ event.type }}</span>
                <span class="event-api">{{ event.api }}</span>
                <span class="event-time">{{ event.timestamp }}</span>
              </div>
              <div v-if="event.details" class="log-details">
                <pre>{{ JSON.stringify(event.details, null, 2) }}</pre>
              </div>
            </div>
          </div>
          <div v-else class="no-events">
            <p>暂无事件记录，点击"开始监听事件"开始记录</p>
          </div>
        </div>
      </div>
      
      <div class="api-support">
        <h4>API 支持情况</h4>
        <div class="support-grid">
          <div class="support-item">
            <span class="api-name">Navigation API</span>
            <span :class="['support-status', { supported: navigationSupported }]">
              {{ navigationSupported ? '✅ 支持' : '❌ 不支持' }}
            </span>
          </div>
          <div class="support-item">
            <span class="api-name">History API</span>
            <span class="support-status supported">✅ 支持</span>
          </div>
        </div>
      </div>
      
      <div class="event-types">
        <h4>监听的事件类型</h4>
        <div class="types-grid">
          <div class="type-category">
            <h5>Navigation API 事件</h5>
            <ul v-if="navigationSupported">
              <li>navigate</li>
              <li>navigatesuccess</li>
              <li>navigateerror</li>
              <li>currententrychange</li>
            </ul>
            <p v-else class="not-supported">当前浏览器不支持</p>
          </div>
          
          <div class="type-category">
            <h5>History API 事件</h5>
            <ul>
              <li>popstate</li>
              <li>beforeunload</li>
              <li>hashchange</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventHandling',
  data() {
    return {
      isMonitoring: false,
      eventLog: [],
      navigationSupported: false,
      eventListeners: []
    }
  },
  mounted() {
    this.navigationSupported = 'navigation' in window
  },
  beforeUnmount() {
    this.stopEventMonitoring()
  },
  methods: {
    startEventMonitoring() {
      if (this.isMonitoring) return
      
      this.isMonitoring = true
      this.eventListeners = []
      
      // Navigation API 事件监听
      if (this.navigationSupported) {
        const navigateHandler = (event) => {
          this.logEvent('navigate', 'Navigation API', {
            destination: event.destination?.url,
            canIntercept: event.canIntercept,
            userInitiated: event.userInitiated,
            hashChange: event.hashChange,
            formData: event.formData ? 'FormData present' : null
          })
        }
        
        const navigateSuccessHandler = (event) => {
          this.logEvent('navigatesuccess', 'Navigation API', {
            destination: event.destination?.url
          })
        }
        
        const navigateErrorHandler = (event) => {
          this.logEvent('navigateerror', 'Navigation API', {
            error: event.error?.message,
            destination: event.destination?.url
          })
        }
        
        const currentEntryChangeHandler = (event) => {
          this.logEvent('currententrychange', 'Navigation API', {
            from: event.from?.url,
            navigationType: event.navigationType
          })
        }
        
        navigation.addEventListener('navigate', navigateHandler)
        navigation.addEventListener('navigatesuccess', navigateSuccessHandler)
        navigation.addEventListener('navigateerror', navigateErrorHandler)
        navigation.addEventListener('currententrychange', currentEntryChangeHandler)
        
        this.eventListeners.push(
          { target: navigation, type: 'navigate', handler: navigateHandler },
          { target: navigation, type: 'navigatesuccess', handler: navigateSuccessHandler },
          { target: navigation, type: 'navigateerror', handler: navigateErrorHandler },
          { target: navigation, type: 'currententrychange', handler: currentEntryChangeHandler }
        )
      }
      
      // History API 事件监听
      const popstateHandler = (event) => {
        this.logEvent('popstate', 'History API', {
          state: event.state,
          url: window.location.href
        })
      }
      
      const beforeunloadHandler = (event) => {
        this.logEvent('beforeunload', 'History API', {
          returnValue: event.returnValue
        })
      }
      
      const hashchangeHandler = (event) => {
        this.logEvent('hashchange', 'History API', {
          oldURL: event.oldURL,
          newURL: event.newURL
        })
      }
      
      window.addEventListener('popstate', popstateHandler)
      window.addEventListener('beforeunload', beforeunloadHandler)
      window.addEventListener('hashchange', hashchangeHandler)
      
      this.eventListeners.push(
        { target: window, type: 'popstate', handler: popstateHandler },
        { target: window, type: 'beforeunload', handler: beforeunloadHandler },
        { target: window, type: 'hashchange', handler: hashchangeHandler }
      )
      
      this.logEvent('monitoring-start', 'System', { message: '开始监听导航事件' })
    },
    
    stopEventMonitoring() {
      if (!this.isMonitoring) return
      
      // 移除所有事件监听器
      this.eventListeners.forEach(({ target, type, handler }) => {
        target.removeEventListener(type, handler)
      })
      
      this.eventListeners = []
      this.isMonitoring = false
      
      this.logEvent('monitoring-stop', 'System', { message: '停止监听导航事件' })
    },
    
    clearEventLog() {
      this.eventLog = []
    },
    
    triggerTestNavigation() {
      const testUrl = new URL(window.location)
      testUrl.searchParams.set('test', Date.now())
      
      if (this.navigationSupported && navigation.navigate) {
        navigation.navigate(testUrl.toString())
      } else {
        history.pushState({ test: true }, '', testUrl.toString())
      }
    },
    
    logEvent(type, api, details = null) {
      const event = {
        type,
        api,
        details,
        timestamp: new Date().toLocaleTimeString()
      }
      
      this.eventLog.unshift(event)
      
      // 限制日志条目数量
      if (this.eventLog.length > 50) {
        this.eventLog = this.eventLog.slice(0, 50)
      }
    }
  }
}
</script>

<style scoped>
.event-handling {
  margin: 2rem 0;
}

.event-handling h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.event-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.event-controls {
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.monitoring-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #dc3545;
  transition: background-color 0.3s ease;
}

.status-indicator.active {
  background: #28a745;
}

.event-log h4,
.api-support h4,
.event-types h4 {
  color: #333;
  margin-bottom: 1rem;
}

.log-container {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 2rem;
}

.log-entries {
  padding: 1rem;
}

.log-entry {
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.log-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.event-type {
  font-weight: 600;
  color: #007bff;
}

.event-api {
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8em;
  color: #495057;
}

.event-time {
  margin-left: auto;
  font-size: 0.8em;
  color: #6c757d;
}

.log-details {
  padding: 0.75rem;
}

.log-details pre {
  margin: 0;
  font-size: 0.8em;
  color: #333;
  overflow-x: auto;
}

.no-events {
  padding: 2rem;
  text-align: center;
  color: #6c757d;
  font-style: italic;
}

.support-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.support-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.api-name {
  font-weight: 500;
}

.support-status {
  font-size: 0.9em;
}

.support-status.supported {
  color: #28a745;
}

.types-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.type-category {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.type-category h5 {
  margin-bottom: 0.5rem;
  color: #333;
}

.type-category ul {
  list-style: none;
  padding: 0;
}

.type-category li {
  padding: 0.25rem 0;
  color: #495057;
  font-family: monospace;
  font-size: 0.9em;
}

.not-supported {
  color: #6c757d;
  font-style: italic;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-outline {
  background: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn:hover:not(:disabled) {
  opacity: 0.9;
}
</style>