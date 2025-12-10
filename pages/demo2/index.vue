<template>
  <div class="demo1">
    <div class="hero">
      <img src="https://picsum.photos/id/10/2500/1667" alt="hero image" class="hero__image js-hero-image" />
    </div>

    <section class="section">
      <h2 class="section__title">Section 1</h2>
      <div class="section__content">
        <div class="text" ref="text">アメンボ赤いなあいうえお</div>
      </div>
    </section>

    <section class="section">
      <h2 class="section__title">Section 2</h2>
      <div class="section__content">

      </div>
    </section>

    <section class="section">
      <h2 class="section__title">Section 3</h2>
      <div class="section__content">
      </div>
    </section>

    <div class="back">
      <NuxtLink to="/" class="back__link">Back to Home</NuxtLink>
    </div>

  </div>
</template>

<script>
export default {
  layout: 'page',
  name: 'Demo1Page',
  data() {
    return {
      ctx: null,
      splitInstance: null,
    }
  },
  beforeDestroy() {
    // 確実にRevertする
    if (this.splitInstance) {
      this.splitInstance.revert();
    }
    // Contextを破棄（これによりctx内で作成されたアニメーションも破棄される）
    if (this.ctx) {
      this.ctx.revert();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initSplitText();
    });
  },
  methods: {
    initSplitText() {
      const target = this.$refs.text;
      if (!target) return;

      // 【重要】既存のインスタンスがあればリセット
      if (this.splitInstance) this.splitInstance.revert();

      // 【重要】DOM内の余計な空白ノードによるバグを防ぐため、
      // 純粋なテキストのみを再セットしてDOMを洗浄する
      // const originalText = target.innerText.trim();
      // target.textContent = originalText;

      // SplitText実行
      this.splitInstance = this.$SplitText.create(target, {
        type: "chars",
      });

    }
    // ... 他のメソッド
  },
}
</script>

<style scoped>
.hero {
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
}

.hero img {
  width: 100%;
  height: 140%;
  object-fit: cover;
}

.section {
  width: 100%;
  min-height: 100vh;
  padding: 80px 0;
}

.section__title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 2rem;
}

.back {
  margin-top: 80px;
}

.back__link {
  display: block;
  width: 160px;
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  background: #000;
  padding: 16px;
  text-align: center;
  margin: auto;
}

.demo1 {
  position: relative;
}

.page-top {
  perspective: 1000px;
  width: 100px;
  height: 100px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}

.page-top__inner {
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 50%;
}

.page-top__button {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  padding: 0;
}
</style>
