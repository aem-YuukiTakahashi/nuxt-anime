import Lenis from 'lenis'

/**
 * Lenisプラグイン
 * 慣性スクロールを実現するプラグイン
 * GSAP ScrollTriggerと統合
 */
export default ({ app }, inject) => {
  let lenis = null;

  // Lenisインスタンスを初期化
  const initLenis = () => {
    if (process.client && !lenis) {
      lenis = new Lenis({})

      // GSAP ScrollTriggerとの統合
      // ScrollTriggerが利用可能な場合（gsap.client.jsが先に読み込まれている前提）
      try {
        // Lenisのscrollイベントに合わせて全てのScrollTriggerインスタンスをアップデート
        lenis.on('scroll', app.$ScrollTrigger.update)

        // LenisのrafメソッドをGSAP tickerに追加
        // tickerのタイムスタンプの単位は秒なので、ミリ秒に変換
        app.$gsap.ticker.add((time) => {
          lenis.raf(time * 1000)
        })

        // レンダリング時にラグが発生した際のアニメーション調整機能を無効化
        app.$gsap.ticker.lagSmoothing(0)

      } catch (error) {
        // GSAPが利用できない場合は通常のrequestAnimationFrameを使用
        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      }
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
  inject('lenis', lenis)

  // グローバルにアクセス可能にする
  if (process.client) {
    app.$lenis = lenis
  }
}
