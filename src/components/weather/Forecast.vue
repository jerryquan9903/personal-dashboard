<template>
  <div class="flex flex-col w-full h-full rounded">
    <div class="text-lg font-bold">Hourly</div>
    <div class="flex flex-row overflow-x-scroll custom-scrollbar-x">
      <template v-for="hour in hourly" :key="hour.datetime">
        <div class="flex flex-col justify-center text-xs font-normal mx-3 mt-2 mb-3">
          <div>{{ hour.temp.toFixed(0) }}°C</div>
          <div class="h-10 flex justify-center items-center">
            <img :src="'http://openweathermap.org/img/wn/' + hour.icon + '@2x.png'" />
          </div>
          <div>{{ getHour(hour.datetime) }}</div>
        </div>
      </template>
    </div>
    <div class="mt-2 text-lg font-bold">Weekly</div>
    <div class="flex flex-row justify-evenly">
      </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: ["hourly", "daily"],
  data() {
    return {};
  },
  methods: {
    getHour(datetime) {
      return dayjs.unix(datetime).format("HH:mm");
    },
  },
};
</script>