<script setup>
import { Sun, Moon, Monitor, Check } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const modes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor }
]

const colorOptions = [
  { id: 'blue', label: 'Blue', color: 'bg-blue-500' },
  { id: 'yellow', label: 'Yellow', color: 'bg-yellow-500' },
  { id: 'violet', label: 'Violet', color: 'bg-violet-500' },
  { id: 'green', label: 'Green', color: 'bg-green-500' },
  { id: 'orange', label: 'Orange', color: 'bg-orange-500' },
  { id: 'red', label: 'Red', color: 'bg-red-500' },
  { id: 'rose', label: 'Rose', color: 'bg-rose-500' },
  { id: 'zinc', label: 'Zinc', color: 'bg-zinc-500' }
]

</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4">
    <section>
      <h3 class="text-sm font-bold text-zinc-900 dark:text-white mb-4">Appearance</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          v-for="mode in modes" :key="mode.id"
          @click="themeStore.applyTheme(mode.id)"
          :class="[themeStore.theme === mode.id ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-zinc-200 dark:border-zinc-800']"
          class="relative flex flex-col gap-3 p-4 border rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all text-left group"
        >
          <div :class="[themeStore.theme === mode.id ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800']"
            class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors">
            <component :is="mode.icon" :size="20" />
          </div>
          <div>
            <p class="text-xs font-bold">{{ mode.label }} Mode</p>
            <p class="text-[10px] text-zinc-500">Set the dashboard to {{ mode.id }} display.</p>
          </div>
          <Check v-if="themeStore.theme === mode.id" :size="14" class="absolute top-4 right-4 text-blue-600" />
        </button>
      </div>
    </section>
  </div>
</template>