<template>
  <div class="page-layout">
    <main class="page-main">
      <header class="page-header">HEADER</header>
      <div class="container">
        <nuxt />
      </div>
      <footer class="page-footer">
        <p>Copyright</p>
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  name: 'PageLayout',
}
</script>

<style scoped>
.page-layout {
  width: 100%;
}

.page-main {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  width: 100%;
  height: 80px;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-footer {
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  margin-top: auto;
  padding-top: 160px;
}

.page-footer p {
  width: 100%;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  background: #000;
  margin: 0;
  padding: 1rem;
  text-align: center;
}
</style>
