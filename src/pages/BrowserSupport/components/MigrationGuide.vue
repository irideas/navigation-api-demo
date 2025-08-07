<template>
  <div class="migration-guide">
    <h3>迁移指南</h3>
    <div class="guide-container">
      <div class="migration-steps">
        <div v-for="step in migrationSteps" :key="step.id" class="step-item">
          <div class="step-header">
            <div class="step-number">{{ step.step }}</div>
            <h4>{{ step.title }}</h4>
          </div>
          <p class="step-description">{{ step.description }}</p>
          
          <div v-if="step.before || step.after" class="code-comparison">
            <div v-if="step.before" class="code-before">
              <h5>迁移前 (History API)</h5>
              <pre><code>{{ step.before }}</code></pre>
            </div>
            <div v-if="step.after" class="code-after">
              <h5>迁移后 (Navigation API)</h5>
              <pre><code>{{ step.after }}</code></pre>
            </div>
          </div>
          
          <div v-if="step.notes" class="step-notes">
            <h5>注意事项</h5>
            <ul>
              <li v-for="note in step.notes" :key="note">{{ note }}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="migration-checklist">
        <h4>迁移检查清单</h4>
        <div class="checklist-items">
          <label v-for="item in checklist" :key="item.id" class="checklist-item">
            <input type="checkbox" v-model="item.checked">
            <span>{{ item.text }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { migrationGuideData } from '../data/browserSupportData.js'

export default {
  name: 'MigrationGuide',
  data() {
    return {
      migrationSteps: migrationGuideData.steps,
      checklist: migrationGuideData.checklist.map(item => ({
        ...item,
        checked: false
      }))
    }
  }
}
</script>

<style scoped>
.migration-guide {
  margin: 2rem 0;
}

.migration-guide h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.guide-container {
  display: grid;
  gap: 2rem;
}

.migration-steps {
  display: grid;
  gap: 2rem;
}

.step-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.step-number {
  background: #667eea;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 1rem;
}

.step-header h4 {
  color: #333;
  margin: 0;
}

.step-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.code-before, .code-after {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.code-before h5 {
  color: #dc3545;
  margin-bottom: 0.5rem;
  font-size: 0.9em;
}

.code-after h5 {
  color: #28a745;
  margin-bottom: 0.5rem;
  font-size: 0.9em;
}

.code-before pre, .code-after pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9em;
  line-height: 1.4;
  overflow-x: auto;
}

.step-notes {
  background: #fff3cd;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #ffeaa7;
}

.step-notes h5 {
  color: #856404;
  margin-bottom: 0.5rem;
  font-size: 0.9em;
}

.step-notes ul {
  margin: 0;
  padding-left: 1.5rem;
}

.step-notes li {
  color: #856404;
  margin-bottom: 0.25rem;
  font-size: 0.9em;
  line-height: 1.4;
}

.migration-checklist {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.migration-checklist h4 {
  color: #333;
  margin-bottom: 1rem;
}

.checklist-items {
  display: grid;
  gap: 0.5rem;
}

.checklist-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.checklist-item:hover {
  background: #f8f9fa;
}

.checklist-item input {
  margin-right: 0.5rem;
}

.checklist-item span {
  color: #333;
  font-size: 0.9em;
}
</style>