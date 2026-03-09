import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const theme = ref(localStorage.getItem('theme') || 'system')
    const accentColor = ref(localStorage.getItem('accentColor') || 'blue')

    const applyTheme = (mode) => {
        const isDark = mode === 'dark' ||
            (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

        document.documentElement.classList.toggle('dark', isDark)
        localStorage.setItem('theme', mode)
        theme.value = mode
    }

    const applyAccentColor = (color) => {
        document.documentElement.classList.remove(`theme-${accentColor.value}`)
        document.documentElement.classList.add(`theme-${color}`)

        localStorage.setItem('accentColor', color)
        accentColor.value = color
    }

    return { theme, accentColor, applyTheme, applyAccentColor }
})