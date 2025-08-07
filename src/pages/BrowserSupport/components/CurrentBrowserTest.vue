<template>
  <div class="current-browser-test">
    <h3>当前浏览器检测</h3>
    <div class="browser-info">
      <div class="info-card">
        <h4>浏览器信息</h4>
        <div class="info-item">
          <strong>User Agent:</strong>
          <div class="user-agent">{{ userAgent }}</div>
        </div>
        <div class="info-item">
          <strong>浏览器:</strong> {{ browserName }}
        </div>
        <div class="info-item">
          <strong>版本:</strong> {{ browserVersion }}
        </div>
        <div class="info-item">
          <strong>平台:</strong> {{ platform }}
        </div>
      </div>
      
      <div class="info-card">
        <h4>Navigation API 支持检测</h4>
        <div class="support-status">
          <div class="status-item">
            <span class="status-label">navigation 对象:</span>
            <span :class="getStatusClass(hasNavigation)">
              {{ hasNavigation ? '✓ 支持' : '✗ 不支持' }}
            </span>
          </div>
          <div class="status-item">
            <span class="status-label">navigation.navigate():</span>
            <span :class="getStatusClass(hasNavigate)">
              {{ hasNavigate ? '✓ 支持' : '✗ 不支持' }}
            </span>
          </div>
          <div class="status-item">
            <span class="status-label">navigation.entries():</span>
            <span :class="getStatusClass(hasEntries)">
              {{ hasEntries ? '✓ 支持' : '✗ 不支持' }}
            </span>
          </div>
          <div class="status-item">
            <span class="status-label">navigation.currentEntry:</span>
            <span :class="getStatusClass(hasCurrentEntry)">
              {{ hasCurrentEntry ? '✓ 支持' : '✗ 不支持' }}
            </span>
          </div>
          <div class="status-item">
            <span class="status-label">NavigateEvent:</span>
            <span :class="getStatusClass(hasNavigateEvent)">
              {{ hasNavigateEvent ? '✓ 支持' : '✗ 不支持' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { browserDetectionUtils } from '../utils/browserDetectionUtils.js'

export default {
  name: 'CurrentBrowserTest',
  data() {
    return {
      userAgent: navigator.userAgent,
      browserName: '',
      browserVersion: '',
      platform: navigator.platform,
      
      hasNavigation: false,
      hasNavigate: false,
      hasEntries: false,
      hasCurrentEntry: false,
      hasNavigateEvent: false
    }
  },
  mounted() {
    this.detectBrowser()
    this.detectNavigationSupport()
  },
  methods: {
    detectBrowser() {
      const browserInfo = browserDetectionUtils.getBrowserInfo()
      this.browserName = browserInfo.name
      this.browserVersion = browserInfo.version
    },
    
    detectNavigationSupport() {
      const support = browserDetectionUtils.detectNavigationSupport()
      this.hasNavigation = support.hasNavigation
      this.hasNavigate = support.hasNavigate
      this.hasEntries = support.hasEntries
      this.hasCurrentEntry = support.hasCurrentEntry
      this.hasNavigateEvent = support.hasNavigateEvent
    },
    
    getStatusClass(supported) {
      return supported ? 'status-supported' : 'status-unsupported'
    }
  }
}
</script>

<style scoped>
.current-browser-test {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.browser-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.info-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.info-card h4 {
  margin: 0 0 1rem 0;
  color: #495057;
}

.info-item {
  margin-bottom: 1rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #495057;
}

.user-agent {
  font-family: monospace;
  font-size: 0.9rem;
  background: white;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  word-break: break-all;
}

.support-status {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.status-label {
  font-weight: 500;
}

.status-supported {
  color: #28a745;
  font-weight: bold;
}

.status-unsupported {
  color: #dc3545;
  font-weight: bold;
}

@media (max-width: 768px) {
  .browser-info {
    grid-template-columns: 1fr;
  }
}
</style>