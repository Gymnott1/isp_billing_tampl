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
    class="flex items-center gap-3 px-3 py-2.5 rounded-lg shrink-0 transition-all duration-200"
    :style="isActive ? { 
      backgroundColor: 'var(--sidebar-primary)', 
      color: 'var(--sidebar-primary-foreground)',
      boxShadow: '0 4px 12px -2px rgba(0,0,0,0.1)' 
    } : {
      color: 'var(--sidebar-foreground)'
    }"
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