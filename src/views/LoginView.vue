<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-float-delayed"></div>
    </div>
    
    <div class="max-w-md w-full relative z-10">
      <!-- Header Section -->
      <div class="text-center mb-8 animate-fade-in">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text mb-2">
          Product Manager
        </h1>
        <p class="text-gray-500">Sign in to manage your products</p>
      </div>
      
      <!-- Login Card -->
      <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-100 animate-slide-up">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Username Field -->
          <div class="group">
            <label class="block text-gray-700 text-sm font-semibold mb-2 transition-colors group-focus-within:text-primary">
              Username
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <input 
                v-model="username" 
                type="text" 
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-gray-50/50 focus:bg-white"
                placeholder="Enter your username"
              />
            </div>
          </div>
          
          <!-- Password Field -->
          <div class="group">
            <label class="block text-gray-700 text-sm font-semibold mb-2 transition-colors group-focus-within:text-primary">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input 
                v-model="password" 
                type="password" 
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-gray-50/50 focus:bg-white"
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-3 animate-shake">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-sm text-red-600 font-medium">{{ error }}</p>
            </div>
          </div>
          
          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-gradient-to-r from-primary to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span v-if="loading" class="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
          </button>
        </form>
        
        <!-- Demo Credentials -->
        <div class="mt-6 pt-6 border-t border-gray-100">
          <div class="bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-xl p-4">
            <p class="text-xs text-gray-500 text-center mb-2 uppercase tracking-wider font-semibold">Demo Credentials</p>
            <div class="flex items-center justify-center space-x-2">
              <code class="px-3 py-1 bg-white rounded-lg text-sm font-mono text-primary border border-gray-200">emilys</code>
              <span class="text-gray-400">/</span>
              <code class="px-3 py-1 bg-white rounded-lg text-sm font-mono text-primary border border-gray-200">emilyspass</code>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <p class="text-center text-sm text-gray-500 mt-6">
        Secure login powered by your authentication system
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await authStore.login({ username: username.value, password: password.value })
    router.push('/products')
  } catch (err) {
    error.value = 'Invalid username or password'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(20px) translateX(-10px); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out 0.2s both;
}

.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>