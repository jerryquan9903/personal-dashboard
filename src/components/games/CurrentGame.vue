<template>
  <div class="w-full">
    <div class="font-bold text-xl w-full text-left py-2 px-3">
      Currently playing
    </div>
    <div
      class="
        flex flex-col
        bg-gradient-to-tr
        from-cyan-800
        to-sky-900
        p-4
        rounded-b-md
        w-full
      "
    >
      <div v-show="loaded" class="flex flex-row justify-start items-start">
        <div
          class="
            mr-4
            transition
            duration-250
            ease-in-out
            transform
            hover:scale-105
            hover:shadow-md
            cursor-pointer
          "
          @click="getGameInfoFull()"
        >
          <img
            :src="image"
            class="w-48 h-64 object-cover rounded-lg border-4 border-black"
            @load="setLoaded()"
          />
        </div>
        <div class="flex flex-col justify-start items-start mt-1">
          <div class="font-medium text-xl mb-2">{{ name }}</div>
          <div
            class="grid grid-cols-2 gap-2 text-sm font-light w-full"
            v-for="item in data"
            :key="item"
          >
            <div class="w-full mb-1 font-light pr-12">{{ item.label }}</div>
            <div class="w-full font-normal">{{ item.value }}</div>
          </div>
        </div>
      </div>

      <!--Skeleton-->
      <div v-show="!loaded">
        <div class="animate-pulse flex flex-row justify-start items-start">
          <div class="rounded-lg w-48 h-64 bg-bluegray-200 mr-4"></div>
          <div class="flex flex-col mt-2">
            <div class="h-5 w-28 mb-4 rounded bg-bluegray-200"></div>
            <div
              class="grid grid-cols-2 gap-2"
              v-for="num in skeleton"
              :key="num"
            >
              <div class="h-4 rounded w-20 pr-8 mb-2 bg-bluegray-200"></div>
              <div class="h-4 rounded w-28 bg-bluegray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import parseGameInfo from "../../functions/parseGameInfo";

export default {
  name: "current-game",
  data() {
    return {
      loaded: false,
      skeleton: 5,
      name: null,
      image: null,
      data: null,
      id: null,
    };
  },
  emits: ["details"],
  methods: {
    setLoaded() {
      this.loaded = true;
    },

    getGameInfoFull() {
      this.$emit("details", [this.id, true]);
    },

    // get last played game's info
    getGameInfo() {
      api
        .get("games/last-played")
        .then((success) => {
          // set info to data()
          this.name = success.data.name;
          this.image = success.data.image;
          this.data = parseGameInfo(success.data.info);
          this.id = success.data.id;
        })
        .catch((e) => {
          console.log(e);
        });
    },    
  },

  beforeMount() {
    this.getGameInfo();
    setInterval(this.getGameInfo, 600000);
  },

  beforeUnmount() {
    clearInterval(this.getGameInfo);
  },
};
</script>