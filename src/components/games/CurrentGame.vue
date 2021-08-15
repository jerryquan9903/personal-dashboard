<template>
  <div class="">
    <div class="font-bold text-xl w-full text-left py-2 px-3">
      Currently playing
    </div>
    <div
      class="
        flex flex-col
        bg-gradient-to-tr
        from-violet-400
        to-pink-500
        p-4
        rounded-b-md
      "
    >
      <div class="flex flex-row justify-center items-start">
        <div class="w-40 mr-4">
          <img :src="art" class="rounded-lg border-4 border-black" />
        </div>
        <div class="flex flex-col justify-start items-start text-white">
          <div class="font-medium text-xl mb-2">{{ data.name }}</div>
          <div
            class="grid grid-cols-2 gap-2 text-sm font-light w-full"
            v-for="item in data.info"
            :key="item"
          >
            <div class="w-32 mb-1 font-light">{{ item.id }}</div>
            <div class="font-normal">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tempGame from "../../assets/temp-game.jpg";

let info = [
  { id: "Time played", value: "24h 0m" },
  { id: "Last played", value: "Yesterday" },
  { id: "Developer", value: "Nihon Falcom" },
  { id: "Genre", value: "JRPG" },
];

let gameData = {
  name: "Tokyo Xanadu eX+",
  info: info,
};

export default {
  name: 'current-game',
  data() {
    return {
      art: tempGame,
      data: gameData,
    };
  },
};
</script>

<style>
</style>