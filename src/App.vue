<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import MainLayout from './layouts/MainLayout.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.applyTheme(themeStore.theme)
  
  if (themeStore.accentColor === 'custom') {
    themeStore.applyAccentColor(themeStore.customHex, true)
  } else {
    themeStore.applyAccentColor(themeStore.accentColor)
  }
})
</script>

<template>
  <MainLayout />
</template>