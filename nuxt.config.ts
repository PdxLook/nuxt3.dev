// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: 'https://app.api.com', // 你的 API 基础 URL
    },
  },
  routeRules: {
    // Generated at build time for SEO purpose
    '/': { prerender: true },
    // Cached for 1 hour
    // '/api/*': { cache: { maxAge: 60 * 60 } },
  },
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      link: [{ rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
      title: '标题',
      meta: [
        // { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'og:type', content: 'website' },
        { name: 'og:locale', content: 'zh_CN' },
        { name: 'og:site_name', content: '名称' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no',
        },
        { name: 'description', content: '网站描述' },
        { name: 'keywords', content: '关键词' },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
      ],
    },
  },
  css: ['@unocss/reset/tailwind.css'],
  compatibilityDate: '2024-07-29',
})
