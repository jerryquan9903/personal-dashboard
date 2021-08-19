<template>
  <div class="p-4" v-if="gameDetails">
    <div v-show="loaded" class="flex flex-row items-start max-h-1/2">
      <img
        :src="gameDetails.image"
        class="w-96 h-128 object-cover rounded-lg border-4 border-black mr-4"
        @load="setLoaded(true)"
      />
      <div class="flex flex-col h-128">
        <div class="text-3xl font-medium mb-4">{{ gameDetails.name }}</div>
        <div class="pl-1 font-medium">Details</div>
        <div class="mb-4 mt-1 bg-bluegray-800 rounded-md px-3 pt-2 pb-1">
          <div
            class="info-grid text-sm"
            v-for="item in gameDetails.info"
            :key="item"
          >
            <div class="w-full font-light pb-1 pr-12">{{ item.label }}</div>
            <div class="w-full font-normal">{{ item.value }}</div>
          </div>
        </div>
        <div class="pl-1 font-medium">Description</div>
        <div
          class="
            text-sm
            font-light
            overflow-x-hidden overflow-y-scroll
            custom-scrollbar
            mt-1
            bg-bluegray-800
            rounded-md
            p-3
          "
          v-html="'<div>' + gameDetails.desc + '</div>'"
        ></div>
      </div>
    </div>
    <div v-show="!loaded">
      <div class="animate-pulse flex flex-row items-start">
        <div class="w-96 h-128 rounded-lg bg-bluegray-200 mr-4"></div>
        <div class="flex flex-col h-128 w-112">
          <div class="w-64 h-9 mb-4 bg-gray-200 rounded"></div>
          <div class="pl-1 w-20 h-6 font-medium bg-gray-200 rounded"></div>
          <div class="mb-4 mt-1 bg-bluegray-800 rounded-md px-3 pt-2 pb-1">
            <div
              class="info-grid w-full text-sm"
              v-for="num in skeleton"
              :key="num"
            >
              <div class="h-5 w-3/5 rounded mb-1 bg-bluegray-200"></div>
              <div class="h-5 w-2/5 rounded bg-bluegray-200"></div>
            </div>
          </div>
          <div class="pl-1 w-28 h-6 font-medium bg-gray-200 rounded"></div>
          <div
            class="
              text-sm
              font-light
              mt-1
              bg-bluegray-800
              rounded-md
              p-3
              flex-1
            "
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import parseGameInfo from "../../functions/parseGameInfo";
import api from "../../services/api";

export default {
  name: "game-details",
  props: ["id"],
  data() {
    return {
      gameDetails: null,
      loaded: false,
      skeleton: 5,
    };
  },
  methods: {
    setLoaded(value) {
      this.loaded = value;
    },
  },
  watch: {
    id: function () {
      if (this.id) {
        this.setLoaded(false);
        api
          .get(`/games/game-details?id=${this.id}`)
          .then((success) => {
            let rawDetails = { ...success.data };

            rawDetails.info = parseGameInfo(success.data.info);
            this.gameDetails = rawDetails;
          })
          .catch((e) => console.log(e));
      }
    },
  },
};
</script>

<style scoped>
.info-grid {
  display: grid;
  grid-template-columns: 40% 60%;
}
</style>