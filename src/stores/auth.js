import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  
  actions: {
    async login(credentials) {
      const response = await axios.post('https://dummyjson.com/auth/login', credentials)
      this.token = response.data.accessToken
      this.user = response.data
      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    
    restoreSession() {
      this.token = localStorage.getItem('token')
      this.user = JSON.parse(localStorage.getItem('user') || 'null')
    }
  }
})
