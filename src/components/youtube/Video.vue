<template>
  <div
    class="
      flex flex-row
      items-start
      w-full
      mt-4
      rounded
      bg-background-light
      p-2
      outer-shadow
      cursor-pointer
    "
  >
    <div class="w-2/5 mr-2">
      <img :src="thumbnail" class="rounded-sm" />
    </div>
    <div class="flex flex-col justify-center items-start">
      <div class="text-sm font-medium mb-1">{{ name }}</div>
      <div class="text-sm">{{ published }}</div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: ["data"],
  data() {
    return {
      thumbnail: this.data.thumbnail,
      name: this.data.videoName,
      published: null,
    };
  },
  beforeMount() {
    this.published = dayjs(this.data.publishedAt).format("MMM D, YYYY");
  },
};
</script>

<style>
</style>