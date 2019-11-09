import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import FlagIcon from 'vue-flag-icon'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'

Vue.use(Buefy)
Vue.use(FlagIcon)
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_CRAFT_BEER_FINDER_GA_ID,
  debug: {
    enabled: process.env.NODE_ENV === 'production' ? false : true
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
