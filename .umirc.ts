import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/editor/:id", component: "editor" },
    { path: "/editor", component: "editor" },
  ],
  npmClient: 'yarn',
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:8091/api',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
  publicPath: '/static/',  // 所有资源的公共前缀路径
  hash: true,              // 打包后的文件名带有哈希值
  history: {
    type: 'hash',  // 修改为 browser 模式，如果想用 hash 模式，可以设为 'hash'
  },
});
