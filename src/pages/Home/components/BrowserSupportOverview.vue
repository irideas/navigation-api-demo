<template>
  <div class="browser-support-overview section">
    <h3 class="section-title">浏览器支持概览</h3>
    <ComparisonTable :headers="headers" :data="browserSupportData" />
  </div>
</template>

<script>
import ComparisonTable from '@/components/common/ComparisonTable.vue'

export default {
  name: 'BrowserSupportOverview',
  components: {
    ComparisonTable
  },
  data() {
    return {
      headers: ['功能', 'Chrome (2020+)', 'Safari (2020+)', 'Polyfill 可行性'],
      browserSupportData: [
        ['Navigation API', '102+', '不支持', '部分支持'],
        ['navigate() 方法', '102+', '不支持', '完全支持'],
        ['intercept() 方法', '105+', '不支持', '不支持'],
        ['navigation.entries', '102+', '不支持', '部分支持'],
        ['NavigateEvent', '102+', '不支持', '部分支持']
      ]
    }
  }
}
</script>