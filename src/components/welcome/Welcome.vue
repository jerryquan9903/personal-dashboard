<template>
  <div class="flex flex-row w-full h-full">
    <box-wrapper>
      <div class="flex justify-center items-center px-6 h-full">
        <div class="text-8xl font-bold">{{ time }}</div>
      </div>
    </box-wrapper>
    <Calendar />
  </div>
</template>

<script>
import dayjs from "dayjs";
import boxWrapper from "../commons/boxWrapper.vue";
import Calendar from "./Calendar.vue";

let initTime = dayjs().format("HH:mm");

export default {
  name: "welcome",

  components: {
    boxWrapper,
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
