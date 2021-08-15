<template>
  <box-wrapper>
    <CurrentGame />
  </box-wrapper>
</template>

<script>
import boxWrapper from "../commons/boxWrapper.vue";
import CurrentGame from "./CurrentGame.vue";

export default {
  components: {
    boxWrapper,
    CurrentGame,
  },

  data() {
    return {};
  },
};
</script>

<style>
</style>