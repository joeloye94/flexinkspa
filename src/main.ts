import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// alpha version bootstrap 3
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App).use(store).use(router).use(BootstrapVue3).use(VueAxios,axios).mount('#app')
