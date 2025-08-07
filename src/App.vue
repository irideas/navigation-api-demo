<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-brand">
          <h1>Navigation API Demo</h1>
        </router-link>
        
        <ul class="nav-menu">
          <li class="nav-item">
            <router-link to="/" class="nav-link">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/basic-navigation" class="nav-link">基础导航</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/advanced-scenarios" class="nav-link">高级场景</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/navigation-entries" class="nav-link">导航条目</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/navigation-events" class="nav-link">导航事件</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/polyfill-analysis" class="nav-link">Polyfill 分析</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/browser-support" class="nav-link">浏览器支持</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 Navigation API Demo - 探索现代 Web 导航技术</p>
        <div class="footer-links">
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API" target="_blank">MDN 文档</a>
          <a href="https://github.com/WICG/navigation-api" target="_blank">规范草案</a>
          <a href="https://web.dev/navigation-api/" target="_blank">Web.dev 指南</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 检测 Navigation API 支持情况
    if ('navigation' in window) {
      console.log('✅ Navigation API 已支持');
    } else {
      console.log('❌ Navigation API 不支持，将使用 History API 作为对比');
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  text-decoration: none;
  color: white;
}

.nav-brand h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

.footer {
  background: #343a40;
  color: white;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-links a {
  color: #adb5bd;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: white;
}

/* 通用样式 */
.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  text-align: center;
  margin-bottom: 3rem;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  margin: 0.25rem;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn:active {
  transform: translateY(0);
}

.btn-secondary {
  background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
}

.btn-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.btn-warning {
  background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
}

.btn-danger {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
}

.btn-info {
  background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid;
}

.alert-info {
  background: #d1ecf1;
  border-left-color: #17a2b8;
  color: #0c5460;
}

.alert-warning {
  background: #fff3cd;
  border-left-color: #ffc107;
  color: #856404;
}

.alert-success {
  background: #d4edda;
  border-left-color: #28a745;
  color: #155724;
}

.alert-danger {
  background: #f8d7da;
  border-left-color: #dc3545;
  color: #721c24;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.highlight {
  background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-links {
    justify-content: center;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .section {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .nav-menu {
    gap: 0.5rem;
  }
  
  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
  
  .page-title {
    font-size: 1.8rem;
  }
  
  .section {
    padding: 1rem;
  }
}
</style>