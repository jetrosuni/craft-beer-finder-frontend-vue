<template>
  <div class="beer-list">
    <transition-group
      tag="div"
      name="beer-list"
    >
      <div
        v-for="beerItem in data"
        :key="beerItem.beer_id"
      >
        <BeerItem :item="beerItem" :day-limit="dayLimit" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import BeerItem from "@/components/BeerItem.vue";

export default {
  name: "BeerList",
  components: {
    BeerItem
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    dayLimit: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.beer-list {
  text-align: left;
  margin: 1rem 0;
  padding: 0 1rem;
}

@media only screen and (min-width: 769px) {
  .beer-list {
    margin: 4rem 0;
    padding: 0 2rem;
  }
}

/* transitions */

.beer-list-enter-active,
.beer-list-leave-active,
.beer-list-move {
  transition-duration: 300ms;
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
