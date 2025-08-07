<template>
  <div class="browser-support">
    <h2>浏览器支持情况</h2>
    
    <div class="intro-section">
      <p>
        Navigation API 是一个相对较新的 Web API，目前仍在发展中。
        本页面提供详细的浏览器支持情况分析，包括主要浏览器的支持状态、
        版本要求以及功能可用性检测。
      </p>
    </div>

    <!-- 当前浏览器检测 -->
    <CurrentBrowserTest />
    
    <!-- 浏览器支持表格 -->
    <BrowserSupportTable />
    
    <!-- 功能支持矩阵 -->
    <FeatureSupportMatrix />
    
    <!-- 兼容性测试工具 -->
    <CompatibilityTesting />
    
    <!-- Polyfill 推荐方案 -->
    <PolyfillRecommendations />
    
    <!-- 迁移指南 -->
    <MigrationGuide />
  </div>
</template>

<script>
import CurrentBrowserTest from './components/CurrentBrowserTest.vue'
import BrowserSupportTable from './components/BrowserSupportTable.vue'
import FeatureSupportMatrix from './components/FeatureSupportMatrix.vue'
import CompatibilityTesting from './components/CompatibilityTesting.vue'
import PolyfillRecommendations from './components/PolyfillRecommendations.vue'
import MigrationGuide from './components/MigrationGuide.vue'

export default {
  name: 'BrowserSupport',
  components: {
    CurrentBrowserTest,
    BrowserSupportTable,
    FeatureSupportMatrix,
    CompatibilityTesting,
    PolyfillRecommendations,
    MigrationGuide
  }
}
</script>

<style scoped>
.browser-support {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.intro-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.intro-section p {
  margin: 0;
  line-height: 1.6;
  color: #495057;
}
</style>