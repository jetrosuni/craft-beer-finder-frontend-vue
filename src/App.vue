<template>
  <div id="app">
    <div class="cbf-main container">
      <MainPage />
    </div>
  </div>
</template>

<script>
import MainPage from "@/views/MainPage.vue";

export default {
  name: 'app',
  components: {
    MainPage
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.cbf-main {
  padding: 0 2rem;
}
</style>
