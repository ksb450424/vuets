export default {
  // Nuxt.js 모드 설정 (SSR/SSG)
  ssr: true, // Universal mode (Server-Side Rendering)

  // 배포 타겟 설정
  target: 'server', // Node.js 호스팅

  // 글로벌 페이지 헤더 설정
  head: {
    title: 'company',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Company Nuxt.js project' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // 글로벌 CSS 설정
  css: [],

  // 플러그인 설정
  plugins: [],

  // 자동 컴포넌트 임포트 설정
  components: true,

  // 빌드 및 개발 모듈 설정
  buildModules: [],

  // Nuxt.js 모듈 설정
  modules: [
    '@nuxtjs/axios', // Axios 모듈
  ],

  // Axios 모듈 설정
  axios: {
    baseURL: 'http://localhost:8088', // Axios의 기본 URL 설정
  },

  // 빌드 설정
  build: {},

  // 개발 도구 설정
  devtools: true,

  server: {
    port: 8088, // 원하는 포트 번호
    host: '0.0.0.0' // 모든 호스트에서 접근 가능하게 설정
  }
}