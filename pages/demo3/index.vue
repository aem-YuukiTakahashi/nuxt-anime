<template>
  <div class="demo3">
    <div class="hero">
      <img src="https://picsum.photos/id/10/2500/1667" alt="hero image" class="hero__image js-hero-image" />
    </div>

    <section class="section js-section-1">
      <h2 class="section__title js-section-title js-section-title-1">SECTION 1</h2>
      <div class="section__content">
      </div>
    </section>

    <section class="section js-section-2">
      <h2 class="section__title js-section-title js-section-title-2">SECTION 2</h2>
      <div class="section__content">

      </div>
      <div class="text-infinite-scroll js-text-infinite-scroll">
        <div class="text-infinite-scroll__inner">
          <p>SCROLL TEXT SCROLL TEXT SCROLL TEXT SCROLL TEXT SCROLL TEXT SCROLL TEXT SCROLL TEXT SCROLL TEXT&nbsp;</p>
          <p>SCROLL TEXT SCROLL TEXT SCROLL TEXT SCROLL TEXT SCROLL TEXT SCROLL TEXT SCROLL TEXT SCROLL TEXT&nbsp;</p>
        </div>
      </div>
    </section>

    <section class="section js-section-3">
      <h2 class="section__title js-section-title js-section-title-3">SECTION 3</h2>
      <div class="section__content">
      </div>
    </section>

    <section class="section js-section-4">
      <h2 class="section__title js-section-title js-section-title-4">SECTION 4</h2>
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
  name: 'Demo3Page',
  data() {
    return {
      ctx: null,
      sectionTitle: [],
      textInfiniteScrollWrap: null,
      textInfiniteScrollxTo: null,
      textInfiniteScrollWheel: 0,
      textInfiniteScrollTotal: 0,
      textInfiniteScrollIsWheelingTimerId: null,
      textInfiniteScrollGsapObserver: null,

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

    this.$gsap.ticker.remove(this.tickerInfiniteScroll);
    window.removeEventListener('resize', this.resizeHandler);
  },
  mounted() {

    this.$nextTick(() => {
      this.initSplitText();

      this.$gsap.ticker.add(this.tickerInfiniteScroll);
      this.resizeHandler();
      window.addEventListener('resize', this.resizeHandler);

      this.ctx = this.$gsap.context(() => {

        const content = document.querySelector('.js-text-infinite-scroll .text-infinite-scroll__inner');
        const half = document.querySelector('.js-text-infinite-scroll .text-infinite-scroll__inner p').clientWidth;

        this.textInfiniteScrollWrap = this.$gsap.utils.wrap(-half, 0);
        this.textInfiniteScrollxTo = this.$gsap.quickTo(content, 'x', {
          duration: 0.5,
          ease: 'power3',
          modifiers: {
            x: (value) => this.$gsap.utils.unitize(this.textInfiniteScrollWrap)(value),
          },
        });

        this.textInfiniteScrollGsapObserver = this.$Observer.create({
          target: '.demo3',
          type: 'wheel, scroll', // Handles wheel, touch, and drag
          onChangeY: (self) => {
            if (self.event.type === 'wheel') {
              this.textInfiniteScrollWheel = self.deltaY;
            } else {
              this.textInfiniteScrollWheel = self.deltaY * 1.1;
            }
            clearTimeout(this.textInfiniteScrollIsWheelingTimerId); // setTimeout is cancelled
            this.textInfiniteScrollIsWheelingTimerId = setTimeout(() => {
              this.textInfiniteScrollWheel = 0; // Force a reset of the wheel value if we dont enter the event after 66ms
            }, 33);
          },
        });

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

        this.sectionTitle.forEach((item, index) => {
          this.$gsap.set(item.chars, {
            opacity: 0,
            y: 10,
          });

          this.$gsap.to(item.chars, {
            scrollTrigger: {
              trigger: `.js-section-title-${index + 1}`,
              start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            stagger: 0.1,
          });
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

      this.$ScrollTrigger.refresh();
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
    initSplitText() {
      const sectionTitles = document.querySelectorAll('.js-section-title');
      if (sectionTitles.length > 0) {
        sectionTitles.forEach((item) => {
          this.sectionTitle.push(this.$SplitText.create(item, {
            type: "words, chars",
          }));
        });
      }
    },
    tickerInfiniteScroll(time, dt) {
      console.log('tickerInfiniteScroll');
      if (this.textInfiniteScrollxTo) {
        this.textInfiniteScrollTotal -= this.textInfiniteScrollWheel + dt / 5;
        this.textInfiniteScrollxTo(this.textInfiniteScrollTotal);
      }
    },
    resizeHandler() {
      console.log('resize');
      const half = document.querySelector('.js-text-infinite-scroll .text-infinite-scroll__inner p').clientWidth;
      this.textInfiniteScrollWrap = this.$gsap.utils.wrap(-half, 0);
    }
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
  padding: 80px 0;
}

.section__title {
  text-align: center;
  font-size: 6rem;
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

.text-infinite-scroll {
  width: 100%;
  padding: 16px 0;
  overflow: hidden;
}

.text-infinite-scroll__inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.text-infinite-scroll__inner p {
  font-size: 8rem;
  font-weight: 700;
  color: #000;
  white-space: nowrap;
}
</style>
