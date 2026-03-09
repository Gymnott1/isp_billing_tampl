<script setup>
import { Sun, Moon, Monitor, Plus, Pipette, Check } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import { ref } from 'vue' 

const themeStore = useThemeStore()
const colorInput = ref(null)

const modes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor }
]

const presets = [
  { id: 'blue', label: 'Blue', color: 'bg-blue-500' },
  { id: 'violet', label: 'Violet', color: 'bg-violet-500' },
  { id: 'green', label: 'Green', color: 'bg-green-500' },
  { id: 'orange', label: 'Orange', color: 'bg-orange-500' },
  { id: 'red', label: 'Red', color: 'bg-red-500' },
  { id: 'rose', label: 'Rose', color: 'bg-rose-500' },
  { id: 'zinc', label: 'Zinc', color: 'bg-zinc-500' }
]

const handleCustomColor = (e) => {
  themeStore.applyAccentColor(e.target.value, true)
}
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
   
        <section>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Color Theme</h3>
          <p class="text-xs text-zinc-500">Select a preset or choose a custom brand color.</p>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <!-- Preset Buttons -->
        <button 
          v-for="opt in presets" :key="opt.id"
          @click="themeStore.applyAccentColor(opt.id)"
          :class="[themeStore.accentColor === opt.id ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#09090b] ring-zinc-400' : 'border-zinc-200 dark:border-zinc-800 opacity-70 hover:opacity-100']"
          class="flex items-center gap-3 p-3 border rounded-xl transition-all bg-white dark:bg-zinc-900 shadow-sm active:scale-95"
        >
          <div :class="opt.color" class="w-5 h-5 rounded-full shadow-inner"></div>
          <span class="text-xs font-bold text-zinc-700 dark:text-zinc-300">{{ opt.label }}</span>
          <Check v-if="themeStore.accentColor === opt.id" :size="14" class="ml-auto text-zinc-400" />
        </button>

        <!-- Custom Color Button -->
        <button 
          @click="colorInput.click()"
          :class="[themeStore.accentColor === 'custom' ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#09090b] ring-zinc-400' : 'border-zinc-200 dark:border-zinc-800 opacity-70 hover:opacity-100']"
          class="flex items-center gap-3 p-3 border rounded-xl transition-all bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden active:scale-95"
        >
          <div 
            :style="{ backgroundColor: themeStore.customHex || '#3b82f6' }" 
            class="w-5 h-5 rounded-full shadow-inner flex items-center justify-center"
          >
            <Plus v-if="!themeStore.customHex" :size="10" class="text-white" />
          </div>
          <span class="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            {{ themeStore.accentColor === 'custom' ? themeStore.customHex : 'Custom' }}
          </span>
          <Pipette :size="14" class="ml-auto text-zinc-400" />
          
          <!-- Hidden Native Color Picker -->
          <input 
            ref="colorInput"
            type="color" 
            :value="themeStore.customHex || '#3b82f6'"
            @input="handleCustomColor"
            class="absolute inset-0 opacity-0 cursor-pointer"
          />
        </button>
      </div>
    </section>
  </div>
</template>


<style scoped>
button {
  -webkit-tap-highlight-color: transparent;
}
</style>