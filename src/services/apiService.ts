export const apiService = {
  get(resource: string) {
    const url = import.meta.env.VITE_CRAFT_BEER_FINDER_API_URL + resource

    return fetch(url, <any>{
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    }).then((response) => response.json())
  },
}
