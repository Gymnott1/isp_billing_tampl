<script setup>
import { ref } from 'vue'
import { RefreshCcw, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Info } from 'lucide-vue-next'

const props = defineProps({
  tabs: {
    type: Array,
    required: true, // Example: [{ id: 'hotspot', label: 'HOTSPOT', count: 0, icon: Wifi }]
  },
  showToolbar: { type: Boolean, default: true },
  showFooter: { type: Boolean, default: true },
  title: String,
  currentPage: { type: Number, default: 1 },
  pageSize: { type: Number, default: 15 },
  totalPages: { type: Number, default: 1 },
  totalEntries: { type: Number, default: 0 },
  activeTab: String,
    actions: {
    type: Array,
    default: () => [] // Example: [{ label: 'Add User', icon: Plus, command: 'add' }]
  }
})

const emit = defineEmits(['update:activeTab', 'refresh', 'search', 'action', 'update:pageSize', 'go-page'])

const searchQuery = ref('')

const handleTabClick = (id) => {
  emit('update:activeTab', id)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800">
      <button 
        v-for="tab in tabs" :key="tab.id"
        @click="handleTabClick(tab.id)"
        :class="[
          activeTab === tab.id 
            ? 'border-blue-600 text-blue-600 bg-blue-50/30 dark:bg-blue-600/10' 
            : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
        ]"
        class="flex items-center gap-2 px-6 py-3 border-b-2 text-xs font-bold transition-all"
      >
        <component :is="tab.icon" :size="16" />
        {{ tab.label }}
        <span class="ml-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded text-[10px]">{{ tab.count }}</span>
      </button>
    </div>

    <div class="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-visible shadow-sm">
      
      <div class="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 class="text-sm font-bold text-zinc-700 dark:text-zinc-300 capitalize">
          Active {{ activeTab }} customers
        </h3>
        
        <div class="flex items-center gap-2">
          <button 
            v-for="btn in actions" :key="btn.label"
            @click="$emit('action', btn.command)"
            class="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <component :is="btn.icon" :size="14" />
            {{ btn.label }}
          </button>

          <button 
            @click="$emit('refresh')"
            class="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <RefreshCcw :size="14" /> Refresh
          </button>
        </div>
      </div>

      <div v-if="showToolbar"  class="p-4 bg-zinc-50/50 dark:bg-zinc-900/20 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800">
        
        <div class="flex items-center gap-2 text-xs font-medium text-zinc-500">
          <span>Show</span>
          <select 
            :value="pageSize" 
            @change="emit('update:pageSize', parseInt($event.target.value))"
            class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-2 py-1 outline-none"
          >
            <option :value="15">15</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
          <span>records</span>
        </div>

        <div class="relative w-full md:w-80">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" :size="15" />
          <input 
            v-model="searchQuery"
            @input="$emit('search', searchQuery)"
            type="text" 
            placeholder="Search customers..." 
            class="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-zinc-500"
          >
        </div>
      </div>

      <div class="min-h-[300px]">
        <slot :name="activeTab">
          <div class="flex flex-col items-center justify-center py-24 text-zinc-400">
            <div class="w-12 h-12 rounded-full border-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-center mb-4">
              <Info :size="20" />
            </div>
            <p class="text-sm font-medium">No records available in table</p>
          </div>
        </slot>
      </div>

      <div v-if="showFooter" class="p-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <p class="text-[11px] text-zinc-500 uppercase tracking-widest font-bold italic">
          Showing {{ totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1 }} 
          to {{ Math.min(currentPage * pageSize, totalEntries) }} 
          of {{ totalEntries }} entries
        </p>
        
        <div class="flex items-center gap-1">
          <button @click="emit('go-page', 1)" :disabled="currentPage === 1" class="px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[10px] font-bold uppercase hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30">First</button>
          
          <button @click="emit('go-page', currentPage - 1)" :disabled="currentPage === 1" class="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30">
            <ChevronLeft :size="14"/>
          </button>
          <div class="flex items-center bg-blue-600 text-white rounded-lg px-1 shadow-lg shadow-blue-600/20">
            <input 
              type="number" 
              :value="currentPage"
              @input="emit('go-page', $event.target.value)"
              class="w-10 py-2 bg-transparent text-center text-xs font-bold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            >
          </div>

          <button @click="emit('go-page', currentPage + 1)" :disabled="currentPage >= totalPages" class="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30">
            <ChevronRight :size="14"/>
          </button>

          <button @click="emit('go-page', totalPages)" :disabled="currentPage >= totalPages" class="px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[10px] font-bold uppercase hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30">Last</button>
        </div>
      </div>
    </div>
  </div>
</template>
