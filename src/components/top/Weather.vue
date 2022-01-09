<template>
  <div class="w-full h-full relative rounded">
    <div
      class="absolute card overflow-hidden p-2"
      :class="{
        'zoom-in-all': zoom,
        'zoom-out-all': !zoom,
        'outer-shadow': zoom,
        'z-200': popup === 'weather',
        'z-0': popup !== 'weather',
      }"
    >
      <transition name="fade-superfast">
        <div v-if="info" v-show="forecastDelay" class="absolute top-1/4 inset-x-0 bottom-0">
          <Forecast :hourly="info.hourly.slice(0, 24)" :daily="info.daily" />
        </div>
      </transition>
    </div>
    <div
      v-if="info"
      class="bg-cover bg-right outer-shadow absolute inset-0"
      :class="{
        'zoom-in-bg': zoom,
        'rounded-t': zoom,
        'zoom-out-bg': !zoom,
        rounded: !zoom,
        'cursor-pointer': !zoom,
        'z-200': popup === 'weather',
        'z-0': popup !== 'weather',
      }"
      :style="{ backgroundImage: 'url(' + image + ')' }"
      @click="zoomWeather(true)"
    >
      <div
        class="flex absolute inset-0 flex-row w-full h-full bg-mask-light overflow-hidden"
        :class="zoom ? 'rounded-t' : 'rounded'"
      >
        <div class="flex flex-col flex-1 h-full p-2 text-shadow text-sm font-medium">
          <div>{{ info.city + ", " + info.country }}</div>
          <h3 class="flex flex-1 items-center text-5xl font-bold">{{ info.now.temp.toFixed(0) + "°C" }}</h3>
          <div class="text-xs font-normal">{{ info.now.desc }}</div>
        </div>
        <transition name="fade-superfast">
          <div v-show="zoomDelay" class="p-2 text-shadow text-sm flex flex-col items-end font-light">
            <div class="text-2xl font-bold flex-1">
              {{ info.today.temp.max.toFixed(0) + "°C / " + info.today.temp.min.toFixed(0) + "°C" }}
            </div>
            <div>
              feels like <span class="font-medium">{{ info.now.feelsLike.toFixed(0) }}°C</span>
            </div>
            <div>
              humidity <span class="font-medium">{{ info.now.humidity }}%</span>
            </div>
            <div>
              uv index <span class="font-medium">{{ info.now.uvIndex }}</span>
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
  computed: {
    popup() {
      return this.$store.state.popup;
    },
  },
  data() {
    return {
      geolocation: null,
      info: null,
      image: null,
      updateInterval: null,
      zoom: false,
      zoomDelay: false, // delay for today's weather to the right
      forecastDelay: false, // delay animation for forecast
    };
  },
  methods: {
    getWeather() {
      api
        .get(`/weather?lat=21.0628483&lon=105.8272195`)
        .then((success) => {
          this.info = {
            city: success.data.city,
            country: success.data.country,
            now: success.data.current,
            today: success.data.daily[0],
            hourly: success.data.hourly.slice(1),
            daily: success.data.daily.slice(1),
          };
          this.getWeatherImage();
        })
        .catch((e) => console.log(e));
    },
    getWeatherImage() {
      let commonUrl = process.env.BASE_URL + "weather/banners/";
      let imageName = "";
      let weatherNow = this.info.now;
      let switchId = weatherNow.condId.toString()[0];

      switch (switchId) {
        case "2":
          imageName += weatherNow.descMain.toLowerCase();
          break;
        case "3": // drizzle uses rain image
          imageName += "rain_" + this.getDayNight();
          break;
        case "5":
        case "6":
          imageName += weatherNow.descMain.toLowerCase() + "_" + this.getDayNight();
          break;
        case "7": // will be updated later
          imageName += "fog";
          break;
        case "8":
          if (weatherNow.condId === 800) imageName += "clear_" + this.getDayNight();
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
      if (value) {
        this.$store.commit("showPopup", "weather");
        this.zoom = value;

        // delay appearance of today details, avoiding wrapping text
        setTimeout(() => (this.zoomDelay = value), 100);

        // delay appearance of forecast until completely opened, avoiding animation lag
        setTimeout(() => (this.forecastDelay = value), 250);
      } else {
        this.forecastDelay = value;

        // delay closing until forecast fades out, avoiding animation lag
        setTimeout(() => {
          this.zoom = value;
          this.zoomDelay = value;
        }, 150);

        // change z-index back to 0 after closing popup
        setTimeout(() => this.$store.commit("showPopup", ""), 350);
      }
    },
  },
  beforeMount: async function () {
    // const location = await this.getLocation();
    // this.geolocation = {
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    // };
    this.getWeather();
    this.updateInterval = setInterval(this.getWeather, 900000);
  },
  beforeUnmount() {
    clearInterval(this.updateInterval);
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


