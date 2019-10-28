<template>
  <div class="cbf-filters">
    <b-field
      label="Find a beer"
      type="is-dark"
    >
      <b-input
        v-model="searchStr"
        @input="option => onSearchStringChanged(option)"
      />
    </b-field>

    <b-field
      label="Filter by venue"
      type="is-dark"
    >
      <b-autocomplete
        v-model="venueStr"
        placeholder=""
        :keep-first="false"
        :open-on-focus="false"
        :data="venueNames"
        field="venue_name"
        @select="option => onVenueStringChanged(option)"
      />
    </b-field>

    <b-field
      label="Beer style"
    >
      <div class="block">
        <b-checkbox
          type="is-light"
          v-model="beerStyleSelection"
          native-value="light"
          @input="option => onBeerStyleSelected(option)"
        >
          Light
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
    </b-field>

    <b-field label="Rating range">
      <b-slider
        :min="3.5"
        :max="4.5"
        :step="0.25"
        :value="minRating"
        ticks
        type="is-light"
        @input="value => onRatingRangeChanged(value)"
      >
        <template v-for="(val, index) in [3.5, 3.75, 4, 4.25, 4.5]">
          <b-slider-tick
            :value="val"
            :key="`tick-${val}-${index}`"
          >{{ val }}</b-slider-tick>
        </template>
      </b-slider>
    </b-field>
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
</style>
