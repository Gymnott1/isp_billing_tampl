<script setup>
import { ref, watch, computed, markRaw } from 'vue'
import RowActions from '@/components/RowActions.vue'
import Tabs from '@/components/Tabs.vue'
import { 
  Radio, HardDrive, Zap, Users, Laptop, Info, 
  Ticket, Receipt, Settings, Activity, Plus, Download, 
  ChevronUp, ChevronDown, LayoutGrid, FileText, ChevronRight, Cpu, Shield, Trash2
} from 'lucide-vue-next'

const props = defineProps({
  title: String,
  tabs: {
    type: Array,
    default: () => []
  }
})

const currentTab = ref('')
const sortKey = ref('')
const sortOrder = ref('asc')
const expandedRows = ref([])
const selectedRows = ref([])
const currentPage = ref(1)
const pageSize = ref(15)

const iconMap = { 
  Radio, HardDrive, Zap, Users, Laptop, Info, 
  Ticket, Receipt, Settings, Activity, Plus, 
  Download, LayoutGrid, FileText
}


const totalPages = computed(() => {
  const total = displayRows.value.length
  return Math.ceil(total / pageSize.value) || 1
})

const paginatedRows = computed(() => {
  // Use displayRows (the sorted/searched list) to slice
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return displayRows.value.slice(start, end)
})

const handlePageInput = (val) => {
  const num = parseInt(val)
  if (!isNaN(num) && num > 0 && num <= totalPages.value) {
    currentPage.value = num
  } else if (!val) {
    currentPage.value = 1
  }
}

const toggleRow = (index) => {
  if (expandedRows.value.includes(index)) {
    expandedRows.value = expandedRows.value.filter(i => i !== index)
  } else {
    expandedRows.value.push(index)
  }
}

const toggleAll = () => {
  if (selectedRows.value.length === displayRows.value.length) {
    selectedRows.value = []
  } else {
    selectedRows.value = displayRows.value.map((_, index) => index)
  }
}


const handleBulkDelete = () => {
  console.log('Deleting indices:', selectedRows.value)
  // Logic to delete from your data source
  selectedRows.value = [] 
}

const handleAction = (command) => {
  console.log('Action triggered:', command)
}

const handleRowAction = (command, rowData) => {
  console.log(`Executing ${command} on row:`, rowData)
  // Example: if (command === 'delete') openDeleteModal(rowData)
}

const handleRefresh = () => {
  console.log('Refreshing data for:', currentTab.value)
}

const handleSort = (label) => {
  if (sortKey.value === label) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = label
    sortOrder.value = 'asc'
  }
}

const activeTabData = computed(() => {
  const tab = props.tabs.find(t => t.id === currentTab.value)
  if (!tab) return null
  
  return {
    ...tab,
    actions: (tab.actions || []).map(a => ({
      ...a,
      icon: markRaw(iconMap[a.iconName] || Info)
    }))
  }
})

const processedTabs = computed(() => {
  return props.tabs.map(tab => ({
    ...tab,
    icon: markRaw(iconMap[tab.iconName] || Info)
  }))
})

const displayRows = computed(() => {
  let rows = [...(activeTabData.value?.rows || [])]
  if (!sortKey.value || !activeTabData.value?.headers) return rows

  const columnIndex = activeTabData.value.headers.indexOf(sortKey.value)
  if (columnIndex === -1 || sortKey.value === 'Action') return rows

  return rows.sort((a, b) => {
    // Determine if we are looking at { data: [] } or just []
    const rawA = a.data ? a.data[columnIndex] : a[columnIndex]
    const rawB = b.data ? b.data[columnIndex] : b[columnIndex]
    
    const valA = rawA ? String(rawA).toLowerCase() : ''
    const valB = rawB ? String(rawB).toLowerCase() : ''
    
    return sortOrder.value === 'asc' 
      ? valA.localeCompare(valB) 
      : valB.localeCompare(valA)
  })
})



watch(currentTab, () => {
  selectedRows.value = []
})
watch([currentTab, () => activeTabData.value?.rows], () => {
  currentPage.value = 1
})



watch(
  () => props.tabs,
  (newTabs) => {
    if (newTabs && newTabs.length > 0) {
      const tabExists = newTabs.find(t => t.id === currentTab.value)
      if (!tabExists) {
        currentTab.value = newTabs[0].id
      }
    }
  },
  { immediate: true, deep: true } 
)
</script>

