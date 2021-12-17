<template>
  <div class="card shadow-sm" :class="loaded ? 'p-4' : 'p-0'" v-if="gameDetails">
    <div v-show="loaded" class="flex flex-row items-start max-h-1/2">
      <img
        :src="gameDetails.image"
        class="w-96 h-128 object-cover rounded outer-shadow mr-4 bg-mask-light img-dark"
        @load="setLoaded(true)"
      />
      <div class="flex flex-col h-128">
        <div class="text-2xl font-medium mb-4">{{ gameDetails.name }}</div>
        <div class="pl-1 font-medium">Details</div>
        <div class="mb-4 mt-1 bg-matteblack-900 rounded px-3 pt-2 pb-1">
          <div class="info-grid text-sm" v-for="item in gameDetails.data" :key="item">
            <div class="w-full font-light pb-1">{{ item.label }}</div>
            <div class="w-full font-normal pb-1">{{ item.value }}</div>
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
            bg-matteblack-900
            rounded
            p-3
            leading-6
          "
          v-html="'<div>' + gameDetails.desc + '</div>'"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import parseGameInfo from "../../services/parseGameInfo";
import api from "../../services/api";

export default {
  name: "game-details",
  props: ["id"],
  data() {
    return {
      gameDetails: {
        id: "",
        name: "",
        image: "",
        desc: "",
        data: [],
      },
      loaded: false,
      skeleton: 6,
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
          .get(`/games/details?id=${this.id}`)
          .then((success) => {
            this.gameDetails = parseGameInfo(success.data);
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
  grid-template-columns: 25% 75%;
}

.img-dark {
  filter: brightness(75%)
}
</style>