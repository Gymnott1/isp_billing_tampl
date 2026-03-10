<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
onMounted(() => themeStore.applyTheme(themeStore.theme))
</script>

<template>
  <router-view />
</template>