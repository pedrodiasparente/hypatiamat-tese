import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logintpc from '../views/Logintpc.vue'
import Register from '../views/Register.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        path: '/logintpc',
        name: "Logintpc",
        component: Logintpc
    },
    {
        path: '/register',
        name: "Register",
        component: Register
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
