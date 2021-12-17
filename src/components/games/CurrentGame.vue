<template>
  <div class="flex flex-col h-full card outer-shadow mb-4 text-shadow">
    <div class="font-medium text-xl w-full text-left rounded-t p-2">Currently playing</div>
    <div class="flex flex-col flex-1 justify-start items-start h-full rounded-b">
      <div
        class="w-full h-full rounded-b bg-cover bg-center cursor-pointer"
        :style="{ backgroundImage: 'url(' + game.image + ')' }"
        @click="getGameInfoFull()"
      >
        <div class="w-full h-full bg-mask-dark flex flex-col justify-start items-start p-2 rounded-b">
          <div v-show="noLastPlayed" class="italic text-xs mb-2 text-orange-500">
            You are not currently playing any games. Here is one you haven't completed.
          </div>
          <div class="font-medium text-lg -mt-1 mb-2">{{ game.name }}</div>
          <div class="current-grid text-sm font-light w-full" v-for="item in game.data" :key="item">
            <div class="mb-1 font-light pr-0">{{ item.label }}</div>
            <div class="font-normal">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import parseGameInfo from "../../services/parseGameInfo";

export default {
  name: "current-game",
  data() {
    return {
      noLastPlayed: false,
      game: {
        id: "",
        name: "",
        image: "",
        data: []
      },
      updateInterval: null,
    };
  },
  emits: ["details"],
  methods: {
    setLoaded(value) {
      this.loaded = value;
    },

    getGameInfoFull() {
      this.$emit("details", [this.game.id, true]);
    },

    // get last played game's info
    getGameInfo() {
      api
        .get("/games/current")
        .then((success) => {
          this.game = parseGameInfo(success.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  beforeMount() {
    this.getGameInfo();
    this.updateInterval = setInterval(this.getGameInfo, 1800000);
  },

  beforeUnmount() {
    clearInterval(this.updateInterval);
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