<template>
  <div class="flex h-full">
    <box-wrapper>
      <div class="flex flex-col justify-start items-start w-full h-full">
        <div class="flex items-center text-2xl text-bluegray-600 font-bold flex-1 ml-4">{{ month }}</div>
        <div class="flex flex-row justify-between mx-1 mb-2">
          <div v-for="day in week" :key="day">
            <div
              class="
                flex flex-col
                justify-center
                items-center
                bg-bluegray-200
                rounded
                px-6
                py-2
                w-20
                mx-1 
                cursor-pointer
              "
              :class="(day.ofWeek === today) && 'bg-gradient-to-tl from-teal-400 to-sky-500 text-white'"
            >
              <div class="text-sm font-medium">{{ day.ofWeek }}</div>
              <div class="font-bold text-xl">{{ day.ofMonth }}</div>
            </div>
          </div>
        </div>
      </div>
    </box-wrapper>
  </div>
</template>

<script>
import boxWrapper from "../commons/boxWrapper.vue";
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
  components: {
    boxWrapper,
  },

  data() {
    return {
      month: month,
      week: week,
      today: today,
    };
  },
};
</script>

<style>
</style>