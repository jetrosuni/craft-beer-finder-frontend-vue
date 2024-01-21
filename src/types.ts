export type Venue = {
  readonly id?: number
  readonly name: string
  readonly daysAgo: number
}

export type Beer = {
  readonly beerId: number
  readonly name: string
  readonly country: string
  readonly style: string
  readonly styleName: string
  readonly rating: number
  readonly ratingCount: number
  readonly venues: Readonly<Array<Venue>>
}

export type BeerStyles = {
  light: Array<string>
  dark: Array<string>
  sour: Array<string>
  other: Array<string>
}

export type FilterValues = {
  searchBeerString: string
  searchVenueString: string
  dayLimit: number
  ratingMin: number
  beerStylesAll: Array<string>
  beerStylesSelected: Array<string>
}
