import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    isLoading: false,
    error: null
  }),
  
  actions: {
    async fetchProducts() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=100')
        this.products = response.data.products
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },
    
    async fetchProductById(id) {
      const response = await axios.get(`https://dummyjson.com/products/${id}`)
      return response.data
    },
    
    async addProduct(payload) {
      const authStore = useAuthStore()
      const response = await axios.post('https://dummyjson.com/products/add', payload, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      })
      this.products.unshift(response.data)
      return response.data
    },
    
    async updateProduct(id, payload) {
      const authStore = useAuthStore()
      const response = await axios.put(`https://dummyjson.com/products/${id}`, payload, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      })
      const index = this.products.findIndex(p => p.id === id)
      if (index !== -1) this.products[index] = response.data
      return response.data
    },
    
    async deleteProduct(id) {
      const authStore = useAuthStore()
      await axios.delete(`https://dummyjson.com/products/${id}`, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      })
      this.products = this.products.filter(p => p.id !== id)
    }
  }
})
