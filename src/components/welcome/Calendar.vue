<template>
  <div class="flex flex-1 w-full h-full rounded bg-background outer-shadow">
    <div class="flex flex-col justify-start items-start w-full h-full">
      <div class="flex items-center text-4xl font-bold flex-1 ml-6">
        {{ month }}
      </div>
      <div class="flex flex-row justify-between mb-2 px-1 w-full">
        <div class="flex justify-evenly w-full">
          <template v-for="day in week" :key="day">
            <div
              class="
                flex flex-col flex-1
                justify-center
                items-center
                bg-background-dark
                rounded
                px-6
                py-2
                mx-1
                cursor-pointer
              "
              :class="day.ofWeek === today && 'bg-emerald-600 outer-shadow text-card'"
            >
              <div class="text-sm">{{ day.ofWeek }}</div>
              <div class="font-bold text-xl">{{ day.ofMonth }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

const month = dayjs().format("MMMM YYYY");
const today = dayjs().format("ddd");

let week = [];

for (let i = 0; i < 7; i++) {
  let dayOfWeek = dayjs().day(i);
  week.push({
    ofWeek: dayOfWeek.format("ddd"),
    ofMonth: dayOfWeek.format("DD"),
  });
}

export default {
  data() {
    return {
      month: month,
      week: week,
      today: today,
    };
  },
  methods: {
    updateToday() {
      this.today = dayjs().format("ddd");
    },
  },
  beforeMount() {
    setInterval(this.updateToday, 1000);
  },
  beforeUnmount() {
    clearInterval(this.updateToday);
  },
};
</script>

<style>
</style>