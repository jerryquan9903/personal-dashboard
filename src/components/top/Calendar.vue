<template>
  <div class="flex w-4/5 h-full rounded bg-coffee-800 outer-shadow">
    <div class="flex flex-col justify-start items-start w-full h-full">
      <div class="flex items-center text-2xl font-bold flex-1 ml-4">
        {{ month }}
      </div>
      <div class="flex flex-row justify-between mb-2 px-1 w-full">
        <div class="flex justify-evenly w-full">
          <template v-for="day in week" :key="day">
            <div
              class="flex flex-col flex-1 justify-center items-center bg-coffee-900 rounded py-2 mx-1 cursor-pointer"
              :class="day.ofWeek === today && 'bg-oldrose-500'"
              @click="getOnThisDay(month.split(' ')[0], day.ofMonth)"
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
import api from "../../services/api";

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
      updateInterval: null,
    };
  },
  methods: {
    updateToday() {
      this.today = dayjs().format("ddd");
    },
    getOnThisDay(month, day) {
      api
        .get(`/calendar/on-this-day?month=${month}&day=${day}`)
        .then((success) => {
          console.log(success.data);
        })
        .catch((e) => console.log(e));
    },
  },
  beforeMount() {
    this.updateInterval = setInterval(this.updateToday, 1000);
  },
  beforeUnmount() {
    clearInterval(this.updateInterval);
  },
};
</script>

<style>
</style>