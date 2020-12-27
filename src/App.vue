<template>
  <div id="app">
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
    margin-top: 0 auto;
    max-width: 100vw;
  }
}
</style>
