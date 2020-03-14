import ApiService from './api.service'

const BackendService = {
  getTopBeers: async function () {
    return await ApiService.get('top/')
      .then(res => {
        return res.data
      })
  },
  getAllBeers: async function () {
    return await ApiService.get('beers/')
      .then(res => {
        return res.data
      })
  }
}

export default BackendService

export { BackendService }
