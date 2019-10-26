import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import FlagIcon from 'vue-flag-icon'
import App from './App.vue'

Vue.use(Buefy)
Vue.use(FlagIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
