<template>
  <div class="polyfill-principles">
    <h3>Polyfill 实现原理</h3>
    <div class="principle-sections">
      <div v-for="principle in polyfillPrinciples" :key="principle.id" class="principle-section">
        <h4>{{ principle.title }}</h4>
        <p>{{ principle.description }}</p>
        <div v-if="principle.code" class="code-block">
          <pre><code>{{ principle.code }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { polyfillPrinciplesData } from '../data/polyfillPrinciplesData.js'

export default {
  name: 'PolyfillPrinciples',
  data() {
    return {
      polyfillPrinciples: polyfillPrinciplesData
    }
  }
}
</script>

<style scoped>
.polyfill-principles {
  margin: 2rem 0;
}

.polyfill-principles h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.principle-sections {
  display: grid;
  gap: 2rem;
  margin-top: 1rem;
}

.principle-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.principle-section h4 {
  color: #667eea;
  margin-bottom: 1rem;
}

.principle-section p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.code-block {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9em;
  line-height: 1.4;
}
</style>