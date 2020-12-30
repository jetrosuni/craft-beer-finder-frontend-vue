<template>
  <div id="app">
    <template v-if="isNewVersion">
      <div @click="refreshApp" class="notification is-info cbf-new-version">
        <p>New version available!</p>
        <p class="cbf-click-text">Click to update</p>
      </div>
    </template>
    <div class="container">
      <div class="columns">
        <div class="column is-hidden-touch is-one-fifth-desktop" />
        <div class="column is-full-touch is-three-fifths-desktop">
          <MainPage />
        </div>
        <div class="column is-hidden-touch is-one-fifth-desktop" />
      </div>
    </div>
  </div>
</template>

<script>
import MainPage from '@/views/MainPage.vue'

export default {
  name: 'app',
  data() {
    return {
      registration: null,
      isRefreshing: false,
      isNewVersion: false,
    }
  },
  created () {
    document.addEventListener(
      'swUpdated', this.showRefreshUI, { once: true }
    )
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener(
        'controllerchange', () => {
          if (this.isRefreshing) {
            return
          }
          this.isRefreshing = true
          window.location.reload()
        }
      )
    }
  },
  methods: {
    showRefreshUI(e) {
      this.registration = e.detail
      this.isNewVersion = true
    },
    refreshApp() {
      this.isNewVersion = false
      if (!this.registration || !this.registration.waiting) {
        return
      }
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    },
  },
  components: {
    MainPage,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 1.5rem auto 0 auto;
  max-width: 94vw; /* NOTE: fix horizontal scroll appearing on certain devices */
}

@media only screen and (min-width: 769px) {
  #app {
    margin: 0 auto;
    max-width: 100vw;
  }
}
</style>

<style scoped>
.cbf-new-version {
  cursor: pointer;
  z-index: 1001;
  color: white;
  width: 230px;
  position: absolute;
  top: 1rem;
  left: 1rem;
}
.cbf-click-text {
  text-decoration: underline;
}
</style>
