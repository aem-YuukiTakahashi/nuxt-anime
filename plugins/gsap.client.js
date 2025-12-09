import { gsap } from 'gsap'

/**
 * GSAPプラグイン
 * アニメーションライブラリ
 */
export default ({ app }, inject) => {
  // VueインスタンスにGSAPを注入
  inject('gsap', gsap)

  // グローバルにアクセス可能にする
  if (process.client) {
    app.$gsap = gsap
    window.gsap = gsap
  }
}
