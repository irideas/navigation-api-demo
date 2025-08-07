<template>
  <div class="navigation-entries">
    <h2>导航条目管理对比</h2>
    
    <div class="intro-section">
      <p>
        Navigation API 提供了 navigation.entries() 方法来访问导航历史条目，
        而传统的 History API 只能通过 history.length 获取历史长度，无法直接访问具体条目。
      </p>
    </div>

    <EntriesDisplay />
    <EntriesOperations />
    <PolyfillImplementation />
    <ComparisonTable />
  </div>
</template>

<script>
import EntriesDisplay from './components/EntriesDisplay.vue'
import EntriesOperations from './components/EntriesOperations.vue'
import PolyfillImplementation from './components/PolyfillImplementation.vue'
import ComparisonTable from './components/ComparisonTable.vue'

export default {
  name: 'NavigationEntries',
  components: {
    EntriesDisplay,
    EntriesOperations,
    PolyfillImplementation,
    ComparisonTable
  }
}
</script>

<style scoped>
.intro-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}
</style>