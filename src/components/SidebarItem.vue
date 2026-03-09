<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to: { type: String, required: true },
  icon: { type: [Object, Function], required: true },  
  label: { type: String, default: '' }
})

const route = useRoute()

const isActive = computed(() => {
  if (props.to === '/') return route.path === '/'
  return route.path.startsWith(props.to)
})
</script>

<template>
  <router-link 
    :to="to"
    class="flex items-center gap-3 px-3 py-2.5 rounded-lg shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    :class="[
      isActive 
        ? 'bg-primary text-white shadow-lg shadow-blue-600/20 active:scale-[0.98]' 
        : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white active:bg-zinc-200 dark:active:bg-zinc-700'
    ]"
    style="transition: background-color 0.2s ease, color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;"
  >
    <component :is="icon" :size="20" class="shrink-0" />
    
    <span 
      v-if="label" 
      class="text-sm font-medium whitespace-nowrap"
    >
      {{ label }}
    </span>
  </router-link>
</template>

<style scoped>
a {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
</style>