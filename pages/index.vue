<template>
  <div class="container">
    <h1>Nuxt Anime</h1>
    <p>LenisとGSAPが動作する環境です</p>

    <div class="content">
      <div class="box" ref="box1">
        <p>Box 1</p>
      </div>
      <div class="box" ref="box2">
        <p>Box 2</p>
      </div>
      <div class="box" ref="box3">
        <p>Box 3</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted() {
    // LenisとGSAPが利用可能
    // 使用例は各プラグインのドキュメントを参照してください
    console.log('Lenis:', this.$lenis)
    console.log('GSAP:', this.$gsap)
  }
}
</script>

<style scoped>
.container {
  padding: 2rem;
  min-height: 200vh; /* スクロールテスト用 */
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

.box {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}
</style>
