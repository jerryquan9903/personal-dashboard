<template>
  <div id="app-grid" class="p-2">
    <div id="grid-welcome" class="h-full">
      <Welcome />
    </div>
    <div id="grid-games" class="h-full"><Games /></div>
  </div>
</template>

<script>
import Games from "./components/games/Games.vue";
import Welcome from "./components/welcome/Welcome.vue";

export default {
  name: "App",
  components: {
    Welcome,
    Games,
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
  min-height: 100vh;
  padding: 0;
  margin: 0;
  background-color: #1f2937;
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
  min-height: 100vh;
  grid-template-areas:
    "top top"
    "bottom other"
    "bottom other"
    "bottom other"
    "bottom other";
  grid-template-rows: 20% 20% 20% 20% 20%;
  grid-template-columns: 50% 50%;
}

#grid-welcome {
  grid-area: top;
}

#grid-games {
  grid-area: bottom;
}
</style>
