<script setup>
import { User, CreditCard, Bell, LogOut } from 'lucide-vue-next'
const emit = defineEmits(['close'])
</script>

<template>
  <!-- Transparent overlay to catch clicks outside -->
  <div class="fixed inset-0 z-50 cursor-default" @click.stop="emit('close')"></div>
  
  <!-- Popup Menu -->
  <div 
    class="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl z-[60] overflow-hidden animate-in fade-in slide-in-from-bottom-2 transition-all"
    @click.stop
  >
    <!-- Header -->
    <div class="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3 bg-zinc-50/50 dark:bg-zinc-800/20">
      <div class="w-9 h-9 rounded bg-pink-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">ST</div>
      <div class="flex-1 overflow-hidden">
        <p class="text-sm font-bold truncate text-zinc-900 dark:text-white">stevemosiori</p>
        <p class="text-[11px] text-zinc-500 truncate font-medium">steve@gmail.com</p>
      </div>
    </div>
    
    <!-- Items -->
    <div class="p-1.5">
      <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-left group">
        <User :size="16" /> Account
      </button>
      <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-left group">
        <CreditCard :size="16" /> Billing
      </button>
      <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-left group">
        <Bell :size="16" /> Notifications
      </button>
    </div>

    <div class="p-1.5 border-t border-zinc-200 dark:border-zinc-800">
      <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-lg transition-colors font-medium text-left">
        <LogOut :size="16" /> Log out
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation: enter 0.15s ease-out;
}
@keyframes enter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>