<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-primary">Product Manager</h1>
          <p class="text-sm text-gray-600">Manage your product inventory</p>
        </div>
        <button @click="handleLogout" class="flex items-center gap-2 text-gray-600 hover:text-primary transition px-4 py-2 rounded-lg hover:bg-gray-50">
          <span>Logout</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </nav>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Search Products</label>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search by title..."
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>
          <div class="flex-1">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select 
              v-model="selectedCategory"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            >
              <option value="">All Categories</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div class="flex items-end">
            <router-link 
              to="/products/new"
              class="bg-primary text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition whitespace-nowrap font-semibold shadow-lg flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </router-link>
          </div>
        </div>
      </div>
      
      <div v-if="productStore.isLoading" class="flex justify-center items-center py-20">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p class="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
      
      <div v-else-if="productStore.error" class="text-center py-20">
        <div class="bg-red-50 border border-red-200 rounded-xl p-6 inline-block">
          <p class="text-red-600 font-semibold">Error: {{ productStore.error }}</p>
        </div>
      </div>
      
      <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Product</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <img :src="product.thumbnail" :alt="product.title" class="h-14 w-14 rounded-full object-cover border-2 border-gray-200" />
                    <div class="ml-4">
                      <div class="text-sm font-semibold text-gray-900">{{ product.title }}</div>
                      <div class="text-sm text-gray-500 mt-0.5">{{ truncate(product.description, 80) }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                    {{ product.category }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm font-semibold text-gray-900">${{ product.price }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ product.stock }}</td>
                <td class="px-6 py-4 text-sm">
                  <router-link 
                    :to="`/products/${product.id}`"
                    class="text-primary hover:text-primary/80 font-semibold hover:underline"
                  >
                    View Details →
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="filteredProducts.length === 0" class="text-center py-12">
          <p class="text-gray-500">No products found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/product'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const productStore = useProductStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const selectedCategory = ref('')

const categories = computed(() => {
  const cats = new Set(productStore.products.map(p => p.category))
  return Array.from(cats).sort()
})

const filteredProducts = computed(() => {
  return productStore.products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  productStore.fetchProducts()
})
</script>
