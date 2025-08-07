<template>
  <div class="browser-support-table">
    <h3>主要浏览器支持情况</h3>
    <div class="table-container">
      <table class="support-table">
        <thead>
          <tr>
            <th>浏览器</th>
            <th>最低支持版本</th>
            <th>当前状态</th>
            <th>核心功能</th>
            <th>实验性功能</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="browser in browserSupport" :key="browser.name">
            <td>
              <div class="browser-name">
                <span class="browser-icon">{{ browser.icon }}</span>
                {{ browser.name }}
              </div>
            </td>
            <td>{{ browser.minVersion }}</td>
            <td>
              <span :class="getSupportStatusClass(browser.status)">
                {{ browser.status }}
              </span>
            </td>
            <td>
              <div class="feature-list">
                <span v-for="feature in browser.coreFeatures" 
                      :key="feature.name"
                      :class="getFeatureClass(feature.supported)"
                      :title="feature.name">
                  {{ feature.name }}
                </span>
              </div>
            </td>
            <td>
              <div class="feature-list">
                <span v-for="feature in browser.experimentalFeatures" 
                      :key="feature.name"
                      :class="getFeatureClass(feature.supported)"
                      :title="feature.name">
                  {{ feature.name }}
                </span>
              </div>
            </td>
            <td>{{ browser.notes }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { browserSupportData } from '../data/browserSupportData.js'

export default {
  name: 'BrowserSupportTable',
  data() {
    return {
      browserSupport: browserSupportData.getBrowserSupport()
    }
  },
  methods: {
    getSupportStatusClass(status) {
      switch (status) {
        case '完全支持':
          return 'status-full-support'
        case '开发中':
          return 'status-in-development'
        case '未支持':
          return 'status-no-support'
        default:
          return 'status-unknown'
      }
    },
    
    getFeatureClass(supported) {
      return supported ? 'feature-supported' : 'feature-unsupported'
    }
  }
}
</script>

<style scoped>
.browser-support-table {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.table-container {
  overflow-x: auto;
  margin-top: 1.5rem;
}

.support-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.support-table th,
.support-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
  vertical-align: top;
}

.support-table th {
  background: #f8f9fa;
  font-weight: 600;
  position: sticky;
  top: 0;
}

.browser-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.browser-icon {
  font-size: 1.2rem;
}

.status-full-support {
  color: #28a745;
  font-weight: bold;
}

.status-in-development {
  color: #ffc107;
  font-weight: bold;
}

.status-no-support {
  color: #dc3545;
  font-weight: bold;
}

.status-unknown {
  color: #6c757d;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.feature-supported {
  color: #28a745;
  font-size: 0.9rem;
}

.feature-unsupported {
  color: #dc3545;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .support-table th,
  .support-table td {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>