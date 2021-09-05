<template>
  <div id="app-grid">
    <div id="grid-datetime" class="flex flex-row h-full"><Datetime /></div>
    <div id="grid-weather" class="flex flex-row h-full"><Weather /></div>
    <div id="grid-covid" class="flex flex-row h-full"><Covid /></div>
    <div id="grid-cats" class="flex flex-row h-full"><Cats /></div>
    <div id="grid-games" class="flex flex-col h-full"><Games /></div>
    <div id="grid-media" class="flex flex-col h-full"><SocialMedia /></div>
  </div>
</template>

<script>
import Games from "./components/games/Games";
import Datetime from "./components/top/Datetime";
import SocialMedia from "./components/media/SocialMedia";
import Weather from "./components/top/Weather";
import Covid from "./components/top/Covid";
import Cats from "./components/top/Cats";

export default {
  name: "App",
  components: {
    Datetime,
    Games,
    SocialMedia,
    Weather,
    Covid,
    Cats
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
  color:  #f3f3e4;
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
    "datetime datetime datetime weather covid cats"
    "games media media other other other"
    "games media media other other other";
  grid-template-rows: 2fr 6fr 4fr;
  grid-template-columns: 6fr 6fr 2fr 3fr 3fr 4fr;
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

#app-grid > #grid-media {
  grid-area: media;
}

#app-grid > #grid-weather {
  grid-area: weather;
}

#app-grid > #grid-covid {
  grid-area: covid;
}

#app-grid > #grid-cats {
  grid-area: cats;
}

</style>
