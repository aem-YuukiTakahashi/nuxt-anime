export default {

  // その他の設定
  head: {
    title: 'Nuxt Anime',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/normalize.css',
    '@/assets/css/lenis.css',
    '@/assets/css/fonts.css',
    '@/assets/css/style.css',
  ],

  // Google Fonts設定（ローカルダウンロード）
  googleFonts: {
    families: {
      'Noto Sans JP': [400, 500, 700]
    },
    download: true,  // フォントをローカルにダウンロード
    inject: true     // 自動的にフォントを読み込む
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // プラグイン設定
  plugins: [
    { src: '~/plugins/gsap.client.js', mode: 'client' },
    { src: '~/plugins/lenis.client.js', mode: 'client' },
  ],

  // GitHub Pages用のbase設定
  // リポジトリ名に合わせて変更してください
  router: {
    base: process.env.NODE_ENV === 'production' ? '/nuxt-anime/' : '/'
  },

  // ビルド設定
  build: {
    // CSSを抽出してミニファイ
    extractCSS: true,
    // CSSの最適化（ミニファイ）を有効化
    optimizeCSS: true
  },

  // ビルド出力設定
  generate: {
    dir: 'docs'
  },

}
