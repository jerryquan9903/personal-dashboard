<template>
  <div class="w-full h-full p-2 flex flex-col">
    <div class="font-medium pb-2">New chapters</div>
    <div v-if="newChapters[0]" class="overflow-y-scroll custom-scrollbar">
      <template v-for="(manga, index) in newChapters" :key="manga._id">
        <a
          class="flex flex-col grid grid-cols-1 cursor-pointer outer-shadow"
           :class="index < newChapters.length - 1 && 'mb-2'"
          :href="manga.latestUrl"
          target="_blank"
        >
          <img
            :src="manga.cover"
            loading="lazy"
            class="row-start-1 col-start-1 manga-cover object-cover rounded"
          />
          <div class="flex flex-col row-start-1 col-start-1 justify-center bg-mask-dark rounded w-full h-full px-1">
            <div class="text-sm font-medium text-shadow max-w-full truncate">{{ manga.name.common }}</div>
            <div class="text-xs text-shadow">
              {{ manga.latestChapter === -1 ? "New chapter" : "Chapter " + manga.latestChapter }}
            </div>
          </div>
        </a>
      </template>
    </div>
    <div v-else>
      <div class="text-xs p-2">No new chapters have been released in the last {{ days }} days.</div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  data() {
    return {
      newChapters: [],
      days: 3,
    };
  },
  methods: {
    checkForNewChapters() {
      api
        .get(`/manga/new-chapters?days=${this.days}`)
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
  },
  beforeMount() {
    this.checkForNewChapters();
  },
};
</script>