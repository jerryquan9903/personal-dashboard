<template>
  <div class="w-full h-full bg-background rounded outer-shadow p-2">ALO</div>
</template>

<script>
import api from "../../services/api";
export default {
  data() {
    return {
      newChapters: [],
    };
  },
  methods: {
    checkForNewChapters() {
      api
        .get("/manga/new-chapters")
        .then((success) => {
          this.newChapters = success.data;
          console.log(success.data);
        })
        .catch((e) => console.log(e));
    },
  },
  beforeMount() {
    this.checkForNewChapters();
  }
};
</script>

<style>
</style>