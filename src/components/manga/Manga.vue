<template>
  <div class="w-full h-full flex flex-row bg-coffee-800 rounded outer-shadow">
    <div class="w-1/3 h-full border-r border-coffee-900" :style="{paddingLeft: '1px'}">
      <NewChapters />
    </div>
    <div class="w-1/3 h-full border-l border-r border-coffee-900">
      <NewManga />
    </div>
    <div class="w-1/3 h-full border-l border-coffee-900" :style="{paddingRight: '1px'}">
      <PlanToRead />
    </div>
  </div>
</template>

<script>
import NewChapters from "./NewChapters";
import NewManga from "./NewManga";
import PlanToRead from "./PlanToRead";

export default {
  components: {
    NewChapters,
    NewManga,
    PlanToRead,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.line-ratio {
  aspect-ratio: 4 / 1;
}

.cover-position {
  object-position: center 25%;
}
</style>