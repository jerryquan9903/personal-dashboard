<template>
  <div class="w-full h-full">
    <div class="flex flex-col p-2 h-full rounded bg-bluegray-700 outer-shadow">
      <div class="flex flex-row">
        <div
          class="
            outer-shadow
            transition-colors
            duration-100
            bg-emerald-600
            hover:bg-emerald-700
            text-sm
            px-3
            py-2
            mr-2
            w-1/5
            text-center
            rounded-sm
            cursor-pointer
            relative
          "
        >
          <Dropdown :menuWidth="'w-48'">Watchlist</Dropdown>
        </div>
        <div class="flex flex-col w-4/5 relative z-0">
          <div class="flex flex-row w-full h-full outer-shadow rounded-md">
            <input
              class="
                w-4/5
                h-full
                bg-bluegray-800
                outline-none
                text-sm
                pl-2
                rounded-l-sm
              "
              type="text"
              placeholder="Search channel..."
            />
            <div
              class="
                w-1/5
                flex
                justify-center
                items-center
                h-full
                rounded-r-sm
                text-sm
                cursor-pointer
                transition-colors
                duration-100
                bg-red-500
                hover:bg-red-600
              "
            >
              <Dropdown :menuWidth="'right-0'">Search</Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import Dropdown from "../commons/Dropdown";

export default {
  components: { Dropdown },
  data() {
    return {
      newVideos: null,
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
  },
  beforeMount() {
    api.get("/youtube/get-new-videos").then((success) => {
      if (Array.isArray(success.data)) this.newVideos = success.data;
    });
  },
};
</script>

<style>
</style>