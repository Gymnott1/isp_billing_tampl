// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import GeneralView from '../views/GeneralView.vue'

const routes = [
    { path: '/', component: Dashboard },
    { path: '/users', component: GeneralView, props: { title: 'Active Users' } },
    { path: '/hotspot', component: GeneralView, props: { title: 'Hotspot Manager' } },
    { path: '/vouchers', component: GeneralView, props: { title: 'Voucher System' } },
    { path: '/pppoe', component: GeneralView, props: { title: 'PPPoE Connections' } },
    { path: '/payments', component: GeneralView, props: { title: 'Payment History' } },
    { path: '/mikrotik', component: GeneralView, props: { title: 'Mikrotik Settings' } },
    { path: '/settings', component: GeneralView, props: { title: 'Settings' } },
    { path: '/account', component: GeneralView, props: { title: 'Account Profile' } },
    { path: '/billing', component: GeneralView, props: { title: 'Billing & Subscriptions' } },
    { path: '/notifications', component: GeneralView, props: { title: 'Notification Settings' } },
]

export default createRouter({
    history: createWebHistory(),
    routes
})