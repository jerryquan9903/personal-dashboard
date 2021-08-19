<template>
  <div class="p-4">
    <div v-if="gameDetails">
      <div v-show="loaded" class="flex flex-row items-start max-h-1/2">
        <img
          :src="gameDetails.image"
          class="w-96 h-128 object-cover rounded-lg border-4 border-black"
          @load="setLoaded(true)"
        />
        <div class="flex flex-col ml-4 h-128">
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
              hover:pr-2
            "
            v-html="'<div>' + gameDetails.desc + '</div>'"
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