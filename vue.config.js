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
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    display: 'standalone',
    appleMobileWebAppCapable: 'no',
    manifestOptions: {
      background_color: "#ffffff"
    }
  }
}
