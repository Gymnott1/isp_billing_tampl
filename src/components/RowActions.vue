<!-- src/components/RowActions.vue -->
<script setup>
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import { MoreVertical, Eye, Edit, Trash2, Shield, Power } from 'lucide-vue-next'

const props = defineProps({
  actions: Array,
  rowData: Array  
})

const emit = defineEmits(['action'])
const isOpen = ref(false)
const menuRef = ref(null)

const iconMap = { Eye, Edit, Trash2, Shield, Power }

const toggle = () => isOpen.value = !isOpen.value
const close = (e) => {
  if (menuRef.value && !menuRef.value.contains(e.target)) isOpen.value = false
}

onMounted(() => window.addEventListener('click', close))
onUnmounted(() => window.removeEventListener('click', close))
</script>

<template>
  <div class="relative inline-block text-left" ref="menuRef">
    <button @click.stop="toggle" class="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
      <MoreVertical :size="16" class="text-zinc-500" />
    </button>

    <div v-if="isOpen" 
      class="absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 py-1.5 overflow-hidden animate-in fade-in slide-in-from-bottom-2"
    >
      <button 
        v-for="action in actions" :key="action.command"
        @click.stop="emit('action', action.command, rowData); isOpen = false"
        class="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
        :class="[
          action.color === 'red' ? 'text-red-500' : 
          action.color === 'blue' ? 'text-blue-500' : 'text-zinc-600 dark:text-zinc-300'
        ]"
      >
        <component :is="iconMap[action.iconName]" :size="14" />
        {{ action.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-in { animation: enter 0.15s ease-out; }
@keyframes enter {
  from { opacity: 0; transform: translateY(4px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>