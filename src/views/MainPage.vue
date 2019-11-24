<template>
  <div class="section cbf-main-section">
    <h1 class="cbf-title title is-size-1-widescreen is-size-2-desktop is-size-3-touch-only is-size-4-tablet-only is-size-4-mobile">{{titleText}}</h1>

    <div v-if="isLoading">
      <div class="cbf-loading">
        <BeerLoading />
      </div>
    </div>

    <div
      v-if="errorMessage"
      class="cbf-is-warning"
    >{{errorMessage}}</div>

    <div class="cbf-sticky" v-if="!isLoading">
      <BeerFilters
        :data="beerList"
        :is-beer-search="isBeerNameSearch"
        :is-venue-search="isVenueSearch"
        @change-filter-search-string="onFilterSearchStringChanged"
        @change-filter-venue-string="onFilterVenueStringChanged"
        @change-filter-beer-style="onFilterBeerStyleChanged"
        @change-filter-rating-range="onFilterRatingRangeChanged"
      />
    </div>

    <BeerList
      v-if="beerListHasItems"
      :data="filteredBeerList"
    />

    <div v-if="!isLoading && filteredBeerList && !filteredBeerList.length">
      No results found with the selected filters.
    </div>

    <div
      v-if="!isLoading && filteredBeerList && filteredBeerList.length"
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
      refreshTimer: null,
      errorMessage: "",
      beerList: [],
      waitingForResponse: false,
      isLoading: false,
      searchBeerString: "",
      searchVenueString: "",
      ratingMinValue: 4,
      beerStyleSelection: ["light", "dark", "sour", "other"]
    };
  },
  mounted() {
    this.$ga.page(process.env.VUE_APP_CRAFT_BEER_FINDER_PUBLIC_PATH);
  },
  created() {
    this.requestData(false);
    this.refreshTimer = setInterval(() => {
      this.requestData(true);
    }, 1200000);
  },
  beforeDestroy() {
    clearInterval(this.refreshTimer);
  },
  computed: {
    titleText: function() {
      return process.env.VUE_APP_CRAFT_BEER_FINDER_TITLE;
    },
    filteredBeerNames: function() {
      return this.beerList.filter(beer => {
        return this.isBeerNameSearch
          ? beer.beer_name
              .toLowerCase()
              .includes(this.searchBeerString.toLowerCase())
          : true;
      });
    },
    filteredVenues: function() {
      return this.filteredBeerNames.filter(beer => {
        return this.isVenueSearch
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
      // NOTE: if beer name search is active, do not care about the other filters
      if (this.isBeerNameSearch) {
        return this.filteredBeerNames;
      }

      // NOTE: if venue search is active, do not care about the ratings
      if (this.isVenueSearch) {
        return this.filteredOtherBeers;
      }

      return this.filteredOtherBeers.filter(beer => {
        return beer.beer_rating >= this.ratingMinValue ? true : false;
      });
    },
    isBeerNameSearch: function() {
      return this.searchBeerString && this.searchBeerString.length > 2 ? true : false;
    },
    isVenueSearch: function() {
      return this.searchVenueString && this.searchVenueString.length > 2 ? true: false;
    }
  },
  methods: {
    beerListHasItems() {
      return (
        !this.waitingForResponse && this.beerList && this.beerList.length > 0
      );
    },
    requestData(isSilent = false) {
      if (this.waitingForResponse) {
        return;
      }
      if (!isSilent) {
        this.isLoading = true;
      }
      axios
        .get(process.env.VUE_APP_CRAFT_BEER_FINDER_API_URL)
        .then(response => {
          this.resolveRequest(response);
          this.waitingForResponse = false;
          this.isLoading = false;
        })
        .catch(err => {
          this.errorMessage = err;
          this.waitingForResponse = false;
          this.isLoading = false;
        });
    },
    resolveRequest(response) {
      this.beerList = response.data;
    },
    onFilterSearchStringChanged(searchStr) {
      this.searchBeerString = searchStr ? searchStr : "";
    },
    onFilterVenueStringChanged(searchStr) {
      this.searchVenueString = searchStr ? searchStr : "";
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
.cbf-title {
  margin-bottom: 0;
}
.cbf-main-section {
  padding: 0;
}
.cbf-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 5px solid #f5f5f5;
  z-index: 1000;
  padding: 1.5rem 1rem 1rem 1rem;
}
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

@media only screen and (min-width: 769px) {
  .cbf-main-section {
    padding-top: 3rem;
  }
  .cbf-title {
    margin-bottom: 1.5rem;
  }
  .cbf-sticky {
    padding: 1rem;
  }
}
</style>
