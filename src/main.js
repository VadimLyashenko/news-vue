import { createApp } from 'vue'
import VueSnip from 'vue-snip'
import store from './store'

import App from './App.vue'
import router from './router'

import './assets/scss/style.scss'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueSnip)
app.mount('#app')
