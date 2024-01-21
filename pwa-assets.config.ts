import { defineConfig } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  images: ['public/img/icons/favicon.svg'],
  preset: {
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[48, 'favicon.ico']],
    },
    maskable: {
      sizes: [512],
    },
    apple: {
      sizes: [180],
    },
  },
})
