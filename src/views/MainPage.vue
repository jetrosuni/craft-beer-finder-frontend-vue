<template>
  <div class="section cbf-main-section">
    <h1
      class="cbf-title title is-size-1-widescreen is-size-2-desktop is-size-3-touch-only is-size-4-tablet-only is-size-4-mobile"
    >{{titleText}}</h1>

    <div v-if="isDisplayLoadingIcon && isLoading">
      <div class="cbf-loading">
        <BeerLoading />
      </div>
    </div>

    <div v-if="errorMessage" class="cbf-is-warning">{{errorMessage}}</div>

    <div class="cbf-sticky" v-if="!isLoading">
      <BeerFilters
        :data="beerList"
        :is-beer-search="isBeerNameSearch"
        :is-venue-search="isVenueSearch"
        :init-filter-values="filterValues"
        :venues="venues"
        @change-filter-search-string="onFilterSearchStringChanged"
        @change-filter-venue-string="onFilterVenueStringChanged"
        @change-filter-beer-style="onFilterBeerStyleChanged"
        @change-filter-day-range="onFilterDayRangeChanged"
        @change-filter-rating-range="onFilterRatingRangeChanged"
      />
    </div>

    <BeerList
      v-if="beerListHasItems()"
      :data="filteredBeerList"
      :day-limit="isBeerNameSearch || isVenueSearch ? 7 : filterValues.dayLimit"
    />

    <div
      v-if="!isDisplayLoadingIcon && !isFullListLoaded"
      :class="[ !isDisplayLoadingIcon && !isFullListLoaded && !beerListHasItems() ? 'cbf-more-beers-loading-no-results' : 'cbf-more-beers-loading' ]"
    >
      <p>Serving more beer ... please wait ...</p>
      <div class="cbf-more-beers-loading-pint">
        <BeerLoading size="small" />
      </div>
    </div>

    <div
      v-if="!isLoading && filteredBeerList && !filteredBeerList.length"
      class="cbf-no-results-area"
    >No results found with the selected filters.</div>

    <div
      v-if="!isLoading && filteredBeerList && filteredBeerList.length"
      class="cbf-untappd-disclaimer is-size-7"
    >Data provided by Untappd</div>
  </div>
</template>

<script>
import BeerFilters from '@/components/BeerFilters.vue'
import BeerList from '@/components/BeerList.vue'
import BeerLoading from '@/components/BeerLoading.vue'
import BackendService from '@/services/backend.service'

import beerStyles from '../data/beerStyles'

