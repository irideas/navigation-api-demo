<template>
  <div class="polyfill-recommendations">
    <h3>Polyfill 推荐方案</h3>
    <div class="recommendations-container">
      <div v-for="recommendation in recommendations" :key="recommendation.id" class="recommendation-item">
        <div class="recommendation-header">
          <h4>{{ recommendation.title }}</h4>
          <span :class="getRecommendationClass(recommendation.level)">{{ recommendation.level }}</span>
        </div>
        <p class="recommendation-description">{{ recommendation.description }}</p>
        
        <div class="pros-cons">
          <div class="pros">
            <h5>优点</h5>
            <ul>
              <li v-for="pro in recommendation.pros" :key="pro">{{ pro }}</li>
            </ul>
          </div>
          <div class="cons">
            <h5>缺点</h5>
            <ul>
              <li v-for="con in recommendation.cons" :key="con">{{ con }}</li>
            </ul>
          </div>
        </div>
        
        <div v-if="recommendation.code" class="code-example">
          <h5>使用示例</h5>
          <pre><code>{{ recommendation.code }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { polyfillRecommendationsData } from '../data/browserSupportData.js'

export default {
  name: 'PolyfillRecommendations',
  data() {
    return {
      recommendations: polyfillRecommendationsData
    }
  },
  methods: {
    getRecommendationClass(level) {
      if (level === '推荐') return 'level-recommended'
      if (level === '可选') return 'level-optional'
      return 'level-not-recommended'
    }
  }
}
</script>

<style scoped>
.polyfill-recommendations {
  margin: 2rem 0;
}

.polyfill-recommendations h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.recommendations-container {
  display: grid;
  gap: 2rem;
}

.recommendation-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.recommendation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.recommendation-header h4 {
  color: #333;
  margin: 0;
}

.level-recommended {
  background: #28a745;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 600;
}

.level-optional {
  background: #ffc107;
  color: #212529;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 600;
}

.level-not-recommended {
  background: #dc3545;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 600;
}

.recommendation-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.pros, .cons {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
}

.pros h5, .cons h5 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.9em;
}

.pros ul, .cons ul {
  margin: 0;
  padding-left: 1.5rem;
}

.pros li, .cons li {
  margin-bottom: 0.25rem;
  font-size: 0.9em;
  line-height: 1.4;
}

.code-example {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.code-example h5 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.9em;
}

.code-example pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9em;
  line-height: 1.4;
  overflow-x: auto;
}
</style>