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
const stats = [
  { id: 'rev-today', label: 'Revenue Today (KSh)', value: '0.00', icon: Coins, type: 'revenue' },
  { id: 'rev-month', label: 'Revenue March (KSh)', value: '0.00', icon: Coins, type: 'revenue' },
  { id: 'sms', label: 'SMS Balance', value: '0', icon: MessageSquare, type: 'sms' },
  { id: 'customers', label: 'Total customers', value: '2', icon: Users, type: 'standard' },
  { id: 'hotspot', label: 'Hotspot Customers', value: '0', icon: Wifi, type: 'standard' },
  { id: 'pppoe', label: 'PPPoE Customers', value: '0', icon: Server, type: 'standard' },
]

const packageCounts = [
  { name: 'FREE 20 Minutes UnlimNET', type: 'hotspot', count: 3021 },
  { name: 'Sh5 = 30Mins UnlimiNET', type: 'hotspot', count: 1423 },
  { name: 'Sh9 = 1Hour UnlimiNET', type: 'hotspot', count: 828 },
  { name: 'Sh13 = 2Hours UnlimiNET', type: 'hotspot', count: 561 },
  { name: 'Sh30 = 10Hours UnlimiNET', type: 'hotspot', count: 497 },
  { name: 'Sh20 = 4Hours UnlimiNET', type: 'hotspot', count: 352 },
  { name: 'Sh29 = 1GB + 500MB bonus 24 Hours 1 Device', type: 'hotspot', count: 331 },
  { name: '⚽ EPL Special @10 Bob 2Hrs UnlimiNet', type: 'hotspot', count: 158 },
  { name: 'Sh50 = 24Hours UnlimiNET', type: 'hotspot', count: 148 },
  { name: 'Sh39 = 2GB + 1GB bonus 24 Hours 1 Device', type: 'hotspot', count: 86 },
  { name: 'Sh1500= Monthly Unlimited - 5Mbps', type: 'pppoe', count: 65 },
]

const recentTransactions = [
  { code: 'Pending', customer: 'CYRIL', amount: 'Ksh 1500', date: '07, 17:24:04' },
  { code: 'Pending', customer: 'Angel', amount: 'Ksh 9', date: '07 , 17:24:03' },
  { code: 'Pending', customer: 'ANZARO', customer: 'ANZARO', amount: 'Ksh 9', date: '07 , 17:24:01' },
  { code: 'Pending', customer: 'Unknown', amount: 'Ksh 5', date: '07 , 17:23:56' },
  { code: 'UC7HA8M27X', customer: 'Unknown', amount: 'Ksh 30', date: '07 , 17:23:47' },
  { code: 'UC7B18RMI7', customer: 'Unknown', amount: 'Ksh 10', date: '07 , 17:23:40' },
  { code: 'UC7RO8RB5B', customer: 'Unknown', amount: 'Ksh 9', date: '07 , 17:23:20' },
  { code: 'Pending', customer: 'Unknown', amount: 'Ksh 5', date: '07 , 17:23:08' },
  { code: 'UC7528KP6W', customer: 'Dorine', amount: 'Ksh 9', date: '07 , 17:23:07' },
  { code: 'UC7HK8TUIE', customer: 'trizah', amount: 'Ksh 29', date: '07 , 17:23:07' },
  { code: 'Pending', customer: 'Yvonne', amount: 'Ksh 20', date: '07 , 17:23:06' },
]
</script>

