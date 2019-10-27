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
      if (searchStr === '' || searchStr.length > 2) {
        this.$emit("change-filter-search-string", searchStr);
      }
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
