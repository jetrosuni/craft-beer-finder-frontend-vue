<template>
  <div class="section">
    <h1 class="title is-1">Craft Beer Finder</h1>
    <div v-if="errorMessage" style="color: red">{{errorMessage}}</div>
    <BeerList v-if="!waitingForResponse" :data="beerList" />
  </div>
</template>

<script>
import axios from "axios";

import BeerList from "@/components/BeerList.vue";

export default {
  name: "MainPage",
  components: {
    BeerList
  },
  data() {
    return {
      errorMessage: "",
      beerList: [],
      waitingForResponse: false
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
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
    resolveRequest (response) {
      this.beerList = response.data
    },
  }
};
</script>
