<script setup>
import { ref, watch, computed, markRaw } from 'vue'
import Tabs from '@/components/Tabs.vue'
import { 
  Radio, HardDrive, Zap, Users, Laptop, Info, 
  Ticket, Receipt, Settings, Activity , Plus, Download, ChevronUp, ChevronDown 
} from 'lucide-vue-next'

const props = defineProps({
  title: String,
  tabs: Array
})

const sortKey = ref('')
const sortOrder = ref('asc')


const tableActions = [
  { label: 'Add New', icon: markRaw(Plus), command: 'add' },
  { label: 'Export', icon: markRaw(Download), command: 'export' }
]


const handleAction = (command) => {
  console.log('Button clicked:', command)
  // Logic for add or export goes here
}

const currentTab = ref(props.tabs[0]?.id || '')

const handleRefresh = () => {
  console.log('Refreshing data...')
}

const handleSort = (label) => {
  if (sortKey.value === label) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = label
    sortOrder.value = 'asc'
  }
  console.log(`Sorting by ${label} in ${sortOrder.value} order`)
}

const iconMap = { 
  Radio, HardDrive, Zap, Users, Laptop, Info, 
  Ticket, Receipt, Settings, Activity 
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


watch(
  () => props.tabs,
  (newTabs) => {
    if (newTabs && newTabs.length > 0) {
      currentTab.value = newTabs[0].id
    }
  },
  { immediate: true } 
)
</script>

<template>
  <div class="p-4 md:p-8 space-y-6">
    <h1 class="text-xl font-bold">{{ title }}</h1>

    <Tabs 
      :tabs="processedTabs" 
      v-model:activeTab="currentTab"
      :actions="activeTabData?.actions" 
    >
      <template #[currentTab]>
        <div class="overflow-x-auto">
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
                        :class="[
                          sortKey === header && sortOrder === 'asc' 
                            ? 'text-blue-500 opacity-100' 
                            : 'text-zinc-500 opacity-0 group-hover:opacity-50'
                        ]" 
                        class="transition-all"
                      />
                      <ChevronDown 
                        :size="12" 
                        :class="[
                          sortKey === header && sortOrder === 'desc' 
                            ? 'text-blue-500 opacity-100' 
                            : 'text-zinc-500 opacity-0 group-hover:opacity-50'
                        ]" 
                        class="transition-all"
                      />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!activeTabData" class="text-center text-zinc-500">
                <td :colspan="activeTabData?.headers.length || 1" class="py-6">No data available</td>
              </tr>
              <tr v-else class="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                <td class="px-6 py-4">Example User</td>
                <td class="px-6 py-4">Example Service</td>
              </tr>
           
            </tbody>
          </table>
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