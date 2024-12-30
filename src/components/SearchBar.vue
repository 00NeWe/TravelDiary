<template>
  <div class="relative flex items-center">
    <!-- 搜索图标 -->
    <SearchIcon class="absolute left-3 w-5 h-5 text-gray-500 dark:text-gray-400" />

    <!-- 搜索输入框 -->
    <input v-model="keyword" @keydown.enter="handleSearch" type="text" placeholder="搜索日记..."
      class="w-full pl-10 pr-12 py-2 border rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring" />

    <!-- 清空按钮 -->
    <button v-if="keyword.length > 0" @click="clearSearch"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
      清空
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SearchIcon } from 'lucide-vue-next'

const keyword = ref('')

const emit = defineEmits(['search', 'clear'])

const handleSearch = () => {
  if (keyword.value.trim()) {
    emit('search', keyword.value.trim())
  }
}

const clearSearch = () => {
  keyword.value = ''
  emit('clear')
}
</script>
