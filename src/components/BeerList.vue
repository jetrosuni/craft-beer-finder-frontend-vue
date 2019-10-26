<template>
  <div class="beer-list">
    <div
      v-for="(beer, beerKey) in data"
      :key="beerKey"
    >
      <div class="beer-item">{{beer.beer_country}} <strong>{{beer.beer_rating}} ({{beer.beer_rating_count}})</strong> {{beer.beer_name}} ({{beer.beer_style}})</div>
      <div class="bar-item-area">
        <span
          class="bar-item"
          v-for="(bar, barKey) in barsArray(beer)"
          :key="barKey"
        >
          {{bar}}
          ({{ +daysAgoArray(beer)[barKey] === 0 ? 'today' : daysAgoArray(beer)[barKey] + ' days ago'}})<span v-if="(+barKey + 1) <= barsArray(beer).length - 1">, </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BeerList",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    barsArray(item) {
      return item.bars.split(",");
    },
    daysAgoArray(item) {
      return item.days_ago_bars.split(",");
    }
  }
};
</script>

<style scoped>
.beer-list {
  text-align: left;
  margin: 4rem 0;
}
.bar-item-area {
  color: #90a4ae; /* blueGrey 300 */
  margin: 1rem 0 2rem 0;
}
</style>
