import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import MachineHealth from "../views/MachineHealth.vue";
import ProductHistory from "../views/ProductHistory.vue";
import Counters from "../views/Counters.vue";
import Live from "../views/Live.vue";
import Login from "../views/Login.vue";
import UserManagement from "../views/UserManagement.vue";
import BatchSelection from "../views/BatchSelection.vue";






const routes = [
    {
        path: "/",
        name: "Login",
        meta: { sidebar: false },
        component: Login

    },

    {
        path: "/Dashboard",
        name: "Dashboard",
        meta: { sidebar: true },
        component: Dashboard

    },
    {
        path: "/MachineHealth",
        name: "MachineHealth",
        meta: { sidebar: true },
        component: MachineHealth

    },
    {
        path: "/ProductHistory",
        name: "ProductHistory",
        meta: { sidebar: true },
        component: ProductHistory

    },
    {
        path: "/Counters",
        name: "Counters",
        meta: { sidebar: true },
        component: Counters

    },
    {
        path: "/UserManagement",
        name: "UserManagement",
        meta: { sidebar: true },
        component: UserManagement

    },
    {
        path: "/BatchSelection",
        name: "BatchSelection",
        meta: { sidebar: true },
        component: BatchSelection

    },
    {
        path: "/Live",
        name: "Live",
        meta: { sidebar: true },
        component: Live

    }



]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

let isInitialRoute = true



export default router;