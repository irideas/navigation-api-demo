<template>
  <div class="home">
    <h2 class="page-title">Navigation API 对比测试项目</h2>
    
    <ProjectIntro />
    <FeaturesOverview />
    <BrowserSupportOverview />
    <QuickTest />
  </div>
</template>

<script>
import ProjectIntro from './components/ProjectIntro.vue'
import FeaturesOverview from './components/FeaturesOverview.vue'
import BrowserSupportOverview from './components/BrowserSupportOverview.vue'
import QuickTest from './components/QuickTest.vue'

export default {
  name: 'Home',
  components: {
    ProjectIntro,
    FeaturesOverview,
    BrowserSupportOverview,
    QuickTest
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}
</style>