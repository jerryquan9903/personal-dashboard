<template>
  <div class="w-full h-full relative rounded">
    <div
      class="absolute bg-background rounded overflow-hidden z-100 p-2"
      :class="zoom ? 'zoom-in-all outer-shadow' : 'zoom-out-all'"
    >
      <transition name="fade-superfast">
        <div v-if="now" v-show="forecastDelay" class="absolute top-1/4 inset-x-0 bottom-0">
          <Forecast :hourly="hourly.slice(0, 24)" :daily="daily" />
        </div>
      </transition>
    </div>
    <div
      v-if="now"
      class="bg-cover bg-right outer-shadow cursor-pointer absolute inset-0 z-100"
      :class="zoom ? 'rounded-t zoom-in-bg' : 'rounded zoom-out-bg'"
      :style="{ backgroundImage: 'url(' + image + ')' }"
      @click="zoomWeather(true)"
    >
      <div
        class="flex absolute inset-0 flex-row w-full h-full rounded bg-gradient overflow-hidden"
        :class="zoom ? 'zoom-in-children' : 'zoom-out-children'"
      >
        <div class="flex flex-col flex-1 h-full p-2 text-shadow text-sm font-medium">
          <div>{{ city + ", " + country }}</div>
          <h3 class="flex flex-1 items-center text-5xl font-bold">{{ now.temp.toFixed(0) + "°C" }}</h3>
          <div class="text-xs font-normal">{{ now.desc.replace("with", "w/") }}</div>
        </div>
        <transition name="fade-superfast">
          <div v-show="zoomDelay" class="p-2 text-shadow text-sm flex flex-col items-end font-light">
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
      <div v-show="zoom" class="fixed z-90 top-0 left-0 w-screen h-screen bg-dark" @click="zoomWeather(false)" />
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
      daily: null,
      image: null,
      weatherInterval: null,
      zoom: false,
      zoomDelay: false, // delay for today's weather to the right
      forecastDelay: false, // delay animation for forecast
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
          this.hourly = success.data.hourly.slice(1);
          this.daily = success.data.daily.slice(1);
          this.getWeatherImage();
        })
        .catch((e) => console.log(e));
    },
    getWeatherImage() {
      let commonUrl = process.env.BASE_URL + "weather/banners/";
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
      // delay a bit so that text does not appear wrapped
      if (value) {
        this.zoom = value;
        setTimeout(() => (this.zoomDelay = value), 100);
        setTimeout(() => (this.forecastDelay = value), 250);
      } else {
        this.forecastDelay = value;
        setTimeout(() => (this.zoom = value), 150);
        setTimeout(() => (this.zoomDelay = value), 150);
      }
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
.zoom-in-all {
  transition-duration: 0.25s;
  transition-property: width, height;
  transition-timing-function: ease-in-out;
  width: 300%;
  height: 400%;
}

.zoom-out-all {
  transition-duration: 0.25s;
  transition-property: width, height;
  transition-timing-function: ease-in-out;
  width: 100%;
  height: 100%;
}

.zoom-in-bg {
  border-radius: 0.25rem 0.25rem 0 0;
  transition-duration: 0.25s;
  transition-property: width, border-radius;
  transition-timing-function: ease-in-out;
  width: 300%;
}

.zoom-out-bg {
  border-radius: 0.25rem;
  transition-duration: 0.25s;
  transition-property: width, border-radius;
  transition-timing-function: ease-in-out;
  width: 100%;
}

.fade-superfast-enter-active,
.fade-superfast-leave-active {
  transition: opacity 0.15s ease;
  transform: translateZ(0);
}

.fade-superfast-enter-from,
.fade-superfast-leave-to {
  opacity: 0;
}

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.25s ease;
  transform: translateZ(0);
}

.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}
</style>


