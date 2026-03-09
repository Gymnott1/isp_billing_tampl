<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import MainLayout from './layouts/MainLayout.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.applyTheme(themeStore.theme)
})
</script>

<template>
  <MainLayout />
</template>