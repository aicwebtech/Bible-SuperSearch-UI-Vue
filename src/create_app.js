import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

export default function (mount, config) {
  mount = mount || '#app'

  const app = createApp(App)

  app.use(createPinia())
  app.use(config)

  app.mount(mount)
}
