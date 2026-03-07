import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import GeneralView from '../views/GeneralView.vue'
import TabsView from '../views/TabsView.vue'

const routes = [
    { path: '/', component: Dashboard },
    {
        path: '/users',
        component: TabsView,
        props: {
            title: 'Active Customers',
            tabs: [
                { id: 'hotspot', label: 'HOTSPOT', iconName: 'Radio', count: 0 },
                { id: 'pppoe', label: 'PPPoE', iconName: 'HardDrive', count: 0 }
            ]
        }
    },
    {
        path: '/hotspot',
        component: TabsView,
        props: {
            title: 'Hotspot Manager',
            tabs: [
                { id: 'active', label: 'Active Sessions', iconName: 'Zap', count: 0 },
                { id: 'users', label: 'Registered Users', iconName: 'Users', count: 0 },
                { id: 'hosts', label: 'Hosts', iconName: 'Laptop', count: 0 }
            ]
        }
    },
    // Keep others as GeneralView until you're ready to add tabs to them
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