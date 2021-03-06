<template>
  <div class="columns cbf-margin-slim">
    <!-- mobile -->
    <div class="column is-full is-hidden-tablet">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item cbf-flag-area-mobile">
            <b-tooltip :label="item.beer_country" type="is-white" position="is-top">
              <div class="cbf-flag-border-mobile">
                <div
                  :style="{ backgroundImage: 'url(' + flagSvg(item.beer_country) + ')' }"
                  class="cbf-flag"
                />
              </div>
            </b-tooltip>
          </div>
        </div>
        <div class="level-item cbf-pint-area-mobile">
          <b-tooltip :label="item.beer_style" type="is-white" position="is-top">
            <div class="cbf-pint">
              <img :src="tulipGlassSvg(item.beer_style)" class="cbf-tulip-mobile" />
            </div>
          </b-tooltip>
        </div>
        <div class="level-item has-text-centered cbf-rating-area-mobile">
          <p class="heading">
            <strong>{{item.beer_rating}}</strong>
            <br />
            {{item.beer_rating_count}}
          </p>
        </div>
        <div class="cbf-beer-name-area-mobile">
          <p>
            {{item.beer_name}}
            <br />
            <span class="cbf-bar-list-mobile">
              <span v-html="barsList(item)"></span>
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
            <b-tooltip :label="item.beer_country" type="is-white" position="is-top">
              <div class="cbf-flag-border">
                <div
                  :style="{ backgroundImage: 'url(' + flagSvg(item.beer_country) + ')' }"
                  class="cbf-flag"
                />
              </div>
            </b-tooltip>
          </div>
        </div>
        <div class="column is-two-fifths">
          <b-tooltip :label="item.beer_style" type="is-white" position="is-right">
            <div class="cbf-pint">
              <img :src="tulipGlassSvg(item.beer_style)" class="cbf-tulip" />
            </div>
          </b-tooltip>
        </div>
        <div class="column is-one-fifth">
          <div class="cbf-rating">
            <strong>{{item.beer_rating}}</strong>
            <div class="is-size-7">{{item.beer_rating_count}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- /768px -->

    <div class="column is-four-fifths cbf-second-col is-hidden-mobile">
      <div class="columns cbf-beer-name">
        <div class="column is-full cbf-remove-padding">{{item.beer_name}}</div>
      </div>
      <div class="columns is-multiline is-gapless cbf-bar-item-area is-size-7">
        <span v-html="barsList(item)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import beerColors from '../data/beerColors'

export default {
  name: 'BeerItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    dayLimit: {
      type: Number,
      required: true,
    },
  },
  methods: {
    barsList(item) {
      const barsArray = this.barsArray(item)
      let barsList = ''
      let i = 0
      barsArray.map((bar) => {
        const daysAgo = this.daysAgoValue(item, i)
        if (daysAgo <= -this.dayLimit + 7) {
          barsList += bar + ' (' + this.daysAgoString(item, i) + ') — '
        }
        i++
      })

      return barsList.substring(0, barsList.length - 3)
    },
    barsArray(item) {
      return item.bars.split(',')
    },
    daysAgoArray(item) {
      return item.days_ago_bars.split(',')
    },
    daysAgoValue(item, barKey) {
      const daysAgoArray = this.daysAgoArray(item)
      return +daysAgoArray[barKey]
    },
    daysAgoString(item, barKey) {
      const daysAgoArray = this.daysAgoArray(item)
      return +daysAgoArray[barKey] === 0
        ? '<span class="cbf-is-today">today</span>'
        : +daysAgoArray[barKey] === 1
        ? '<span class="cbf-is-yesterday">1 day ago</span>'
        : +daysAgoArray[barKey] > 1 && +daysAgoArray[barKey] < 4
        ? '<span class="cbf-is-some-days-ago">' +
          daysAgoArray[barKey] +
          ' days ago</span>'
        : '<span class="cbf-is-many-days-ago">' +
          daysAgoArray[barKey] +
          ' days ago</span>'
    },
    tulipGlassSvg(style) {
      if (beerColors.other.some((bc) => bc.test(style.toLowerCase()))) {
        return require('@/assets/img/tulip-glass.svg')
      } else if (beerColors.dark.some((bc) => bc.test(style.toLowerCase()))) {
        return require('@/assets/img/tulip-glass-dark.svg')
      } else if (beerColors.light.some((bc) => bc.test(style.toLowerCase()))) {
        return require('@/assets/img/tulip-glass-light.svg')
      }
      return require('@/assets/img/tulip-glass.svg')
    },
    flagSvg(countryCode) {
      return require('@/assets/img/flags/' + countryCode.toLowerCase() + '.svg')
    },
  },
}
</script>

<style>
.cbf-is-today {
  color: #43a047; /* green 600 */
}
.cbf-is-yesterday {
  color: #4caf50; /* green 500 */
}
.cbf-is-some-days-ago {
  color: #ff9800; /* orange */
}
.cbf-is-many-days-ago {
  color: #f44336; /* red */
}
</style>

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
.cbf-flag-area-mobile {
  min-width: 2rem;
  width: 2rem;
  font-size: 17px;
  margin-bottom: 0.1rem;
}
.cbf-pint-area-mobile {
  min-width: 2rem;
  width: 2rem;
  margin-left: 0.5rem !important;
  margin-right: 0 !important;
}
.cbf-pint-area-mobile .cbf-pint {
  margin-bottom: 0.1rem;
}
.cbf-rating-area-mobile {
  min-width: 2.5rem;
  width: 2.5rem;
  padding-top: 0.5rem;
  margin-left: 0.5rem !important;
  margin-right: 0.5rem !important;
}
.cbf-beer-name-area-mobile {
  margin-left: 0.5rem;
  width: 100%;
  font-size: 0.8rem;
  padding-top: 0.125rem;
}
.cbf-bar-list-mobile {
  color: #757575; /* grey 600 */
  font-size: 0.7rem;
}
.cbf-flag-border-mobile {
  margin-top: 0.1rem;
  border: 1px solid #444;
  height: 15px;
  width: 22px;
  padding: 0;
}
.cbf-flag-border {
  margin-top: 0.6rem;
  border: 1px solid #444;
  height: 32px;
  width: 48px;
  padding: 0;
}
.cbf-flag {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100%;
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
