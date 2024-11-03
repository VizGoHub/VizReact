import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
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
});
