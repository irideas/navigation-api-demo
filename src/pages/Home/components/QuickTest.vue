<template>
  <div class="quick-test section">
    <h3 class="section-title">快速测试</h3>
    <TestCase
      title="API 可用性测试"
      description="快速检测当前浏览器对 Navigation API 和 History API 的支持情况"
      :actions="testActions"
      :result="testResult"
      :status="testStatus"
    />
  </div>
</template>

<script>
import TestCase from '@/components/common/TestCase.vue'

export default {
  name: 'QuickTest',
  components: {
    TestCase
  },
  data() {
    return {
      testResult: '',
      testStatus: '',
      testActions: [
        {
          name: 'navigation-api',
          label: '测试 Navigation API',
          handler: this.testNavigationAPI,
          type: 'btn-primary'
        },
        {
          name: 'history-api',
          label: '测试 History API',
          handler: this.testHistoryAPI,
          type: 'btn-secondary'
        }
      ]
    }
  },
  methods: {
    testNavigationAPI() {
      try {
        if ('navigation' in window) {
          this.testResult = `Navigation API 可用！
当前 URL: ${location.href}
导航条目数量: ${navigation.entries().length}
当前索引: ${navigation.currentEntry?.index || 'N/A'}`
          this.testStatus = 'success'
        } else {
          this.testResult = 'Navigation API 不可用，浏览器不支持此功能'
          this.testStatus = 'warning'
        }
      } catch (error) {
        this.testResult = `Navigation API 测试出错: ${error.message}`
        this.testStatus = 'error'
      }
    },
    
    testHistoryAPI() {
      try {
        this.testResult = `History API 状态:
当前 URL: ${location.href}
History 长度: ${history.length}
State: ${JSON.stringify(history.state, null, 2) || 'null'}`
        this.testStatus = 'success'
      } catch (error) {
        this.testResult = `History API 测试出错: ${error.message}`
        this.testStatus = 'error'
      }
    }
  }
}
</script>