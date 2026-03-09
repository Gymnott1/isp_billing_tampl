<script setup>
import { ref } from 'vue'
import { RefreshCcw, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Info } from 'lucide-vue-next'

const props = defineProps({
  tabs: {
    type: Array,
    required: true, // Example: [{ id: 'hotspot', label: 'HOTSPOT', count: 0, icon: Wifi }]
  },
  title: String,
  activeTab: String,
    actions: {
    type: Array,
    default: () => [] // Example: [{ label: 'Add User', icon: Plus, command: 'add' }]
  }
})

const emit = defineEmits(['update:activeTab', 'refresh', 'search', 'action'])

const searchQuery = ref('')

const handleTabClick = (id) => {
  emit('update:activeTab', id)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
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

    <div class="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-sm">
      <div class="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <h3 class="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize">
          Active {{ activeTab }} customers
        </h3>
        
        <div class="flex items-center gap-2">
          <button 
            v-for="btn in actions" :key="btn.label"
            @click="$emit('action', btn.command)"
            class="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 ..."
          >
            <component :is="btn.icon" :size="14" />
            {{ btn.label }}
          </button>
          
          <button @click="$emit('refresh')" class="bg-blue-600 ...">
            <RefreshCcw :size="14" /> Refresh
          </button>
        </div>
      </div>

      <div class="p-4 flex flex-col sm:row items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-xs text-zinc-500">
          <select class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 outline-none">
            <option>15</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>records</span>
        </div>

        <div class="relative w-full sm:w-64">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" :size="14" />
          <input 
            v-model="searchQuery"
            @input="emit('search', searchQuery)"
            type="text" 
            placeholder="Search..." 
            class="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-full text-xs outline-none focus:border-blue-500 transition-all"
          >
        </div>
      </div>

      <div class="min-h-[300px]">
        <slot :name="activeTab">
         
          <div class="flex flex-col items-center justify-center py-20 text-zinc-400">
            <div class="w-12 h-12 rounded-full border-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-center mb-4">
              <Info :size="20" />
            </div>
            <p class="text-sm font-medium">No records available in table</p>
          </div>
        </slot>
      </div>

      <div class="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 flex flex-col items-center gap-4">
        <div class="flex items-center gap-1">
          <button class="p-2 border border-zinc-200 dark:border-zinc-800 rounded hover:bg-white dark:hover:bg-zinc-800 text-zinc-400 transition-colors"><ChevronsLeft :size="14"/></button>
          <button class="p-2 border border-zinc-200 dark:border-zinc-800 rounded hover:bg-white dark:hover:bg-zinc-800 text-zinc-400 transition-colors"><ChevronLeft :size="14"/></button>
          <button class="p-2 border border-zinc-200 dark:border-zinc-800 rounded hover:bg-white dark:hover:bg-zinc-800 text-zinc-400 transition-colors"><ChevronRight :size="14"/></button>
          <button class="p-2 border border-zinc-200 dark:border-zinc-800 rounded hover:bg-white dark:hover:bg-zinc-800 text-zinc-400 transition-colors"><ChevronsRight :size="14"/></button>
        </div>
        <p class="text-[11px] text-zinc-400 uppercase tracking-widest font-medium">Showing 0 to 0 of 0 entries</p>
      </div>
    </div>
  </div>
</template>