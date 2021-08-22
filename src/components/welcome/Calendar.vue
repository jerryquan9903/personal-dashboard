<template>
  <div class="flex flex-1 w-full h-full rounded bg-bluegray-700 outer-shadow">
    <div class="flex flex-col justify-start items-start w-full h-full">
      <div class="flex items-center text-4xl font-bold flex-1 ml-6">
        {{ month }}
      </div>
      <div class="flex flex-row justify-between mb-2 px-1 w-full">
        <div class="grid grid-cols-7 auto-cols-max w-full">
          <template v-for="day in week" :key="day">
            <div
              class="
                flex flex-col flex-1
                justify-center
                items-center
                bg-bluegray-800
                rounded
                px-6
                py-2
                mx-1
                cursor-pointer
              "
              :class="
                day.ofWeek === today &&
                'bg-gradient-to-tl from-teal-400 to-sky-500 text-bluegray-600'
              "
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