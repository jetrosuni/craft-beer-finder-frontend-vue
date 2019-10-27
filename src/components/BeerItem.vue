<template>
  <div class="columns cbf-margin-slim">
    <div class="column is-one-fifth cbf-first-col">
      <!-- inner 1st column -->
      <div class="columns is-gapless">
        <div class="column is-two-fifths">
          <div class="cbf-flag">
            <flag
              :iso="item.beer_country"
              :squared="false"
            />
          </div>
        </div>
        <div class="column is-two-fifths">
          <b-tooltip
            :label="item.beer_style"
            type="is-white"
            position="is-left"
          >
            <div class="cbf-pint">
              <img
                :src="tulipGlassSvg(item.beer_style)"
                class="cbf-tulip"
              />
            </div>
          </b-tooltip>
        </div>
        <div class="column is-one-fifth">
          <div class="cbf-rating">
            <strong>{{item.beer_rating}}</strong>
            <div class="is-size-7">
              {{item.beer_rating_count}}
            </div>
          </div>
        </div>
      </div>
      <!-- /end -->
    </div>
    <div class="column is-four-fifths cbf-second-col">
      <div class="columns cbf-beer-name">
        <div class="column is-full cbf-remove-padding">
          {{item.beer_name}}
        </div>
      </div>
      <div class="columns is-multine is-gapless cbf-bar-item-area is-size-7">
        <div
          class="column is-one-fifth cbf-bar-item"
          v-for="(bar, barKey) in barsArray(item)"
          :key="barKey"
        >
          {{bar}}
          ({{ +daysAgoArray(item)[barKey] === 0 ? 'today' : daysAgoArray(item)[barKey] + ' days ago'}})
        </div>
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
    tulipGlassSvg(style) {
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
        return require("@/assets/img/tulip-glass-dark.svg");
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
        return require("@/assets/img/tulip-glass.svg");
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
        return require("@/assets/img/tulip-glass-light.svg");
      }
    }
  }
};
</script>

<style scoped>
.cbf-first-col {
  padding: 0;
  text-align: center;
}
.cbf-flag {
  float: right;
  font-size: 36px;
  margin-right: 0;
}
.cbf-pint {
  margin-top: 0.3rem;
}
.cbf-tulip {
  width: 24px;
}
.cbf-rating {
  float: left;
  margin-top: 0.2rem;
  text-align: center;
}
.cbf-remove-padding {
  padding: 0;
}
.cbf-second-col {
  padding: 0.1rem 0 0 1rem;
}
.cbf-beer-name {
  padding: 0;
  margin: 0;
}
.cbf-bar-item-area {
  color: #757575; /* grey 600 */
}
.cbf-margin-slim {
  margin-bottom: 2rem;
}
</style>
