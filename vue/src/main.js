import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import 'flowbite'
import VueCookies from 'vue-cookies'



createApp(App)
    .use(VueCookies, { expire: '7d' })
    .use(store)
    .use(router)
    .mount('#app')
