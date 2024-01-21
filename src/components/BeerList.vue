<template>
  <div class="beer-list">
    <transition-group tag="div" name="beer-list">
      <Lazy
        v-for="beerItem in beerList"
        :unrender="true"
        :min-height="110"
        :key="`beer-${beerItem.beerId}`"
      >
        <BeerItem :item="beerItem" :day-limit="dayLimit" />
      </Lazy>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { type Beer } from '../types'

import { defineComponent, type PropType } from 'vue'

import BeerItem from '@/components/BeerItem.vue'
import Lazy from '@/components/Lazy.vue'

export default defineComponent({
  name: 'BeerList',
  components: {
    BeerItem,
    Lazy,
  },
  props: {
    beerList: {
      type: Array as PropType<Readonly<Array<Beer>>>,
      required: true,
    },
    dayLimit: {
      type: Number,
      required: true,
    },
  },
})
</script>

<style scoped>
.beer-list {
  text-align: left;
  margin: 1rem 0;
  padding: 0 1rem;
}

@media only screen and (min-width: 769px) {
  .beer-list {
    margin: 1.5rem 0 0 0;
    padding: 0 2rem;
  }
}

/* transitions */

.beer-list-enter-active,
.beer-list-leave-active,
.beer-list-move {
  transition-duration: 500ms;
  transition-timing-function: ease-out;
  transition-property: opacity, transform;
}

.beer-list-enter {
  opacity: 0;
  transform: translateX(10rem);
}

.beer-list-enter-to {
  opacity: 1;
  transform: translateX(0rem);
}

.beer-list-leave {
  opacity: 1;
}

.beer-list-leave-active {
  display: none;
}

.beer-list-leave-to {
  opacity: 0;
}
</style>
