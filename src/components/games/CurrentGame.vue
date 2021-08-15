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
      <div class="flex flex-col justify-center items-start w-96">
        <div class="">
          <img :src="image" class="rounded-lg border-4 border-black" />
        </div>
        <div class="flex flex-col justify-start items-start mt-2">
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
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import api from "../../services/api";

export default {
  name: "current-game",

  data() {
    return {
      name: null,
      image: null,
      data: null,
      id: null,
    };
  },

  methods: {
    // get last played game's info
    getCurrentGameInfo() {
      api
        .get("http://127.0.0.1:5000/steam/last-played")
        .then((success) => {
          // set info to data()
          this.name = success.data.name;
          this.image = success.data.image;
          this.data = this.parseGameInfo(success.data.info);
          this.id = success.data.id;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    parseGameInfo(info) {
      let parsed = info.map((item) => {
        let result = item;

        if (Array.isArray(item.value)) {
          let string = "";
          item.value.forEach((val, index) => {
            if (index === item.value.length - 1) string += val;
            else string += val + ", ";
          });

          result.value = string;
        }

        if (item.label === "Release date") {
          result.value = dayjs(item.value).format("DD/MM/YYYY");
        }

        if (item.label === "Last played") {
          result.value = dayjs.unix(item.value).format("DD/MM/YYYY");
        }

        if (item.label === "Time played") {
          if (item.value >= 60)
            result.value =
              Math.floor(item.value / 60).toString() +
              "h " +
              (item.value % 60).toString() +
              "m";
          else result.value += " minutes";
        }

        return result;
      });


      return parsed;
    },
  },

  beforeMount() {
    this.getCurrentGameInfo();
    setInterval(this.getCurrentGameInfo, 300000);
  },

  beforeUnmount() {
    clearInterval(this.getCurrentGameInfo);
  }
};
</script>

<style>
</style>