<template>
  <div class="flex flex-col justify-center rounded h-full p-2">
    <div class="text-lg font-bold">Hourly</div>
    <div class="flex flex-row overflow-x-scroll custom-scrollbar-x mt-1 bg-matteblack-500 rounded outer-shadow">
      <template v-for="hour in hourly" :key="hour.datetime">
        <div class="flex flex-col justify-center items-center text-xs font-normal m-3">
          <p>{{ hour.temp.toFixed(0) }}°C</p>
          <div class="w-8 h-8 my-1">
            <img :src="iconUrl + hour.icon + '.svg'" />
            </div>
          <p>{{ getHour(hour.datetime) }}</p>
        </div>
      </template>
    </div>
    <div class="mt-2 text-lg font-bold">Daily</div>
    <div class="flex flex-row flex-1 justify-evenly mt-1 bg-matteblack-500 rounded outer-shadow">
      <template v-for="day in daily" :key="day.datetime">
        <div class="flex flex-col justify-center items-center text-sm">
          <p>{{ day.temp.max.toFixed(0) + "°C" }}</p>
          <p>{{ day.temp.min.toFixed(0) + "°C" }}</p>
          <div class="w-12 h-12 my-3">
            <img :src="iconUrl + day.icon + '.svg'" />
          </div>
          <p class="font-medium">{{ getDayOfWeek(day.datetime) }}</p>
          <p>{{ getDay(day.datetime) }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: ["hourly", "daily"],
  data() {
    return {
      iconUrl: process.env.BASE_URL + "weather/icons/"
    };
  },
  methods: {
    getHour(datetime) {
      return dayjs.unix(datetime).format("HH:mm");
    },
    getDayOfWeek(datetime) {
      return dayjs.unix(datetime).format("ddd");
    },
    getDay(datetime) {
      return dayjs.unix(datetime).format("DD/MM");
    },
  },
};
</script>