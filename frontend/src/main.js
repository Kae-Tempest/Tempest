import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory} from 'vue-router';

import Reports from './Pages/Reports.vue';
import SensorDetails from './Pages/SensorDetails.vue';
import Login from './Pages/Login.vue';
import Signup from './Pages/Signup.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Reports', component: Reports},
        {path: '/SensorDetails/:id', name: 'SensorDetails', component: SensorDetails},
        {path: '/Login', name: 'Login', component: Login},
        {path: '/Signup', name: 'Signup', component: Signup},
    ]
})



createApp(App).use(router).mount('#app')
