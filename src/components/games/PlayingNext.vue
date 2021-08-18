<template>
  <div class="">
    <div class="font-bold text-xl w-full text-left py-2 px-3">
      Planning to play
    </div>
    <div class="p-4 bg-gradient-to-tr from-cyan-800 to-sky-900 rounded-b-md">
      <div class="grid grid-cols-3 gap-4">
        <template v-for="game in nextGames" :key="game">
          <div
            class="
              flex flex-col
              transition
              duration-500
              ease-in-out
              transform
              hover:scale-105
              hover:shadow-md
              cursor-pointer
            "
            @click="getGameInfoFull(game.id)"
          >
            <img
              :src="game.image"
              class="rounded-t-md shadow-md border-t-4 border-l-4 border-r-4 border-black"
            />
            <div class="text-xs w-full h-full rounded-b-md bg-black px-2 py-1">
              {{ game.name }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import getGameDetails from '../../functions/getGameDetails';
import api from "../../services/api";

export default {
  name: "playing-next",
  data() {
    return {
      nextGames: null,
    };
  },
  methods: {
    getGameInfoFull: function(id) {
      getGameDetails(id);
    }
  },
  beforeMount() {
    api
      .get("games/next-games")
      .then((success) => {
        this.nextGames = Object.values({ ...success.data });
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style scoped>
.name-gradient {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.5) 66%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>    