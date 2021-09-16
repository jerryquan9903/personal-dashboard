<template>
  <div class="flex flex-col p-2 w-full h-full">
    <div class="font-medium pb-2">New manga</div>
    <div v-if="newManga" class="w-full h-full overflow-y-scroll custom-scrollbar">
      <div v-if="newManga[0]">
        <template v-for="(manga, index) in newManga" :key="manga.name">
          <a
            class="flex flex-col grid grid-cols-1 cursor-pointer outer-shadow"
            :class="index < newManga.length - 1 && 'mb-2'"
            :href="manga.url"
            target="_blank"
          >
            <img
              v-if="manga.preview"
              :src="manga.preview"
              loading="lazy"
              class="row-start-1 col-start-1 object-cover manga-cover rounded"
            />
            <div v-else class="row-start-1 col-start-1 line-ratio object-cover cover-position rounded bg-coffee-200" />
            <div class="flex flex-col row-start-1 col-start-1 justify-center bg-mask-dark rounded w-full h-full px-1">
              <div class="text-sm font-medium text-shadow max-w-full truncate">{{ manga.name }}</div>
              <div class="text-xs text-shadow">
                {{ manga.chapter === -1 ? "New chapter" : "Chapter " + manga.chapter }}
              </div>
            </div>
          </a>
        </template>
      </div>
      <div v-else>
        <div class="text-xs p-2">No new manga have been released recently.</div>
      </div>
    </div>
    <div v-else class="flex flex-row w-full justify-center items-center">
      <div class="relative" :style="{ width: '24px', height: '24px' }">
        <div class="rounded-full bg-coffee-800 absolute-center z-40" :style="{ width: '12px', height: '12px' }" />
        <div class="rounded-full bg-coffee-900 absolute-center z-20" :style="{ width: '16px', height: '16px' }" />
        <div
          class="rounded-tr-full absolute z-30 bottom-1/2 left-1/2 bg-coffee-600 loading-spin"
          :style="{ width: '8px', height: '8px' }"
        />
      </div>
      <div class="text-xs w-full text-center">Checking for new manga...</div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";

export default {
  data() {
    return {
      newManga: null,
    };
  },
  methods: {
    getNewManga() {
      api
        .get("/manga/new-manga")
        .then((success) => {
          if (success.data.length === 0) this.newManga = [];
          else {
            let _data = [...success.data].sort((a, b) => {
              return a.chapter - b.chapter;
            });
            this.newManga = _data;
          }
        })
        .catch((e) => console.log(e));
    },
  },
  beforeMount() {
    this.getNewManga();
  },
};
</script>

<style>
.line-ratio {
  aspect-ratio: 4 / 1;
}

.cover-position {
  object-position: center 25%;
}

.loading-spin {
  animation: spin 2s infinite linear;
  transform-origin: 0 100%;
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>