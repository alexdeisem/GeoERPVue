import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from "../components/Login";
import Home from "../components/Home";
import Admin from "../components/admin/Admin";
import Dashboard from "../components/admin/Dashboard";


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
        path: '/admin',
        component: Admin,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;