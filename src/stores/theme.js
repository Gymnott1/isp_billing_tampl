import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const theme = ref(localStorage.getItem('theme') || 'system')
    const accentColor = ref(localStorage.getItem('accentColor') || 'blue')
    const customHex = ref(localStorage.getItem('customHex') || '')

    const applyTheme = (mode) => {
        const isDark = mode === 'dark' ||
            (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        document.documentElement.classList.toggle('dark', isDark)
        localStorage.setItem('theme', mode)
        theme.value = mode
    }

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : null;
    }

    const applyAccentColor = (color, isCustom = false) => {

        document.documentElement.classList.forEach(cls => {
            if (cls.startsWith('theme-')) document.documentElement.classList.remove(cls)
        })
        document.documentElement.style.removeProperty('--primary')

        if (isCustom) {
            const rgb = hexToRgb(color)
            if (rgb) {
                document.documentElement.style.setProperty('--primary', rgb)
                customHex.value = color
                accentColor.value = 'custom'
            }
        } else {
            document.documentElement.classList.add(`theme-${color}`)
            accentColor.value = color
            customHex.value = ''
        }

        localStorage.setItem('accentColor', accentColor.value)
        localStorage.setItem('customHex', customHex.value)
    }

    return { theme, accentColor, customHex, applyTheme, applyAccentColor }
})