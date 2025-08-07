<template>
  <div class="navigation-events">
    <h2>导航事件处理对比</h2>
    
    <div class="intro-section">
      <p>
        Navigation API 提供了强大的事件系统，包括 navigate 事件的拦截和取消功能。
        而传统的 History API 只提供 popstate 事件，功能相对有限。
      </p>
    </div>

    <EventMonitoring />
    <EventComparison />
    <EventInterception />
    <PolyfillEvents />
    <EventComparisonTable />
  </div>
</template>

<script>
import EventMonitoring from './components/EventMonitoring.vue'
import EventComparison from './components/EventComparison.vue'
import EventInterception from './components/EventInterception.vue'
import PolyfillEvents from './components/PolyfillEvents.vue'
import EventComparisonTable from './components/EventComparisonTable.vue'

export default {
  name: 'NavigationEvents',
  components: {
    EventMonitoring,
    EventComparison,
    EventInterception,
    PolyfillEvents,
    EventComparisonTable
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