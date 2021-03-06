<template>
  <div class="cbf-filters">
    <div
      :class="[
        isBeerSearch
          ? 'cbf-is-ignored cbf-beer-style-area level is-mobile'
          : 'cbf-beer-style-area level is-mobile',
      ]"
    >
      <div class="level-left">
        <div class="level-item cbf-style-label">Beer style</div>
        <div class="block level-item">
          <b-checkbox
            :disabled="isBeerSearch"
            type="is-light"
            v-model="filterValues.beerStyleSelection"
            native-value="light"
            @input="(option) => onBeerStyleSelected(option)"
            >Pale</b-checkbox
          >
          <b-checkbox
            :disabled="isBeerSearch"
            type="is-light"
            v-model="filterValues.beerStyleSelection"
            native-value="dark"
            @input="(option) => onBeerStyleSelected(option)"
            >Dark</b-checkbox
          >
          <b-checkbox
            :disabled="isBeerSearch"
            type="is-light"
            v-model="filterValues.beerStyleSelection"
            native-value="sour"
            @input="(option) => onBeerStyleSelected(option)"
            >Sour</b-checkbox
          >
          <b-checkbox
            :disabled="isBeerSearch"
            type="is-light"
            v-model="filterValues.beerStyleSelection"
            native-value="other"
            @input="(option) => onBeerStyleSelected(option)"
            >Other</b-checkbox
          >
        </div>
      </div>
    </div>

    <div
      :class="[
        isBeerSearch ? 'cbf-is-ignored level is-mobile' : 'level is-mobile',
      ]"
    >
      <div class="cbf-day-label">Day limit</div>
      <b-slider
        class="cbf-slider"
        :rounded="true"
        :disabled="isBeerSearch"
        :tooltip="false"
        :min="0"
        :max="7"
        :step="1"
        :value="filterValues.dayLimit"
        ticks
        type="is-white"
        @input="(value) => onDayRangeChanged(value)"
      >
        <template v-for="(val, index) in [7, 6, 5, 4, 3, 2, 1, 0]">
          <b-slider-tick :value="index" :key="`day-tick-${val}-${index}`">{{
            val
          }}</b-slider-tick>
        </template>
      </b-slider>
    </div>

    <div
      :class="[
        isBeerSearch || isVenueSearch
          ? 'cbf-is-ignored level is-mobile'
          : 'level is-mobile',
      ]"
    >
      <div class="cbf-rating-label">Rating</div>
      <b-slider
        class="cbf-slider"
        :rounded="true"
        :disabled="isBeerSearch || isVenueSearch"
        :tooltip="false"
        :min="3.5"
        :max="4.5"
        :step="0.25"
        :value="filterValues.ratingMin"
        ticks
        type="is-white"
        @input="(value) => onRatingRangeChanged(value)"
      >
        <template v-for="(val, index) in [3.5, 3.75, 4, 4.25, 4.5]">
          <b-slider-tick :value="val" :key="`rating-tick-${val}-${index}`">{{
            val
          }}</b-slider-tick>
        </template>
      </b-slider>
    </div>

    <div class="columns">
      <div class="column is-half cbf-input-area">
        <b-field type="is-light">
          <b-input
            :size="inputFieldSize"
            v-model="filterValues.searchBeerString"
            type="is-light"
            placeholder="Find a beer"
            @input="(option) => onSearchStringChanged(option)"
          />
        </b-field>
      </div>
      <div
        :class="[
          isBeerSearch
            ? 'cbf-is-ignored column is-half cbf-input-area'
            : 'column is-half cbf-input-area',
        ]"
      >
        <b-field type="is-light">
          <b-autocomplete
            :disabled="isBeerSearch"
            :size="inputFieldSize"
            v-model="searchVenueString"
            type="is-light"
            placeholder="Filter by venue"
            :keep-first="false"
            :open-on-focus="false"
            :data="venueNames"
            field="venue_name"
            clearable
            @select="(option) => onVenueStringChanged(option)"
            @input="(option) => inspectVenueStringChange(option)"
          >
            <template slot="empty">No venue found</template>
          </b-autocomplete>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'tiny-debounce'

