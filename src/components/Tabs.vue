<script setup>
import { ref } from 'vue'
import { RefreshCcw, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Info } from 'lucide-vue-next'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
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
    default: () => [] 
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
        :style="activeTab === tab.id ? { 
          borderBottomColor: 'var(--primary)', 
          color: 'var(--primary)',
          backgroundColor: 'color-mix(in srgb, var(--primary), transparent 90%)'
        } : { color: 'var(--muted-foreground)' }"
        :class="[
          activeTab === tab.id 
            ? 'border-primary text-primary bg-blue-50/30 dark:bg-blue-600/10' 
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

      <div v-if="showToolbar" class="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800">
        
        <div class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
          <span>Show</span>
          <select 
            :value="pageSize" 
            @change="emit('update:pageSize', parseInt($event.target.value))"
            class="bg-transparent border rounded-md px-2 py-1 outline-none transition-colors focus:border-primary"
            style="border-color: var(--border); color: var(--foreground)"
          >
            <option :value="15">15</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
          <span>Records</span>
        </div>

        <div class="relative w-full md:w-72">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" :size="14" />
          <input 
            v-model="searchQuery"
            @input="emit('search', searchQuery)"
            type="text" 
            placeholder="Search customers..." 
            class="w-full pl-9 pr-4 py-2 bg-transparent border rounded-full text-xs outline-none transition-all focus:ring-4 focus:ring-primary/5"
            style="border-color: var(--border); color: var(--foreground)"
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

      <div v-if="showFooter" class="p-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-transparent">
        
        <p class="text-[10px] uppercase tracking-widest font-bold italic" style="color: var(--muted-foreground)">
          Showing {{ totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1 }} 
          to {{ Math.min(currentPage * pageSize, totalEntries) }} 
          of {{ totalEntries }} entries
        </p>
        
        <div class="flex items-center gap-1.5">
          <button 
            @click="emit('go-page', 1)" :disabled="currentPage === 1" 
            class="px-3 py-2 border rounded-lg text-[10px] font-bold uppercase transition-all disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            style="border-color: var(--border); color: var(--foreground)"
          >First</button>
          
          <button 
            @click="emit('go-page', currentPage - 1)" :disabled="currentPage === 1" 
            class="p-2 border rounded-lg transition-all disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            style="border-color: var(--border); color: var(--foreground)"
          >
            <ChevronLeft :size="14"/>
          </button>

          <div 
            class="flex items-center rounded-lg px-1 shadow-md transition-transform active:scale-95"
            style="background-color: var(--primary); color: var(--primary-foreground)"
          >
            <input 
              type="number" 
              :value="currentPage"
              @input="emit('go-page', $event.target.value)"
              class="w-10 py-2 bg-transparent text-center text-xs font-black outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            >
          </div>

          <button 
            @click="emit('go-page', currentPage + 1)" :disabled="currentPage >= totalPages" 
            class="p-2 border rounded-lg transition-all disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            style="border-color: var(--border); color: var(--foreground)"
          >
            <ChevronRight :size="14"/>
          </button>

          <button 
            @click="emit('go-page', totalPages)" :disabled="currentPage >= totalPages" 
            class="px-3 py-2 border rounded-lg text-[10px] font-bold uppercase transition-all disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            style="border-color: var(--border); color: var(--foreground)"
          >Last</button>
        </div>
      </div>
    </div>
  </div>
</template>
