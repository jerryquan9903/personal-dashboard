<template>
  <div class="w-full h-full bg-coffee-800 rounded outer-shadow overflow-y-hidden">
    <div class="px-2 py-1">
      <div class="font-medium pb-1">On This Day</div>
      <div v-if="todayEvents">
        <div class="text-xs">
          <span class="font-bold">{{ parseInt(todayEvents[0].year) + ": " }}</span>
          <span>{{ todayEvents[0].event }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import api from "../../services/api";

export default {
  data() {
    return {
      todayEvents: null,
    };
  },
  methods: {
    getTodayEvents() {
      const month = dayjs().format("MMMM");
      const today = dayjs().format("DD");

      api
        .get(`/calendar/on-this-day?month=${month}&day=${today}`)
        .then((success) => {
          let _data = [...success.data].map((ev) => {
            // remove cite symbol at the end of event ([1])
            if (ev.event.indexOf("[") > -1) {
              return {
                ...ev,
                event: ev.event.substring(0, ev.event.indexOf("[")),
              };
            } else return ev;
          });
          this.todayEvents = _data;
        })
        .catch((e) => console.log(e));
    },
  },
  beforeMount() {
    this.getTodayEvents();
  },
};
</script>

<style>
</style>