import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import Login from "../components/Login";
import Home from "../components/Home";
import Secure from "../components/Secure";
import Admin from "../components/admin/Admin";


Vue.use(VueRouter);

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/secure',
        name: 'Secure',
        component: Secure,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
        }
    } else {
        next();
    }
});

export default router;