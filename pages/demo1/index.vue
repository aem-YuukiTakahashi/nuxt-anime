<template>
  <div class="demo1">
    <div class="hero">
      <img src="https://picsum.photos/id/10/2500/1667" alt="hero image" class="hero__image js-hero-image" />
    </div>

    <section class="section">
      <h2 class="section__title">Section 1</h2>
      <div class="section__content">
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

    <div class="page-top">
      <div class="page-top__inner js-page-top">
        <button class="page-top__button js-page-top-button" @click="scrollToTop">PAGE TOP</button>
      </div>
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
    }
  },
  beforeDestroy() {
    if (this.ctx) {
      setTimeout(() => {
        this.ctx.kill();

        this.mainElement.removeEventListener("pointermove", (e) => {
          this.mainPointerMove(e);
        });

        this.mainElement.removeEventListener("pointerleave", (e) => {
          this.mainPointerLeave(e);
        });
      }, 500);
    }
  },
  mounted() {
    this.ctx = this.$gsap.context(() => {

      this.$gsap.set('.js-hero-image', {
        yPercent: -20,
      });

      this.$gsap.to('.js-hero-image', {
        scrollTrigger: {
          trigger: '.page-main',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
        yPercent: 20,
      });

      this.mainElement = document.querySelector(".page-main");
      this.outerRX = this.$gsap.quickTo(".js-page-top", "rotationX", { ease: "power3" });
      this.outerRY = this.$gsap.quickTo(".js-page-top", "rotationY", { ease: "power3" });
      this.innerX = this.$gsap.quickTo(".js-page-top-button", "x", { ease: "power3" });
      this.innerY = this.$gsap.quickTo(".js-page-top-button", "y", { ease: "power3" });

      this.mainElement.addEventListener("pointermove", (e) => {
        this.mainPointerMove(e);
      });

      this.mainElement.addEventListener("pointerleave", (e) => {
        this.mainPointerLeave(e);
      });
    });
  },
  methods: {
    mainPointerMove(e) {
      this.outerRX(this.$gsap.utils.interpolate(30, 0, e.y / window.innerHeight));
      this.outerRY(this.$gsap.utils.interpolate(-30, 0, e.x / window.innerWidth));
      this.innerX(this.$gsap.utils.interpolate(-20, 0, e.x / window.innerWidth));
      this.innerY(this.$gsap.utils.interpolate(-20, 0, e.y / window.innerHeight));
    },
    mainPointerLeave() {
      this.outerRX(0);
      this.outerRY(0);
      this.innerX(0);
      this.innerY(0);
    },
    scrollToTop() {
      this.$lenis.scrollTo(0);
    },
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
