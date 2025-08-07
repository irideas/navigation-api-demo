<template>
  <div class="intro-section section">
    <h3 class="section-title">项目概述</h3>
    <p>
      本项目旨在全面对比 Navigation API 与传统的 History API + Location API 的功能差异，
      并提供详细的 Polyfill 实现分析。主要针对 Chrome 和 Safari 浏览器从 2020 年起的主要版本进行测试。
    </p>
    <div class="intro-highlights">
      <div class="highlight-item">
        <h4>🎯 全面对比</h4>
        <p>详细对比两种 API 的功能差异和使用场景</p>
      </div>
      <div class="highlight-item">
        <h4>🔧 实用工具</h4>
        <p>提供完整的 Polyfill 实现和最佳实践</p>
      </div>
      <div class="highlight-item">
        <h4>📊 兼容性分析</h4>
        <p>详细的浏览器支持情况和版本对比</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectIntro'
}
</script>

<style scoped>
.intro-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.highlight-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.highlight-item h4 {
  margin-bottom: 0.5rem;
  color: #495057;
}

.highlight-item p {
  margin: 0;
  color: #6c757d;
}
</style>