// Uncomment the commented out sections below to enable bundle analyzer
/*
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
   .BundleAnalyzerPlugin;
*/

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_CRAFT_BEER_FINDER_PUBLIC_PATH
    : '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/scss/variables.scss";`
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
    },
  },
  /*
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin({
      analyzerPort: 4444
    })]
  }
  */
}
