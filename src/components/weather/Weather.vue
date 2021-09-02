<template>
  <div class="w-full h-full rounded bg-background outer-shadow overflow-hidden">
    <div v-if="image" class="w-full h-full bg-cover bg-center" :style="{ backgroundImage: 'url(' + image + ')' }">
      <div class="flex flex-col h-full p-2 bg-gradient">
        <div class="text-sm font-medium">{{ city + ", " + country }}</div>
        <div class="text-5xl font-bold flex-1 flex items-center">{{ today.temp.toFixed(0) + "°C" }}</div>
        <div class="text-sm font-medium">{{ today.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import api from "../../services/api";

export default {
  data() {
    return {
      geolocation: null,
      city: null,
      country: null,
      today: null,
      forecast: null,
      image: null,
    };
  },
  methods: {
    getWeather() {
      api
        .get(`/weather/get-weather?lat=${this.geolocation.latitude}&lon=${this.geolocation.longitude}`)
        .then((success) => {
          this.city = success.data.city;
          this.country = success.data.country;
          this.today = success.data.current;
          this.forecast = success.data.forecast;
          this.getWeatherImage("square");
        })
        .catch((e) => console.log(e));
    },
    getWeatherImage(size) {
      let commonUrl = process.env.BASE_URL + "weather/" + size + "/";
      let imageName = "";
      let switchId = this.today.cond_id.toString()[0];

      switch (switchId) {
        case "2":
          imageName += this.today.desc_main.toLowerCase();
          break;
        case "3":
          imageName += "rain_" + this.getDayNight();
          break;
        case "5":
          imageName += this.today.desc_main.toLowerCase() + "_" + this.getDayNight();
          break;
        case "7":
          imageName += "fog";
          break;
        case "8":
          if (this.today.cond_id === 800) imageName += "clear_" + this.getDayNight();
          else imageName += "clouds_" + this.getDayNight();
          break;
        default:
          imageName += "clear_" + this.getDayNight();
          break;
      }

      imageName += ".jpg";
      this.image = commonUrl += imageName;
    },
    getDayNight() {
      let hour = dayjs().hour();
      if (hour > 5 && hour < 18) return "day";
      else return "night";
    },
    getLocation() {
      return new Promise((success) => navigator.geolocation.getCurrentPosition(success));
    },
  },
  beforeMount: async function () {
    const location = await this.getLocation();
    this.geolocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    this.getWeather();
  },
};
</script>

<style scoped>
.bg-gradient {
  background: #00000044;
}
</style>