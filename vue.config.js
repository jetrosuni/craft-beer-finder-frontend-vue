module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/helsinki-craft-beer-finder/'
    : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/scss/variables.scss";`
      },
    }
  },
  pwa: {
    name: 'Craft Beer Finder',
    themeColor: '#000000',
    msTileColor: '#000000',
    display: 'standalone',
    appleMobileWebAppCapable: 'no',
    appleMobileWebAppStatusBarStyle: 'black'
  }
}
