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
  /* text-align: center; */
  color: #2c3e50;
  min-height: 100vh;
  background: rgb(167, 243, 208);
  background: rgb(167, 243, 208);
  background: linear-gradient(
    45deg,
    rgba(167, 243, 208, 1) 15%,
    rgba(125, 211, 252, 1) 100%
  );
  padding: 0;
  margin: 0;
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
    "top"
    "bottom"
    "bottom"
    "bottom"
    "bottom";
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#grid-welcome {
  grid-area: top;
}

#grid-games {
  grid-area: bottom;
}
</style>
