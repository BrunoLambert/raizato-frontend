// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  css: ['~/assets/css/main.css'],
  compatibilityDate: "2024-11-28",
  experimental: {
    renderJsonPayloads: false
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})