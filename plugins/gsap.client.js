import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ScrollTriggerプラグインを登録
gsap.registerPlugin(ScrollTrigger)

/**
 * GSAPプラグイン
 * アニメーションライブラリ
 */
export default ({ app }, inject) => {
  // VueインスタンスにGSAPを注入
  inject('gsap', gsap)
  inject('ScrollTrigger', ScrollTrigger)

  // グローバルにアクセス可能にする（Vueインスタンス経由でもアクセス可能）
  if (process.client) {
    app.$gsap = gsap
    app.$ScrollTrigger = ScrollTrigger
  }
}
