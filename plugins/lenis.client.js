import Lenis from 'lenis'

/**
 * Lenisプラグイン
 * 慣性スクロールを実現するプラグイン
 */
export default ({ app }, inject) => {
  let lenis = null

  // Lenisインスタンスを初期化
  const initLenis = () => {
    if (process.client && !lenis) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false
      })

      // アニメーションフレームで更新
      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }
  }

  // クライアントサイドでのみ初期化
  if (process.client) {
    // DOMが準備できたら初期化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initLenis)
    } else {
      initLenis()
    }
  }

  // Vueインスタンスに注入
  inject('lenis', () => lenis)

  // グローバルにアクセス可能にする（オプション）
  if (process.client) {
    app.$lenis = lenis
  }
}
