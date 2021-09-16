<template>
  <div
    class="w-full h-full bg-coffee-800 rounded outer-shadow bg-center bg-cover overflow-y-hidden"
    :style="backgroundImage"
  >
    <div class="w-full h-full bg-mask-dark px-2 py-1">
      <div class="font-medium text-shadow">Did you know?</div>
      <div class="text-xs font-light text-shadow max-h-20 overflow-scroll custom-scrollbar">{{ catFact }}</div>
    </div>
  </div>
</template>

<script>
import catFacts from "../../files/cat-facts.json";

export default {
  data() {
    return {
      catFact: "",
      catFactId: -1,
      updateInterval: null,
      backgroundImage: {
        backgroundImage: "url(" + process.env.BASE_URL + "cat.jpg" + ")",
      },
    };
  },
  methods: {
    getCatFact() {
      let newFactId;
      do newFactId = Math.floor(Math.random() * catFacts.length);
      while (newFactId === this.catFactId);

      this.catFact = catFacts[newFactId] + ".";
    },
    getCatImage() {},
  },
  beforeMount() {
    this.getCatFact();
    this.updateInterval = setInterval(this.getCatFact, 15000);
  },
  beforeUnmount() {
    clearInterval(this.updateInterval);
  },
};
</script>

<style>
</style>