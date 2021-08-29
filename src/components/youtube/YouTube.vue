<template>
  <div class="w-full h-full">
    <div class="flex flex-col p-2 h-full rounded bg-background outer-shadow overflow-hidden">
      <!-- Search bar and channel view/remove -->
      <div class="flex flex-row">
        <div class="w-1/5 relative">
          <Popover :panelStyle="'w-112 max-h-96 outer-shadow rounded-sm'">
            <template v-slot:button>
              <div
                class="
                  outer-shadow
                  transition-colors
                  duration-100
                  bg-amber-500
                  hover:bg-amber-600
                  text-sm
                  px-3
                  py-2
                  mr-2
                  w-full
                  text-center
                  rounded-sm
                  cursor-pointer
                "
              >
                Channels
              </div>
            </template>
            <template v-slot:content>
              <template v-for="(item, index) in listChannels" :key="item">
                <div
                  class="
                    flex flex-row
                    items-center
                    w-full
                    p-1
                    rounded-sm
                    bg-background-dark
                    hover:bg-background
                    text-sm
                    adjacent-hover
                  "
                >
                  <div class="pl-1 py-1 text-sm font-medium">
                    {{ item.name }}
                  </div>
                  <div class="flex flex-1 flex-row justify-end element-hover">
                    <a
                      class="
                        px-2
                        py-1
                        transition-colors
                        duration-100
                        bg-rose-500
                        hover:bg-rose-600
                        text-xs
                        rounded-sm
                        mr-1
                        cursor-pointer
                      "
                      :href="'https://youtube.com/channel/' + item.id"
                      target="_blank"
                    >
                      Open on YouTube
                    </a>
                    <div
                      class="
                        px-2
                        py-1
                        transition-colors
                        duration-100
                        bg-rose-500
                        hover:bg-rose-600
                        text-xs
                        rounded-sm
                        cursor-pointer
                      "
                      @click="removeChannel(item.id, index)"
                    >
                      Remove
                    </div>
                  </div>
                </div>
              </template>
            </template>
          </Popover>
        </div>
        <div class="flex flex-col w-4/5 relative z-10">
          <div class="flex flex-row w-full h-full outer-shadow rounded-md">
            <input
              class="w-4/5 h-full bg-background-dark outline-none text-sm pl-2 rounded-l-sm"
              type="text"
              placeholder="Search channel..."
            />
            <div class="w-1/5">
              <Menu as="div" class="flex justify-center">
                <MenuButton class="flex justify-center w-full h-full text-sm rounded-r-sm">
                  <div
                    class="
                      w-full
                      px-3
                      py-2
                      rounded-r-sm
                      text-sm
                      cursor-pointer
                      transition-colors
                      duration-100
                      bg-blue-500
                      hover:bg-blue-600
                    "
                    @click="searchChannels()"
                  >
                    Search
                  </div>
                </MenuButton>
                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="
                      absolute
                      left-0
                      right-0
                      top-full
                      mt-2
                      origin-top-left
                      bg-background-dark
                      rounded-sm
                      shadow-lg
                      ring-1 ring-black ring-opacity-5
                      focus:outline-none
                    "
                  >
                    <div v-show="searchResult.length > 0">
                      <template v-for="channel in searchResult" :key="channel.id">
                        <MenuItem v-slot="{ active }">
                          <div
                            :class="[
                              active ? 'bg-background' : '',
                              'group flex flex-row rounded-sm items-center w-full px-2 py-2 text-sm cursor-pointer',
                            ]"
                          >
                            <img :src="channel.thumbnail" />
                            <div>{{ item.name }}</div>
                          </div>
                        </MenuItem>
                      </template>
                    </div>
                    <div
                      v-show="searchResult.length === 0"
                      class="flex flex-row w-full justify-center items-center py-2"
                    >
                      <span class="mr-2">Searching...</span>
                      <div class="h-6 w-6 relative">
                        <div
                          class="
                            rounded-full
                            h-4
                            w-4
                            bg-background-dark
                            absolute
                            top-1/2
                            left-1/2
                            transform
                            -translate-x-1/2 -translate-y-1/2
                            z-40
                          "
                        />
                        <div
                          class="
                            h-6
                            w-6
                            absolute
                            bg-background
                            rounded-full
                            top-1/2
                            left-1/2
                            transform
                            -translate-x-1/2 -translate-y-1/2
                            z-20
                          "
                        />
                        <div
                          class="
                            rounded-tr-full
                            h-3
                            w-3
                            absolute
                            z-30
                            bottom-1/2
                            left-1/2
                            bg-background-light
                            loading-spin
                          "
                        />
                      </div>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <!-- YouTube video info -->
      <div class="relative">
        <template v-for="(video, index) in newVideos" :key="video">
          <transition name="scroll">
            <div
              v-show="index === newVideoOnShow"
              class="absolute z-0 top-0 w-full flex flex-col mt-4 transition-scroll"
            >
              <div class="text-xs pl-2 mb-1 text-bluegray-400">
                <span class="font-medium">{{ video.channel }}</span>
                <span class="italic">
                  released a new video
                  <b>·</b>
                  {{ getDateDifference(video.publishedAt) }}
                </span>
              </div>
              <Video :data="video" />
            </div>
          </transition>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import api from "../../services/api";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import Popover from "../commons/Popover";
import Video from "./Video";

dayjs.extend(relativeTime);

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    Popover,
    Video,
  },
  data() {
    return {
      newVideos: null,
      newVideoOnShow: 0,
      listChannels: null,
      searchResult: [],
    };
  },
  methods: {
    removeChannel(id, index) {
      api
        .post("/youtube/remove-channel", { id: id })
        .then(() => {
          this.listChannels.splice(index, 1);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDateDifference(releaseDate) {
      return dayjs(releaseDate).fromNow();
    },

    // GET new videos, putting them into the database
    getNewVideos() {
      api
        .get("/youtube/get-new-videos")
        .then((success) => {
          if (Array.isArray(success.data)) {
            this.newVideos = success.data;
            this.testVideo = success.data[0];
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    cycleNewVideo() {
      if (this.newVideoOnShow === this.newVideos.length - 1) this.newVideoOnShow = 0;
      else this.newVideoOnShow++;
    },

    searchChannels(query) {
      if (query)
        api
          .get(`/youtube/search-channels?query=${query}`)
          .then((success) => {
            this.searchResult = [...success.data];
          })
          .catch((e) => console.log(e));
    },
  },
  beforeMount() {
    this.getNewVideos();
    api
      .get("/youtube/get-channels")
      .then((success) => {
        this.listChannels = success.data;
      })
      .catch((e) => {
        console.log(e);
      });

    setInterval(this.getNewVideos, 3600000);
    setInterval(this.cycleNewVideo, 10000);
  },
  beforeUnmount() {
    clearInterval(this.getNewVideos);
    clearInterval(this.cycleNewVideo);
  },
};
</script>

<style scoped>
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