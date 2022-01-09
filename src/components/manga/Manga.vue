<template>
  <div class="w-full h-full grid grid-cols-5 gap-4 outer-shadow">
    <NewChapters />
    <!--     <div class="w-1/3 h-full border-l border-r border-coffee-900">
      <NewManga />
    </div>
    <div class="w-1/3 h-full border-l border-coffee-900" :style="{paddingRight: '1px'}">
      <PlanToRead />
    </div> -->
  </div>
</template>

<script>
// import api from "../../services/api";
import NewChapters from "./NewChapters";
// import NewManga from "./NewManga";
// import PlanToRead from "./PlanToRead";

export default {
  components: {
    NewChapters,
    // NewManga,
    // PlanToRead,
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