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
        :filter-values="filterValues"
        @change-filter-search-string="onFilterSearchStringChanged"
        @change-filter-venue-string="onFilterVenueStringChanged"
        @change-filter-beer-style="onFilterBeerStyleChanged"
        @change-filter-day-range="onFilterDayRangeChanged"
        @change-filter-rating-range="onFilterRatingRangeChanged"
      />
    </div>

    <BeerList
      v-if="beerListHasItems"
      :data="filteredBeerList"
      :day-limit="isBeerNameSearch || isVenueSearch ? 7 : filterValues.dayLimit"
    />

    <div v-if="!isDisplayLoadingIcon && !isFullListLoaded" class="cbf-more-beers-loading">
      <p>fetching more beers ... please wait ...</p>
      <div class="cbf-more-beers-loading-pint">
        <BeerLoading size="small" />
      </div>
    </div>

    <div
      v-if="!isLoading && filteredBeerList && !filteredBeerList.length"
    >No results found with the selected filters.</div>

    <div
      v-if="!isLoading && filteredBeerList && filteredBeerList.length"
      class="cbf-untappd-disclaimer is-size-7"
    >Data provided by Untappd</div>
  </div>
</template>

<script>
import axios from 'axios'

import BeerFilters from '@/components/BeerFilters.vue'
import BeerList from '@/components/BeerList.vue'
import BeerLoading from '@/components/BeerLoading.vue'

import beerStyles from '../data/beerStyles'

export default {
  name: 'MainPage',
  components: {
    BeerFilters,
    BeerList,
    BeerLoading
  },
  data() {
    return {
      refreshTimer: null,
      errorMessage: '',
      beerList: [],
      waitingForResponse: false,
      isDisplayLoadingIcon: true,
      isLoading: false,
      isFullListLoaded: false,
      filterValues: {
        searchBeerString: '',
        searchVenueString: '',
        dayLimit: 1,
        ratingMin: 4,
        beerStyleSelection: ['light', 'dark', 'sour', 'other']
      }
    }
  },
  created() {
    this.isDisplayLoadingIcon = true
    this.isFullListLoaded = false
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
    titleText: function() {
      return process.env.VUE_APP_CRAFT_BEER_FINDER_TITLE
    },
    filteredBeerNames: function() {
      return this.beerList.filter(beer => {
        return this.isBeerNameSearch
          ? beer.beer_name
              .toLowerCase()
              .includes(this.filterValues.searchBeerString.toLowerCase())
          : true
      })
    },
    filteredVenues: function() {
      return this.filteredBeerNames.filter(beer => {
        return this.isVenueSearch
          ? beer.bars
              .toLowerCase()
              .includes(this.filterValues.searchVenueString.toLowerCase())
          : true
      })
    },
    filteredLightBeers: function() {
      return this.filteredVenues.filter(beer => {
        return !this.filterValues.beerStyleSelection.includes('light')
          ? !beerStyles.light.some(style => style === beer.beer_style)
          : true
      })
    },
    filteredDarkBeers: function() {
      return this.filteredLightBeers.filter(beer => {
        return !this.filterValues.beerStyleSelection.includes('dark')
          ? !beerStyles.dark.some(style => style === beer.beer_style)
          : true
      })
    },
    filteredSourBeers: function() {
      return this.filteredDarkBeers.filter(beer => {
        return !this.filterValues.beerStyleSelection.includes('sour')
          ? !beerStyles.sour.some(style => style === beer.beer_style)
          : true
      })
    },
    filteredOtherBeers: function() {
      return this.filteredSourBeers.filter(beer => {
        return !this.filterValues.beerStyleSelection.includes('other')
          ? !beerStyles.other.some(style => style === beer.beer_style)
          : true
      })
    },
    filteredDayLimit: function() {
      return this.filteredOtherBeers.filter(beer => {
        return beer.days_ago_bars
          .split(',')
          .some(value => +value <= this.filterValues.dayLimit)
          ? true
          : false
      })
    },
    filteredBeerList: function() {
      // NOTE: if beer name search is active, do not care about the other filters
      if (this.isBeerNameSearch) {
        return this.filteredBeerNames
      }

      // NOTE: if venue search is active, do not care about the ratings or day limit
      if (this.isVenueSearch) {
        return this.filteredOtherBeers
      }

      return this.filteredDayLimit.filter(beer => {
        return beer.beer_rating >= this.filterValues.ratingMin ? true : false
      })
    },
    isBeerNameSearch: function() {
      return this.filterValues.searchBeerString &&
        this.filterValues.searchBeerString.length > 2
        ? true
        : false
    },
    isVenueSearch: function() {
      return this.filterValues.searchVenueString &&
        this.filterValues.searchVenueString.length > 2
        ? true
        : false
    }
  },
  methods: {
    beerListHasItems() {
      return (
        !this.waitingForResponse && this.beerList && this.beerList.length > 0
      )
    },
    requestData(initialDataOnly = false, isSilent = false) {
      if (this.waitingForResponse) {
        return
      }
      if (!isSilent) {
        this.isLoading = true
      }
      axios
        .get(
          process.env.VUE_APP_CRAFT_BEER_FINDER_API_URL +
            (initialDataOnly ? 'top/' : 'beers/')
        )
        .then(response => {
          if (!initialDataOnly) {
            this.isFullListLoaded = true
          } else {
            this.isDisplayLoadingIcon = false
          }
          this.resolveRequest(response)
          this.waitingForResponse = false
          this.isLoading = false
        })
        .catch(err => {
          this.errorMessage = err
          this.waitingForResponse = false
          this.isLoading = false
        })
    },
    resolveRequest(response) {
      this.beerList = response.data

      if (!this.isFullListLoaded) {
        // NOTE: Wait a moment before executing to make sure the DOM gets refreshed
        const that = this
        setTimeout(function() {
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
    }
  }
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
.cbf-more-beers-loading-pint {
  position: absolute;
  bottom: 12rem;
  left: 50%;
  font-style: italic;
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