<template>
  <div class="space-y-6 max-w-[2000px] mx-auto">
    
    <header>
      <h1 class="text-xl font-bold flex items-center gap-2">
        {{ greeting.text }}, User {{ greeting.emoji }}
      </h1>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
      
      <div v-for="stat in stats" :key="stat.id" 
        class="bg-white dark:bg-[#18181b] p-5 rounded-xl border border-gray-200 dark:border-zinc-800 flex flex-col justify-between relative overflow-hidden h-32 group"
      >
        <div class="relative z-10">
        
          <h3 
            :class="[stat.type === 'revenue' && !showRevenue ? 'blur-md select-none' : '']" 
            class="text-2xl font-bold transition-all duration-300 tracking-tight"
          >
            {{ stat.value }}
          </h3>

          <div class="mt-2 flex items-center gap-2">
           
            <button 
              v-if="stat.type === 'revenue'"
              @click="showRevenue = !showRevenue" 
              class="flex items-center gap-1.5 text-[11px] font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors uppercase tracking-wider"
            >
              <component :is="showRevenue ? Eye : EyeOff" :size="14" />
              {{ stat.label }}
            </button>

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

        <component 
          :is="stat.icon" 
          class="absolute -right-2 -bottom-2 w-20 h-20 text-zinc-100 dark:text-zinc-800/40 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500" 
        />
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <div class="bg-white dark:bg-[#18181b] rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col">
        <div class="p-4 border-b border-gray-100 dark:border-zinc-800">
          <h3 class="text-sm font-bold text-zinc-500 dark:text-zinc-400">Real-time Package Purchase Counts</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-[11px] md:text-xs">
            <thead>
              <tr class="text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 uppercase tracking-wider font-semibold">
                <th class="px-4 py-3">Package Name</th>
                <th class="px-4 py-3">Type</th>
                <th class="px-4 py-3 text-right">Count</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-50 dark:divide-zinc-800/50">
              <tr v-for="pkg in packageCounts" :key="pkg.name" class="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                <td class="px-4 py-2.5 font-medium text-zinc-700 dark:text-zinc-300">{{ pkg.name }}</td>
                <td class="px-4 py-2.5 text-zinc-500">{{ pkg.type }}</td>
                <td class="px-4 py-2.5 text-right font-bold text-zinc-900 dark:text-zinc-100">{{ pkg.count }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="bg-zinc-100/50 dark:bg-zinc-800/50 font-bold border-t border-zinc-200 dark:border-zinc-700">
                <td class="px-4 py-3 uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Total</td>
                <td></td>
                <td class="px-4 py-3 text-right text-zinc-900 dark:text-white">7,507</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div class="bg-white dark:bg-[#18181b] rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col">
        <div class="p-4 border-b border-gray-100 dark:border-zinc-800">
          <h3 class="text-sm font-bold text-zinc-500 dark:text-zinc-400">Recent Transactions</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-[11px] md:text-xs">
            <thead>
              <tr class="text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 uppercase tracking-wider font-semibold">
                <th class="px-4 py-3">M-Pesa Code</th>
                <th class="px-4 py-3">Customer</th>
                <th class="px-4 py-3">Amount</th>
                <th class="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-50 dark:divide-zinc-800/50">
              <tr v-for="tx in recentTransactions" :key="tx.date" class="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group">
                <td class="px-4 py-2.5">
                  <span :class="tx.code === 'Pending' ? 'text-orange-500 dark:text-orange-400/80 italic' : 'font-medium text-zinc-700 dark:text-zinc-300'">
                    {{ tx.code }}
                  </span>
                </td>
                <td class="px-4 py-2.5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-200">{{ tx.customer }}</td>
                <td class="px-4 py-2.5 font-bold text-zinc-900 dark:text-zinc-100">{{ tx.amount }}</td>
                <td class="px-4 py-2.5 text-zinc-400 text-[10px] whitespace-nowrap">{{ tx.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.blur-md {
  filter: blur(8px);
}

.grid > div {
  animation: slideUp 0.4s ease forwards;
  opacity: 0;
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.grid > div:nth-child(1) { animation-delay: 0.05s; }
.grid > div:nth-child(2) { animation-delay: 0.10s; }
.grid > div:nth-child(3) { animation-delay: 0.15s; }
.grid > div:nth-child(4) { animation-delay: 0.20s; }
.grid > div:nth-child(5) { animation-delay: 0.25s; }
.grid > div:nth-child(6) { animation-delay: 0.30s; }
</style>