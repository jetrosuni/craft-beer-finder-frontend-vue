<template>
  <section class="mx-3 mt-1.5 pt-3 text-left text-xs sm:mt-3 sm:text-sm md:text-base">
    <div class="grid grid-cols-7">
      <BeerFilterStyle
        :beer-styles="filterValues.beerStylesAll"
        :selected-styles="filterValues.beerStylesSelected"
        :is-disabled="isBeerSearch"
        @beer-style-selected="onBeerStyleSelected"
      />
      <DarkModeButton class="cbf-tiny-screen-support ml-auto" />
    </div>
    <div class="grid grid-cols-6">
      <div class="pr-1 pt-5" :class="{ 'cbf-global-is-ignored': isBeerSearch }">
        <p>Day limit</p>
        <p>
          {{ filterValues.dayLimit === 0 ? 'today' : '0–' + filterValues.dayLimit + ' days ago' }}
        </p>
      </div>
      <div
        class="col-span-5 pt-5"
        :class="{ 'cbf-global-is-ignored pointer-events-none': isBeerSearch }"
      >
        <BeerFilterRange
          :min="0"
          :max="7"
          :step="1"
          :value="filterValues.dayLimit"
          @change="(value) => onDayRangeChanged(value)"
        />
      </div>
      <div class="pr-1 pt-5" :class="{ 'cbf-global-is-ignored': isBeerSearch || isVenueSearch }">
        <p>Rating</p>
        <p>{{ `${filterValues.ratingMin}–5 stars` }}</p>
      </div>
      <div
        class="col-span-5 pt-5"
        :class="{ 'cbf-global-is-ignored pointer-events-none': isBeerSearch || isVenueSearch }"
      >
        <BeerFilterRange
          :min="3.5"
          :max="4.5"
          :step="0.25"
          :ticks="['3.5', '3.75', '4.0', '4.25', '4.5']"
          :value="filterValues.ratingMin"
          @change="(value) => onRatingRangeChanged(value)"
        />
      </div>
      <div class="col-span-3 pr-5 pt-5">
        <div class="mb-3">
          <div class="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              id="search-field"
              type="search"
              class="relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary dark:focus:text-neutral-200"
              placeholder="Find a beer"
              aria-label="Find a beer"
              v-model="searchBeerString"
              @input="onSearchStringChanged"
            />
          </div>
        </div>
      </div>
      <div
        class="col-span-3 pt-5"
        :class="{ 'cbf-global-is-ignored pointer-events-none': isBeerSearch }"
      >
        <div class="relative" data-te-input-wrapper-init id="venueFilter">
          <input
            type="search"
            class="peer block min-h-[auto] w-full rounded border-neutral-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear placeholder:opacity-0 focus:placeholder:opacity-100 peer-focus:border-primary motion-reduce:transition-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:border-primary"
            id="beerFilterFormVenueInput"
          />
          <label
            for="beerFilterFormVenueInput"
            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[80%] origin-[0_0] truncate pt-[0.37rem] text-base leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:border-primary peer-focus:bg-white peer-data-[te-input-focused]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-focused]:scale-[0.8] peer-data-[te-input-state-active]:scale-[0.8] peer-data-[te-input-focused]:bg-white peer-data-[te-input-state-active]:bg-white motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:border-primary dark:peer-focus:bg-neutral-900 dark:peer-data-[te-input-focused]:bg-neutral-900 dark:peer-data-[te-input-state-active]:bg-neutral-900"
            >Filter by venue
          </label>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { type FilterValues, type Venue } from '../types'

import { defineComponent, type PropType } from 'vue'
import debounce from 'lodash.debounce'
import { Autocomplete, Input, initTE } from 'tw-elements'

import BeerFilterRange from '@/components/BeerFilterRange.vue'
import BeerFilterStyle from '@/components/BeerFilterStyle.vue'
import DarkModeButton from '@/components/DarkModeButton.vue'

export default defineComponent({
  name: 'BeerFilter',
  components: {
    BeerFilterRange,
    BeerFilterStyle,
    DarkModeButton,
  },
  props: {
    venues: {
      type: Array as PropType<Readonly<Array<Venue>>>,
      required: true,
    },
    filterValues: {
      type: Object as PropType<FilterValues>,
      required: true,
    },
    isBeerSearch: {
      type: Boolean,
      required: true,
    },
    isVenueSearch: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      searchBeerString: '',
      searchVenueString: '',
    }
  },
  computed: {
    venueNames(): Array<string> {
      return this.venues.map((venue) => venue.name)
    },
  },
  mounted() {
    initTE({ Input })

    this.emitDayRangeChange = debounce(this.emitDayRangeChange, 320)
    this.emitRatingChange = debounce(this.emitRatingChange, 320)
    this.onSearchStringChanged = debounce(this.onSearchStringChanged, 320)

    const venueFilterEl = document.getElementById('venueFilter')

    if (venueFilterEl) {
      const filter = (input: string) =>
        this.venueNames.filter((venue: string) => venue.toLowerCase().includes(input.toLowerCase()))

      new Autocomplete(venueFilterEl, {
        filter,
        noResults: 'No venue found.',
      })

      const emitVenueChange = (e: CustomEvent) => {
        // NOTE: value property doesn't exist in CustomEvent as it's unique for TW Elements Autocomplete component
        const selection = (e as any).value

        this.$emit('change-filter-venue-string', this.ensureMinimumInputLength(selection))
      }

      venueFilterEl.addEventListener('itemSelect.te.autocomplete', emitVenueChange as EventListener)
      venueFilterEl.addEventListener('update.te.autocomplete', emitVenueChange as EventListener)
    }
  },
  methods: {
    ensureMinimumInputLength(str: string | undefined): string | undefined {
      return str?.length && str.length > 2 ? str : undefined
    },
    emitDayRangeChange(dayLimit: number): void {
      this.$emit('change-filter-day-range', dayLimit)
    },
    emitRatingChange(minRating: number): void {
      this.$emit('change-filter-rating-range', minRating)
    },
    onSearchStringChanged(): void {
      this.$emit(
        'change-filter-search-string',
        this.ensureMinimumInputLength(this.searchBeerString),
      )
    },
    onBeerStyleSelected(beerStyleArray: Array<string>): void {
      this.$emit('change-filter-beer-style', beerStyleArray)
    },
    onDayRangeChanged(dayLimit: number): void {
      this.emitDayRangeChange(dayLimit)
    },
    onRatingRangeChanged(minRating: number): void {
      this.emitRatingChange(minRating)
    },
  },
})
</script>

<style scoped>
.cbf-day-label,
.cbf-rating-label {
  color: #c2c2c2;
  min-width: 6rem;
  width: 6rem;
}
.cbf-input-area {
  padding: 0.25rem 0.5rem;
}

@media only screen and (max-width: 400px) {
  .cbf-tiny-screen-support {
    position: fixed;
    top: 1rem;
    right: 1rem;
  }
}
</style>
