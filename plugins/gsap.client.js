import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// ScrollTriggerプラグインを登録
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)

/**
 * GSAPプラグイン
 * アニメーションライブラリ
 */
export default ({ app }, inject) => {
  // VueインスタンスにGSAPを注入
  inject('gsap', gsap)
  inject('ScrollTrigger', ScrollTrigger)
  inject('SplitText', SplitText)

  // グローバルにアクセス可能にする（Vueインスタンス経由でもアクセス可能）
  if (process.client) {
    app.$gsap = gsap
    app.$ScrollTrigger = ScrollTrigger
    app.$SplitText = SplitText
  }
}
