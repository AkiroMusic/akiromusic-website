import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 由于移除了 Vue Router，不需要路由相关配置
  // 保持简洁，使用默认设置
})
