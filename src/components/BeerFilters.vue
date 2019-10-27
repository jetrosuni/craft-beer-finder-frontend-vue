<template>
  <div class="cbf-filters">
    <b-field
      label="Find a beer"
      type="is-dark"
    >
      <b-autocomplete
        v-model="name"
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
      name: "",
      selected: null
    };
  },
  computed: {
    beerNames: function() {
      const beerNames = [];

      this.data.map(beer => {
        if (
          beer.beer_name
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        ) {
          beerNames.push(beer.beer_name);
        }
      });

      return beerNames;
    }
  },
  methods: {
    onSearchStringChanged(searchString) {
      this.$emit("change-filter-search-string", searchString);
    }
  }
};
</script>

<style scoped>
.cbf-filters {
  text-align: left;
}
</style>
