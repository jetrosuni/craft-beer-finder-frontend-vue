import { createApp } from 'vue'
import VueGtag from 'vue-gtag'
import App from './App.vue'

import './assets/main.css'
import './assets/tailwind.css'

const app = createApp(App).use(VueGtag, {
  config: {
    id: import.meta.env.VITE_CRAFT_BEER_FINDER_GA_ID,
  },
})

app.mount('#app')
