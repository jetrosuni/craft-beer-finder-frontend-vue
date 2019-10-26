<template>
  <ul>
    <li v-for="(beer, beerKey) in data" :key="beerKey">
      {{beer}}
    </li>
  </ul>
</template>

<script>
export default {
  name: "BeerList",
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>