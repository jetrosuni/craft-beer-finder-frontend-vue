<template>
  <div class="columns cbf-margin-slim">
    <!-- mobile -->
    <div class="column is-full is-hidden-tablet">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item has-text-centered cbf-rating-area-mobile">
            <p class="heading">
              <strong>{{item.beer_rating}}</strong><br>
              {{item.beer_rating_count}}
            </p>
          </div>
          <div class="level-item cbf-pint-area-mobile">
            <b-tooltip
              :label="item.beer_style"
              type="is-white"
              position="is-top"
            >
              <div class="cbf-pint">
                <img
                  :src="tulipGlassSvg(item.beer_style)"
                  class="cbf-tulip-mobile"
                />
              </div>
            </b-tooltip>
          </div>
          <div class="level-item cbf-flag-area-mobile">
            <b-tooltip
              :label="item.beer_country"
              type="is-white"
              position="is-top"
            >
              <flag
                :iso="item.beer_country"
                :squared="false"
              />
            </b-tooltip>
          </div>
        </div>
        <div class="cbf-beer-name-area-mobile">
          <p>
            {{item.beer_name}}<br>
            <span class="cbf-bar-list-mobile">
              {{barsList(item)}}
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- /mobile -->

    <!-- 768px or wider -->
    <div class="column is-one-fifth cbf-first-col is-hidden-mobile">
      <div class="columns is-gapless">
        <div class="column is-two-fifths">
          <div class="cbf-flag-area">
            <b-tooltip
              :label="item.beer_country"
              type="is-white"
              position="is-top"
            >
              <flag
                :iso="item.beer_country"
                :squared="false"
                class="cbf-flag"
              />
            </b-tooltip>
          </div>
        </div>
        <div class="column is-two-fifths">
          <b-tooltip
            :label="item.beer_style"
            type="is-white"
            position="is-right"
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
    </div>
    <!-- /768px -->

    <div class="column is-four-fifths cbf-second-col is-hidden-mobile">
      <div class="columns cbf-beer-name">
        <div class="column is-full cbf-remove-padding">
          {{item.beer_name}}
        </div>
      </div>
      <div class="columns is-multiline is-gapless cbf-bar-item-area is-size-7">
        {{barsList(item)}}
      </div>
    </div>
  </div>
</template>

<script>
import beerColors from "../data/beerColors";

export default {
  name: "BeerItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    barsList(item) {
      const barsArray = this.barsArray(item);
      let barsList = "";
      let i = 0;
      barsArray.map(bar => {
        barsList += bar + " (" + this.daysAgoString(item, i) + ") — ";
        i++;
      });

      return barsList.substring(0, barsList.length - 3);
    },
    barsArray(item) {
      return item.bars.split(",");
    },
    daysAgoArray(item) {
      return item.days_ago_bars.split(",");
    },
    daysAgoString(item, barKey) {
      const daysAgoArray = this.daysAgoArray(item);
      return +daysAgoArray[barKey] === 0
        ? "today"
        : +daysAgoArray[barKey] === 1
        ? "1 day ago"
        : daysAgoArray[barKey] + " days ago";
    },
    tulipGlassSvg(style) {
      if (beerColors.other.some(bc => bc.test(style.toLowerCase()))) {
        return require("@/assets/img/tulip-glass.svg");
      } else if (beerColors.dark.some(bc => bc.test(style.toLowerCase()))) {
        return require("@/assets/img/tulip-glass-dark.svg");
      } else if (beerColors.light.some(bc => bc.test(style.toLowerCase()))) {
        return require("@/assets/img/tulip-glass-light.svg");
      }
      return require("@/assets/img/tulip-glass.svg");
    }
  }
};
</script>

<style scoped>
.cbf-first-col {
  padding: 0;
  text-align: center;
}
.cbf-flag-area {
  float: right;
  font-size: 36px;
  margin-right: 0;
}
.cbf-rating-area-mobile {
  min-width: 2.5rem;
  width: 2.5rem;
}
.cbf-pint-area-mobile {
  min-width: 1rem;
  width: 1rem;
}
.cbf-flag-area-mobile {
  min-width: 1rem;
  width: 1rem;
  font-size: 17px;
}
.cbf-beer-name-area-mobile {
  margin-left: 1.5rem;
  width: 100%;
  font-size: 0.8rem;
}
.cbf-bar-list-mobile {
  color: #757575; /* grey 600 */
  font-size: 0.7rem;
}
.cbf-flag {
  line-height: 0.99em;
  border: 1px solid #e0e0e0; /* grey 300 */
}
.cbf-pint {
  margin-top: 0.3rem;
}
.cbf-tulip {
  width: 24px;
}
.cbf-tulip-mobile {
  width: 12px;
}
.cbf-rating {
  margin-top: 0.2rem;
  text-align: center;
}
.cbf-rating-mobile {
  margin-top: 0.2rem;
  text-align: left;
}
.cbf-remove-padding {
  padding: 0;
}
.cbf-second-col {
  padding: 0.25rem 0 2rem 2.25rem;
}
.cbf-beer-name {
  padding: 0;
  margin: 0;
  overflow-wrap: break-word;
}
.cbf-bar-item-area {
  padding: 0;
  color: #757575; /* grey 600 */
}
.cbf-margin-slim {
  margin-bottom: 1rem;
}

@media only screen and (min-width: 769px) {
  .cbf-margin-slim {
    margin-bottom: 2rem;
  }
}
</style>
