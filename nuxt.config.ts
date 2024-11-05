import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app:{
    head: {
      title: 'Moovie - Movie Database',
    }
  },
  compatibilityDate: '2024-04-03',
  components: true,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  css: ['@/assets/css/main.css'],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.MOVIEDB_API_KEY || '', 
      tmdbAccessToken: process.env.MOVIEDB_ACCESS_TOKEN || ''
    },
  }
})