import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const theme = ref(localStorage.getItem('theme') || 'system')

    const applyTheme = (mode) => {
        const isDark = mode === 'dark' ||
            (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

        document.documentElement.classList.toggle('dark', isDark)
        localStorage.setItem('theme', mode)
        theme.value = mode
    }

    // Watch for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (theme.value === 'system') applyTheme('system')
    })

    return { theme, applyTheme }
})