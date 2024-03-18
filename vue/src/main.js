import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import jpMessage from './lang/jp.json'
import 'flowbite'
import 'bootstrap/dist/css/bootstrap.css'
import '../public/css/all.css'
import '../public/css/custom.min.css'
import '../public/css/style.css'
import '../public/css/themes.css'
import VueCookies from 'vue-cookies'
import Datepicker from "@/components/Datepicker.vue"

import { plugin, defaultConfig } from '@formkit/vue'
import { en, ja } from '@formkit/i18n'
// Lib Icon
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
library.add(faUserSecret)



createApp(App)
    .component('Datepicker', Datepicker)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(VueCookies, { expire: '7d' })
    .use(store)
    .use(router)
    .use(
        plugin,
        defaultConfig({
            // Define additional locales
            locales: { en, ja },
            // Define the active locale
            locale: 'ja',
            jpMessage
        })
    )
    .mount('#app')
