<template>
  <div class="">
    <div class="font-bold text-xl w-full text-left py-2 px-3">
      Planning to play
    </div>
    <div class="p-4 bg-gradient-to-tr from-cyan-800 to-sky-900 rounded-b-md">
      <div class="grid grid-cols-3 gap-4">
        <template v-for="game in nextGames" :key="game">
          <div class="relative">
            <img
              :src="game.image"
              class="rounded-md shadow-md border-4 border-black"
            />
            <div
              class="
                absolute
                bottom-0
                left-0
                pl-2
                pb-1
                pt-2
                text-sm
                w-full
                rounded-b-md
                name-gradient
              "
            >
              {{ game.name }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";

export default {
  name: "playing-next",
  data() {
    return {
      nextGames: null,
    };
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