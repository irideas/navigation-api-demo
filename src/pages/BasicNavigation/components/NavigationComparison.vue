<template>
  <div class="navigation-comparison section">
    <h2 class="section-title">基础导航对比</h2>
    
    <div class="api-comparison">
      <div class="api-section">
        <h3>Navigation API</h3>
        <TestCase
          title="Navigation API 基础操作"
          description="使用 Navigation API 进行页面导航"
          :actions="navigationApiActions"
          :result="navigationApiResult"
        />
      </div>
      
      <div class="api-section">
        <h3>History API</h3>
        <TestCase
          title="History API 基础操作"
          description="使用传统 History API 进行页面导航"
          :actions="historyApiActions"
          :result="historyApiResult"
        />
      </div>
    </div>
    
    <ComparisonTable :headers="comparisonHeaders" :data="comparisonData" />
  </div>
</template>

<script>
import TestCase from '@/components/common/TestCase.vue'
import ComparisonTable from '@/components/common/ComparisonTable.vue'

export default {
  name: 'NavigationComparison',
  components: {
    TestCase,
    ComparisonTable
  },
  data() {
    return {
      navigationApiResult: '',
      historyApiResult: '',
      comparisonHeaders: ['功能', 'Navigation API', 'History API', '说明'],
      comparisonData: [
        ['前进', 'navigation.forward()', 'history.forward()', 'Navigation API 返回 Promise'],
        ['后退', 'navigation.back()', 'history.back()', 'Navigation API 返回 Promise'],
        ['跳转', 'navigation.navigate(url)', 'history.pushState()', 'Navigation API 更简洁'],
        ['替换', 'navigation.navigate(url, {history: "replace"})', 'history.replaceState()', '参数方式不同']
      ],
      navigationApiActions: [
        {
          name: 'navigate',
          label: '导航到新页面',
          handler: this.testNavigationApiNavigate
        },
        {
          name: 'back',
          label: '后退',
          handler: this.testNavigationApiBack
        },
        {
          name: 'forward',
          label: '前进',
          handler: this.testNavigationApiForward
        }
      ],
      historyApiActions: [
        {
          name: 'push',
          label: '推入新状态',
          handler: this.testHistoryApiPush
        },
        {
          name: 'back',
          label: '后退',
          handler: this.testHistoryApiBack
        },
        {
          name: 'forward',
          label: '前进',
          handler: this.testHistoryApiForward
        }
      ]
    }
  },
  methods: {
    async testNavigationApiNavigate() {
      if ('navigation' in window) {
        try {
          const result = await navigation.navigate('?test=navigation-api&time=' + Date.now())
          this.navigationApiResult = `导航成功: ${result.committed ? '已提交' : '未提交'}`
        } catch (error) {
          this.navigationApiResult = `导航失败: ${error.message}`
        }
      } else {
        this.navigationApiResult = 'Navigation API 不支持'
      }
    },
    
    async testNavigationApiBack() {
      if ('navigation' in window) {
        try {
          const result = await navigation.back()
          this.navigationApiResult = `后退操作: ${result ? '成功' : '失败'}`
        } catch (error) {
          this.navigationApiResult = `后退失败: ${error.message}`
        }
      } else {
        this.navigationApiResult = 'Navigation API 不支持'
      }
    },
    
    async testNavigationApiForward() {
      if ('navigation' in window) {
        try {
          const result = await navigation.forward()
          this.navigationApiResult = `前进操作: ${result ? '成功' : '失败'}`
        } catch (error) {
          this.navigationApiResult = `前进失败: ${error.message}`
        }
      } else {
        this.navigationApiResult = 'Navigation API 不支持'
      }
    },
    
    testHistoryApiPush() {
      try {
        history.pushState({ test: 'history-api', time: Date.now() }, '', '?test=history-api&time=' + Date.now())
        this.historyApiResult = `状态已推入: ${location.href}`
      } catch (error) {
        this.historyApiResult = `推入失败: ${error.message}`
      }
    },
    
    testHistoryApiBack() {
      try {
        history.back()
        this.historyApiResult = '后退命令已发送'
      } catch (error) {
        this.historyApiResult = `后退失败: ${error.message}`
      }
    },
    
    testHistoryApiForward() {
      try {
        history.forward()
        this.historyApiResult = '前进命令已发送'
      } catch (error) {
        this.historyApiResult = `前进失败: ${error.message}`
      }
    }
  }
}
</script>

<style scoped>
.api-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.api-section h3 {
  color: #495057;
  margin-bottom: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .api-comparison {
    grid-template-columns: 1fr;
  }
}
</style>