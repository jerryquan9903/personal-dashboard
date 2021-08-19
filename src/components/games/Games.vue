<template>
  <box-wrapper>
    <CurrentGame @details="openGameDetails($event)" />
  </box-wrapper>
  <box-wrapper>
    <PlayingNext @details="openGameDetails($event)" />
  </box-wrapper>
  <transition name="fade">
    <div v-show="openDetails">
      <div
        class="
          fixed
          top-1/2
          left-1/2
          w-screen
          h-screen
          transform
          -translate-x-1/2 -translate-y-1/2
          bg-dark
          flex justify-center items-center
        "
        @click.self="closeGameDetails()"
      >
        <div class="max-w-4xl">
          <box-wrapper>
            <GameDetails :id="gameId" />
          </box-wrapper>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import boxWrapper from "../commons/boxWrapper.vue";
import CurrentGame from "./CurrentGame.vue";
import PlayingNext from "./PlayingNext.vue";
import GameDetails from "./GameDetails.vue";

export default {
  components: {
    boxWrapper,
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
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>