export default {
  name: 'MainPage',
  components: {
    BeerFilters,
    BeerList,
    BeerLoading,
  },
  data() {
    return {
      refreshTimer: null,
      errorMessage: '',
      beerList: [],
      venues: [],
      waitingForResponse: false,
      isDisplayLoadingIcon: true,
      isLoading: false,
      isFullListLoaded: false,
      filterValues: {
        searchBeerString: '',
        searchVenueString: '',
        dayLimit: 1,
        ratingMin: 4,
        beerStyleSelection: ['light', 'dark', 'sour', 'other'],
      },
    }
  },
  created() {
    this.isDisplayLoadingIcon = true
    this.isFullListLoaded = false
    this.requestVenues()
    this.requestData(true, false)
  },
  mounted() {
    this.$ga.page(process.env.VUE_APP_CRAFT_BEER_FINDER_PUBLIC_PATH)
    this.refreshTimer = setInterval(() => {
      this.requestData(false, true)
    }, 1200000)
  },
  beforeDestroy() {
    clearInterval(this.refreshTimer)
  },
  computed: {
    titleText: function () {
      return process.env.VUE_APP_CRAFT_BEER_FINDER_TITLE
    },
    filteredBeerNames: function () {
      return this.beerList.filter((beer) => {
        return this.isBeerNameSearch
          ? beer.beer_name
              .toLowerCase()
              .includes(this.filterValues.searchBeerString.toLowerCase())
          : true
      })
    },
    filteredVenues: function () {
      return this.filteredBeerNames.filter((beer) => {
        return this.isVenueSearch
          ? beer.bars
              .toLowerCase()
              .includes(this.filterValues.searchVenueString.toLowerCase())
          : true
      })
    },
    filteredLightBeers: function () {
      return this.filteredVenues.filter((beer) => {
        return !this.filterValues.beerStyleSelection.includes('light')
          ? !beerStyles.light.some((style) => style === beer.beer_style)
          : true
      })
    },
    filteredDarkBeers: function () {
      return this.filteredLightBeers.filter((beer) => {
        return !this.filterValues.beerStyleSelection.includes('dark')
          ? !beerStyles.dark.some((style) => style === beer.beer_style)
          : true
      })
    },
    filteredSourBeers: function () {
      return this.filteredDarkBeers.filter((beer) => {
        return !this.filterValues.beerStyleSelection.includes('sour')
          ? !beerStyles.sour.some((style) => style === beer.beer_style)
          : true
      })
    },
    filteredOtherBeers: function () {
      return this.filteredSourBeers.filter((beer) => {
        return !this.filterValues.beerStyleSelection.includes('other')
          ? !beerStyles.other.some((style) => style === beer.beer_style)
          : true
      })
    },
    filteredDayLimit: function () {
      return this.filteredOtherBeers.filter((beer) => {
        return beer.days_ago_bars
          .split(',')
          .some((value) => +value <= this.filterValues.dayLimit)
          ? true
          : false
      })
    },
    filteredBeerList: function () {
      // NOTE: if beer name search is active, do not care about the other filters
      if (this.isBeerNameSearch) {
        return this.filteredBeerNames
      }

      return this.filteredDayLimit.filter((beer) => {
        return beer.beer_rating >= this.filterValues.ratingMin ? true : false
      })
    },
    isBeerNameSearch: function () {
      return this.filterValues.searchBeerString &&
        this.filterValues.searchBeerString.length > 2
        ? true
        : false
    },
    isVenueSearch: function () {
      return this.filterValues.searchVenueString &&
        this.filterValues.searchVenueString.length > 2
        ? true
        : false
    },
  },
  methods: {
    beerListHasItems() {
      return (
        !this.waitingForResponse &&
        this.filteredBeerList &&
        this.filteredBeerList.length > 0
      )
    },
    requestVenues() {
      BackendService.getVenues()
        .then((res) => {
          this.venues = res
        })
        .catch((err) => {
          this.errorMessage = err
        })
    },
    requestData(initialDataOnly = false, isSilent = false) {
      if (this.waitingForResponse) {
        return
      }
      if (!isSilent) {
        this.isLoading = true
      }
      if (initialDataOnly) {
        BackendService.getTopBeers()
          .then((res) => {
            this.resolveRequest(res)
            this.waitingForResponse = false
            this.isLoading = false
            this.isDisplayLoadingIcon = false
          })
          .catch((err) => {
            this.errorMessage = err
            this.waitingForResponse = false
            this.isLoading = false
          })
      } else {
        BackendService.getAllBeers()
          .then((res) => {
            this.resolveRequest(res)
            this.waitingForResponse = false
            this.isLoading = false
            this.isFullListLoaded = true
          })
          .catch((err) => {
            this.errorMessage = err
            this.waitingForResponse = false
            this.isLoading = false
          })
      }
    },
    resolveRequest(response) {
      this.beerList = response

      if (!this.isFullListLoaded) {
        // NOTE: Wait a moment before executing to make sure the DOM gets refreshed
        const that = this
        setTimeout(function () {
          that.requestData(false, true)
        }, 2500)
      }
    },
    onFilterSearchStringChanged(searchStr) {
      this.filterValues.searchBeerString = searchStr ? searchStr : ''
    },
    onFilterVenueStringChanged(searchStr) {
      this.filterValues.searchVenueString = searchStr ? searchStr : ''
    },
    onFilterBeerStyleChanged(beerStyleArray) {
      this.filterValues.beerStyleSelection = beerStyleArray
    },
    onFilterDayRangeChanged(dayLimit) {
      this.filterValues.dayLimit = dayLimit
    },
    onFilterRatingRangeChanged(minRating) {
      this.filterValues.ratingMin = minRating
    },
  },
}
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
.cbf-more-beers-loading {
  font-style: italic;
  padding-top: 3rem;
  padding-bottom: 4rem;
}
.cbf-more-beers-loading-no-results {
  font-style: italic;
  padding-top: 3rem;
  padding-bottom: 6rem;
}
.cbf-more-beers-loading-pint {
  position: absolute;
  bottom: 12rem;
  left: 50%;
  font-style: italic;
}
.cbf-no-results-area {
  padding-top: 3rem;
}
.cbf-untappd-disclaimer {
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
  .cbf-more-beers-loading {
    font-style: italic;
    padding-bottom: 4rem;
  }
  .cbf-more-beers-loading-pint {
    position: absolute;
    bottom: 14.5rem;
    left: 50%;
    font-style: italic;
  }
}
</style>
