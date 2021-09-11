<template>
  <div class="w-full h-full bg-coffee-800 rounded outer-shadow p-2 overflow-hidden">
    <div v-if="newChapters[0]" class="w-1/3 flex flex-col h-full overflow-y-scroll custom-scrollbar">
      <div class="text-xl font-medium pb-2">New chapters</div>
      <template v-for="manga in newChapters" :key="manga._id">
        <a
          class="flex flex-col relative cursor-pointer outer-shadow mb-2"
          :href="manga.latestUrl"
          target="_blank"
        >
          <img :src="manga.cover" class="line-ratio object-cover cover-position rounded-sm" />
          <div class="flex flex-col justify-center absolute inset-0 bg-mask-dark rounded-sm w-full h-full px-1">
            <div class="text-xs text-shadow max-w-full truncate">{{ manga.name.common }}</div>
            <div class="text-sm font-medium text-shadow">
              {{ manga.latestChapter === 0 ? "New chapter" : ("Chapter " + manga.latestChapter) }}
            </div>
          </div>
        </a>
      </template>
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
  aspect-ratio: 5 / 1;
}

.cover-position {
  object-position: center 25%;
}
</style>