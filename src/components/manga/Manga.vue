<template>
  <div class="w-full h-full bg-coffee-800 rounded outer-shadow">
    <div v-if="newChapters[0]" class="w-1/3 p-2 flex flex-col h-full border-r-2 border-coffee-900">
      <div class="font-medium pb-2">New chapters</div>
      <div class="overflow-y-scroll custom-scrollbar">
        <template v-for="manga in newChapters" :key="manga._id">
          <a
            class="flex flex-col grid grid-cols-1 cursor-pointer outer-shadow mb-2"
            :href="manga.latestUrl"
            target="_blank"
          >
            <img :src="manga.cover" class="row-start-1 col-start-1 line-ratio object-cover cover-position rounded" />
            <div
              class="flex flex-col row-start-1 col-start-1 justify-center bg-mask-dark rounded w-full h-full px-1"
            >
              <div class="text-xs text-shadow max-w-full truncate">{{ manga.name.common }}</div>
              <div class="text-sm font-medium text-shadow">
                {{ manga.latestChapter === 0 ? "New chapter" : "Chapter " + manga.latestChapter }}
              </div>
            </div>
          </a>
        </template>
      </div>
    </div>
    <div v-else>
      <div class="text-xs">No new chapters have been released in the last 3 days</div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  data() {
    return {
      newChapters: [],
      cycle: 0,
    };
  },
  methods: {
    checkForNewChapters() {
      api
        .get("/manga/new-chapters?days=3")
        .then((success) => {
          if (success.data[0]) {
            let _data = [...success.data];
            this.newChapters = _data.sort((a, b) => {
              return b.latestRelease - a.latestRelease;
            });
          }
        })
        .catch((e) => console.log(e));
    },
    cycleManga() {
      if (this.cycle === this.newChapters.length - 1) this.cycle = 0;
      else this.cycle += 1;
    },
  },
  beforeMount() {
    this.checkForNewChapters();
    setInterval(this.cycleManga, 7500);
  },
  beforeUnmount() {
    clearInterval(this.cycleManga);
  },
};
</script>

<style scoped>
.line-ratio {
  aspect-ratio: 4 / 1;
}

.cover-position {
  object-position: center 25%;
}
</style>