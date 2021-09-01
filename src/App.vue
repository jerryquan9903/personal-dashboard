<template>
  <div id="app-grid">
    <div id="grid-datetime" class="flex flex-row h-full"><Datetime /></div>
    <div id="grid-weather" class="flex flex-row h-full"><Weather /></div>
    <div id="grid-games" class="flex flex-col h-full"><Games /></div>
    <div id="grid-youtube" class="flex flex-col h-full"><YouTube /></div>
    <div id="grid-other"></div>
  </div>
</template>

<script>
import Games from "./components/games/Games";
import Datetime from "./components/datetime/Datetime";
import YouTube from "./components/youtube/YouTube";
import Weather from "./components/weather/Weather";

export default {
  name: "App",
  components: {
    Datetime,
    Games,
    YouTube,
    Weather
  },
};
</script>

<style>
#app {
  font-family: SF Pro Text, Roboto, Avenir, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  color: rgb(238, 238, 227);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#app-grid {
  display: grid;
  grid-template-areas:
    "datetime datetime weather other"
    "games youtube youtube other"
    "games youtube youtube other"
    "games another another other";
  grid-template-rows: 2fr 1fr 3fr 6fr;
  grid-template-columns: 8fr 5fr 3fr 8fr;
  gap: 1rem;
  padding: 1rem;
  min-height: 100vh;
  /* justify-items: stretch; */
}

#app-grid > #grid-datetime {
  grid-area: datetime;
}

#app-grid > #grid-games {
  grid-area: games;
}

#app-grid > #grid-youtube {
  grid-area: youtube;
}

#app-grid > #grid-weather {
  grid-area: weather;
}

</style>
