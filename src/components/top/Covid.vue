<template>
  <div class="w-full h-full relative">
    <a href="https://covid19.ncsc.gov.vn" target="_blank">
      <div
        v-if="covid"
        @mouseenter="mouseEnter()"
        @mouseleave="hover = false"
        class="absolute inset-0 outer-shadow rounded overflow-hidden bg-cover bg-top"
        :class="hover ? 'z-100 zoom-in-all' : 'z-10 h-0 zoom-out-all'"
        :style="backgroundImage"
      >
        <div class="w-full h-full p-2 text-shadow flex flex-col items-center bg-mask" :style="normalHeight">
          <div class="text-2xl font-medium mt-4 text-red-400">{{ covid.totalCases.toLocaleString() }}</div>
          <div class="text-sm">total cases</div>
          <div class="text-2xl font-medium mt-4 text-blue-400">{{ covid.totalDeaths.toLocaleString() }}</div>
          <div class="text-sm">total deaths</div>
          <div class="text-2xl font-medium mt-4 text-orange-400">{{ covid.active.toLocaleString() }}</div>
          <div class="text-sm">active cases</div>
        </div>
      </div>
      <div
        v-if="covid"
        @mouseenter="mouseEnter()"
        @mouseleave="hover = false"
        class="absolute inset-0 flex flex-col justify-center rounded items-center h-full p-2 text-shadow"
        :class="hover ? 'z-100' : 'z-10'"
        ref="normalDiv"
      >
        <div class="text-3xl font-bold">{{ covid.newCases.toLocaleString() }}</div>
        <div class="text-sm">COVID-19 cases today</div>
      </div>
    </a>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  data() {
    return {
      covid: null,
      hover: false,
      normalHeight: {
        paddingTop: "400px",
      },
      backgroundImage: {
        backgroundImage: "url(" + process.env.BASE_URL + "covid.jpg" + ")",
      },
    };
  },
  methods: {
    mouseEnter() {
      this.normalHeight.paddingTop = this.$refs.normalDiv?.offsetHeight + "px" || 400;
      this.hover = true;
    },
    handleResize() {
      this.normalHeight.paddingTop = this.$refs.normalDiv?.offsetHeight + "px" || 400;
    },
  },
  beforeMount() {
    api
      .get("/misc/covid")
      .then((success) => {
        this.covid = success.data;
      })
      .catch((e) => console.log(e));
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.zoom-in-all {
  transition-duration: 0.25s;
  transition-property: height;
  transition-timing-function: ease-in-out;
  height: 300%;
}

.zoom-out-all {
  transition-duration: 0.25s;
  transition-property: width, height;
  transition-timing-function: ease-in-out;
  height: 100%;
}

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.25s ease;
  transform: translateZ(0);
}

.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}
</style>