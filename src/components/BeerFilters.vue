<template>
  <div class="cbf-filters">

    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item cbf-style-label">Beer style</div>
        <div class="block level-item">
          <b-checkbox
            type="is-light"
            v-model="beerStyleSelection"
            native-value="light"
            @input="option => onBeerStyleSelected(option)"
          >
            Pale
          </b-checkbox>
          <b-checkbox
            type="is-light"
            v-model="beerStyleSelection"
            native-value="dark"
            @input="option => onBeerStyleSelected(option)"
          >
            Dark
          </b-checkbox>
          <b-checkbox
            type="is-light"
            v-model="beerStyleSelection"
            native-value="sour"
            @input="option => onBeerStyleSelected(option)"
          >
            Sour
          </b-checkbox>
          <b-checkbox
            type="is-light"
            v-model="beerStyleSelection"
            native-value="other"
            @input="option => onBeerStyleSelected(option)"
          >
            Other
          </b-checkbox>
        </div>
      </div>
    </div>

    <div class="level is-mobile">
      <div class="cbf-rating-label">
        Rating scale
      </div>
      <b-slider
        class="cbf-slider"
        :min="3.75"
        :max="4.5"
        :step="0.25"
        :value="minRating"
        ticks
        type="is-light"
        @input="value => onRatingRangeChanged(value)"
      >
        <template v-for="(val, index) in [3.75, 4, 4.25, 4.5]">
          <b-slider-tick
            :value="val"
            :key="`tick-${val}-${index}`"
          >{{ val }}</b-slider-tick>
        </template>
      </b-slider>
    </div>

    <div class="columns">
      <div class="column is-half">
        <b-input
          v-model="searchStr"
          type="is-light"
          placeholder="Find a beer"
          @input="option => onSearchStringChanged(option)"
        />
      </div>
      <div class="column is-half">
        <b-autocomplete
          v-model="venueStr"
          type="is-light"
          placeholder="Filter by venue"
          :keep-first="false"
          :open-on-focus="false"
          :data="venueNames"
          field="venue_name"
          @select="option => onVenueStringChanged(option)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BeerFilters",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchStr: "",
      venueStr: "",
      venueList: [],
      minRating: 4,
      beerStyleSelection: ["light", "dark", "sour", "other"]
    };
  },
  mounted() {
    this.venueList = this.data.reduce((results, beer) => {
      if (beer.bars.includes(",")) {
        const bars = beer.bars.split(",");
        bars.forEach(bar => {
          if (!results.includes(bar)) {
            results.push(bar);
          }
        });
      } else {
        if (!results.includes(beer.bars)) {
          results.push(beer.bars);
        }
      }
      return results;
    }, []);
  },
  computed: {
    venueNames: function() {
      return this.venueList.reduce((results, venue) => {
        if (
          venue
            .toString()
            .toLowerCase()
            .indexOf(this.venueStr.toLowerCase()) >= 0
        ) {
          results.push(venue);
        }
        return results;
      }, []);
    }
  },
  methods: {
    onSearchStringChanged(searchStr) {
      if (searchStr === "" || searchStr.length > 2) {
        this.$emit("change-filter-search-string", searchStr);
      }
    },
    onVenueStringChanged(searchStr) {
      this.$emit("change-filter-venue-string", searchStr);
    },
    onBeerStyleSelected(beerStyleArray) {
      this.$emit("change-filter-beer-style", beerStyleArray);
    },
    onRatingRangeChanged(minRating) {
      this.$emit("change-filter-rating-range", minRating);
    }
  }
};
</script>

<style scoped>
.cbf-filters {
  text-align: left;
}
.cbf-style-label {
  color: #c2c2c2;
}
.cbf-rating-label {
  color: #c2c2c2;
  min-width: 6rem;
  width: 6rem;
}
.cbf-slider {
  padding: 0 1rem;
}
</style>
