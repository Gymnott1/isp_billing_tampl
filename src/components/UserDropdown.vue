<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { User, CreditCard, Bell, LogOut } from 'lucide-vue-next'

const emit = defineEmits(['close'])
const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-50 cursor-default" @click.stop="emit('close')"></div>
  
  <div 
    class="absolute bottom-full left-0 mb-2 w-64 border rounded-xl shadow-2xl z-[60] overflow-hidden animate-in fade-in slide-in-from-bottom-2"
    style="background-color: var(--popover); border-color: var(--border); color: var(--popover-foreground);"
    @click.stop
  >
    <div 
      class="p-4 border-b flex items-center gap-3"
      style="background-color: var(--muted); border-color: var(--border);"
    >
      <div 
        class="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black shadow-inner"
        style="background-color: var(--primary); color: var(--primary-foreground);"
      >
        ST
      </div>
      <div class="flex-1 overflow-hidden">
        <p class="text-sm font-bold truncate">stevemosiori</p>
        <p class="text-[11px] truncate opacity-60 font-medium">steve@gmail.com</p>
      </div>
    </div>
    
    <div class="p-1.5 space-y-0.5">
      <router-link 
        v-for="item in [
          { to: '/account', label: 'Account', icon: User },
          { to: '/billing', label: 'Billing', icon: CreditCard },
          { to: '/notifications', label: 'Notifications', icon: Bell }
        ]" 
        :key="item.to"
        :to="item.to" 
        @click="emit('close')" 
        class="group w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all"
        style="--hover-bg: var(--accent); --hover-text: var(--accent-foreground);"
      >
        <component :is="item.icon" :size="16" class="opacity-50 group-hover:opacity-100 transition-opacity" /> 
        {{ item.label }}
      </router-link>
    </div>

    <div class="p-1.5 border-t" style="border-color: var(--border);">
      <button 
        @click="handleLogout"
        class="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-colors hover:bg-red-500/10"
        style="color: var(--destructive);"
      >
        <LogOut :size="16" /> Log out
      </button>
    </div>
  </div>
</template>

<style scoped>
a:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.animate-in {
  animation: enter 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes enter {
  from { opacity: 0; transform: translateY(10px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>