<template>
  <div class="flex flex-col h-full rounded bg-background outer-shadow mb-4">
    <div class="font-medium text-xl w-full text-left py-2 px-3 border-b border-coolgray-900">Currently playing</div>
    <div class="flex flex-col flex-1 justify-start items-start m-2 h-full">
      <div v-show="noLastPlayed" class="italic text-xs mb-2 text-orange-500">
        You are not currently playing any games. Here is one you haven't completed.
      </div>
      <div v-show="loaded" class="flex flex-row justify-start items-start w-full h-full">
        <div
          class="mr-3 transition duration-250 ease-in-out transform hover:scale-105 cursor-pointer w-1/2"
          @click="getGameInfoFull()"
        >
          <img
            :src="image"
            class="object-cover rounded-sm hover:shadow-md outer-shadow max-w-full game-cover-ratio"
            @load="setLoaded(true)"
          />
        </div>
        <div class="flex flex-col justify-start items-start w-1/2">
          <div class="font-medium text-xl mb-2">{{ name }}</div>
          <div class="current-grid text-sm font-light w-full" v-for="item in data" :key="item">
            <div class="mb-1 font-light pr-0">{{ item.label }}</div>
            <div class="font-normal">{{ item.value }}</div>
          </div>
        </div>
      </div>

      <!--Skeleton-->
      <div v-show="!loaded && !noLastPlayed">
        <div class="animate-pulse flex flex-row justify-start items-start">
          <div class="rounded-sm w-48 h-64 bg-bluegray-500 mr-4"></div>
          <div class="flex flex-col mt-2">
            <div class="h-5 w-28 mb-4 rounded bg-bluegray-500"></div>
            <div class="grid grid-cols-2 gap-2" v-for="num in skeleton" :key="num">
              <div class="h-4 rounded w-20 pr-12 mb-2 bg-bluegray-500"></div>
              <div class="h-4 rounded w-24 mb-2 bg-bluegray-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import parseGameInfo from "../../functions/parseGameInfo";

export default {
  name: "current-game",
  data() {
    return {
      loaded: false,
      noLastPlayed: false,
      skeleton: 5,
      name: null,
      image: null,
      data: null,
      id: null,
    };
  },
  emits: ["details"],
  methods: {
    setLoaded(value) {
      this.loaded = value;
    },

    getGameInfoFull() {
      this.$emit("details", [this.id, true]);
    },

    // get last played game's info
    getGameInfo() {
      api
        .get("games/last-played")
        .then((success) => {
          this.name = success.data.name;
          this.image = success.data.image;
          this.data = parseGameInfo(success.data.info);
          this.id = success.data.id;
          this.noLastPlayed = success.data.no_last_played;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  beforeMount() {
    this.getGameInfo();
    setInterval(this.getGameInfo, 1800000);
  },

  beforeUnmount() {
    clearInterval(this.getGameInfo);
  },
};
</script>

<style scoped>
.outer-container img {
  max-height: 100%;
  height: auto;
}

.current-grid {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 0.5rem 0.5rem;
}
</style>