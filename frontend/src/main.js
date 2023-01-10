import './style.css';
import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { createRouter, createWebHistory} from 'vue-router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import Login from './Pages/Login.vue';
import Signup from './Pages/Signup.vue';
import Reports from './Pages/Reports.vue';
import SensorDetails from './Pages/SensorDetails.vue';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Reports', component: Reports},
        {path: '/SensorDetails/:id', name: 'SensorDetails', component: SensorDetails},
        {path: '/login', name: 'Login', component: Login},
        {path: '/signup', name: 'Signup', component: Signup},
    ]
})

createApp(App).use(router).use(pinia).mount('#app')
