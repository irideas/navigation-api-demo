<template>
  <section class="section">
    <h2 class="section-title">单页应用路由管理</h2>
    <div class="spa-demo">
      <div class="demo-description">
        <p>演示如何在 SPA 中使用 Navigation API 进行路由管理，包括路由拦截、权限控制等。</p>
      </div>
      
      <div class="demo-controls">
        <button @click="simulateRouteChange" class="btn btn-primary">模拟路由变化</button>
        <button @click="simulateProtectedRoute" class="btn btn-warning">访问受保护路由</button>
        <button @click="simulateAsyncRoute" class="btn btn-info">异步路由加载</button>
      </div>
      
      <div class="route-status">
        <h4>当前路由状态：</h4>
        <pre>{{ JSON.stringify(routeStatus, null, 2) }}</pre>
      </div>
    </div>
  </section>
</template>

<script>
import { spaRouteUtils } from '../utils/spaRouteUtils.js'

export default {
  name: 'SpaRouteManagement',
  data() {
    return {
      routeStatus: {
        current: '/',
        previous: null,
        params: {},
        query: {},
        meta: {}
      }
    }
  },
  mounted() {
    this.updateRouteStatus()
  },
  methods: {
    async simulateRouteChange() {
      try {
        const result = await spaRouteUtils.simulateRouteChange()
        this.updateRouteStatus()
      } catch (error) {
        console.error('Route change failed:', error)
      }
    },
    
    async simulateProtectedRoute() {
      try {
        const result = await spaRouteUtils.simulateProtectedRoute()
        this.updateRouteStatus()
      } catch (error) {
        console.error('Protected route access failed:', error)
      }
    },
    
    async simulateAsyncRoute() {
      try {
        const result = await spaRouteUtils.simulateAsyncRoute()
        this.updateRouteStatus()
      } catch (error) {
        console.error('Async route loading failed:', error)
      }
    },
    
    updateRouteStatus() {
      this.routeStatus = spaRouteUtils.getCurrentRouteStatus()
    }
  }
}
</script>

<style scoped>
.section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  background: #fff;
}

.section-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.demo-description {
  margin-bottom: 20px;
  color: #555;
}

.demo-controls {
  margin-bottom: 20px;
}

.btn {
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-primary { background-color: #3498db; color: white; }
.btn-warning { background-color: #f39c12; color: white; }
.btn-info { background-color: #17a2b8; color: white; }

.btn:hover { opacity: 0.8; }

.route-status {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #3498db;
}

.route-status h4 {
  margin-top: 0;
  color: #2c3e50;
}

.route-status pre {
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  overflow-x: auto;
}
</style>