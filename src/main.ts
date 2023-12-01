import './assets/main.css'
import 'primevue/resources/themes/lara-light-green/theme.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue)
app.mount('#app')
