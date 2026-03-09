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
                    isExpandable: false,
                    isSelectable: true,
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
                    isExpandable: false,
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
            title: 'Hotspot',
            tabs: [{
                    id: 'active',
                    label: 'CUSTOMERS',
                    iconName: 'Zap',
                    count: 3,
                    isExpandable: false,
                    type: 'table',
                    headers: ['User', 'Address', 'Uptime', 'Action'],
                    rows: [
                        ['User_01', '10.5.50.2', '00:45:12'],
                        ['User_05', '10.5.50.8', '02:10:05'],
                        ['Guest_A', '10.5.50.12', '00:05:30']
                    ]
                },
                {
                    id: 'PLANS',
                    label: 'PLANS',
                    iconName: 'Laptop',
                    count: 2,
                    isExpandable: false,
                    type: 'table',
                    headers: ['Username', 'Profile', 'Limit', 'Action'],
                    rows: [
                        ['admin', 'default', 'Unlimited'],
                        ['staff_01', '1Mbps_Profile', '5GB']
                    ]
                }
            ]
        }
    },
    {
        path: '/vouchers',
        component: TabsView,
        props: {
            title: 'vouchers',
            tabs: [{
                    id: 'active',
                    label: 'UNUSED',
                    type: 'table',
                    isExpandable: false,
                    headers: ['User', 'IP', 'Uptime'],
                    actions: [{ label: 'Add', iconName: 'Plus', command: 'add' }]
                },
                {
                    id: 'stats',
                    isExpandable: false,
                    label: 'IN USE',
                    type: 'cards',
                },
                {
                    id: 'docs',
                    isExpandable: false,
                    label: 'USED',
                    type: 'content',
                }
            ]
        }
    },
    { path: '/pppoe', component: GeneralView, props: { title: 'PPPoE Connections' } },
    { path: '/payments', component: GeneralView, props: { title: 'Payment History' } },

    {
        path: '/mikrotik',
        component: TabsView,
        props: {
            title: 'MikrotikS',
            tabs: [{
                id: 'routers',
                label: 'MIKROTIKS',
                iconName: 'HardDrive',
                type: 'table',
                isExpandable: true,
                isSelectable: true,
                headers: ['Action', 'Device Identity', 'CPU Load', 'Memory / Disk', 'System Status'],
                rowActions: [
                    { label: 'View Details', iconName: 'Eye', command: 'view' },
                    { label: 'Modify Profile', iconName: 'Edit', command: 'edit', color: 'blue' },
                    { label: 'Delete Account', iconName: 'Trash2', command: 'delete', color: 'red' }
                ],
                rows: [
                    // ROW 1: Standard Offline Gateway
                    {
                        data: ['edit', 'Gateway4', '0%', '12 MB / 128 MB', 'Offline'],
                        details: [{
                                title: 'Software Info',
                                icon: 'Shield',
                                items: [
                                    { label: 'OS Version', value: 'v7.12.1' },
                                    { label: 'Factory Version', value: '6.48' },
                                    { label: 'Last Heartbeat', value: '1/1/1970' }
                                ]
                            },
                            {
                                title: 'Meta Tags',
                                icon: 'Info',
                                renderType: 'code',
                                value: 'UUID: 89968f6b-13e6-4181-a017-f99ff3083ca0'
                            }
                        ]
                    },
                    // ROW 2: High Performance Core Router (X86)
                    {
                        data: ['edit', 'Core-Router-X86', '45%', '2.4 GB / 16 GB', 'Online'],
                        details: [{
                                title: 'System Resources',
                                icon: 'Cpu',
                                items: [
                                    { label: 'Uptime', value: '142d 05:22:10' },
                                    { label: 'CPU Count', value: '16 Cores' },
                                    { label: 'Frequency', value: '3.4 GHz' }
                                ]
                            },
                            {
                                title: 'Network Config',
                                icon: 'Activity',
                                items: [
                                    { label: 'Public IP', value: '197.232.10.45' },
                                    { label: 'Local Bridge', value: '10.0.0.1/24' },
                                    { label: 'Active VPNs', value: '12 Tunnels' }
                                ]
                            },
                            {
                                title: 'Security Notice',
                                icon: 'Zap',
                                value: 'Firewall is currently managing 4,200 active connections with Raw rules enabled.'
                            }
                        ]
                    },
                    // ROW 3: Sector Tower Access Point
                    {
                        data: ['edit', 'West-Tower-AP', '12%', '64 MB / 256 MB', 'Online'],
                        details: [{
                                title: 'Wireless Status',
                                icon: 'Radio',
                                items: [
                                    { label: 'SSID', value: 'Netic_Fiber_West' },
                                    { label: 'Frequency', value: '5240 MHz' },
                                    { label: 'Connected Clients', value: '42 Devices' }
                                ]
                            },
                            {
                                title: 'Hardware Profile',
                                icon: 'Laptop',
                                items: [
                                    { label: 'Model', value: 'RB921GS-5HPacD' },
                                    { label: 'Serial No', value: 'HE708X9J21' }
                                ]
                            }
                        ]
                    },
                    // ROW 4: Backup CCR (Standby)
                    {
                        data: ['edit', 'CCR-Backup-01', '2%', '512 MB / 2 GB', 'Standby'],
                        details: [{
                                title: 'Failover Logs',
                                icon: 'FileText',
                                renderType: 'code',
                                value: 'LOG: 2024-03-08 12:00:00 - Primary Link OK. Backup monitoring active.'
                            },
                            {
                                title: 'Notes',
                                icon: 'Settings',
                                value: 'This router is in cold-standby mode. VRRP priority is set to 50.'
                            }
                        ]
                    }
                ]
            }]
        }
    },
    { path: '/settings', component: GeneralView, props: { title: 'Settings' } },
    { path: '/account', component: GeneralView, props: { title: 'Account Profile' } },
    { path: '/billing', component: GeneralView, props: { title: 'Billing & Subscriptions' } },
    { path: '/notifications', component: GeneralView, props: { title: 'Notification Settings' } },
]

export default createRouter({
    history: createWebHistory(),
    routes
})