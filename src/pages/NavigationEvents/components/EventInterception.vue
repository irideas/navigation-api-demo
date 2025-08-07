<template>
  <div class="event-interception">
    <h3>导航拦截功能演示</h3>
    <div class="interception-demo">
      <div class="demo-controls">
        <label>
          <input type="checkbox" v-model="enableInterception"> 
          启用导航拦截
        </label>
        <label>
          <input type="checkbox" v-model="enableConfirmation"> 
          启用确认对话框
        </label>
      </div>
      
      <div class="test-links">
        <a href="?test=1" @click="handleLinkClick">测试链接 1</a>
        <a href="?test=2" @click="handleLinkClick">测试链接 2</a>
        <a href="?test=3" @click="handleLinkClick">测试链接 3</a>
      </div>
      
      <div class="status-display">{{ interceptionStatus }}</div>
    </div>
  </div>
</template>

<script>
import { interceptionUtils } from '../utils/interceptionUtils.js'

export default {
  name: 'EventInterception',
  data() {
    return {
      enableInterception: false,
      enableConfirmation: false,
      interceptionStatus: '导航拦截未启用'
    }
  },
  watch: {
    enableInterception(newValue) {
      if (newValue) {
        this.setupInterception()
      } else {
        this.removeInterception()
      }
    }
  },
  mounted() {
    this.setupInterception()
  },
  beforeUnmount() {
    this.removeInterception()
  },
  methods: {
    setupInterception() {
      interceptionUtils.setupInterception({
        enabled: this.enableInterception,
        confirmation: this.enableConfirmation,
        onIntercept: (event) => {
          this.interceptionStatus = `拦截导航: ${event.destination || event.target}`
        },
        onCancel: (event) => {
          this.interceptionStatus = `取消导航: ${event.destination || event.target}`
        },
        onAllow: (event) => {
          this.interceptionStatus = `允许导航: ${event.destination || event.target}`
        }
      })
    },
    
    removeInterception() {
      interceptionUtils.removeInterception()
      this.interceptionStatus = '导航拦截已移除'
    },
    
    handleLinkClick(event) {
      if (!this.enableInterception) {
        return true
      }
      
      event.preventDefault()
      
      const href = event.target.href
      const shouldIntercept = interceptionUtils.shouldInterceptNavigation(href)
      
      if (shouldIntercept) {
        if (this.enableConfirmation) {
          const confirmed = confirm(`确定要导航到 ${href} 吗？`)
          if (confirmed) {
            this.interceptionStatus = `用户确认导航到: ${href}`
            window.location.href = href
          } else {
            this.interceptionStatus = `用户取消导航到: ${href}`
          }
        } else {
          this.interceptionStatus = `自动拦截导航到: ${href}`
        }
      } else {
        this.interceptionStatus = `允许导航到: ${href}`
        window.location.href = href
      }
    }
  }
}
</script>

<style scoped>
.event-interception {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.interception-demo {
  margin-top: 1rem;
}

.demo-controls {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.demo-controls label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.demo-controls input[type="checkbox"] {
  margin: 0;
}

.test-links {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.test-links a {
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.test-links a:hover {
  background: #5a6fd8;
}

.status-display {
  padding: 1rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  font-family: monospace;
  white-space: pre-wrap;
  min-height: 60px;
}
</style>