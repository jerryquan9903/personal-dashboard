<template>
  <div id="app-grid">
    <div id="grid-welcome" class="flex flex-row h-full"><Welcome /></div>
    <div id="grid-games" class="flex flex-col h-full"><Games /></div>
    <div id="grid-youtube" class="flex flex-col h-full"><YouTube /></div>
    <div id="grid-other"></div>
  </div>
</template>

<script>
import Games from "./components/games/Games";
import Welcome from "./components/welcome/Welcome";
import YouTube from "./components/youtube/YouTube";

export default {
  name: "App",
  components: {
    Welcome,
    Games,
    YouTube,
  },
};
</script>

<style>
#app {
  font-family: Roboto, Avenir, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  color: #ffe;
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
    "welcome welcome other"
    "games youtube other"
    "games youtube other"
    "games another other"
    "games another other";
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  height: 100vh;
  justify-items: stretch;
}

#app-grid > #grid-welcome {
  grid-area: welcome;
}

#app-grid > #grid-games {
  grid-area: games;
}

#app-grid > #grid-youtube {
  grid-area: youtube;
}

#app-grid > #grid-other {
  grid-area: other;
}
</style>
