export const bestPracticesData = [
  {
    id: 'feature-detection',
    title: '特性检测',
    description: '在使用 Polyfill 前先检测浏览器是否原生支持 Navigation API',
    example: `// 特性检测
if ('navigation' in window) {
  // 使用原生 Navigation API
  navigation.addEventListener('navigate', handleNavigate);
} else {
  // 加载并使用 Polyfill
  import('./navigation-polyfill.js').then(() => {
    navigation.addEventListener('navigate', handleNavigate);
  });
}`,
    tips: [
      '始终优先使用原生实现',
      '避免不必要的 Polyfill 加载',
      '考虑渐进增强策略'
    ]
  },
  {
    id: 'graceful-degradation',
    title: '优雅降级',
    description: '当 Polyfill 功能受限时，提供合理的降级方案',
    example: `// 优雅降级示例
function handleNavigation(url) {
  if (navigation && navigation.navigate) {
    // 使用 Navigation API
    navigation.navigate(url);
  } else {
    // 降级到传统方式
    window.location.href = url;
  }
}`,
    tips: [
      '为关键功能提供降级方案',
      '在功能受限时给用户明确提示',
      '保证核心功能在所有环境下可用'
    ]
  },
  {
    id: 'performance-optimization',
    title: '性能优化',
    description: '优化 Polyfill 的性能，减少对页面性能的影响',
    example: `// 延迟初始化
let polyfillInitialized = false;

function initPolyfill() {
  if (!polyfillInitialized && !('navigation' in window)) {
    // 初始化 Polyfill
    setupNavigationPolyfill();
    polyfillInitialized = true;
  }
}

// 在需要时才初始化
document.addEventListener('DOMContentLoaded', initPolyfill);`,
    tips: [
      '按需加载 Polyfill 代码',
      '避免不必要的事件监听',
      '使用事件委托减少内存占用',
      '定期清理不需要的监听器'
    ]
  },
  {
    id: 'error-handling',
    title: '错误处理',
    description: '妥善处理 Polyfill 运行中可能出现的错误',
    example: `// 错误处理示例
navigation.addEventListener('navigate', (event) => {
  try {
    event.intercept({
      handler: async () => {
        await handleNavigation();
      }
    });
  } catch (error) {
    console.error('Navigation failed:', error);
    // 降级到默认行为
    window.location.href = event.destination.url;
  }
});`,
    tips: [
      '为异步操作添加错误处理',
      '提供有意义的错误信息',
      '在错误时提供降级方案',
      '避免错误阻塞页面功能'
    ]
  }
]