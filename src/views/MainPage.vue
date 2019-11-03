<template>
  <div class="section">
    <h1 class="title is-1">{{titleText}}</h1>

    <div
      v-if="errorMessage"
      class="cbf-is-warning"
    >{{errorMessage}}</div>

    <div v-if="!waitingForResponse">
      <BeerFilters
        :data="beerList"
        @change-filter-search-string="onFilterSearchStringChanged"
        @change-filter-venue-string="onFilterVenueStringChanged"
        @change-filter-beer-style="onFilterBeerStyleChanged"
        @change-filter-rating-range="onFilterRatingRangeChanged"
      />
    </div>

    <div v-if="waitingForResponse">
      <div class="cbf-loading">
        <BeerLoading />
      </div>
    </div>

    <BeerList
      v-if="beerListHasItems"
      :data="filteredBeerList"
    />
    <div v-if="!waitingForResponse && filteredBeerList && !filteredBeerList.length">
      No results found with the selected filters.
    </div>
  </div>
</template>

<script>
import axios from "axios";

import BeerFilters from "@/components/BeerFilters.vue";
import BeerList from "@/components/BeerList.vue";
import BeerLoading from "@/components/BeerLoading.vue";

export default {
  name: "MainPage",
  components: {
    BeerFilters,
    BeerList,
    BeerLoading
  },
  data() {
    return {
      errorMessage: "",
      beerList: [],
      waitingForResponse: false,
      searchBeerString: "",
      searchVenueString: "",
      ratingMinValue: 4,
      beerStyleSelection: ["light", "dark", "sour", "other"],
      beerStyles: {
        light: [
          "Belgian Strong Golden Ale",
          "Belgian Tripel",
          "Bock - Weizenbock",
          "English Bitter",
          "Extra Special / Strong Bitter",
          "Farmhouse Ale - Other",
          "Farmhouse Ale - Saison",
          "Festbier",
          "Gluten-Free",
          "Golden Ale",
          "Hefeweizen",
          "IPA - American",
          "IPA - Belgian",
          "IPA - Brut",
          "IPA - English",
          "IPA - Imperial / Double",
          "IPA - Imperial / Double New England",
          "IPA - Imperial / Double Milkshake",
          "IPA - International",
          "IPA - Milkshake",
          "IPA - New England",
          "IPA - Red",
          "IPA - Rye",
          "IPA - Session / India Session Ale",
          "IPA - Triple",
          "Lager - Euro Pale",
          "Lager - Helles",
          "Lager - IPL (India Pale Lager)",
          "Märzen",
          "Pale Ale - American",
          "Pale Ale - Australian",
          "Pale Ale - Belgian",
          "Pale Ale - English",
          "Pale Ale - International",
          "Pale Ale - New England",
          "Pale Ale - New Zealand",
          "Pilsner - Czech",
          "Pilsner - German",
          "Pilsner - Other",
          "Strong Ale - American",
          "Witbier"
        ],
        dark: [
          "Barleywine - American",
          "Barleywine - Other",
          "Belgian Dubbel",
          "Belgian Quadrupel",
          "Belgian Strong Dark Ale",
          "Bock - Doppelbock",
          "Brown Ale - American",
          "Dark Ale",
          "IPA - Black / Cascadian Dark Ale",
          "Kellerbier / Zwickelbier",
          "Old Ale",
          "Porter - American",
          "Porter - Baltic",
          "Porter - English",
          "Porter - Imperial / Double",
          "Porter - Other",
          "Rauchbier",
          "Red Ale - American Amber / Red",
          "Red Ale - Other",
          "Scotch Ale / Wee Heavy",
          "Stout - American",
          "Stout - American Imperial / Double",
          "Stout - Coffee",
          "Stout - Imperial / Double",
          "Stout - Imperial / Double Milk",
          "Stout - Imperial / Double Oatmeal",
          "Stout - Irish Dry",
          "Stout - Milk / Sweet",
          "Stout - Other",
          "Stout - Pastry",
          "Stout - Russian Imperial",
          "Stout - White",
          "Traditional Ale",
          "Winter Ale"
        ],
        sour: [
          "American Wild Ale",
          "Fruit Beer",
          "IPA - Sour",
          "Lambic - Framboise",
          "Lambic - Gueuze",
          "Lambic - Kriek",
          "Lambic - Traditional",
          "Sour - Berliner Weisse",
          "Sour - Flanders Red Ale",
          "Sour - Fruited",
          "Sour - Gose",
          "Sour - Gose - Fruited",
          "Sour - Other"
        ],
        other: [
          "Cider - Herbed / Spiced / Hopped",
          "Cider - Ice / Applewine",
          "Cider - Traditional",
          "Freeze-distilled Beer",
          "Mead - Other",
          "Rye Wine"
        ]
      }
    };
  },
  mounted() {
    this.requestData();
  },
  computed: {
    titleText: function() {
      return process.env.VUE_APP_CRAFT_BEER_FINDER_TITLE;
    },
    filteredBeerNames: function() {
      return this.beerList.filter(beer => {
        return this.searchBeerString && this.searchBeerString.length > 2
          ? beer.beer_name
              .toLowerCase()
              .includes(this.searchBeerString.toLowerCase())
          : true;
      });
    },
    filteredVenues: function() {
      return this.filteredBeerNames.filter(beer => {
        return this.searchVenueString && this.searchVenueString.length > 2
          ? beer.bars
              .toLowerCase()
              .includes(this.searchVenueString.toLowerCase())
          : true;
      });
    },
    filteredLightBeers: function() {
      return this.filteredVenues.filter(beer => {
        return !this.beerStyleSelection.includes("light")
          ? !this.beerStyles.light.some(style => style === beer.beer_style)
          : true;
      });
    },
    filteredDarkBeers: function() {
      return this.filteredLightBeers.filter(beer => {
        return !this.beerStyleSelection.includes("dark")
          ? !this.beerStyles.dark.some(style => style === beer.beer_style)
          : true;
      });
    },
    filteredSourBeers: function() {
      return this.filteredDarkBeers.filter(beer => {
        return !this.beerStyleSelection.includes("sour")
          ? !this.beerStyles.sour.some(style => style === beer.beer_style)
          : true;
      });
    },
    filteredOtherBeers: function() {
      return this.filteredSourBeers.filter(beer => {
        return !this.beerStyleSelection.includes("other")
          ? !this.beerStyles.other.some(style => style === beer.beer_style)
          : true;
      });
    },
    filteredBeerList: function() {
      return this.filteredOtherBeers.filter(beer => {
        return beer.beer_rating >= this.ratingMinValue ? true : false;
      });
    }
  },
  methods: {
    beerListHasItems() {
      return (
        !this.waitingForResponse && this.beerList && this.beerList.length > 0
      );
    },
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
    resolveRequest(response) {
      this.beerList = response.data;
    },
    onFilterSearchStringChanged(searchStr) {
      this.searchBeerString = searchStr;
    },
    onFilterVenueStringChanged(searchStr) {
      this.searchVenueString = searchStr;
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
.cbf-is-warning {
  color: red;
}
.cbf-loading {
  margin-top: 4rem;
}
</style>
