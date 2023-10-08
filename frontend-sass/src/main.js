import './style.scss';
import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { createRouter, createWebHistory} from 'vue-router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Reports', component: () => import('./Pages/Reports.vue')},
        {path: '/login', name: 'Login', component: () => import('./Pages/Login.vue')},
        {path: '/signup', name: 'Signup', component: () => import('./Pages/Signup.vue')},
    ]
})

createApp(App).use(router).use(pinia).mount('#app')