<template>
  <div class="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto animate-in">
    <h1 class="text-xl font-bold tracking-tight">{{ title }}</h1>
    <div v-if="selectedRows.length > 0" class="flex justify-end animate-in fade-in zoom-in duration-200">
      <button 
        @click="handleBulkDelete"
        class="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-lg shadow-red-600/20 transition-all active:scale-95"
      >
        <Trash2 :size="14" />
        Delete {{ selectedRows.length }} {{ activeTabData.resourceName || 'Items' }}
      </button>
    </div>

    <Tabs 
      :tabs="processedTabs" 
      v-model:activeTab="currentTab"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :pageSize="pageSize"
      :totalEntries="displayRows.length"
      @update:pageSize="pageSize = $event"
      @go-page="handlePageInput"
      :actions="activeTabData?.actions"
      :showToolbar="activeTabData?.type === 'table'" 
      :showFooter="activeTabData?.type === 'table'"
      @action="handleAction"
      @refresh="handleRefresh"
    >
      <template #[currentTab]>
        
        <!--  Table Layout -->
        <div v-if="activeTabData?.type === 'table'" class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 uppercase font-bold tracking-wider">
                <th v-if="activeTabData.isSelectable" class="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    :checked="selectedRows.length === displayRows.length && displayRows.length > 0"
                    @change="toggleAll"
                    class="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500 bg-transparent"
                  >
                </th>
                
                <th v-for="header in activeTabData?.headers"
                  :key="header" 
                  @click="handleSort(header)"
                  class="px-6 py-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors group"
                >
                  <div class="flex items-center gap-2">
                    <span>{{ header }}</span>
                    <div class="flex flex-col -space-y-1">
                      <ChevronUp 
                        :size="12" 
                        :class="[sortKey === header && sortOrder === 'asc' ? 'text-blue-500 opacity-100' : 'text-zinc-500 opacity-0 group-hover:opacity-50']" 
                        class="transition-all"
                      />
                      <ChevronDown 
                        :size="12" 
                        :class="[sortKey === header && sortOrder === 'desc' ? 'text-blue-500 opacity-100' : 'text-zinc-500 opacity-0 group-hover:opacity-50']" 
                        class="transition-all"
                      />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-50 dark:divide-zinc-800/50">
              <template v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
                <tr :class="[selectedRows.includes(rowIndex) ? 'bg-blue-50/30 dark:bg-blue-600/5' : '']" class="hover:bg-zinc-50dark:hover:bg-zinc-800/10 transition-colors group border-b border-zinc-100 dark:border-zinc-800/50">
                  <td v-if="activeTabData.isSelectable" class="px-6 py-4">
                    <input 
                      type="checkbox" 
                      v-model="selectedRows" 
                      :value="rowIndex"
                      class="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500 bg-transparent"
                    >
                  </td>
                  
                  <td 
                    v-for="(header, hIndex) in activeTabData.headers" 
                    :key="hIndex" 
                    class="px-6 py-4 whitespace-nowrap"
                  >
                    <template v-if="header === 'Action'">
                        <div class="flex items-center gap-4">
                          <button 
                            v-if="activeTabData.isExpandable" 
                            @click="toggleRow(rowIndex)" 
                            class="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors text-zinc-400"
                          >
                            <ChevronDown v-if="expandedRows.includes(rowIndex)" :size="16" />
                            <ChevronRight v-else :size="16" />
                          </button>

                          <RowActions 
                            :actions="activeTabData.rowActions" 
                            :rowData="row.data || row" 
                            @action="handleRowAction"
                          />
                        </div>
                    </template>

                    <template v-else>
                        <span class="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                          {{ (row.data || row)[hIndex] }}
                        </span>
                    </template>
                  </td>
                </tr>

                <tr v-if="expandedRows.includes(rowIndex) && row.details" class="bg-zinc-50/50 dark:bg-zinc-900/40">
                  <td :colspan="activeTabData.headers.length" class="px-8 py-6">
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-200">
                      
                      <div 
                        v-for="(group, gIndex) in row.details" :key="gIndex"
                        class="bg-white dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm"
                      >
                        <div class="flex items-center gap-2 mb-4 text-zinc-400">
                          <component :is="iconMap[group.icon] || Info" :size="14" />
                          <span class="text-[10px] font-bold uppercase tracking-widest">{{ group.title }}</span>
                        </div>

                        <div v-if="group.items" class="space-y-2 text-xs">
                          <p v-for="item in group.items" :key="item.label" class="flex justify-between border-b border-zinc-100 dark:border-zinc-800/50 pb-1 last:border-0">
                            <span class="text-zinc-500">{{ item.label }}:</span>
                            <span class="font-bold text-zinc-700 dark:text-zinc-300">{{ item.value }}</span>
                          </p>
                        </div>

                        <div v-else-if="group.renderType === 'code'" class="bg-zinc-100 dark:bg-zinc-800/50 p-2 rounded text-[10px] break-all font-mono text-zinc-500">
                          {{ group.value }}
                        </div>
                        
                        <div v-else class="text-xs text-zinc-600 dark:text-zinc-400">
                          {{ group.value }}
                        </div>
                      </div>

                    </div>
                  </td>
                </tr>
                </template>
              </tbody>
          </table>
        </div>

        <!--  Card Layout -->
        <div v-else-if="activeTabData?.type === 'cards'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          <div v-for="i in 3" :key="i" class="p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/30 dark:bg-zinc-900/30">
            <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <Activity :size="20" />
              </div>
              <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Live</span>
            </div>
            <h4 class="text-sm font-bold mb-1">Statistic Block {{ i }}</h4>
            <p class="text-2xl font-black text-zinc-900 dark:text-white">0.00</p>
          </div>
        </div>

        <!-- Document Layout -->
        <div v-else-if="activeTabData?.type === 'content'" class="p-8 max-w-4xl">
          <div class="flex items-center gap-4 mb-6">
             <div class="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
               <FileText class="text-zinc-500" />
             </div>
             <div>
               <h2 class="text-lg font-bold">Documentation & Notes</h2>
               <p class="text-sm text-zinc-500">View configuration details and system guides.</p>
             </div>
          </div>
          <div class="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>This section is designed for long-form content, instructions, or detailed settings that don't fit into a grid or table format.</p>
          </div>
        </div>

        <!-- CUSTOM COMPONENT INJECTION -->
        <div v-else-if="activeTabData?.type === 'component'" class="p-6 md:p-10">
          <component 
            :is="activeTabData.component" 
            v-bind="activeTabData.props" 
          />
        </div>

        <!-- Default State -->
        <div v-else class="flex flex-col items-center justify-center py-20 text-zinc-400">
          <Info :size="40" class="mb-4 opacity-20" />
          <p class="text-sm font-medium">Select a valid tab to view content</p>
        </div>

      </template>
    </Tabs>
  </div>
</template>

<style scoped>
.animate-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>