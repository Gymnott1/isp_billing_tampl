<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { MoreVertical, Eye, Edit, Trash2, Shield, Power } from 'lucide-vue-next'

const props = defineProps({
  actions: Array,
  rowData: Array
})

const emit = defineEmits(['action'])
const isOpen = ref(false)
const triggerRef = ref(null)
const menuStyles = ref({ top: '0px', left: '0px' })

const iconMap = { Eye, Edit, Trash2, Shield, Power }

const toggle = (e) => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    const rect = triggerRef.value.getBoundingClientRect()
    menuStyles.value = {
      top: `${rect.bottom + window.scrollY + 5}px`, 
      left: `${rect.right - 192 + window.scrollX}px` 
    }
  }
}

const close = (e) => {
  if (isOpen.value && triggerRef.value && !triggerRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => window.addEventListener('click', close))
onUnmounted(() => window.removeEventListener('click', close))
</script>

<template>
  <div class="relative inline-block">
    <button 
      ref="triggerRef"
      @click.stop="toggle" 
      class="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
    >
      <MoreVertical :size="16" class="text-zinc-500" />
    </button>
    <Teleport to="body">
      <div v-if="isOpen" 
        :style="menuStyles"
        class="fixed w-48 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl z-[9999] py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
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
    </Teleport>
  </div>
</template>

<style scoped>
.animate-in {
  animation: enter 0.1s ease-out;
}
@keyframes enter {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>