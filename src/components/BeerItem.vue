<template>
  <div class="mb-5 md:mb-3">
    <div class="grid grid-cols-10 grid-rows-1 gap-3 sm:gap-2">
      <div class="pt-1.5">
        <img
          :src="tulipGlassSvg"
          class="float-right w-6"
          loading="lazy"
          width="24"
          height="41"
          alt="pint"
        />
      </div>
      <div class="mx-auto text-center text-xs leading-7 md:mt-1 md:text-base">
        <strong>{{ item.rating }}</strong>
        <div class="is-size-7">({{ item.ratingCount }})</div>
      </div>
      <div class="col-span-8 ml-2 leading-7">
        <p class="break-words">
          {{ item.name }}
        </p>
        <div class="cbf-tiny-flag float-left mr-2">
          <div
            :style="{ backgroundImage: 'url(' + flagSvg + ')' }"
            class="h-full bg-cover bg-center bg-no-repeat"
          ></div>
        </div>
        <p class="my-1 text-sm uppercase leading-6">({{ item.country }}) {{ item.styleName }}</p>
        <div class="mt-1 text-gray-500">
          <span v-html="venuesList"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { type Beer, type Venue } from '../types'

import { defineComponent, type PropType } from 'vue'

import { beerColors } from '../config/beerColors'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Beer>,
      required: true,
    },
    dayLimit: {
      type: Number,
      required: true,
    },
  },
  computed: {
    venuesList(): string {
      let venueStr = ''

      this.item.venues.forEach((venue: Venue) => {
        venueStr +=
          venue.daysAgo <= this.dayLimit
            ? venue.name + ' (' + this.daysAgoString(venue.daysAgo) + ') — '
            : ''
      })

      return venueStr.slice(0, -2)
    },
    flagSvg(): string {
      return new URL(
        import.meta.env.VITE_CRAFT_BEER_FINDER_PUBLIC_PATH +
          'img/flags/' +
          this.item.country.toLowerCase() +
          '.svg',
        import.meta.url,
      ).toString()
    },
    tulipGlassSvg(): string {
      if (beerColors.dark.some((bc) => bc.test(this.item.styleName.toLowerCase()))) {
        return new URL('../assets/img/tulip-glass-dark.svg', import.meta.url).toString()
      } else if (beerColors.light.some((bc) => bc.test(this.item.styleName.toLowerCase()))) {
        return new URL('../assets/img/tulip-glass-light.svg', import.meta.url).toString()
      }

      return new URL('../assets/img/tulip-glass.svg', import.meta.url).toString()
    },
  },
  methods: {
    daysAgoString(daysAgo: number): string {
      return daysAgo === 0
        ? '<span class="cbf-global-is-today">today</span>'
        : daysAgo === 1
          ? '<span class="cbf-global-is-yesterday">1 day ago</span>'
          : daysAgo > 1 && daysAgo < 4
            ? '<span class="cbf-global-is-some-days-ago">' + daysAgo + ' days ago</span>'
            : '<span class="cbf-global-is-many-days-ago">' + daysAgo + ' days ago</span>'
    },
  },
})
</script>

<style scoped>
.cbf-tiny-flag {
  margin-top: 6.5px;
  border: 1px solid #444;
  height: 14px;
  width: 22px;
}
</style>
