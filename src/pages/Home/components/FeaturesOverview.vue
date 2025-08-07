<template>
  <div class="features-overview section">
    <h3 class="section-title">功能模块</h3>
    <div class="feature-grid">
      <div class="feature-card" v-for="feature in features" :key="feature.name">
        <div class="feature-icon">{{ feature.icon }}</div>
        <h4>{{ feature.title }}</h4>
        <p>{{ feature.description }}</p>
        <router-link :to="feature.path" class="btn btn-primary">查看详情</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturesOverview',
  data() {
    return {
      features: [
        {
          name: 'basic-navigation',
          path: '/basic-navigation',
          title: '基础导航',
          icon: '🧭',
          description: '对比基本的页面导航功能，包括前进、后退、跳转等操作'
        },
        {
          name: 'navigation-entries',
          path: '/navigation-entries',
          title: '导航条目',
          icon: '📋',
          description: '测试导航历史条目的管理和操作功能'
        },
        {
          name: 'navigation-events',
          path: '/navigation-events',
          title: '导航事件',
          icon: '⚡',
          description: '对比导航事件的监听和处理机制'
        },
        {
          name: 'polyfill-analysis',
          path: '/polyfill-analysis',
          title: 'Polyfill 分析',
          icon: '🔧',
          description: '详细分析 Navigation API 的 Polyfill 实现原理和限制'
        },
        {
          name: 'browser-support',
          path: '/browser-support',
          title: '浏览器支持',
          icon: '🌐',
          description: '测试不同浏览器版本对 Navigation API 的支持情况'
        }
      ]
    }
  }
}
</script>

<style scoped>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h4 {
  color: #495057;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.feature-card p {
  margin-bottom: 1.5rem;
  color: #6c757d;
  line-height: 1.6;
}
</style>