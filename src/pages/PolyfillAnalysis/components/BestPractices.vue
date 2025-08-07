<template>
  <div class="best-practices">
    <h3>最佳实践</h3>
    <div class="practice-list">
      <div v-for="practice in bestPractices" :key="practice.id" class="practice-item">
        <h4>{{ practice.title }}</h4>
        <p>{{ practice.description }}</p>
        <div v-if="practice.example" class="code-example">
          <h5>示例代码</h5>
          <pre><code>{{ practice.example }}</code></pre>
        </div>
        <div v-if="practice.tips" class="tips-section">
          <h5>实用技巧</h5>
          <ul>
            <li v-for="tip in practice.tips" :key="tip">{{ tip }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bestPracticesData } from '../data/bestPracticesData.js'

export default {
  name: 'BestPractices',
  data() {
    return {
      bestPractices: bestPracticesData
    }
  }
}
</script>

<style scoped>
.best-practices {
  margin: 2rem 0;
}

.best-practices h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.practice-list {
  display: grid;
  gap: 1.5rem;
  margin-top: 1rem;
}

.practice-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  border-left: 4px solid #28a745;
}

.practice-item h4 {
  color: #28a745;
  margin-bottom: 1rem;
}

.practice-item p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.code-example {
  margin-top: 1rem;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
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
}

.tips-section {
  margin-top: 1rem;
}

.tips-section h5 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.9em;
}

.tips-section ul {
  margin: 0;
  padding-left: 1.5rem;
}

.tips-section li {
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
</style>