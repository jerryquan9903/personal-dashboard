<template>
  <div class="w-full h-full">
    <div class="flex flex-col p-2 h-full rounded bg-background outer-shadow">
      <!-- Search bar and channel view/remove -->
      <div class="flex flex-row">
        <div class="w-1/5 relative">
          <Popover
            :menuWidth="'w-112 max-h-96 overflow-scroll custom-scrollbar'"
          >
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
                    py-1
                    px-1
                    rounded-sm
                    transition-colors
                    duration-200
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
        <div class="flex flex-col w-4/5 relative z-0">
          <div class="flex flex-row w-full h-full outer-shadow rounded-md">
            <input
              class="
                w-4/5
                h-full
                bg-background-dark
                outline-none
                text-sm
                pl-2
                rounded-l-sm
              "
              type="text"
              placeholder="Search channel..."
            />
            <div class="w-1/5">
              <Dropdown :menuWidth="'right-0'">
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
                >
                  Search
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <!-- YouTube video info -->
      <div v-if="testVideo">
        <Video :data="testVideo" />
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import Dropdown from "../commons/Dropdown";
import Popover from "../commons/Popover";
import Video from "./Video";

export default {
  components: {
    Dropdown,
    Popover,
    Video,
  },
  data() {
    return {
      newVideos: null,
      testVideo: null,
      listChannels: null,
      searchDropdown: false,
    };
  },
  methods: {
    openSearchDropdown() {
      this.searchDropdown = true;
    },
    closeSearchDropdown() {
      this.searchDropdown = false;
    },
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
  },
  beforeMount() {
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

    api
      .get("/youtube/get-channels")
      .then((success) => {
        this.listChannels = success.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style>
</style>