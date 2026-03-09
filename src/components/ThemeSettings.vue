<script setup>
import { Sun, Moon, Monitor, Check, Info } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import { themes } from '@/stores/colors' 

const themeStore = useThemeStore()

const modes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor }
]
</script>

<template>
  <div class="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 p-2 max-w-6xl">
    
    <section>
      <div class="mb-6">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Appearance</h3>
        <p class="text-xs text-zinc-500">Choose how the dashboard looks on your device.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          v-for="mode in modes" :key="mode.id"
          @click="themeStore.applyTheme(mode.id)"
          :class="[
            themeStore.theme === mode.id 
              ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-sm' 
              : 'border-zinc-200 dark:border-zinc-800'
          ]"
          class="relative flex flex-col gap-3 p-5 border rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all text-left group active:scale-[0.98]"
        >
          <div 
            :class="[
              themeStore.theme === mode.id 
                ? 'text-primary bg-primary/10' 
                : 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800'
            ]"
            class="w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-inner"
          >
            <component :is="mode.icon" :size="22" />
          </div>
          <div>
            <p class="text-sm font-bold">{{ mode.label }} Mode</p>
            <p class="text-[11px] text-zinc-500 leading-relaxed">Switch to {{ mode.id }} mode for the interface.</p>
          </div>
          
          <div v-if="themeStore.theme === mode.id" class="absolute top-5 right-5 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
             <Check :size="12" class="text-white font-bold" />
          </div>
        </button>
      </div>
    </section>
    <section>
      <div class="mb-6">
        <h3 class="text-sm font-bold text-zinc-900 dark:text-white">Pro Color Themes</h3>
        <p class="text-xs text-zinc-500">Select a high-fidelity palette from the OKLCH system.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          v-for="t in themes" :key="t.name"
          @click="themeStore.applyAccentColor(t.name)"
          :class="[
            themeStore.accentName === t.name 
              ? 'ring-2 ring-primary border-transparent shadow-xl translate-y-[-2px]' 
              : 'border-zinc-200 dark:border-zinc-800 opacity-80 hover:opacity-100'
          ]"
          class="flex items-center gap-4 p-5 border rounded-2xl transition-all bg-white dark:bg-zinc-900 group active:scale-95"
        >
          <div :class="t.color" class="w-8 h-8 rounded-full shadow-lg group-hover:scale-110 transition-transform ring-4 ring-white dark:ring-zinc-800"></div>
          
          <div class="flex flex-col text-left">
            <span class="text-xs font-bold text-zinc-900 dark:text-white">{{ t.label }}</span>
            <span class="text-[10px] text-zinc-400 font-medium uppercase tracking-tighter">System Override</span>
          </div>

          <div v-if="themeStore.accentName === t.name" class="ml-auto w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Check :size="14" class="text-primary" />
          </div>
        </button>
      </div>
    </section>

    <div class="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
      <Info :size="16" class="text-zinc-400 mt-0.5" />
      <p class="text-[11px] text-zinc-500 leading-relaxed">
        These themes use the <strong class="text-zinc-700 dark:text-zinc-300">OKLCH color space</strong> to ensure perceptually uniform lightness and chroma across both light and dark modes. Settings are automatically saved.
      </p>
    </div>
  </div>
</template>

<style scoped>
button {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.shadow-primary {
  box-shadow: 0 10px 15px -3px rgba(var(--primary), 0.3);
}
</style>