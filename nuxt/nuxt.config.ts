export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/scss/main.scss'],
  runtimeConfig: {
    apiBase: process.env.NUXT_API_BASE || 'http://localhost:3001',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Susi Air Pilot App',
      meta: [
        { charset: 'utf-8' },
        // No user-scalable=no / maximum-scale — browser zoom stays enabled.
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0E2138' },
        {
          name: 'description',
          content: 'Sign in to manage your flight operations.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap',
        },
      ],
    },
  },
})

