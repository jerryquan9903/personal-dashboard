<template>
  <div class="flex flex-row w-full">
    <div class="flex mr-2 justify-center items-center px-6 h-full rounded bg-coffee-800 outer-shadow w-1/3">
      <div class="text-7xl font-bold">{{ time }}</div>
    </div>
    <Calendar />
  </div>
</template>

<script>
import dayjs from "dayjs";
import Calendar from "./Calendar.vue";

let initTime = dayjs().format("HH:mm");

export default {
  name: "datetime",
  components: {
    Calendar,
  },
  data() {
    return {
      time: initTime,
      updateInterval: null,
    };
  },
  methods: {
    updateTime() {
      this.time = dayjs().format("HH:mm");
    },
  },
  beforeMount() {
    this.updateInterval = setInterval(this.updateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.updateInterval);
  },
};
</script>
