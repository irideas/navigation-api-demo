<template>
  <div class="core-problems">
    <h3>核心问题分析</h3>
    <div class="problem-list">
      <div v-for="problem in coreProblems" :key="problem.id" class="problem-item">
        <h4>{{ problem.title }}</h4>
        <p><strong>问题描述:</strong> {{ problem.description }}</p>
        <p><strong>技术挑战:</strong> {{ problem.challenge }}</p>
        <p><strong>解决方案:</strong> {{ problem.solution }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { coreProblemsData } from '../data/coreProblemsData.js'

export default {
  name: 'CoreProblems',
  data() {
    return {
      coreProblems: coreProblemsData
    }
  }
}
</script>

<style scoped>
.core-problems {
  margin: 2rem 0;
}

.core-problems h3 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.problem-list {
  display: grid;
  gap: 1.5rem;
  margin-top: 1rem;
}

.problem-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.problem-item h4 {
  color: #667eea;
  margin-bottom: 1rem;
}

.problem-item p {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.problem-item strong {
  color: #333;
}
</style>