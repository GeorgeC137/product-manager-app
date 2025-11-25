<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-2xl font-bold text-primary">Product Details</h1>
      </div>
    </nav>
    
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p class="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
      
      <div v-else-if="product" class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="md:flex">
          <div class="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
            <img :src="product.thumbnail" :alt="product.title" class="w-full max-w-md rounded-xl shadow-md" />
          </div>
          
          <div class="md:w-1/2 p-8">
            <div class="mb-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary">
                {{ product.category }}
              </span>
            </div>
            
            <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ product.title }}</h2>
            
            <p class="text-gray-600 mb-6 leading-relaxed">{{ product.description }}</p>
            
            <div class="bg-gray-50 rounded-xl p-6 space-y-4 mb-6">
              <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                <span class="text-gray-600 font-medium">Price</span>
                <span class="text-3xl font-bold text-primary">${{ product.price }}</span>
              </div>
              <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                <span class="text-gray-600 font-medium">Stock Available</span>
                <span class="text-lg font-semibold text-gray-900">{{ product.stock }} units</span>
              </div>
              <div v-if="product.rating" class="flex justify-between items-center pb-3 border-b border-gray-200">
                <span class="text-gray-600 font-medium">Rating</span>
                <div class="flex items-center gap-2">
                  <span class="text-lg font-semibold text-gray-900">{{ product.rating }}</span>
                  <span class="text-yellow-500">★</span>
                </div>
              </div>
              <div v-if="product.discountPercentage" class="flex justify-between items-center">
                <span class="text-gray-600 font-medium">Discount</span>
                <span class="text-lg font-semibold text-green-600">{{ product.discountPercentage }}% OFF</span>
              </div>
            </div>
            
            <div class="flex gap-3">
              <button 
                @click="router.push('/products')"
                class="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                ← Back
              </button>
              <button 
                @click="handleDelete"
                class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold shadow-lg"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/product'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const product = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    product.value = await productStore.fetchProductById(route.params.id)
  } catch (error) {
    console.error('Error fetching product:', error)
  } finally {
    loading.value = false
  }
})

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await productStore.deleteProduct(product.value.id)
      router.push('/products')
    } catch (error) {
      alert('Error deleting product')
    }
  }
}
</script>
