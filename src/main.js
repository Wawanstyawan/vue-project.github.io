// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

// Configure Axios globally
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.mount('#app')
