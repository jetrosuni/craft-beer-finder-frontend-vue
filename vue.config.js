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
  }
}
