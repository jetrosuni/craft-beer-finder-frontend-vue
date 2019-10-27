<template>
  <div class="columns">
    <div class="column is-three-fifths">
      <div class="columns">
        <div class="column is-one-quarter cbf-first-col">
          <div class="columns is-gapless">
            <div class="column is-half">
              <div class="cbf-flag">
                <flag
                  :iso="item.beer_country"
                  :squared="false"
                />
              </div>
            </div>
            <div class="column is-half">
              <div class="cbf-pint">
                <b-icon
                  pack="fas"
                  icon="beer"
                  size="is-medium"
                  :class="getBeerColor(item.beer_style)"
                />
              </div>
            </div>
          </div>
          <div class="cbf-rating">
            <strong>{{item.beer_rating}}</strong> ({{item.beer_rating_count}})
          </div>
        </div>
        <div class="column cbf-beer-item">
          {{item.beer_name}}
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
    },
    getBeerColor(style) {
      if (
        style.includes("Barleywine") ||
        style.includes("Bock") ||
        style.includes("Brown") ||
        style.includes("Dark") ||
        style.includes("Dubbel") ||
        style.includes("Kellerbier") ||
        style.includes("Old Ale") ||
        style.includes("Porter") ||
        style.includes("Quadrupel") ||
        style.includes("Rauchbier") ||
        style.includes("Red") ||
        style.includes("Schwarzbier") ||
        style.includes("Stout")
      ) {
        return "cbf-is-dark";
      } else if (
        style.includes("Cider") ||
        style.includes("Fruit") ||
        style.includes("Ginger") ||
        style.includes("Lambic") ||
        style.includes("Mead") ||
        style.includes("Non-Alcoholic") ||
        style.includes("Pumpkin") ||
        style.includes("Radler") ||
        style.includes("Sour") ||
        style.includes("Spiced") ||
        style.includes("Wild")
      ) {
        return "cbf-is-special";
      } else if (
        style.includes("Blonde") ||
        style.includes("IPA") ||
        style.includes("Pale") ||
        style.includes("Golden") ||
        style.includes("Märzen") ||
        style.includes("Tripel") ||
        style.toLowerCase().includes("weizen") ||
        style.includes("Witbier") ||
        style.includes("Farmhouse") ||
        style.includes("Pils") ||
        style.includes("Lager") ||
        style.includes("Malt Liquor") ||
        style.includes("Kölsch") ||
        style.includes("California Common") ||
        style.includes("Festbier") ||
        style.includes("Specialty Grain") ||
        style.includes("Strong Ale") ||
        style.includes("English Bitter") ||
        style.includes("Gluten-Free") ||
        style.includes("Wheat") ||
        style.includes("Grisette") ||
        style.includes("Saison") ||
        style.includes("Extra Special / Strong Bitter")
      ) {
        return "cbf-is-light";
      }
    }
  }
};
</script>

<style scoped>
.cbf-first-col {
  text-align: center;
}
.cbf-flag {
  float: right;
  font-size: 29px;
  margin-right: 0.5rem;
}
.cbf-pint {
  float: left;
  margin-top: 0.4rem;
  margin-left: 0.5rem;
}
.cbf-rating {
  margin-bottom: 2rem;
}
.cbf-beer-item {
  margin-bottom: 2rem;
}
.cbf-bar-item-area {
  color: #90a4ae; /* blueGrey 300 */
}
.cbf-bar-item {
  margin-bottom: 1rem;
}
.cbf-is-dark {
  color: #5d4037; /* brown 700 */
}
.cbf-is-special {
  color: #ff3d00; /* deepOrange A400 */
}
.cbf-is-light {
  color: #ffab00; /* #ffc400 A700 */
}
</style>
