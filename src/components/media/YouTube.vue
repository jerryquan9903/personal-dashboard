<template>
  <div class="w-full flex flex-col p-2 card outer-shadow">
    <!-- Search bar and channel view/remove -->
    <div class="flex flex-row">
      <div class="w-1/5 relative">
        <Popover :panelStyle="'w-96 max-h-40 outer-shadow rounded-sm'">
          <template v-slot:button>
            <div class="youtube-button mr-2 w-full text-center rounded-sm">Channels</div>
          </template>
          <template v-slot:content>
            <template v-for="(channel, index) in listChannels" :key="channel.id">
              <div
                class="
                  flex flex-row
                  items-center
                  w-full
                  p-1
                  rounded-sm
                  bg-matteblack-100
                  hover:bg-background
                  text-sm
                  parent-hover
                  z-50
                "
              >
                <img :src="channel.thumbnail" class="w-6 h-6 rounded-full mr-2" />
                <div class="p-1 text-sm font-medium hover:w-1/2 truncate">
                  {{ channel.name }}
                </div>
                <div class="flex flex-1 flex-row justify-end child-hover font-medium">
                  <a
                    class="flex flex-nowrap youtube-button-small mr-1"
                    :href="'https://youtube.com/channel/' + channel.id"
                    target="_blank"
                  >
                    View
                  </a>
                  <div class="youtube-button-small" @click="removeChannel(channel.id, index)">Remove</div>
                </div>
              </div>
            </template>
          </template>
        </Popover>
      </div>
      <div class="flex flex-col w-4/5 relative z-10">
        <div class="flex flex-row w-full h-full outer-shadow rounded-md">
          <input
            class="
              w-4/5
              h-full
              bg-matteblack-100
              outline-none
              placeholder-cornsilk-100 placeholder-opacity-50
              text-sm
              pl-2
              rounded-l-sm
            "
            type="text"
            placeholder="Search channel..."
            v-model="searchQuery"
          />
          <div class="w-1/5">
            <Menu as="div" class="flex justify-center">
              <MenuButton class="flex justify-center w-full h-full text-sm rounded-r-sm">
                <div class="w-full rounded-l-0 rounded-r-sm youtube-button" @click="searchChannels()">Search</div>
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
                    bg-matteblack-100
                    rounded-sm
                    shadow-lg
                    ring-1 ring-black ring-opacity-5
                    focus:outline-none
                    overflow-y-scroll
                    max-h-40
                    custom-scrollbar
                  "
                >
                  <div v-show="searchResult.length > 0">
                    <template v-for="channel in searchResult" :key="channel.id">
                      <div class="p-1">
                        <MenuItem v-slot="{ active }">
                          <div
                            :class="[
                              active ? 'bg-background' : '',
                              'group flex flex-row w-full rounded-sm items-center w-full p-2 text-sm cursor-pointer parent-hover',
                            ]"
                          >
                            <img :src="channel.thumbnail" class="w-6 h-6 rounded-full mr-2" />
                            <div class="text-sm flex-1">{{ channel.name }}</div>
                            <div
                              class="flex justify-end youtube-button-small child-hover"
                              @click="insertChannel(channel.id)"
                            >
                              Add to channel list
                            </div>
                          </div>
                        </MenuItem>
                      </div>
                    </template>
                  </div>
                  <div v-show="searchQuery.length === 0" class="py-2 w-full text-center">
                    Please enter your search query.
                  </div>
                  <div
                    v-show="searchResult.length === 0 && searchQuery.length > 0"
                    class="flex flex-row w-full justify-center items-center py-2"
                  >
                    <span class="mr-2">Searching...</span>
                    <div class="h-6 w-6 relative">
                      <div class="rounded-full h-4 w-4 bg-matteblack-900 absolute-center z-40" />
                      <div class="h-6 w-6 absolute-center bg-matteblack-800 rounded-full z-20" />
                      <div
                        class="rounded-tr-full h-3 w-3 absolute z-30 bottom-1/2 left-1/2 bg-matteblack-600 loading-spin"
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
    <div class="flex-1 grid grid-cols-1  overflow-hidden">
      <template v-for="(video, index) in newVideos" :key="video">
        <transition name="scroll" class="row-start-1 col-start-1">
          <div v-if="index === newVideoOnShow" class="w-full flex flex-col mt-4 transition-scroll">
            <div class="text-xs pl-2 mb-1 text-oldrose-500">
              <span class="font-bold">{{ video.channelName }}</span>
              <span class="">
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
    <!-- <div class="flex flex-row-reverse w-full mt-4">
      <div class="youtube-button" @click="feelingLucky()">I'm Feeling Lucky</div>
    </div> -->
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
      searchQuery: "",
      updateInterval: null,
      cycleInterval: null,
    };
  },
  methods: {
    removeChannel(id, index) {
      api
        .post("/youtube/channel/delete", { id: id })
        .then(() => {
          this.listChannels.splice(index, 1);
          this.getChannels();
          this.getNewVideos();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDateDifference(releaseDate) {
      return dayjs(releaseDate).fromNow();
    },

    // Also replace old videos in the database
    getNewVideos() {
      api
        .get("/youtube/video/new")
        .then((success) => {
          if (Array.isArray(success.data)) {
            this.newVideos = success.data;
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
    searchChannels() {
      if (this.searchQuery.length > 0)
        api
          .get(`/youtube/channel/search?name=${this.searchQuery}`)
          .then((success) => {
            this.searchResult = [...success.data];
          })
          .catch((e) => console.log(e));
    },
    insertChannel(id) {
      api
        .post("/youtube/channel/insert", { id: id })
        .then(() => {
          this.searchQuery = "";
          this.getChannels();
          this.getNewVideos();
        })
        .catch((e) => console.log(e));
    },
    getChannels() {
      api
        .get("/youtube/channel/get")
        .then((success) => {
          let sorted = [...success.data].sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
          this.listChannels = sorted;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    feelingLucky() {
      api
        .get("/youtube/feeling-lucky")
        .then((success) => {
          window.open("https://youtube.com/watch?v=" + success.data.videoId);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  beforeMount() {
    this.getNewVideos();
    this.getChannels();

    this.updateInterval = setInterval(this.getNewVideos, 3600000);
    this.cycleInterval = setInterval(this.cycleNewVideo, 8000);
  },
  beforeUnmount() {
    clearInterval(this.updateInterval);
    clearInterval(this.cycleInterval);
  },
};
</script>

<style scoped>
.youtube-button {
  @apply px-3 py-2 font-medium transition-colors duration-200 bg-oldrose-500 hover:bg-oldrose-600 text-sm rounded-sm cursor-pointer;
}

.youtube-button-small {
  @apply px-2 py-1 transition-colors duration-200 bg-oldrose-500 hover:bg-oldrose-600 text-xs rounded-sm cursor-pointer;
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