import { writeFileSync } from 'fs'
import { resolve } from 'path'

// 从环境变量获取 base 路径
const basePath = process.env.VITE_BASE_PATH || '/'

const html404Content = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Navigation API Demo</title>
  <script>
    // GitHub Pages SPA 路由解决方案
    const path = window.location.pathname;
    const basePath = '${basePath}';
    
    // 如果路径不是以 basePath 开头，重定向到正确的路径
    if (basePath !== '/' && path !== basePath && !path.startsWith(basePath)) {
      const newPath = basePath + (path.startsWith('/') ? path.slice(1) : path);
      window.location.replace(newPath);
    } else if (basePath !== '/' && path !== basePath) {
      // 如果是子路径，重定向到首页让 Vue Router 处理
      window.location.replace(basePath);
    }
  </script>
</head>
<body>
  <div>正在重定向...</div>
</body>
</html>`

// 写入 404.html 文件
writeFileSync(resolve(process.cwd(), 'dist/404.html'), html404Content)
console.log('✅ 404.html 已生成，base 路径:', basePath)