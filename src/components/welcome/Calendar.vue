<template>
  <div>
    <box-wrapper>
      <div class="flex flex-col justify-start items-start p-4">
        <div class="text-xl text-bluegray-600 font-bold mb-1">{{ month }}</div>
        <div class="flex flex-row justify-between -mx-1">
          <div v-for="day in week" :key="day">
            <div
              class="
                flex flex-col
                justify-center
                items-center
                bg-truegray-200
                rounded
                px-6
                py-2
                shadow
                m-1
                cursor-pointer
              "
              :class="(day.ofWeek === today) && 'bg-gradient-to-tr from-emerald-400 to-cyan-400 text-white'"
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

console.log(week);

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