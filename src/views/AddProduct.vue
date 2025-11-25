<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-2xl font-bold text-primary">Add New Product</h1>
        <p class="text-sm text-gray-600 mt-1">Fill in the details to create a new product</p>
      </div>
    </nav>
    
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <div>
            <label class="block text-gray-700 text-sm font-semibold mb-2">
              Product Title <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.title" 
              type="text" 
              required
              placeholder="Enter product title"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-semibold mb-2">Description</label>
            <textarea 
              v-model="form.description" 
              rows="3"
              placeholder="Enter product description"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-semibold mb-2">Category</label>
            <input 
              v-model="form.category" 
              type="text"
              placeholder="e.g., Electronics, Beauty, Fashion"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-gray-700 text-sm font-semibold mb-2">
                Price <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-4 top-2.5 text-gray-500 mr-4 font-semibold">$</span>
                <input 
                  v-model.number="form.price" 
                  type="number" 
                  step="0.01"
                  required
                  placeholder="0.00"
                  class="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-gray-700 text-sm font-semibold mb-2">Stock Quantity</label>
              <input 
                v-model.number="form.stock" 
                type="number"
                placeholder="0"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-semibold mb-2">Thumbnail URL</label>
            <input 
              v-model="form.thumbnail" 
              type="url"
              placeholder="https://example.com/image.jpg"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>
          
          <div class="flex gap-4 pt-4">
            <button 
              type="button"
              @click="router.push('/products')"
              class="flex-1 bg-gray-100 text-gray-800 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="loading"
              class="flex-1 bg-primary text-white px-6 py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50 transition font-semibold shadow-lg"
            >
              {{ loading ? 'Creating...' : 'Create Product' }}
            </button>
          </div>
          
          <p v-if="success" class="text-sm font-semibold bg-green-50 py-3 px-4 rounded-lg border border-green-200" style="color: #059669;">
            ✓ Product added successfully!
          </p>
          <p v-if="error" class="text-sm font-semibold bg-red-50 py-3 px-4 rounded-lg border border-red-200" style="color: #dc2626;">
            {{ error }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/product'

const router = useRouter()
const productStore = useProductStore()

const form = ref({
  title: '',
  description: '',
  category: '',
  price: null,
  stock: null,
  thumbnail: ''
})

const loading = ref(false)
const error = ref('')
const success = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = false
  
  try {
    await productStore.addProduct(form.value)
    success.value = true
    setTimeout(() => {
      router.push('/products')
    }, 1500)
  } catch (err) {
    error.value = 'Error adding product. Please try again.'
    setTimeout(() => {
      error.value = ''
    }, 3000)
  } finally {
    loading.value = false
  }
}
</script>
