<template>
  <section class="mt-6 text-center lg:mt-10">
    <h1 class="text-2xl font-bold sm:mb-3 lg:mb-5 lg:text-4xl xl:text-5xl">
      {{ titleText }}
    </h1>
    <BeerLoading v-if="isDisplayLoadingIcon && isLoading" />
    <div v-if="!!errorMessage" class="mb-3 text-red-600">{{ errorMessage }}</div>
    <div
      class="sticky top-0 z-50 border-b-4 border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
      v-if="!isLoading && venues && !!!errorMessage"
    >
      <BeerFilter
        :venues="venues"
        :filter-values="filterValues"
        :is-beer-search="isBeerNameSearch"
        :is-venue-search="isVenueSearch"
        @change-filter-search-string="onFilterSearchStringChanged"
        @change-filter-venue-string="onFilterVenueStringChanged"
        @change-filter-beer-style="onFilterBeerStyleChanged"
        @change-filter-day-range="onFilterDayRangeChanged"
        @change-filter-rating-range="onFilterRatingRangeChanged"
      />
    </div>
    <BeerList
      v-if="isBeerListItems"
      :beer-list="filteredBeerList"
      :day-limit="isBeerNameSearch || isVenueSearch ? 7 : filterValues.dayLimit"
    />
    <div v-if="!isDisplayLoadingIcon && !isFullListLoaded" class="relative mt-6 pb-24 italic">
      <p>Serving more beer ... please wait ...</p>
      <div class="absolute left-2/4 top-0 md:top-[-2.5rem]">
        <BeerLoading size="small" />
      </div>
    </div>
    <template v-if="isFullListLoaded && !isLoading">
      <div v-if="!filteredBeerList?.length" class="my-6">
        No results found with the selected filters.
      </div>
      <footer v-else class="my-8 text-xs font-bold">Data provided by Untappd</footer>
    </template>
  </section>
</template>

<script lang="ts">
import { type Beer, type FilterValues, type Venue } from '../types'

import { defineComponent, readonly } from 'vue'

import BeerFilter from '@/components/BeerFilter.vue'
import BeerList from '@/components/BeerList.vue'
import BeerLoading from '@/components/BeerLoading.vue'
import { backendService } from '@/services/backendService'

