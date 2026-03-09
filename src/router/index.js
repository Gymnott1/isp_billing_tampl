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
            tabs: [{
                    id: 'hotspot',
                    label: 'HOTSPOT',
                    iconName: 'Radio',
                    count: 2,
                    type: 'table',
                    headers: ['User', 'Address / MAC', 'Mikrotik', 'Status / Expiry', 'Action'],
                    rowActions: [
                        { label: 'View Details', iconName: 'Eye', command: 'view' },
                        { label: 'Modify Profile', iconName: 'Edit', command: 'edit', color: 'blue' },
                        { label: 'Delete Account', iconName: 'Trash2', command: 'delete', color: 'red' }
                    ],
                    rows: [
                        ['John Doe', '192.168.88.10', 'Main_Router', 'Active / 2h remaining'],
                        ['Jane Smith', '192.168.88.15', 'Main_Router', 'Active / 5h remaining']
                    ],
                    actions: [{ label: 'Add User', iconName: 'Plus', command: 'add' }]
                },
                {
                    id: 'pppoe',
                    label: 'PPPoE',
                    iconName: 'HardDrive',
                    count: 1,
                    type: 'table',
                    headers: ['User', 'Service', 'Uptime', 'Action'],
                    rows: [
                        ['Cyril_Home', 'Internet_5Mbps', '12d 04:20:00']
                    ]
                }
            ]
        }
    },
    {
        path: '/hotspot',
        component: TabsView,
        props: {
            title: 'Hotspot Manager',
            tabs: [{
                    id: 'active',
                    label: 'Active Sessions',
                    iconName: 'Zap',
                    count: 3,
                    type: 'table',
                    headers: ['User', 'Address', 'Uptime', 'Action'],
                    rows: [
                        ['User_01', '10.5.50.2', '00:45:12'],
                        ['User_05', '10.5.50.8', '02:10:05'],
                        ['Guest_A', '10.5.50.12', '00:05:30']
                    ]
                },
                {
                    id: 'users',
                    label: 'Registered Users',
                    iconName: 'Users',
                    count: 2,
                    type: 'table',
                    headers: ['Username', 'Profile', 'Limit', 'Action'],
                    rows: [
                        ['admin', 'default', 'Unlimited'],
                        ['staff_01', '1Mbps_Profile', '5GB']
                    ]
                },
                {
                    id: 'hosts',
                    label: 'Hosts',
                    iconName: 'Laptop',
                    count: 1,
                    type: 'table',
                    headers: ['MAC Address', 'IP Address', 'Status'],
                    rows: [
                        ['00:1A:2B:3C:4D:5E', '10.5.50.100', 'Authorized']
                    ]
                }
            ]
        }
    },
    {
        path: '/vouchers',
        component: TabsView,
        props: {
            title: 'vouchers Manager',
            tabs: [{
                    id: 'active',
                    label: 'Active',
                    type: 'table',
                    headers: ['User', 'IP', 'Uptime'],
                    actions: [{ label: 'Add', iconName: 'Plus', command: 'add' }]
                },
                {
                    id: 'stats',
                    label: 'Statistics',
                    type: 'cards',
                },
                {
                    id: 'docs',
                    label: 'Help',
                    type: 'content',
                }
            ]
        }
    },
    // { path: '/vouchers', component: GeneralView, props: { title: 'Voucher System' } },
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