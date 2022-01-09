<template>
  <div id="app-grid">
    <div id="grid-datetime" class="flex flex-row"><Datetime /></div>
    <!-- <div id="grid-today" class="flex flex-col h-full"><OnThisDay /></div> -->
    <div id="grid-weather" class=""><Weather /></div>
    <!-- <div id="grid-covid" class="flex flex-row h-full"><Covid /></div> -->
    <!-- <div id="grid-cats" class="flex flex-row h-full"><Cats /></div> -->    
    <div id="grid-games" class=""><Games /></div>
    <div id="grid-media" class=""><SocialMedia /></div>
    <div id="grid-manga" class=""><Manga /></div>
  </div>
</template>

<script>
import Games from "./components/games/Games";
import Datetime from "./components/top/Datetime";
import SocialMedia from "./components/media/SocialMedia";
import Weather from "./components/top/Weather";
// import Covid from "./components/top/Covid";
// import Cats from "./components/top/Cats";
import Manga from "./components/manga/Manga";
// import OnThisDay from "./components/top/OnThisDay";

export default {
  name: "App",
  components: {
    Datetime,
    Games,
    SocialMedia,
    Weather,
    // Covid,
    Manga,
    // OnThisDay
  },
};
</script>

<style>
#app {
  font-family: Roboto Slab, SF Pro Text, Roboto, Avenir, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  /* color: #efebce; */
  /* background: #0d0907; */
  color: #EEE0CB;
  background: #141414
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
    "datetime datetime weather covid today"
    "games media manga manga manga"
    "games media  other other other";
  grid-template-rows: 2fr 5fr 5fr;
  grid-template-columns: 6fr 8fr 3fr 2fr 5fr;
  gap: 1rem;
  padding: 1rem;
  height: 100vh;
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

#app-grid > #grid-today {
  grid-area: today;
}

#app-grid > #grid-manga {
  grid-area: manga;  
}

#app-grid > #grid-other {
  grid-area: other;
}
</style>
