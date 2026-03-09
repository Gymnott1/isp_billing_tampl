<script setup>
import { Sun, Moon, Monitor, Check } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps(['currentTheme']) 

const selectedColor = ref('blue')
const colors = [
  { name: 'blue', class: 'bg-blue-600' },
  { name: 'pink', class: 'bg-pink-600' },
  { name: 'emerald', class: 'bg-emerald-600' },
  { name: 'indigo', class: 'bg-indigo-600' }
]
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Appearance Section -->
    <section>
      <h3 class="text-sm font-bold text-zinc-900 dark:text-white mb-4">Appearance</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button v-for="mode in ['Light', 'Dark', 'System']" :key="mode"
          class="flex flex-col gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all text-left group"
        >
          <div class="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:scale-110 transition-transform">
            <Sun v-if="mode === 'Light'" :size="20" />
            <Moon v-if="mode === 'Dark'" :size="20" />
            <Monitor v-if="mode === 'System'" :size="20" />
          </div>
          <div>
            <p class="text-xs font-bold">{{ mode }} Mode</p>
            <p class="text-[10px] text-zinc-500">Set the dashboard to {{ mode.toLowerCase() }} display.</p>
          </div>
        </button>
      </div>
    </section>

    <!-- Accent Color Section -->
    <section>
      <h3 class="text-sm font-bold text-zinc-900 dark:text-white mb-4">Accent Color</h3>
      <div class="flex items-center gap-4">
        <button 
          v-for="color in colors" :key="color.name"
          @click="selectedColor = color.name"
          :class="[color.class, selectedColor === color.name ? 'ring-4 ring-offset-4 ring-offset-white dark:ring-offset-[#09090b] ring-blue-500' : '']"
          class="w-12 h-12 rounded-full transition-all flex items-center justify-center text-white"
        >
          <Check v-if="selectedColor === color.name" :size="20" />
        </button>
      </div>
    </section>
  </div>
</template>