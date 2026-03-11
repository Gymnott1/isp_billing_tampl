import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(localStorage.getItem('isLoggedIn') === 'true')
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)

    const login = async(email) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                isAuthenticated.value = true
                user.value = { email, name: email.split('@')[0] }
                localStorage.setItem('isLoggedIn', 'true')
                localStorage.setItem('user', JSON.stringify(user.value))
                resolve(true)
            }, 1000)
        })
    }

    const logout = () => {
        isAuthenticated.value = false
        user.value = null
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('user')
    }

    return { isAuthenticated, user, login, logout }
})