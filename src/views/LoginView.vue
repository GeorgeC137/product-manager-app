<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-blue-50">
    <div class="max-w-md w-full mx-4">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-primary mb-2">Product Manager</h1>
        <p class="text-gray-600">Sign in to manage your products</p>
      </div>
      
      <div class="bg-white rounded-xl shadow-xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-gray-700 text-sm font-semibold mb-2">Username</label>
            <input 
              v-model="username" 
              type="text" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="Enter your username"
            />
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input 
              v-model="password" 
              type="password" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-primary text-white py-2.5 px-4 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition shadow-lg"
          >
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
          
          <p v-if="error" class="text-sm text-center font-semibold" style="color: #dc2626;">{{ error }}</p>
        </form>
        
        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-600 text-center">Demo credentials:</p>
          <p class="text-sm font-mono text-center text-primary mt-1">emilys / emilyspass</p>
        </div>
      </div>
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
