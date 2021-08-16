<template>
  <box-wrapper>
    <CurrentGame />
  </box-wrapper>
  <box-wrapper>
    <PlayingNext />
  </box-wrapper>
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
    return {};
  },
};
</script>

<style>
</style>