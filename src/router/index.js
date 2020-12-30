import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from "../components/Login";
import Home from "../components/Home";


Vue.use(VueRouter);

const guest = (to, from, next) => {
    if (!localStorage.getItem('authToken')) {
        return next();
    } else {
        return next('/');
    }
};

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        beforeEnter: guest,
        component: Login
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;