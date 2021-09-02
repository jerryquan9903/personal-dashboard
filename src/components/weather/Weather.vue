<template>
  <div class="w-full h-full relative">
    <div
      class="absolute bg-background outer-shadow overflow-hidden z-overlay p-2"
      :class="zoom ? 'rounded-b left-0 zoom-in-all' : 'rounded inset-0 zoom-out-all'"
    >
    <transition name="fade-fast">
      <div v-if="now" v-show="zoom">
        <Forecast :hourly="hourly.slice(0, 24)" :daily="daily" />
      </div>
      </transition>
    </div>
    <div
      v-if="now"
      class="bg-cover bg-right cursor-pointer absolute top-0 left-0 bottom-0 z-overlay"
      :class="zoom ? 'rounded-t zoom-in-bg' : 'rounded zoom-out-bg'"
      :style="{ backgroundImage: 'url(' + image + ')' }"
      @click="zoomWeather(true)"
    >
      <div class="flex flex-row w-full h-full rounded bg-gradient overflow-hidden">
        <div class="flex flex-col flex-1 h-full p-2 weather-text text-sm font-medium">
          <div>{{ city + ", " + country }}</div>
          <div class="flex flex-1 items-center text-5xl font-bold">{{ now.temp.toFixed(0) + "°C" }}</div>
          <div>{{ now.desc }}</div>
        </div>
        <transition name="fade-delay">
          <div v-show="zoomDelay" class="p-2 weather-text text-sm flex flex-col items-end font-light">
            <div class="text-2xl font-bold flex-1">
              {{ today.temp.max.toFixed(0) + "°C / " + today.temp.min.toFixed(0) + "°C" }}
            </div>
            <div>
              feels like <span class="font-medium">{{ now.feelsLike.toFixed(0) }}°C</span>
            </div>
            <div>
              humidity <span class="font-medium">{{ now.humidity }}%</span>
            </div>
            <div>
              uv index <span class="font-medium">{{ now.uvIndex }}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fade-fast">
      <div v-show="zoom" class="fixed z-60 top-0 left-0 w-screen h-screen bg-dark" @click="zoomWeather(false)" />
    </transition>
  </div>
</template>

<script>
import dayjs from "dayjs";
import api from "../../services/api";
import Forecast from "./Forecast";

export default {
  components: {
    Forecast,
  },
  data() {
    return {
      geolocation: null,
      city: null,
      country: null,
      now: null,
      today: null,
      hourly: null,
      daily: null,
      image: null,
      weatherInterval: null,
      zoom: false,
      zoomDelay: false,
    };
  },
  methods: {
    getWeather() {
      api
        .get(`/weather/get-weather?lat=${this.geolocation.latitude}&lon=${this.geolocation.longitude}`)
        .then((success) => {
          this.city = success.data.city;
          this.country = success.data.country;
          this.now = success.data.current;
          this.today = success.data.daily[0];
          this.hourly = success.data.hourly;
          this.daily = success.data.daily.slice(1);
          this.getWeatherImage();
        })
        .catch((e) => console.log(e));
    },
    getWeatherImage() {
      let commonUrl = process.env.BASE_URL + "weather/";
      let imageName = "";
      let switchId = this.now.condId.toString()[0];

      switch (switchId) {
        case "2":
          imageName += this.now.descMain.toLowerCase();
          break;

        // drizzle uses rain image
        case "3":
          imageName += "rain_" + this.getDayNight();
          break;
        case "5":
        case "6":
          imageName += this.now.descMain.toLowerCase() + "_" + this.getDayNight();
          break;

        // will be updated later
        case "7":
          imageName += "fog";
          break;
        case "8":
          if (this.now.condId === 800) imageName += "clear_" + this.getDayNight();
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
    zoomWeather(value) {
      this.zoom = value;

      // delay a bit so that text does not appear wrapped
      if (value) setTimeout(() => (this.zoomDelay = value), 100);
      else this.zoomDelay = value;
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
  bottom: -20rem;
  top: 100%;
  transition-duration: 0.25s;
  transition-property: right, bottom, top;
  transition-timing-function: ease-in-out;
}

.zoom-out-all {
  right: 0;
  bottom: 0;
  top: 0;
  transition-duration: 0.25s;
  transition-property: right, bottom, top;
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

.fade-delay-enter-active,
.fade-delay-leave-active {
  transition: opacity 0.15s ease;
}

.fade-delay-enter-from,
.fade-delay-leave-to {
  opacity: 0;
}
</style>


