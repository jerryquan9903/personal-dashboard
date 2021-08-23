<template>
  <div class="flex flex-col h-full flex-1 rounded bg-background outer-shadow">
    <div
      class="
        font-medium
        text-xl
        w-full
        text-left
        py-2
        px-3
        border-b border-coolgray-900
      "
    >
      Planning to play
    </div>
    <div
      class="flex flex-col justify-start items-center m-2 flex-1 rounded-md"
    >
      <div v-show="loaded" class="grid grid-cols-1">
        <template v-for="(display, index) in allNextGames" :key="display">
          <transition name="fade" class="row-start-1 col-start-1">
            <div v-show="index === page" class="grid grid-cols-3 gap-2">
              <template v-for="game in display" :key="game">
                <div
                  class="
                    flex flex-col
                    justify-center
                    items-center
                    transition
                    duration-250
                    ease-in-out
                    transform
                    hover:scale-105
                    cursor-pointer
                    relative
                  "
                  @click="getGameInfoFull(game.id)"
                >
                  <img
                    :src="game.image"
                    class="
                      w-full
                      mx-auto
                      rounded-sm
                      object-cover
                      outer-shadow
                    "
                  />
                  <div
                    class="
                      flex flex-col-reverse
                      absolute
                      top-0
                      bottom-0
                      left-0
                      right-0
                      image-gradient
                      rounded-b-sm
                      px-2
                      py-1
                    "
                  >
                    <div class="text-xs font-medium outer-shadow">
                      {{ game.name }}
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </transition>
        </template>
      </div>
      <!--Skeleton-->
      <div v-show="!loaded">
        <div class="animate-pulse grid grid-cols-3 gap-2">
          <div class="w-36 h-48 rounded-sm bg-bluegray-300"></div>
          <div class="w-36 h-48 rounded-sm bg-bluegray-300"></div>
          <div class="w-36 h-48 rounded-sm bg-bluegray-300"></div>
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
        // change image to smaller size
        let dataWithSmallerImage = success.data.map((game) => {
          let smallerImage = game.image.replace("t_1080p", "t_720p");
          return { ...game, image: smallerImage };
        });

        let splitted = [];

        // split data into multiple arrays with 3 games each
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
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 66%,
    rgba(255, 255, 255, 0) 100%
  );
}

.image-gradient {
  background: linear-gradient(0deg, #00000088 30%, #00000012 100%);
}


</style>    