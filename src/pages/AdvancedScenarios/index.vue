<template>
  <div class="advanced-scenarios">
    <h1 class="page-title">高级场景演示</h1>
    <p class="page-subtitle">探索 Navigation API 在复杂应用场景中的实际应用</p>

    <!-- 单页应用路由管理 -->
    <SpaRouteManagement />

    <!-- 表单导航拦截 -->
    <FormNavigationInterception />

    <!-- 深度链接处理 -->
    <DeepLinkHandling />

    <!-- 历史记录管理 -->
    <HistoryManagement />

    <!-- 性能优化场景 -->
    <PerformanceOptimization />

    <!-- API 对比总结 -->
    <ApiComparison />
  </div>
</template>

<script>
import SpaRouteManagement from './components/SpaRouteManagement.vue'
import FormNavigationInterception from './components/FormNavigationInterception.vue'
import DeepLinkHandling from './components/DeepLinkHandling.vue'
import HistoryManagement from './components/HistoryManagement.vue'
import PerformanceOptimization from './components/PerformanceOptimization.vue'
import ApiComparison from './components/ApiComparison.vue'

export default {
  name: 'AdvancedScenarios',
  components: {
    SpaRouteManagement,
    FormNavigationInterception,
    DeepLinkHandling,
    HistoryManagement,
    PerformanceOptimization,
    ApiComparison
  }
}
</script>

<style scoped>
.advanced-scenarios {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
  text-align: center;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 40px;
}
</style>