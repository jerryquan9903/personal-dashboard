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
      <div v-if="name" class="flex flex-row justify-start items-start">
        <div class="mr-4">
          <img :src="image" class="w-40 rounded-lg border-4 border-black" />
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

      <!--Skeleton-->
      <div v-else>
        <div class="animate-pulse flex flex-row justify-start items-start">
          <div class="rounded-lg w-40 h-60 bg-gray-200 mr-4"></div>
          <div class="flex flex-col mt-2">
            <div class="h-5 w-28 mb-4 rounded bg-gray-200"></div>
            <div
              class="grid grid-cols-2 gap-2"
              v-for="num in skeleton"
              :key="num"
            >
              <div class="h-4 rounded w-20 pr-8 mb-2 bg-gray-200"></div>
              <div class="h-4 rounded w-28 bg-gray-200"></div>
            </div>
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
      skeleton: 3,
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
        .get("games/last-played")
        .then((success) => {
        
          // set info to data()
          this.name = success.data.name;
          this.image = success.data.image;
          this.data = this.parseGameInfo(success.data.info);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // parse array returned from backend into displayable text
    parseGameInfo(info) {
      let parsed = info.map((item) => {
        let result = item;

        // if the value is an array, convert it into a string
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

        // calculate last played value
        if (item.label === "Last played") {
          let lastPlayed = dayjs.unix(item.value);

          // set 01/01 of last year as reference point (so that the comparison always works)
          let lastYear = dayjs(
            (parseInt(dayjs().format("YYYY")) - 1).toString() + "/01/01"
          );

          // calculate the difference between now and last played
          let diff =
            dayjs().diff(lastYear, "day") - lastPlayed.diff(lastYear, "day");

          // return values
          if (diff == 0) result.value = "Today";
          else if (diff == 1) result.value = "Yesterday";
          else result.value = dayjs.unix(item.value).format("DD/MM/YYYY");
        }

        // calculate total time played
        if (item.label === "Time played") {
          if (item.value >= 3600)
            result.value =
              Math.floor(item.value / 3600).toString() +
              "h " +
              (Math.floor(item.value / 60) % 60).toString() +
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
    setInterval(this.getCurrentGameInfo, 600000);
  },

  beforeUnmount() {
    clearInterval(this.getCurrentGameInfo);
  },
};
</script>