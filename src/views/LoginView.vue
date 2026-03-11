<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Loader2 , Globe, Wifi, ShieldCheck} from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('user@example.com')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  await authStore.login(email.value)
  const redirectPath = route.query.redirect || '/'
  router.push(redirectPath)
}
</script>

<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100">
    
    <div class="lg:hidden p-6 flex items-center gap-2">
      <img src="/assets/logo.png" class="w-8 h-8" alt="Logo" />
      <span class="font-bold tracking-tight">Netic ISP</span>
    </div>

    <div class="flex-1 flex items-center justify-center p-8 lg:p-24">
      <div class="w-full max-w-[350px] space-y-8">
        
        <div class="hidden lg:flex items-center gap-2 mb-12 absolute top-10 left-10">
          <img src="/assets/logo.png" class="w-8 h-8" alt="Logo" />
          <span class="font-bold tracking-tight">Netic ISP</span>
        </div>

        <div class="text-center space-y-2">
          <h1 class="text-xl font-bold tracking-tight">Login to your account</h1>
          <p class="text-xs text-zinc-500">Enter your email below to login to your account</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Email</label>
            <input v-model="email" type="email" placeholder="user@example.com" class="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" required />
          </div>

          <div class="space-y-1.5">
            <div class="flex justify-between items-center">
              <label class="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Password</label>
              <a href="#" class="text-[10px] font-bold text-zinc-500 hover:text-blue-500 transition-colors">Forgot your password?</a>
            </div>
            <input v-model="password" type="password" class="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" required />
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Loader2 v-if="isLoading" class="animate-spin" :size="16" />
            {{ isLoading ? 'Signing in...' : 'Login' }}
          </button>
        </form>

        <div class="relative py-4">
          <div class="absolute inset-0 flex items-center"><span class="w-full border-t border-zinc-100 dark:border-zinc-800"></span></div>
          <div class="relative flex justify-center text-[10px] uppercase font-bold text-zinc-400"><span class="bg-white dark:bg-[#09090b] px-2">Or continue with</span></div>
        </div>

        <button class="w-full flex items-center justify-center gap-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all active:scale-[0.98]">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-4 h-4" alt="Google" />
          Login with Google
        </button>

        <div class="text-center">
          <p class="text-[10px] text-zinc-500">Need Help?</p>
          <a href="tel:+254790882866" class="text-[11px] font-bold underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700">Call/WhatsApp +254 790 882866</a>
        </div>
      </div>
    </div>

    <div class="hidden lg:flex flex-1 relative bg-zinc-900 overflow-hidden">
    
      <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=2070" class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" alt="Welcome" />
      
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

      <div class="relative z-10 flex flex-col justify-end p-20 space-y-4">
        <h2 class="text-5xl font-black tracking-tight leading-none">Welcome Back!</h2>
        <p class="text-xl text-zinc-400 font-medium max-w-md">Log in to manage your account and access your ISP dashboard.</p>

        <div class="pt-10 flex gap-4 opacity-30">
          <div class="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white">
            <Globe :size="20" stroke-width="1.5" />
          </div>
          <div class="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white">
            <Wifi :size="20" stroke-width="1.5" />
          </div>
          <div class="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white">
            <ShieldCheck :size="20" stroke-width="1.5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>