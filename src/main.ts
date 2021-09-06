// register vue composition api globally
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import Toast, { POSITION } from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import './styles/main.css'

const options: PluginOptions = {
  position: POSITION.TOP_CENTER,
  containerClassName: 'toaster',
  timeout: 3500,
}

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  return next()
})

app.use(router)
app.use(Toast, options)
app.mount('#app')
