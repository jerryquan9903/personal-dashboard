import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './assets/global.css'
// import router from './router'
import store from './store'
import clickOutside from './functions/clickOutside'

const app = createApp(App);



app.use(store).directive("click-outside", clickOutside).mount('#app')
