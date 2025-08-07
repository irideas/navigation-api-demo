<template>
  <div class="basic-navigation">
    <h1 class="page-title">基础导航功能对比</h1>
    <p class="page-subtitle">对比 Navigation API 和 History API 的基本导航操作</p>

    <NavigationComparison />
    <ProgrammaticNavigation />
    <UrlParameterHandling />
    <NavigationState />
  </div>
</template>

<script>
import NavigationComparison from './components/NavigationComparison.vue'
import ProgrammaticNavigation from './components/ProgrammaticNavigation.vue'
import UrlParameterHandling from './components/UrlParameterHandling.vue'
import NavigationState from './components/NavigationState.vue'

export default {
  name: 'BasicNavigation',
  components: {
    NavigationComparison,
    ProgrammaticNavigation,
    UrlParameterHandling,
    NavigationState
  }
}
</script>