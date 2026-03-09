<script setup>
import { ref, watch, computed, markRaw } from 'vue'
import RowActions from '@/components/RowActions.vue'
import Tabs from '@/components/Tabs.vue'
import { 
  Radio, HardDrive, Zap, Users, Laptop, Info, 
  Ticket, Receipt, Settings, Activity, Plus, Download, 
  ChevronUp, ChevronDown, LayoutGrid, FileText
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

const iconMap = { 
  Radio, HardDrive, Zap, Users, Laptop, Info, 
  Ticket, Receipt, Settings, Activity, Plus, 
  Download, LayoutGrid, FileText
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
    const valA = a[columnIndex] ? String(a[columnIndex]).toLowerCase() : ''
    const valB = b[columnIndex] ? String(b[columnIndex]).toLowerCase() : ''
    
    if (sortOrder.value === 'asc') {
      return valA.localeCompare(valB)
    } else {
      return valB.localeCompare(valA)
    }
  })
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

    <Tabs 
      :tabs="processedTabs" 
      v-model:activeTab="currentTab"
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
                <th 
                  v-for="header in activeTabData?.headers" 
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
              <template v-if="displayRows.length > 0">
                <tr 
                  v-for="(row, rowIndex) in displayRows" 
                  :key="rowIndex"
                  class="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors group"
                >
                  <td 
                    v-for="(cell, cellIndex) in row" 
                    :key="cellIndex"
                    class="px-6 py-4 text-zinc-600 dark:text-zinc-400"
                  >
                    {{ cell }}
                  </td>

                  <td v-if="activeTabData.headers.includes('Action')" class="px-6 py-4 text-right">
                    <button class="text-blue-500 hover:text-blue-600 font-bold">Edit</button>
                  </td>
                  <td v-if="activeTabData.headers.includes('Action')" class="px-6 py-4 text-right">
                    <RowActions 
                      :actions="activeTabData.rowActions" 
                      :rowData="row"
                      @action="handleRowAction" 
                    />
                  </td>
                </tr>
              </template>

              <tr v-else>
                <td :colspan="activeTabData?.headers?.length" class="py-20 text-center text-zinc-500 italic">
                  No records found.
                </td>
              </tr>
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

        <!-- Content/Document Layout -->
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