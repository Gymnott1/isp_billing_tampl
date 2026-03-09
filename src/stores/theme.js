import { defineStore } from 'pinia'
import { ref } from 'vue'
import { themes } from './colors'

export const useThemeStore = defineStore('theme', () => {
    const theme = ref(localStorage.getItem('theme') || 'system')
    const accentName = ref(localStorage.getItem('accentName') || 'blue')

    const injectVariables = (mode, name) => {
        const root = document.documentElement
        const selectedTheme = themes.find(t => t.name === name) || themes[0]

        const activeMode = mode === 'system' ?
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') :
            mode

        const variables = selectedTheme[activeMode]

        Object.entries(variables).forEach(([key, value]) => {
            root.style.setProperty(key, value)
        })
    }

    const applyTheme = (mode) => {
        theme.value = mode
        localStorage.setItem('theme', mode)
        document.documentElement.classList.toggle('dark', mode === 'dark')
        injectVariables(mode, accentName.value)
    }

    const applyAccentColor = (name) => {
        accentName.value = name
        localStorage.setItem('accentName', name)
        injectVariables(theme.value, name)
    }

    return { theme, accentName, applyTheme, applyAccentColor }
})