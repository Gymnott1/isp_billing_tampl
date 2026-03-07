<script setup>
import { ref, onMounted } from 'vue'
import SidebarItem from '@/components/SidebarItem.vue'
import UserDropdown from '@/components/UserDropdown.vue'
import { 
  LayoutDashboard, Users, Radio, Ticket, Receipt, HardDrive,
  Settings, Menu, Sun, Moon, X, Mail
} from 'lucide-vue-next'

const isDark = ref(false)
const isSidebarOpen = ref(true) 
const isUserMenuOpen = ref(false)
const isInitialLoad = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  if (window.innerWidth >= 768) {
    localStorage.setItem('sidebarStatus', isSidebarOpen.value ? 'open' : 'closed')
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  // Sync Theme
  isDark.value = document.documentElement.classList.contains('dark')

  // Sync Sidebar
  const savedSidebar = localStorage.getItem('sidebarStatus')
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false
  } else {
    isSidebarOpen.value = savedSidebar === 'closed' ? false : true
  }

  // Remove jumpy animations on load
  setTimeout(() => {
    isInitialLoad.value = false
  }, 50)
})

const mainNav = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Active Users', icon: Users, path: '/users' },
  { name: 'Hotspot', icon: Radio, path: '/hotspot' },
  { name: 'Vouchers', icon: Ticket, path: '/vouchers' },
  { name: 'PPPoE', icon: HardDrive, path: '/pppoe' },
  { name: 'Payments', icon: Receipt, path: '/payments' },
]

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 768) {
    setTimeout(() => { isSidebarOpen.value = false }, 150)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex font-sans overflow-hidden relative">
    
    <!-- Sidebar -->
    <aside 
      :class="[
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0',
        isSidebarOpen ? 'md:w-64' : 'md:w-20',
        isInitialLoad ? '' : 'sidebar-drawer' 
      ]"
      class="fixed md:static inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-[#0c0c0e] border-r border-zinc-200 dark:border-zinc-800 w-72 shrink-0"
    >
      <!-- Header -->
      <div class="h-16 flex items-center justify-between px-6 shrink-0 border-b border-transparent">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-blue-600/20">N</div>
          <span v-if="isSidebarOpen" class="font-bold text-lg whitespace-nowrap">Netic ISP</span>
        </div>
        <button @click="isSidebarOpen = false" class="md:hidden p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
          <X :size="20" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 space-y-1 overflow-y-auto pt-4 custom-scrollbar">
        <SidebarItem 
          v-for="item in mainNav" 
          :key="item.path" :to="item.path" :icon="item.icon" 
          :label="isSidebarOpen ? item.name : ''" 
          @click="closeSidebarOnMobile" 
        />
        <div class="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800">
           <SidebarItem to="/mikrotik" :icon="HardDrive" :label="isSidebarOpen ? 'Mikrotik' : ''" @click="closeSidebarOnMobile" />
        </div>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e]">
        <SidebarItem to="/settings" :icon="Settings" :label="isSidebarOpen ? 'Settings' : ''" @click="closeSidebarOnMobile" />
        
        <div class="relative mt-4">
          <div @click.stop="isUserMenuOpen = !isUserMenuOpen" class="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors group">
            <div class="w-9 h-9 rounded bg-pink-600 flex items-center justify-center text-xs font-bold text-white shrink-0 group-hover:scale-105 transition-transform">ST</div>
            <div v-if="isSidebarOpen" class="flex-1 min-w-0">
              <p class="text-sm font-semibold truncate leading-none mb-1">stevemosiori</p>
              <p class="text-[11px] text-zinc-500 truncate leading-none">steve@gmail.com</p>
            </div>
          </div>
          <UserDropdown v-if="isUserMenuOpen" @close="isUserMenuOpen = false" />
        </div>
        <div v-if="isSidebarOpen" class="mt-4 text-xs text-zinc-500 text-center">
          &copy; 2026 Netic ISP | <a href="#" class="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <header class="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-[#0c0c0e] shrink-0 z-10">
        <div class="flex items-center gap-4">
          <button @click="toggleSidebar" class="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors">
            <Menu :size="20" />
          </button>
            <h2 class="text-sm font-semibold truncate capitalize">
              {{ $route.path === '/' ? 'Dashboard' : $route.path.replace('/', '').replace('-', ' ') }}
            </h2>
        </div>
        
        <div class="flex items-center gap-2 md:gap-4 shrink-0">
          <button @click="toggleTheme" class="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-90">
            <Sun v-if="isDark" :size="18" />
            <Moon v-else :size="18" />
          </button>
          
          <router-link to="/account" class="shrink-0 bg-red-500/10 text-red-500 text-[10px] p-1.5 md:px-2 md:py-1 rounded border border-red-500/20 font-bold flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <Mail :size="14" class="md:hidden" />
            <span class="hidden md:inline">Email Unverified</span>
          </router-link>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto p-4 md:p-6 bg-white dark:bg-[#09090b]">
        <router-view />
      </div>
    </main>

    <!-- Overlay -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"></div>
  </div>
</template>

<style scoped>
.sidebar-drawer {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Safe scrollbar CSS (no Tailwind @apply to avoid 500 error) */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 10px;
}
aside:hover .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #3f3f46; /* zinc-700 */
}
</style>