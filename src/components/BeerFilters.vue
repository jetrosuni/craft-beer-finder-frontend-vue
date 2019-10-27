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
      >
      </b-autocomplete>
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
      selected: null
    };
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
    }
  },
  methods: {
    onSearchStringChanged(searchStr) {
      this.$emit("change-filter-search-string", searchStr);
    }
  }
};
</script>

<style scoped>
.cbf-filters {
  text-align: left;
}
</style>
