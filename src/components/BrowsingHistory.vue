<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">浏览记录</h2>
    <div class="space-y-4">
      <div v-for="entry in browsingHistory" :key="entry.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ entry.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(entry.viewedAt) }}</p>
          </div>
          <button @click="removeFromHistory(entry.id)" class="text-red-500 hover:text-red-700">
            <TrashIcon class="h-5 w-5" />
          </button>
        </div>
        <p class="mt-2 text-gray-700 dark:text-gray-300">{{ entry.excerpt }}</p>
        <router-link :to="'/diary/' + entry.id" class="mt-2 inline-block text-blue-500 hover:text-blue-700">
          查看全文
        </router-link>
      </div>
    </div>
    <div v-if="browsingHistory.length === 0" class="text-center text-gray-600 dark:text-gray-400 mt-8">
      暂无浏览记录
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TrashIcon } from 'lucide-vue-next'

const browsingHistory = ref([
  { id: 1, title: "春日游记", viewedAt: new Date('2023-05-15T10:30:00'), excerpt: "今天天气晴朗，我们决定去郊游..." },
  { id: 2, title: "夏夜星空", viewedAt: new Date('2023-07-20T22:15:00'), excerpt: "夜晚的星空格外明亮，我们躺在草地上..." },
  { id: 3, title: "秋季登山", viewedAt: new Date('2023-09-10T14:45:00'), excerpt: "秋高气爽，正是登山的好时节..." },
])

const formatDate = (date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const removeFromHistory = (id) => {
  browsingHistory.value = browsingHistory.value.filter(entry => entry.id !== id)
}
</script>