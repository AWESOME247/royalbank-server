// FILE: main.js

import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import router from './router/router'

// Import icon libraries
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'

// A few examples for animations from Animate.css:
// import '@quasar/extras/animate/fadeIn.css'
// import '@quasar/extras/animate/fadeOut.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";

const myApp = createApp(App)
const pinia = createPinia()

myApp.use(Quasar, {
  plugins: {
    Notify
  }, // import Quasar plugins and add here
  config: {
    notify: { /* look at QuasarConfOptions from the API card */ }
  }
})

//Use Pinia State Management
myApp.use(pinia)

//Apex line chart
myApp.use(VueApexCharts)

//Use Vue Router
myApp.use(router)

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
