import Vue from 'vue'
import { Checkbox, Slider } from 'buefy'
import 'buefy/dist/buefy.css'
import FlagIcon from 'vue-flag-icon'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import ApiService from './services/api.service'
import './registerServiceWorker'

Vue.use(Checkbox)
Vue.use(FlagIcon)
Vue.use(Slider)
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_CRAFT_BEER_FINDER_GA_ID,
  debug: {
    enabled: process.env.NODE_ENV === 'production' ? false : true
  }
})

ApiService.init(process.env.VUE_APP_CRAFT_BEER_FINDER_API_URL)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
