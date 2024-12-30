<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">赞过的日记</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="entry in likedEntries" :key="entry.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ entry.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(entry.date) }} - 由 {{ entry.author }} 发布
            </p>
          </div>
          <button @click="unlikeEntry(entry)" class="text-red-500 hover:text-red-700">
            <HeartIcon class="h-6 w-6 fill-current" />
          </button>
        </div>
        <p class="text-gray-700 dark:text-gray-300 mb-4">{{ entry.excerpt }}</p>
        <img v-if="entry.image" :src="entry.image" :alt="entry.title" class="rounded-lg max-w-full h-auto mb-4">
        <router-link :to="'/diary/' + entry.id" class="text-blue-500 hover:text-blue-700">阅读全文</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HeartIcon } from 'lucide-vue-next'

const likedEntries = ref([
  {
    id: 1,
    title: "美丽的日落",
    author: "恩卓",
    date: new Date('2023-06-10'),
    excerpt: "今天傍晚，我在海边看到了最美的日落...",
    image: new URL('../assets/sunset.jpg', import.meta.url).href
  },
  {
    id: 2,
    title: "美食之旅",
    author: "林止",
    date: new Date('2023-06-12'),
    excerpt: "今天我尝试了当地最有名的美食，真是太好吃了...",
    image: new URL('../assets/kaoya.jpg', import.meta.url).href
  },
  {
    id: 3,
    title: "城市探险",
    author: "孟雨童",
    date: new Date('2023-06-15'),
    excerpt: "今天我在这座陌生的城市里迷路了，但意外发现了很多有趣的地方...",
    image: new URL('../assets/chongqing.jpg', import.meta.url).href
  }
])

const formatDate = (date) => {
  return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'full' }).format(date)
}

const unlikeEntry = (entry) => {
  if (confirm(`确定要取消赞 "${entry.title}" 吗？`)) {
    likedEntries.value = likedEntries.value.filter(e => e.id !== entry.id)
  }
}
</script>