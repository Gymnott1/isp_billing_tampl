<script setup>
import { ref, watch, computed, markRaw } from 'vue'
import Tabs from '@/components/Tabs.vue'
// Import all icons you intend to use in the router
import { 
  Radio, HardDrive, Zap, Users, Laptop, Info, 
  Ticket, Receipt, Settings, Activity 
} from 'lucide-vue-next'

const props = defineProps({
  title: String,
  tabs: {
    type: Array,
    default: () => []
  }
})

// 1. Map string names to Lucide components
const iconMap = { 
  Radio, HardDrive, Zap, Users, Laptop, Info, 
  Ticket, Receipt, Settings, Activity 
}

// 2. Process tabs reactively. This updates whenever props.tabs changes.
const processedTabs = computed(() => {
  return props.tabs.map(tab => ({
    ...tab,
    icon: markRaw(iconMap[tab.iconName] || Info)
  }))
})

// 3. Track the current active tab
const currentTab = ref('')

// 4. CRUCIAL: Watch for changes in tabs to reset the active tab
// This runs every time you click a new menu item in the sidebar
watch(
  () => props.tabs,
  (newTabs) => {
    if (newTabs && newTabs.length > 0) {
      currentTab.value = newTabs[0].id
    }
  },
  { immediate: true } // Run immediately on load too
)
</script>

<template>
  <div class="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
    <h1 class="text-xl font-bold">{{ title }}</h1>

    <Tabs 
      :tabs="processedTabs" 
      v-model:activeTab="currentTab"
    >
      <!-- Dynamic Slot Rendering -->
      <template v-for="tab in props.tabs" :key="tab.id" #[tab.id]>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 uppercase font-bold tracking-wider">
                <th class="px-6 py-4">User</th>
                <th class="px-6 py-4">Address / MAC</th>
                <th class="px-6 py-4">Mikrotik</th>
                <th class="px-6 py-4">Status / Expiry</th>
                <th class="px-6 py-4">Used Data</th>
                <th class="px-6 py-4">Session Uptime</th>
                <th class="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <!-- Empty state is handled inside Tabs.vue slot default -->
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