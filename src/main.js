import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// 导入页面组件
import Home from './pages/Home/index.vue'
import BasicNavigation from './pages/BasicNavigation/index.vue'
import AdvancedScenarios from './pages/AdvancedScenarios/index.vue'
import NavigationEntries from './pages/NavigationEntries/index.vue'
import NavigationEvents from './pages/NavigationEvents/index.vue'
import BrowserSupport from './pages/BrowserSupport/index.vue'
import PolyfillAnalysis from './pages/PolyfillAnalysis/index.vue'

// 路由配置
const routes = [
  { path: '/', component: Home, meta: { title: 'Navigation API Demo - 首页' } },
  { path: '/basic-navigation', component: BasicNavigation, meta: { title: 'Navigation API Demo - 基础导航' } },
  { path: '/advanced-scenarios', component: AdvancedScenarios, meta: { title: 'Navigation API Demo - 高级场景' } },
  { path: '/navigation-entries', component: NavigationEntries, meta: { title: 'Navigation API Demo - 导航条目' } },
  { path: '/navigation-events', component: NavigationEvents, meta: { title: 'Navigation API Demo - 导航事件' } },
  { path: '/polyfill-analysis', component: PolyfillAnalysis, meta: { title: 'Navigation API Demo - Polyfill 分析' } },
  { path: '/browser-support', component: BrowserSupport, meta: { title: 'Navigation API Demo - 浏览器支持' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

const app = createApp(App)
app.use(router)
app.mount('#app')