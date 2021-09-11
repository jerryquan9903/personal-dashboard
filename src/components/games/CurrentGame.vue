<template>
  <div class="flex flex-col h-full rounded bg-coffee-800 outer-shadow mb-2 text-shadow">
    <div class="font-medium text-xl w-full text-left rounded-t p-2">Currently playing</div>
    <div class="flex flex-col flex-1 justify-start items-start h-full rounded-b">
      <div v-show="noLastPlayed" class="italic text-xs mb-2 text-orange-500">
        You are not currently playing any games. Here is one you haven't completed.
      </div>
      <div
        class="w-full h-full rounded-b bg-cover bg-center cursor-pointer"
        :style="{ backgroundImage: 'url(' + image + ')' }"
        @click="getGameInfoFull()"
      >
        <!-- card-style current game -->
        <!-- <div
          class="w-full bg-cover bg-center rounded cursor-pointer outer-shadow"
          :style="{ backgroundImage: 'url(' + image + ')' }"
          @click="getGameInfoFull()"
        > -->
        <div class="w-full h-full bg-mask-dark flex flex-col justify-start items-start p-2 rounded-b">
          <div class="font-medium text-lg -mt-1 mb-2">{{ name }}</div>
          <div class="current-grid text-sm font-light w-full" v-for="item in data" :key="item">
            <div class="mb-1 font-light pr-0">{{ item.label }}</div>
            <div class="font-normal">{{ item.value }}</div>
          </div>
        </div>
        <!-- </div> -->
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
      noLastPlayed: false,
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