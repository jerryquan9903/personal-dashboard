<template>
  <div class="w-full h-full p-2 rounded bg-background outer-shadow overflow-hidden">ALO</div>
</template>

<script>
import api from "../../services/api";
export default {
  data() {
    return {
      geolocation: null,
    };
  },
  methods: {
    getWeather() {
      api
        .get(`/weather/get-weather?lat=${this.geolocation.latitude}&lon=${this.geolocation.longitude}`)
        .then((success) => {
          console.log(success.data);
        })
        .catch((e) => console.log(e));
    },
    getLocation() {
      return new Promise((success) => navigator.geolocation.getCurrentPosition(success));
    },
  },
  beforeMount: async function() {
    const location = await this.getLocation();
    this.geolocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    this.getWeather();
  },
};
</script>

<style>
</style>