<template>
  <div class="flex flex-col h-full flex-1 card outer-shadow">
    <div class="font-medium text-xl w-full text-left p-2 border-b border-matteblack-900">Plan to play</div>
    <div class="flex flex-col justify-start items-center m-2 flex-1 rounded-md">
      <div v-show="loaded" class="grid grid-cols-1">
        <template v-for="(display, index) in allNextGames" :key="display">
          <transition name="fade" class="row-start-1 col-start-1">
            <div v-show="index === page" class="grid grid-cols-2 gap-2">
              <template v-for="game in display" :key="game">
                <div
                  class="
                    flex flex-col
                    justify-center
                    items-center
                    transition
                    duration-250
                    ease-in-out
                    cursor-pointer
                    relative
                    rounded-sm
                  "
                  @click="getGameInfoFull(game.id)"
                >
                  <img :src="game.image" class="w-full mx-auto rounded object-cover outer-shadow cover-ratio" />
                  <div class="flex flex-col-reverse absolute inset-0 image-gradient rounded-b px-2 py-1">
                    <div class="text-xs font-medium text-shadow">
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
      <!-- <div v-show="!loaded">
        <div class="animate-pulse grid grid-cols-2 gap-2 h-full">
          <div class="w-36 h-48 rounded-sm bg-bluegray-500"></div>
          <div class="w-36 h-48 rounded-sm bg-bluegray-500"></div>
        </div>
      </div> -->
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
      loaded: false,
      cycleInterval: null,
    };
  },
  emits: ["details"],
  methods: {
    getGameInfoFull(id) {
      this.$emit("details", [id, true]);
    },
    cycleGames() {
      if (this.page === this.allNextGames.length - 1) this.page = 0;
      else this.page++;
    },
    setLoaded() {
      this.loaded = true;
    },
  },
  beforeMount() {
    api
      .get("games/next")
      .then((success) => {
        // change image to smaller size
        let dataWithSmallerImage = success.data.map((game) => {
          let smallerImage = game.image.replace("t_1080p", "t_720p");
          return { ...game, image: smallerImage };
        });

        let splitted = [];

        // split data into multiple arrays with 3 games each
        for (let i = 0; i < dataWithSmallerImage.length; i += 2) {
          splitted.push(success.data.slice(i, i + 2));
        }

        this.allNextGames = splitted;
        this.page = 0;

        this.cycleInterval = setInterval(this.cycleGames, 10000);
        setTimeout(this.setLoaded, 500);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  beforeUnmount() {
    clearInterval(this.cycleInterval);
  },
};
</script>

<style scoped>
.name-gradient {
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 66%, rgba(255, 255, 255, 0) 100%);
}

.image-gradient {
  background: linear-gradient(0deg, #17171799 30%, #17171766 100%);
}
</style>    