import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './assets/global.css'
// import router from './router'
import store from './store'

const app = createApp(App);

app.use(store).mount('#app')
