<template>
  <div class="cbf-filters">
    <b-field
      label="Find a beer"
      type="is-dark"
    >
      <b-autocomplete
        v-model="searchStr"
        placeholder=""
        :keep-first="keepFirst"
        :open-on-focus="openOnFocus"
        :data="beerNames"
        field="beer.beer_name"
        @select="option => onSearchStringChanged(option)"
      />
    </b-field>

    <b-field
      label="Filter by venue"
      type="is-dark"
    >
      <b-autocomplete
        v-model="venueStr"
        placeholder=""
        :keep-first="keepFirst"
        :open-on-focus="openOnFocus"
        :data="venueNames"
        field="venue_name"
        @select="option => onVenueStringChanged(option)"
      />
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
      keepFirst: false,
      openOnFocus: false,
      searchStr: "",
      venueStr: "",
      selected: null,
      venueList: []
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
    beerNames: function() {
      return this.data.reduce((results, beer) => {
        if (
          beer.beer_name
            .toString()
            .toLowerCase()
            .indexOf(this.searchStr.toLowerCase()) >= 0
        ) {
          results.push(beer.beer_name);
        }
        return results;
      }, []);
    },
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
      this.$emit("change-filter-search-string", searchStr);
    },
    onVenueStringChanged(searchStr) {
      this.$emit("change-filter-venue-string", searchStr);
    },
  }
};
</script>

<style scoped>
.cbf-filters {
  text-align: left;
}
</style>
