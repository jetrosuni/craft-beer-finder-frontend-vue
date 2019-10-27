<template>
  <div class="columns">
    <div class="column is-three-fifths">
      <div class="columns">
        <div class="column is-one-fifth">
          <flag
            :iso="item.beer_country"
            :squared="false"
          /> <strong>{{item.beer_rating}} ({{item.beer_rating_count}})</strong>
        </div>
        <div class="column is-four-fifths cbf-beer-item">
          {{item.beer_name}} ({{item.beer_style}})
        </div>
      </div>
    </div>
    <div class="column is-two-fifths cbf-bar-item-area">
      <div
        class="cbf-bar-item"
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
.cbf-beer-item {
  margin-bottom: 2rem;
}
.cbf-bar-item-area {
  color: #90a4ae; /* blueGrey 300 */
}
.cbf-bar-item {
  margin-bottom: 1rem;
}
</style>
