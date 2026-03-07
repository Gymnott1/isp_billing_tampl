<script setup>
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-vue-next'

const stats = [
  { label: 'Total Revenue', value: '$1,250.00', trend: '+12.5%', up: true, desc: 'Trending up this month' },
  { label: 'New Customers', value: '1,234', trend: '-20%', up: false, desc: 'Down 20% this period' },
  { label: 'Active Accounts', value: '45,678', trend: '+12.5%', up: true, desc: 'Strong user retention' },
  { label: 'Growth Rate', value: '4.5%', trend: '+4.5%', up: true, desc: 'Steady performance increase' },
]

const tableData = [
  { header: 'Cover page', type: 'Cover page', status: 'In Process', target: 18, limit: 5, reviewer: 'Eddie Lake' },
  { header: 'Table of contents', type: 'Table of contents', status: 'Done', target: 29, limit: 24, reviewer: 'Eddie Lake' },
  { header: 'Executive summary', type: 'Narrative', status: 'Done', target: 10, limit: 13, reviewer: 'Eddie Lake' },
]
</script>

<template>
  <div class="space-y-8">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" class="bg-white dark:bg-[#18181b] p-6 rounded-xl border border-gray-200 dark:border-zinc-800">
        <div class="flex justify-between items-start mb-4">
          <p class="text-zinc-500 text-sm">{{ stat.label }}</p>
          <span :class="stat.up ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'" class="text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
            <TrendingUp v-if="stat.up" :size="12" />
            <TrendingDown v-else :size="12" />
            {{ stat.trend }}
          </span>
        </div>
        <h3 class="text-2xl font-bold mb-1">{{ stat.value }}</h3>
        <p class="text-xs text-zinc-500">{{ stat.desc }}</p>
      </div>
    </div>

    <!-- Chart Placeholder (Simplified for logic) -->
    <div class="bg-white dark:bg-[#18181b] p-6 rounded-xl border border-gray-200 dark:border-zinc-800 h-80 flex flex-col">
       <div class="flex justify-between items-center mb-8">
          <div>
            <h3 class="font-bold">Total Visitors</h3>
            <p class="text-xs text-zinc-500">Total for the last 3 months</p>
          </div>
          <div class="flex bg-gray-100 dark:bg-zinc-900 rounded-lg p-1 text-xs">
            <button class="px-4 py-1.5 rounded-md bg-white dark:bg-zinc-800 shadow-sm">Last 3 months</button>
            <button class="px-4 py-1.5 rounded-md">Last 30 days</button>
          </div>
       </div>
       <div class="flex-1 flex items-end gap-2 px-2">
          <!-- Simple CSS bars to simulate a chart -->
          <div v-for="i in 20" :key="i" :style="{ height: `${Math.random() * 100}%` }" class="flex-1 bg-blue-600/20 rounded-t-sm border-t border-blue-500"></div>
       </div>
    </div>

    <!-- Table Section -->
  <div class="bg-white dark:bg-[#18181b] rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="text-xs text-zinc-500 border-b border-gray-200 dark:border-zinc-800">
            <th class="p-4 font-medium"><input type="checkbox" class="rounded border-zinc-700 bg-transparent" /></th>
            <th class="p-4 font-medium uppercase tracking-wider">Header</th>
            <th class="p-4 font-medium uppercase tracking-wider">Section Type</th>
            <th class="p-4 font-medium uppercase tracking-wider">Status</th>
            <th class="p-4 font-medium uppercase tracking-wider">Target</th>
            <th class="p-4 font-medium uppercase tracking-wider">Reviewer</th>
            <th class="p-4"></th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr v-for="row in tableData" class="border-b border-gray-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
            <td class="p-4"><input type="checkbox" class="rounded border-zinc-700 bg-transparent" /></td>
            <td class="p-4 font-medium">{{ row.header }}</td>
            <td class="p-4 text-zinc-400">{{ row.type }}</td>
            <td class="p-4">
              <span :class="row.status === 'Done' ? 'text-emerald-500' : 'text-zinc-400'" class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-current"></span>
                {{ row.status }}
              </span>
            </td>
            <td class="p-4">{{ row.target }}</td>
            <td class="p-4 text-blue-400">{{ row.reviewer }}</td>
            <td class="p-4 text-right"><MoreHorizontal :size="16" class="inline cursor-pointer" /></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>