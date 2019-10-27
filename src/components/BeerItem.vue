<template>
  <div>
    <div class="beer-item">
      <flag
        :iso="item.beer_country"
        :squared="false"
      /> <strong>{{item.beer_rating}} ({{item.beer_rating_count}})</strong> {{item.beer_name}} ({{item.beer_style}})</div>
    <div class="bar-item-area">
      <div
        class="bar-item"
        v-for="(bar, barKey) in barsArray(item)"
        :key="barKey"
      >
        {{bar}}
        ({{ +daysAgoArray(item)[barKey] === 0 ? 'today' : daysAgoArray(item)[barKey] + ' days ago'}})
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BeerItem",
  props: {
    item: {
      type: Object,
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
.bar-item-area {
  color: #90a4ae; /* blueGrey 300 */
  margin: 1rem 0 2rem 0;
}
</style>