export default {
  name: 'BeerFilters',
  props: {
    data: {
      type: Array,
      required: true,
    },
    isBeerSearch: {
      type: Boolean,
      required: true,
    },
    isVenueSearch: {
      type: Boolean,
      required: true,
    },
    initFilterValues: {
      type: Object,
      required: true,
    },
    venues: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      venueList: [],
      searchVenueString: '',
      windowInnerWidth: window.innerWidth,
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.changeDayRange = debounce(this.changeDayRange, 300)
    this.changeRating = debounce(this.changeRating, 300)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
    this.venueList = this.data.reduce((results, beer) => {
      if (beer.bars.includes(',')) {
        const bars = beer.bars.split(',')
        bars.forEach((bar) => {
          if (!results.includes(bar)) {
            results.push(bar)
          }
        })
      } else {
        if (!results.includes(beer.bars)) {
          results.push(beer.bars)
        }
      }
      return results
    }, [])
  },
  computed: {
    filterValues: function () {
      return JSON.parse(JSON.stringify(this.initFilterValues))
    },
    inputFieldSize: function () {
      return this.windowInnerWidth < 769 ? 'is-small' : 'is-normal'
    },
    venueNames: function () {
      if (
        this.venues &&
        this.venues.length &&
        this.searchVenueString &&
        this.searchVenueString.length
      ) {
        const matches = Object.values(this.venues).filter(
          (v) =>
            v.name
              .toString()
              .toLowerCase()
              .indexOf(
                this.searchVenueString
                  ? this.searchVenueString.toLowerCase()
                  : ''
              ) >= 0
        )
        return Object.values(matches).map((m) => m.name)
      }
      return []
    },
  },
  methods: {
    handleResize() {
      this.windowInnerWidth = window.innerWidth
    },
    onSearchStringChanged(searchStr) {
      this.$emit(
        'change-filter-search-string',
        searchStr && searchStr.length > 2 ? searchStr : null
      )
    },
    onVenueStringChanged(searchStr) {
      this.searchVenueString = searchStr
      this.$emit(
        'change-filter-venue-string',
        searchStr && searchStr.length > 2 ? searchStr : null
      )
    },
    onBeerStyleSelected(beerStyleArray) {
      this.$emit('change-filter-beer-style', beerStyleArray)
    },
    onDayRangeChanged(dayLimit) {
      this.changeDayRange(dayLimit)
    },
    onRatingRangeChanged(minRating) {
      this.changeRating(minRating)
    },
    inspectVenueStringChange(searchStr) {
      this.searchVenueString = searchStr
      if (!searchStr || (searchStr && searchStr.length === 0)) {
        this.$emit('change-filter-venue-string', null)
      }
    },
    changeDayRange(dayLimit) {
      this.$emit('change-filter-day-range', dayLimit)
    },
    changeRating(minRating) {
      this.$emit('change-filter-rating-range', minRating)
    },
  },
}
</script>

<style scoped>
.cbf-filters {
  text-align: left;
  font-size: 0.8rem;
}
.cbf-style-label {
  color: #c2c2c2;
}
.cbf-day-label,
.cbf-rating-label {
  color: #c2c2c2;
  min-width: 6rem;
  width: 6rem;
}
.cbf-slider {
  padding: 0 1rem;
}
.cbf-beer-style-area {
  margin-bottom: 0.5rem;
}
.cbf-input-area {
  padding: 0.25rem 0.5rem;
}
.cbf-is-ignored {
  text-decoration: line-through;
  opacity: 0.25;
}

@media only screen and (min-width: 769px) {
  .cbf-filters {
    font-size: 1rem;
  }
  .cbf-beer-style-area {
    margin-bottom: 1rem;
  }
}
</style>
