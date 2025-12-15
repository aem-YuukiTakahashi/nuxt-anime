<template>
  <div>
    <h1>Nuxt Anime</h1>

    <div class="content">
      <div class="link-item">
        <NuxtLink to="/demo1" class="link-item__link">Demo1</NuxtLink>
      </div>
      <div class="link-item">
        <NuxtLink to="/demo2" class="link-item__link">Demo2</NuxtLink>
      </div>
      <div class="link-item">
        <NuxtLink to="/demo3" class="link-item__link">Demo3</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      ctx: null,
    }
  },
  beforeDestroy() {
    if (this.ctx) {
      setTimeout(() => {
        this.ctx.kill();
      }, 500);
    }
  },
  mounted() {
    // LenisとGSAPが利用可能
    // 使用例は各プラグインのドキュメントを参照してください
    console.log('Lenis:', this.$lenis)
    console.log('GSAP:', this.$gsap)

    this.ctx = this.$gsap.context(() => {
    });
  }
}
</script>

<style scoped>
.container {
  padding: 2rem;
  min-height: 200vh; /* スクロールテスト用 */
  overflow: hidden;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
}

.link-item {
  text-align: center;
}

.link-item + .link-item {
  margin-top: 1rem;
}

.link-item__link {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
}
</style>
