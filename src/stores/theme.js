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

    // Ensure this function name is EXACTLY "applyAccentColor"
    const applyAccentColor = (color) => {
        // 1. Clean up old classes
        document.documentElement.classList.forEach(cls => {
                if (cls.startsWith('theme-')) document.documentElement.classList.remove(cls)
            })
            // 2. Add new class
        document.documentElement.classList.add(`theme-${color}`)
            // 3. Update state
        accentColor.value = color
        localStorage.setItem('accentColor', color)
    }

    // EVERYTHING must be in this return object
    return {
        theme,
        accentColor,
        applyTheme,
        applyAccentColor
    }
})