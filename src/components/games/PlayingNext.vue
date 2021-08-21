<template>
  <div class="flex flex-col h-full">
    <div class="font-medium text-xl w-full text-left py-2 px-3">
      Planning to play
    </div>
    <div
      class="h-full grid place-items-center p-4 bg-gradient-to-tr from-teal-600 to-sky-700 rounded-b-md"
    >
      <div v-show="loaded" class="grid grid-cols-1">
        <template v-for="(display, index) in allNextGames" :key="display">
          <transition name="fade" class="row-start-1 col-start-1">
            <div v-show="index === page" class="grid grid-cols-3 gap-5">
              <template v-for="game in display" :key="game">
                <div
                  class="
                    flex flex-col
                    transition
                    duration-250
                    ease-in-out
                    transform
                    hover:scale-105
                    cursor-pointer
                  "
                  @click="getGameInfoFull(game.id)"
                >
                  <img
                    :src="game.image"
                    class="
                      w-36
                      h-48
                      rounded-t-md
                      object-cover
                      border-t-4 border-l-4 border-r-4 border-black
                    "
                  />
                  <div
                    class="text-xs w-36 mx-auto rounded-b-md bg-black px-2 py-1"
                  >
                    {{ game.name }}
                  </div>
                </div>
              </template>
            </div>
          </transition>
        </template>
      </div>
      <!--Skeleton-->
      <div v-show="!loaded">
        <div class="animate-pulse grid grid-cols-3 gap-4">
          <div class="w-36 mx-auto">
            <div
              class="
                h-48
                rounded-t-md
                border-t-4 border-l-4 border-r-4 border-black
                bg-bluegray-300
              "
            ></div>
            <div class="h-10 rounded-b-md bg-black px-2 py-1">
              <div class="h-3 w-full bg-bluegray-300 mb-1 rounded"></div>
              <div class="h-3 w-1/3 bg-bluegray-300 mb-1 rounded"></div>
            </div>
          </div>
          <div class="w-36 mx-auto">
            <div
              class="
                h-48
                rounded-t-md
                border-t-4 border-l-4 border-r-4 border-black
                bg-bluegray-300
              "
            ></div>
            <div class="h-10 rounded-b-md bg-black px-2 py-1">
              <div class="h-3 w-full bg-bluegray-300 mb-1 rounded"></div>
              <div class="h-3 w-1/3 bg-bluegray-300 mb-1 rounded"></div>
            </div>
          </div>
          <div class="w-36 mx-auto">
            <div
              class="
                h-48
                rounded-t-md
                border-t-4 border-l-4 border-r-4 border-black
                bg-bluegray-300
              "
            ></div>
            <div class="h-10 rounded-b-md bg-black px-2 py-1">
              <div class="h-3 w-full bg-bluegray-300 mb-1 rounded"></div>
              <div class="h-3 w-1/3 bg-bluegray-300 mb-1 rounded"></div>
            </div>
          </div>
        </div>
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
      allNextGames: null,
      page: null,
      loaded: true,
    };
  },
  emits: ["details"],
  methods: {
    getGameInfoFull(id) {
      this.$emit("details", [id, true]);
    },
    splitGameData(data) {
      let splitted = [];
      for (let i = 0; i < data.length; i += 3) {
        splitted.push(data.slice(i, i + 3));
      }
    },
    cycleGames() {
      if (this.page === this.allNextGames.length - 1) this.page = 0;
      else this.page += 1;
    },
    setLoaded() {
      this.loaded = true;
    },
  },
  beforeMount() {
    api
      .get("games/next-games")
      .then((success) => {
        let dataWithSmallerImage = success.data.map((game) => {
          let smallerImage = game.image.replace("t_1080p", "t_720p");
          return {...game, image: smallerImage};
        })

        let splitted = [];

        for (let i = 0; i < dataWithSmallerImage.length; i += 3) {
          splitted.push(success.data.slice(i, i + 3));
        }

        this.allNextGames = splitted;
        this.page = 0;

        setInterval(this.cycleGames, 10000);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  beforeUnmount() {
    clearInterval(this.cycleGames);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>    