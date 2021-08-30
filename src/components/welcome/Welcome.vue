<template>
  <div class="flex flex-row w-full">
    <div class="flex flex-1 mr-4 justify-center items-center px-6 h-full rounded bg-background outer-shadow">
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
  name: "welcome",

  components: {
    Calendar,
  },

  data() {
    return {
      time: initTime,
    };
  },

  methods: {
    updateTime() {
      this.time = dayjs().format("HH:mm");
    },
  },

  beforeMount() {
    setInterval(this.updateTime, 1000);
  },

  beforeUnmount() {
    clearInterval(this.updateTime);
  },
};
</script>
