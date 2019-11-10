<template>
  <div class="section cbf-main-section">
    <h1 class="title is-1 is-hidden-mobile">{{titleText}}</h1>
    <h1 class="title is-4 is-hidden-tablet">{{titleText}}</h1>

    <div
      v-if="errorMessage"
      class="cbf-is-warning"
    >{{errorMessage}}</div>

    <div v-if="!waitingForResponse">
      <BeerFilters
        :data="beerList"
        @change-filter-search-string="onFilterSearchStringChanged"
        @change-filter-venue-string="onFilterVenueStringChanged"
        @change-filter-beer-style="onFilterBeerStyleChanged"
        @change-filter-rating-range="onFilterRatingRangeChanged"
      />
    </div>

    <div v-if="waitingForResponse">
      <div class="cbf-loading">
        <BeerLoading />
      </div>
    </div>

    <BeerList
      v-if="beerListHasItems"
      :data="filteredBeerList"
    />
    <div v-if="!waitingForResponse && filteredBeerList && !filteredBeerList.length">
      No results found with the selected filters.
    </div>

    <div
      v-if="!waitingForResponse && filteredBeerList && filteredBeerList.length"
      class="untappd-disclaimer is-size-7"
    >
      Data provided by Untappd
    </div>
  </div>
</template>

<script>
import axios from "axios";

import BeerFilters from "@/components/BeerFilters.vue";
import BeerList from "@/components/BeerList.vue";
import BeerLoading from "@/components/BeerLoading.vue";

import beerStyles from "../data/beerStyles";

export default {
  name: "MainPage",
  components: {
    BeerFilters,
    BeerList,
    BeerLoading
  },
  data() {
    return {
      errorMessage: "",
      beerList: [],
      waitingForResponse: false,
      searchBeerString: "",
      searchVenueString: "",
      ratingMinValue: 4,
      beerStyleSelection: ["light", "dark", "sour", "other"]
    };
  },
  mounted() {
    this.$ga.page(process.env.VUE_APP_CRAFT_BEER_FINDER_PUBLIC_PATH);
    this.requestData();
  },
  computed: {
    titleText: function() {
      return process.env.VUE_APP_CRAFT_BEER_FINDER_TITLE;
    },
    filteredBeerNames: function() {
      return this.beerList.filter(beer => {
        return this.searchBeerString && this.searchBeerString.length > 2
          ? beer.beer_name
              .toLowerCase()
              .includes(this.searchBeerString.toLowerCase())
          : true;
      });
    },
    filteredVenues: function() {
      return this.filteredBeerNames.filter(beer => {
        return this.searchVenueString && this.searchVenueString.length > 2
          ? beer.bars
              .toLowerCase()
              .includes(this.searchVenueString.toLowerCase())
          : true;
      });
    },
    filteredLightBeers: function() {
      return this.filteredVenues.filter(beer => {
        return !this.beerStyleSelection.includes("light")
          ? !beerStyles.light.some(style => style === beer.beer_style)
          : true;
      });
    },
    filteredDarkBeers: function() {
      return this.filteredLightBeers.filter(beer => {
        return !this.beerStyleSelection.includes("dark")
          ? !beerStyles.dark.some(style => style === beer.beer_style)
          : true;
      });
    },
    filteredSourBeers: function() {
      return this.filteredDarkBeers.filter(beer => {
        return !this.beerStyleSelection.includes("sour")
          ? !beerStyles.sour.some(style => style === beer.beer_style)
          : true;
      });
    },
    filteredOtherBeers: function() {
      return this.filteredSourBeers.filter(beer => {
        return !this.beerStyleSelection.includes("other")
          ? !beerStyles.other.some(style => style === beer.beer_style)
          : true;
      });
    },
    filteredBeerList: function() {
      return this.filteredOtherBeers.filter(beer => {
        return beer.beer_rating >= this.ratingMinValue ? true : false;
      });
    }
  },
  methods: {
    beerListHasItems() {
      return (
        !this.waitingForResponse && this.beerList && this.beerList.length > 0
      );
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
    },
    onFilterVenueStringChanged(searchStr) {
      this.searchVenueString = searchStr;
    },
    onFilterBeerStyleChanged(beerStyleArray) {
      this.beerStyleSelection = beerStyleArray;
    },
    onFilterRatingRangeChanged(minRating) {
      this.ratingMinValue = minRating;
    }
  }
};
</script>

<style scoped>
.cbf-is-warning {
  color: red;
}
.cbf-loading {
  margin-top: 4rem;
}
.untappd-disclaimer {
  margin: 4rem 0 1rem 0;
  font-weight: bold;
}

/* small devices */
@media (max-width: 768px) {
  .cbf-main-section {
    padding-top: 0;
  }
}
</style>