export default defineComponent({
  name: 'MainView',
  components: {
    BeerFilter,
    BeerList,
    BeerLoading,
  },
  data() {
    return {
      refreshTimer: <number | undefined>undefined,
      errorMessage: <string | undefined>undefined,
      genericErrorMessage: 'Connection failed ... please try again later ...',
      beerList: <Readonly<Array<Beer>>>[],
      venues: <Readonly<Array<Venue>>>[],
      isDisplayLoadingIcon: true,
      isFullListLoaded: false,
      isLoading: false,
      isWaitingForResponse: false,
      filterValues: <FilterValues>{
        searchBeerString: '',
        searchVenueString: '',
        dayLimit: 5,
        ratingMin: 3.75,
        beerStylesAll: ['light', 'dark', 'sour', 'other'],
        beerStylesSelected: <Array<string>>[],
      },
    }
  },
  mounted() {
    this.filterValues.beerStylesSelected = this.filterValues.beerStylesAll

    this.isDisplayLoadingIcon = true
    this.isFullListLoaded = false

    this.requestVenues()
    this.requestBeers(true, false)

    this.refreshTimer = setInterval(() => {
      this.requestBeers(false, true)
    }, 1200000)
  },
  beforeDestroy() {
    clearInterval(this.refreshTimer)
  },
  computed: {
    titleText(): string {
      return import.meta.env.VITE_CRAFT_BEER_FINDER_TITLE
    },
    filteredBeerNames(): Array<Beer> {
      return this.beerList.filter((beer) =>
        this.isBeerNameSearch
          ? beer.name.toLowerCase().includes(this.filterValues.searchBeerString.toLowerCase())
          : true,
      )
    },
    filteredVenues(): Array<Beer> {
      return this.filteredBeerNames.filter((beer) =>
        this.isVenueSearch
          ? beer.venues.some((venue) =>
              venue.name.toLowerCase().includes(this.filterValues.searchVenueString.toLowerCase()),
            )
          : true,
      )
    },
    filteredLightBeers(): Array<Beer> {
      return this.filteredVenues.filter((beer) =>
        !this.filterValues.beerStylesSelected.includes('light') ? beer.style !== 'light' : true,
      )
    },
    filteredDarkBeers(): Array<Beer> {
      return this.filteredLightBeers.filter((beer) =>
        !this.filterValues.beerStylesSelected.includes('dark') ? beer.style !== 'dark' : true,
      )
    },
    filteredSourBeers(): Array<Beer> {
      return this.filteredDarkBeers.filter((beer) =>
        !this.filterValues.beerStylesSelected.includes('sour') ? beer.style !== 'sour' : true,
      )
    },
    filteredOtherBeers(): Array<Beer> {
      return this.filteredSourBeers.filter((beer) =>
        !this.filterValues.beerStylesSelected.includes('other') ? beer.style !== 'other' : true,
      )
    },
    filteredDayLimit(): Array<Beer> {
      return this.filteredOtherBeers.filter(
        (beer) => !!beer.venues.some((venue) => venue.daysAgo <= this.filterValues.dayLimit),
      )
    },
    filteredBeerList(): Array<Beer> {
      // NOTE: if beer name search is active, do not care about the other filters
      return this.isBeerNameSearch
        ? this.filteredBeerNames
        : this.filteredDayLimit.filter((beer) =>
            this.isVenueSearch ? true : beer.rating >= this.filterValues.ratingMin,
          )
    },
    isBeerListItems(): boolean {
      return !!(!this.isWaitingForResponse && this.filteredBeerList && this.filteredBeerList.length)
    },
    isBeerNameSearch(): boolean {
      return !!(this.filterValues.searchBeerString && this.filterValues.searchBeerString.length > 2)
    },
    isVenueSearch(): boolean {
      return !!(
        this.filterValues.searchVenueString && this.filterValues.searchVenueString.length > 2
      )
    },
  },
  methods: {
    requestVenues(): void {
      backendService
        .getVenues()
        .then((res) => {
          this.venues = res
        })
        .catch((err) => {
          console.log(err)

          this.errorMessage = this.genericErrorMessage
        })
    },
    requestBeers(initialDataOnly = false, isSilent = false): void {
      if (this.isWaitingForResponse) {
        return
      }

      if (!isSilent) {
        this.isLoading = true
      }

      if (initialDataOnly) {
        backendService
          .getTopBeers()
          .then((res) => {
            this.resolveRequest(res)

            this.isDisplayLoadingIcon = false
          })
          .catch((err) => {
            console.log(err)

            this.errorMessage = this.genericErrorMessage
          })
          .finally(() => {
            this.isWaitingForResponse = false
            this.isLoading = false
          })

        return
      }

      backendService
        .getAllBeers()
        .then((res) => {
          this.resolveRequest(res)

          this.isFullListLoaded = true
        })
        .catch((err) => {
          console.log(err)

          this.errorMessage = this.genericErrorMessage
        })
        .finally(() => {
          this.isWaitingForResponse = false
          this.isLoading = false
        })
    },
    resolveRequest(response: Array<Beer>): void {
      if (response?.[0]?.beerId && response[0].beerId > 0) {
        this.beerList = readonly(response)
      }

      if (!this.isFullListLoaded) {
        // NOTE: Wait a moment before executing to make sure the DOM gets refreshed
        setTimeout(() => {
          this.requestBeers(false, true)
        }, 2500)
      }
    },
    onFilterSearchStringChanged(searchStr: string): void {
      this.filterValues.searchBeerString = searchStr
    },
    onFilterVenueStringChanged(venueStr: string): void {
      this.filterValues.searchVenueString = venueStr
    },
    onFilterBeerStyleChanged(beerStyleArray: Array<string>): void {
      this.filterValues.beerStylesSelected = beerStyleArray
    },
    onFilterDayRangeChanged(dayLimit: number): void {
      this.filterValues.dayLimit = dayLimit
    },
    onFilterRatingRangeChanged(minRating: number): void {
      this.filterValues.ratingMin = minRating
    },
  },
})
</script>
