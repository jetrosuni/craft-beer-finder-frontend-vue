# craft-beer-finder-frontend-vue

Craft Beer Finder PWA

## Live demo

https://www.jetrosuni.com/helsinki-craft-beer-finder/

## Project setup

```
npm install
```

- Copy the content of `.env.example` file to `.env.local` & `.env.production.local` and make all the needed adjustments (e.g. change the `VITE_CRAFT_BEER_FINDER_API_URL` value to match the real backend URL).
- Copy a full set of country coded svg flags to `/public/img/flags/` (e.g. from here: https://github.com/hjnilsson/country-flags)

### Development

```
docker compose up
```

```
http://localhost:9980
```

### PWA Assets

To (re)generate:

```
docker exec craft-beer-finder-frontend-vue npm run generate-pwa-assets
```

### Compiles and minifies for production

```
npm run build
```

### Backend

- The backend is not currently OSS
- Here's an example of the API response structure:

```
[
  {
    "beerId": 3860521,
    "name": "Brewery - Name of the beer",
    "country": "GB",
    "style": "dark",
    "styleName": "Stout - Imperial \/ Double Coffee",
    "rating": 4.57,
    "ratingCount": 199,
    "venues": [
      {
        "name": "Bar 1",
        "daysAgo": 4
      },
      ...
    ]
  },
  {
    ...
  }
]
```

## Credits

- Loading animation heavily inspired by CodePen by clemishow, with several tweaks: https://codepen.io/clemishow/pen/ZYPPeE/
- `tulip-glass.svg` is a modified version of: https://commons.wikimedia.org/wiki/File:Alcohol_glass_beer_tulip.svg
  - The **original file** `Alcohol glass beer tulip.svg` is made available under the Creative Commons CC0 1.0 Universal Public Domain Dedication

## License

Craft Beer Finder by [Jetro Suni](https://www.jetrosuni.com) is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
Based on a work at https://github.com/jetrosuni/craft-beer-finder-frontend-vue.

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a>
