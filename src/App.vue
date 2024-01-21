<template>
  <div class="grid grid-cols-1 lg:grid-cols-5">
    <div class="col-span-1 hidden lg:block"></div>
    <div class="col-span-1 lg:col-span-3">
      <MainView />
    </div>
    <div class="col-span-1 hidden lg:block"></div>
  </div>
</template>

<script setup lang="ts">
import MainView from './views/MainView.vue'
</script>
