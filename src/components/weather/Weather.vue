<template>
  <div class="w-full h-full relative">
    <div
      class="absolute rounded-b bg-background outer-shadow overflow-hidden z-overlay p-2"
      :class="zoom ? 'top-full left-0 zoom-in-all' : 'inset-0 zoom-out-all'"
    ></div>
    <div
      v-if="today"
      class="bg-cover bg-right cursor-pointer absolute top-0 left-0 bottom-0 z-overlay"
      :class="zoom ? 'rounded-t zoom-in-bg' : 'rounded zoom-out-bg'"
      :style="{ backgroundImage: 'url(' + image + ')' }"
      @click="zoom = true"
    >
      <div class="flex flex-row w-full h-full bg-gradient">
        <div class="flex flex-col flex-1 h-full p-2 weather-text text-sm font-medium">
          <div>{{ city + ", " + country }}</div>
          <div class="flex flex-1 items-center text-5xl font-bold">{{ today.temp.toFixed(0) + "°C" }}</div>
          <div>{{ today.desc }}</div>
        </div>
        <transition name="fade-fast">
          <div v-show="zoom" class="p-2 weather-text text-sm">
            <div>ALO</div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fade-fast">
      <div v-show="zoom" class="fixed z-100 top-0 left-0 w-screen h-screen bg-dark" @click="zoom = false" />
    </transition>
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
      weatherInterval: null,
      zoom: false,
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
          this.getWeatherImage();
        })
        .catch((e) => console.log(e));
    },
    getWeatherImage() {
      let commonUrl = process.env.BASE_URL + "weather/";
      let imageName = "";
      let switchId = this.today.condId.toString()[0];

      switch (switchId) {
        case "2":
          imageName += this.today.descMain.toLowerCase();
          break;
        case "3":
          imageName += "rain_" + this.getDayNight();
          break;
        case "5":
        case "6":
          imageName += this.today.descMain.toLowerCase() + "_" + this.getDayNight();
          break;
        case "7":
          imageName += "fog";
          break;
        case "8":
          if (this.today.condId === 800) imageName += "clear_" + this.getDayNight();
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
    this.weatherInterval = setInterval(this.getWeather, 900000);
  },
  beforeUnmount() {
    clearInterval(this.weatherInterval);
  },
};
</script>

<style scoped>
.bg-gradient {
  background: #00000022;
}

.weather-text {
  text-shadow: 0px 1px 2px #222;
}

.zoom-in-all {
  right: -24rem;
  bottom: -16rem;
  transition-duration: 0.25s;
  transition-property: right, bottom;
  transition-timing-function: ease-in-out;
}

.zoom-out-all {
  right: 0;
  bottom: 0;
  transition-duration: 0.25s;
  transition-property: right, bottom;
  transition-timing-function: ease-in-out;
}

.zoom-in-bg {
  right: -24rem;
  border-radius: 0.25rem 0.25rem 0 0;
  transition-duration: 0.25s;
  transition-property: right, border-radius;
  transition-timing-function: ease-in-out;
}

.zoom-out-bg {
  right: 0;
  border-radius: 0.25rem;
  transition-duration: 0.25s;
  transition-property: right, border-radius;
  transition-timing-function: ease-in-out;
}
</style>


