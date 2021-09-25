<template>
  <div class="flex flex-col h-full">
    <CurrentGame @details="openGameDetails($event)" />
    <PlayingNext @details="openGameDetails($event)" />
  </div>
  <transition name="fade-fast">
    <div v-show="openDetails">
      <div
        class="fixed z-200 top-0 left-0 w-screen h-screen bg-dark flex justify-center items-center"
        @click.self="closeGameDetails()"
      >
        <div class="max-w-5xl">
          <GameDetails :id="gameId" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CurrentGame from "./CurrentGame";
import PlayingNext from "./PlayingNext";
import GameDetails from "./GameDetails";

export default {
  components: {
    CurrentGame,
    PlayingNext,
    GameDetails,
  },

  data() {
    return {
      gameId: null,
      openDetails: false,
    };
  },

  methods: {
    openGameDetails: function (args) {
      this.gameId = args[0];
      this.openDetails = args[1];
    },
    closeGameDetails() {
      this.openDetails = false;
    },
  },
};
</script>

<style scoped>
.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.25s ease;
  z-index: 200;
}

.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}
</style>