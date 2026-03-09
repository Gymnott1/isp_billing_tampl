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
    class="flex items-center gap-3 px-3 py-2.5 rounded-lg shrink-0 outline-none"
    :class="[
      isActive 
        ? 'shadow-lg' 
        : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
    ]"
    :style="isActive ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}"
  >
    <component :is="icon" :size="20" class="shrink-0" />
    <span v-if="label" class="text-sm font-medium">{{ label }}</span>
  </router-link>
</template>

<style scoped>
a {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
</style>