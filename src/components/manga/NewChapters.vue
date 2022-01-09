<template>
  <div class="col-span-2 w-full flex flex-col card p-2">
    <div class="font-medium pb-2 px-1">New chapters</div>
    <div ref="chapters" class="flex-1 overflow-hidden relative">
      <div
        class="absolute top-0 bottom-0 flex flex-row z-10"
        @mouseenter="haltChangePage()"
        @mouseleave="resumeChangePage()"
      >
        <template v-for="chapterPage in newChapters" :key="chapterPage">
          <div
            class="flex flex-col px-1 page-scroll"
            :style="{ width: pageWidth + 'px', transform: 'translateX(-' + pageWidth * pageIndex + 'px)' }"
          >
            <template v-for="(chapter, index) in chapterPage" :key="chapter.id">
              <a
                class="flex-1 flex flex-col grid grid-cols-1 cursor-pointer outer-shadow manga-cover rounded"
                :class="index < chapterPage.length - 1 && 'mb-2'"
                :href="chapter.url"
                target="_blank"
                :style="{ backgroundImage: 'url(' + chapter.cover + ')' }"
              >
                <div
                  class="flex flex-col row-start-1 col-start-1 justify-center bg-mask-dark rounded w-full h-full p-1"
                >
                  <div class="text-sm font-medium text-shadow max-w-full truncate">{{ chapter.mangaName }}</div>
                  <div class="text-xs text-shadow truncate">
                    {{ "Chapter " + chapter.chapter }}
                  </div>
                </div>
              </a>
            </template>
          </div>
        </template>
      </div>
    </div>

    <div class="flex flex-row justify-center mt-2">
      <template v-for="(page, index) in newChapters" :key="page">
        <div
          class="w-1 h-1 rounded-full mx-1 cursor-pointer"
          :class="index === pageIndex ? 'bg-neutral-500' : 'bg-neutral-700'"
          @click="changePage(index)"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { onMounted, ref } from "vue";

dayjs.extend(relativeTime);

export default {
  data() {
    return {
      newChapters: [],
      pageIndex: 0,
      position: 0,
      changePageInterval: null,
      updateListInterval: null,
      updateChaptersInterval: null,
    };
  },
  setup() {
    const chapters = ref(null);
    const pageWidth = ref(0);

    onMounted(() => {
      pageWidth.value = chapters.value.clientWidth;
    });

    return {
      chapters,
      pageWidth,
    };
  },
  methods: {
    async getList() {
      await api.get("manga/md/list");
    },
    getNewChapters() {
      api
        .get(`/manga/md/feed`)
        .then((success) => {
          if (success.data[0]) {
            let _data = [...success.data].map((chapter) => {
              return {
                ...chapter,
                published: dayjs(chapter.published).fromNow(),
              };
            });
            this.newChapters = [];
            while (_data.length > 0) {
              this.newChapters.push(_data.splice(0, 4));
            }
          }
        })
        .catch((e) => console.log(e));
    },
    changePage(index = -1) {
      if (index > -1 && index < this.newChapters.length) {
        this.pageIndex = index;
        clearInterval(this.changePageInterval);
        this.changePageInterval = setInterval(this.changePage, 7500);
      } else {
        if (this.pageIndex === this.newChapters.length - 1) this.pageIndex = 0;
        else this.pageIndex += 1;
      }
    },
    haltChangePage() {
      clearInterval(this.changePageInterval);
    },
    resumeChangePage() {
      this.changePageInterval = setInterval(this.changePage, 7500);
    },
  },
  async beforeMount() {
    await this.getList();
    this.getNewChapters();
    this.changePageInterval = setInterval(this.changePage, 7500);
    this.updateListInterval = setInterval(this.checkManga, 3600000);
    this.updateChaptersInterval = setInterval(this.checkForNewChapters, 900000);
  },
  beforeUnmount() {
    clearInterval(this.changePageInterval);
    clearInterval(this.updateListInterval);
    clearInterval(this.updateChaptersInterval);
  },
};
</script>

<style scoped>
.page-scroll {
  transition-property: transform;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}
</style>