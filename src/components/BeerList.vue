<template>
  <div class="beer-list">
    <div
      v-for="(beerItem, beerKey) in data"
      :key="beerKey"
    >
      <BeerItem :item="beerItem" />
    </div>
  </div>
</template>

<script>
import BeerItem from "@/components/BeerItem.vue";

export default {
  name: "BeerList",
  components: {
    BeerItem
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.beer-list {
  text-align: left;
  margin: 4rem 0;
}
</style>
