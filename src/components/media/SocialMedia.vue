<template>
  <div class="w-full h-full flex flex-col justify-start">
    <YouTube />
    <div class="flex-1 h-full mt-2 p-2 rounded bg-coffee-800 outer-shadow overflow-y-scroll custom-scrollbar">

    </div>
  </div>
</template>

<script>
import YouTube from "./YouTube";

export default {
  components: { YouTube },
};
</script>

<style>

</style>