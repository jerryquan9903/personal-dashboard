<template>
  <box-wrapper>
    <CurrentGame @open-details="openGameDetails($event)" />
  </box-wrapper>
  <box-wrapper>
    <PlayingNext />
  </box-wrapper>
  <div >
    ALO
  </div>
</template>

<script>
import boxWrapper from "../commons/boxWrapper.vue";
import CurrentGame from "./CurrentGame.vue";
import PlayingNext from "./PlayingNext.vue";

export default {
  components: {
    boxWrapper,
    CurrentGame,
    PlayingNext,
  },

  data() {
    return {
      openDetails: false,
    };
  },

  methods: {
    openGameDetails: function(isOpen) {
      console.log("IT'S OPEN");
      this.openDetails = isOpen;
    }
  }
};
</script>