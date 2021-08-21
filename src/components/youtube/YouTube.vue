<template>
  <div class="w-full h-full">
    <box-wrapper>
      <div class="flex flex-row p-2 h-full">
        <div v-if="newVideos" class="text-xl font-medium">
          New videos!
        </div>
      </div>
    </box-wrapper>
  </div>
</template>

<script>
import api from "../../services/api";
import boxWrapper from "../commons/boxWrapper";

export default {
  components: {
    boxWrapper,
  },
  data() {
    return {
      newVideos: null,
    };
  },
  beforeMount() {
    api.get("/youtube/get-new-videos").then((success) => {
      if (Array.isArray(success.data))
        this.newVideos = success.data;
      console.log(success.data);
    });
  },
};
</script>

<style>
</style>