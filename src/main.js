import './style.css'
import 'leaflet/dist/leaflet.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 创建 Vue 应用实例
const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue 错误:', err)
  console.log('错误信息:', info)
}

// 全局警告处理
app.config.warnHandler = (msg, vm, trace) => {
  console.warn('Vue 警告:', msg)
  console.log('警告追踪:', trace)
}

// 注册路由
app.use(router)

// 挂载应用
app.mount('#app')

// 开发环境下的额外错误捕获
if (process.env.NODE_ENV === 'development') {
  window.onerror = function (msg, url, line, column, error) {
    console.error('全局错误:', {
      message: msg,
      url: url,
      line: line,
      column: column,
      error: error
    })
  }
}