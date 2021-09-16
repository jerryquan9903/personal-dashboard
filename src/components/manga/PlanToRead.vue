<template>
  <div class="w-full h-full p-2 flex flex-col">
    <div class="font-medium flex-1 pb-2">Plan to read</div>
    <!-- <div v-if="planToRead[0]" class="overflow-y-scroll custom-scrollbar">
      <template v-for="(manga, index) in planToRead" :key="manga.id">
        <div class="flex flex-col grid grid-cols-1 outer-shadow" :class="index < planToRead.length - 1 && 'mb-2'">
          <img :src="manga.cover" class="row-start-1 col-start-1 object-cover manga-cover rounded" />
          <div class="flex flex-col row-start-1 col-start-1 justify-center bg-mask-dark rounded w-full h-full px-1">
            <div class="text-sm font-medium text-shadow max-w-full truncate">{{ manga.name }}</div>
            <div class="text-xs text-shadow">
              {{ manga.status === "Completed" ? ("Completed, " + manga.chapters + " chapters") : "Ongoing" }}
            </div>
          </div>
        </div>
      </template>
    </div> -->
    <div v-if="planToRead[0]" class="grid grid-cols-1 w-full h-full">
      <template v-for="(manga, index) in planToRead" :key="manga.id">
        <transition name="fade" class="row-start-1 col-start-1">
          <div v-show="index === cycle" @mouseenter="handleMouseEnter()" @mouseleave="handleMouseLeave()" class="grid grid-cols-1">
            <img
              :src="manga.cover"
              class="row-start-1 col-start-1 w-full h-full cover-ratio rounded object-cover outer-shadow"
            />
            <div
              class="row-start-1 col-start-1 flex flex-col-reverse image-gradient rounded p-1 text-shadow"
            >
              <div class="text-xs">
                {{ manga.status === "Completed" ? "Completed, " + manga.chapters + " chapters" : "Ongoing" }}
              </div>
              <div class="font-medium">{{ manga.name }}</div>
            </div>
          </div>
        </transition>
      </template>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";

const statusMap = {
  RELEASING: "Ongoing",
  FINISHED: "Completed",
};

export default {
  data() {
    return {
      planToRead: [],
      cycle: 0,
      cycleInterval: null,
    };
  },
  methods: {
    getPlanToRead() {
      api
        .get("/manga/plan-to-read")
        .then((success) => {
          let _data = [...success.data].map((manga) => {
            return { ...manga, status: statusMap[manga.status] };
          });
          this.planToRead = _data;
        })
        .catch((e) => console.log(e));
    },
    handleMouseEnter() {
      clearInterval(this.cycleInterval);
    },
    handleMouseLeave() {
      this.cycleInterval = setInterval(this.cycleManga, 10000);
    },
    cycleManga() {
      if (this.cycle === this.planToRead.length - 1) this.cycle = 0;
      else this.cycle++;
    },
  },
  beforeMount() {
    this.getPlanToRead();
    this.cycleInterval = setInterval(this.cycleManga, 10000);
  },
  beforeUnmount() {
    clearInterval(this.cycleInterval);
  },
};
</script>

<style scoped>
.image-gradient {
  background: linear-gradient(0deg, #35261dbb 30%, #35261d66 100%);
}
</style>