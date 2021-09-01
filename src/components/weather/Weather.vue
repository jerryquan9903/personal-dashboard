<template>
  <div class="w-full h-full p-2 rounded bg-background outer-shadow overflow-hidden">ALO</div>
</template>

<script>
export default {
  data() {
    return {
      geolocation: null,
    };
  },
  methods: {
    getWeather() {
      
    },
    getLocation() {
      let location = navigator.geolocation.getCurrentPosition((position) => {
        return {
          latitude: position.coords.latitude,
          longtitude: position.coords.longitude,
        };
      });

      return location;
    },
  },
  beforeMount() {
    this.geolocation = this.getLocation();
  },
};
</script>

<style>
</style>