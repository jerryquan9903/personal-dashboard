<template>
  <div class="flex flex-col h-full rounded bg-bluegray-700 outer-shadow">
    <CurrentGame @details="openGameDetails($event)" />
    <PlayingNext @details="openGameDetails($event)" />
  </div>
  <transition name="fade">
    <div v-show="openDetails">
      <div
        class="
          fixed
          z-50
          top-1/2
          left-1/2
          w-screen
          h-screen
          transform
          -translate-x-1/2 -translate-y-1/2
          bg-dark
          flex
          justify-center
          items-center
        "
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
.bg-dark {
  background-color: rgba(0, 0, 0, 0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
  z-index: 50;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>