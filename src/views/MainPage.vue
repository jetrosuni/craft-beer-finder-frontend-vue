<template>
  <div class="section">
    <h1 class="title is-1">Craft Beer Finder</h1>
    <BeerFilters
      :data="beerList"
      @change-filter-search-string="onFilterSearchStringChanged"
    />
    <div
      v-if="errorMessage"
      style="color: red"
    >{{errorMessage}}</div>
    <BeerList
      v-if="!waitingForResponse"
      :data="filteredBeers"
    />
  </div>
</template>

<script>
import axios from "axios";

import BeerFilters from "@/components/BeerFilters.vue";
import BeerList from "@/components/BeerList.vue";

export default {
  name: "MainPage",
  components: {
    BeerFilters,
    BeerList
  },
  data() {
    return {
      errorMessage: "",
      beerList: [],
      waitingForResponse: false,
      searchBeerString: ""
    };
  },
  mounted() {
    this.requestData();
  },
  computed: {
    filteredBeers() {
      return this.beerList.filter(beer => {
        return this.searchBeerString && this.searchBeerString.length > 2
          ? beer.beer_name
              .toLowerCase()
              .includes(this.searchBeerString.toLowerCase())
          : true;
      });
    }
  },
  methods: {
    beerListHasItems() {
      return !this.waitingForResponse && !(this.filteredBeerList.length > 0);
    },
    requestData() {
      this.waitingForResponse = true;
      axios
        .get(process.env.VUE_APP_CRAFT_BEER_FINDER_API_URL)
        .then(response => {
          this.resolveRequest(response);
          this.waitingForResponse = false;
        })
        .catch(err => {
          this.errorMessage = err;
          this.waitingForResponse = false;
        });
    },
    resolveRequest(response) {
      this.beerList = response.data;
    },
    onFilterSearchStringChanged(searchStr) {
      this.searchBeerString = searchStr;
    }
  }
};
</script>
