<template>
  <a
    class="flex flex-row items-start w-full rounded-sm bg-coffee-700 p-2 outer-shadow cursor-pointer"
    :href="'https://youtube.com/watch?v=' + id"
    target="_blank"
  >
    <div class="mr-2">
      <img :src="thumbnail" class="rounded-sm w-36 h-20 object-cover" />
    </div>
    <div class="flex flex-1 flex-col justify-center items-start">
      <div class="text-sm font-medium mb-1">{{ name }}</div>
      <div class="text-xs">{{ published }}</div>
    </div>
  </a>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: ["data"],
  data() {
    return {
      thumbnail: this.data.thumbnail,
      name: this.data.videoName,
      channel: this.data.channel,
      id: this.data.videoId,
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