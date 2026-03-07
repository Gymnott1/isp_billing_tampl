<script setup>
import { ref, computed } from 'vue'
import { 
  Coins, MessageSquare, Users, Wifi, Server, Eye, EyeOff 
} from 'lucide-vue-next'

const showRevenue = ref(true)

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return { text: 'Good morning', emoji: '🌅' }
  if (hour < 17) return { text: 'Good afternoon', emoji: '☀️' }
  return { text: 'Good evening', emoji: '🌙' }
})
// Unified stats array for cleaner looping
const stats = [
  { id: 'rev-today', label: 'Revenue Today (KSh)', value: '0.00', icon: Coins, type: 'revenue' },
  { id: 'rev-month', label: 'Revenue March (KSh)', value: '0.00', icon: Coins, type: 'revenue' },
  { id: 'sms', label: 'SMS Balance', value: '0', icon: MessageSquare, type: 'sms' },
  { id: 'customers', label: 'Total customers', value: '2', icon: Users, type: 'standard' },
  { id: 'hotspot', label: 'Hotspot Customers', value: '0', icon: Wifi, type: 'standard' },
  { id: 'pppoe', label: 'PPPoE Customers', value: '0', icon: Server, type: 'standard' },
]
</script>

<template>
  <div class="space-y-6 max-w-[2000px] mx-auto">
    <!-- Greeting Header -->
    <header>
      <h1 class="text-xl font-bold flex items-center gap-2">
        {{ greeting.text }}, User {{ greeting.emoji }}
      </h1>
    </header>

    <!-- Main Unified Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
      
      <div v-for="stat in stats" :key="stat.id" 
        class="bg-white dark:bg-[#18181b] p-5 rounded-xl border border-gray-200 dark:border-zinc-800 flex flex-col justify-between relative overflow-hidden h-32 group"
      >
        <div class="relative z-10">
          <!-- Value Display -->
          <h3 
            :class="[stat.type === 'revenue' && !showRevenue ? 'blur-md select-none' : '']" 
            class="text-2xl font-bold transition-all duration-300 tracking-tight"
          >
            {{ stat.value }}
          </h3>

          <!-- Label & Action Buttons -->
          <div class="mt-2 flex items-center gap-2">
            <!-- Specific logic for Revenue Privacy Toggle -->
            <button 
              v-if="stat.type === 'revenue'"
              @click="showRevenue = !showRevenue" 
              class="flex items-center gap-1.5 text-[11px] font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors uppercase tracking-wider"
            >
              <component :is="showRevenue ? Eye : EyeOff" :size="14" />
              {{ stat.label }}
            </button>

            <!-- Specific logic for SMS Top Up -->
            <p v-else class="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              {{ stat.label }}
              <button 
                v-if="stat.type === 'sms'"
                class="px-1.5 py-0.5 border border-zinc-300 dark:border-zinc-700 rounded text-[9px] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors capitalize font-medium"
              >
                Top Up
              </button>
            </p>
          </div>
        </div>

        <!-- Watermark Background Icon -->
        <component 
          :is="stat.icon" 
          class="absolute -right-2 -bottom-2 w-20 h-20 text-zinc-100 dark:text-zinc-800/40 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500" 
        />
      </div>
    </div>

    <!-- Activity Section (Placeholder) -->
    <div class="bg-white dark:bg-[#18181b] p-6 rounded-xl border border-gray-200 dark:border-zinc-800">
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-bold">Recent Activity</h3>
        <button class="text-xs text-blue-600 font-medium hover:underline">View all logs</button>
      </div>
      <div class="h-48 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 text-sm italic">
        Real-time system logs will stream here...
      </div>
    </div>
  </div>
</template>

<style scoped>
.blur-md {
  filter: blur(8px);
}

/* Optional: smooth entry for cards */
.grid > div {
  animation: slideUp 0.4s ease forwards;
  opacity: 0;
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Staggered animation for the 6 cards */
.grid > div:nth-child(1) { animation-delay: 0.05s; }
.grid > div:nth-child(2) { animation-delay: 0.10s; }
.grid > div:nth-child(3) { animation-delay: 0.15s; }
.grid > div:nth-child(4) { animation-delay: 0.20s; }
.grid > div:nth-child(5) { animation-delay: 0.25s; }
.grid > div:nth-child(6) { animation-delay: 0.30s; }
</style>