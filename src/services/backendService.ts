import { apiService } from './apiService'

export const backendService = {
  getTopBeers: async function () {
    return apiService.get('top')
  },
  getAllBeers: async function () {
    return apiService.get('beers')
  },
  getVenues: async function () {
    return apiService.get('venues')
  },
}
