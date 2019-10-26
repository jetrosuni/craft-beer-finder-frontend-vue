<template>
  <div class="section">
    <h1 class="title is-1">Craft Beer Finder</h1>
    <div v-if="errorMessage" style="color: red">{{errorMessage}}</div>
    <ul v-if="!waitingForResponse">
      <li v-for="(beer, beerKey) in beerList" :key="beerKey">
        {{beer}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MainPage",
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
