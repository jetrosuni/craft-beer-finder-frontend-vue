# craft-beer-finder-frontend-vue

## Live demo

https://www.jetrosuni.com/helsinki-craft-beer-finder/

## Project setup
```
npm install
```

* Rename the `.env.example` file to `.env`
* Change the `VUE_APP_CRAFT_BEER_FINDER_API_URL` value in the `.env` file to match the real backend URL
* Copy a full set of country coded svg flags to `/src/assets/img/flags/` (e.g. from here: https://github.com/hjnilsson/country-flags)

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Backend

* The backend is not currently OSS
* Here's an example of the API response structure:
```
[
  {
    "beer_id":"3860521",
    "beer_name":"Brewery - Name of the beer",
    "beer_country":"GB",
    "beer_rating":"4.57",
    "beer_rating_count":"199",
    "beer_style":"Stout - Imperial \/ Double Coffee",
    "bars":"Bar 1,Bar 2",
    "days_ago_bars":"1,2"
  },
  {
    ...
  }
]
```

## Credits

* Loading animation heavily inspired by CodePen by clemishow, with several tweaks: https://codepen.io/clemishow/pen/ZYPPeE/
* `tulip-glass.svg` is a modified version of: https://commons.wikimedia.org/wiki/File:Alcohol_glass_beer_tulip.svg
  * The **original file** `Alcohol glass beer tulip.svg` is made available under the Creative Commons CC0 1.0 Universal Public Domain Dedication

## License

Craft Beer Finder by [Jetro Suni](https://www.jetrosuni.com) is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
Based on a work at https://github.com/jetrosuni/craft-beer-finder-frontend-vue.

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a>
