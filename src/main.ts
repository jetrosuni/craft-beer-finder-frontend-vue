import { createApp } from 'vue'
import { createGtag } from 'vue-gtag'
import App from './App.vue'

import './assets/main.css'
import './assets/tailwind.css'

const gtag = createGtag({
  tagId: import.meta.env.VITE_CRAFT_BEER_FINDER_GA_ID,
})

const app = createApp(App).use(gtag)
app.mount('#app')
