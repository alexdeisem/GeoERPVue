import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import Admin from "../components/admin/Admin";
import Customers from "../components/admin/customers/Customers";
import Dashboard from "../components/admin/dashboard/Dashboard";
import Docs from "../components/admin/docs/Docs";
import Employee from "../components/employee/Employee";
import Employees from "../components/admin/employees/Employees";
import EmployeeHome from "../components/employee/EmployeeHome";
import Login from "../components/Login";
import Map from "../components/admin/map/Map";
import Settings from "../components/admin/settings/Settings";


Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: 'customers',
                name: 'Customers',
                component: Customers
            },
            {
                path: 'employees',
                name: 'Employees',
                component: Employees
            },
            {
                path: 'docs',
                name: 'Docs',
                component: Docs
            },
            {
                path: 'map',
                name: 'Map',
                component: Map
            },
            {
                path: 'settings',
                name: 'Settings',
                component: Settings
            },
        ],
        meta: {
            requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
            let user = store.getters['auth/user'];

            if (!user) {
                next({ name: 'Login' });
            } else if (user.isAdmin) {
                next();
            } else {
                next({ name: 'EmployeeHome' });
            }
            next();
        }
    },
    {
        path: '/employee',
        name: 'Employee',
        component: Employee,
        children: [
            {
                path: 'home',
                name: 'EmployeeHome',
                component: EmployeeHome
            }
        ],
        meta: {
            requiresAuth: true
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['auth/isLoggedIn']) {
            next();
        }
    } else {
        next();
    }
});

export default router;